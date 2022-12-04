import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useParams } from "react-router";
import { useAppContext } from "../App.js";
import { useQueries } from "react-query";
import { q_hdata_dur } from "../utils/queries.js";
import { useMemo } from "react";
import { dec, getv, jstr } from "../utils/utils.js";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import _ from "lodash";
import moment from "moment";
import { Tag, ToolTip } from "../components/comps.js";
import { twMerge } from "tailwind-merge";

const HStatsContext = createContext();
const useHStatsContext = () => useContext(HStatsContext);

function HorseStatsPage() {
  const { history, location } = useAppContext();
  const params = useParams();
  const hid = useMemo(() => {
    return parseInt(params.hid);
  }, [params]);

  const st = "2022-11-01T00:00:00Z";
  const ed = "2022-11-30T00:00:00Z";

  const [qhdata_dur] = useQueries([q_hdata_dur({ hid, st, ed })]);

  const hcon = {
    hid,
    st,
    ed,
    qhdata_dur,
  };
  return (
    <HStatsContext.Provider value={hcon}>
      {qhdata_dur.status == "success" && <HStatsView />}
    </HStatsContext.Provider>
  );
}

const dists = ["ALL", 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600];

const HStatsView = () => {
  const hcon = useHStatsContext();
  const d = getv(hcon, "qhdata_dur.data");
  useEffect(() => {
    console.log("data", d);
  }, [d]);

  const [dist, set_dist] = useState("ALL");
  const distdata = _.map(d, (e) => {
    return { hid: e.hid, date: e.date, ...getv(e, `${dist}`) };
  });

  return (
    <div className="w-max p-4 rounded-sm bg-lig mx-auto">
      <div className="flex flex-row justify-center items-start gap-4">
        <div className="grid grid-cols-1">
          {dists.map((d) => {
            return (
              <span
                onClick={() => set_dist(d)}
                className={twMerge(
                  "w-full text-center min-w-[6rem] my-1.5",
                  "cursor-pointer rounded-lg rounded-bl-[0rem] ",
                  d == dist
                    ? ` border-l-[10px] border-l-acc_gr 
                        border-b-[5px]  border-b-acc_gr
                        font-bold text-acc_gr
                        `
                    : ` border-l-[10px] border-transparent 
                        border-b-[5px]  border-transparent`
                )}
              >
                {d == "ALL" ? d : `${d}M`}
              </span>
            );
          })}
        </div>
        <div className="w-[50rem]">
          <SpeeedsChart chart_data={distdata} />
        </div>
      </div>
    </div>
  );
};

const SpeeedsChart = ({ chart_data }) => {
  return (
    <AreaChart

      width={800}
      height={400}
      data={chart_data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.6} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.6} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis
        tickFormatter={(tickItem) => moment(tickItem).format("MM/DD")}
        dataKey="date"
        tickCount={chart_data.length}
      />
      <YAxis
        tickCount={100}
        tickFormatter={(tickItem) => dec(tickItem, 2)}
        // domain={["dataMin", "dataMax + 1"]}
        domain={[58, 65]}
      />
      <CartesianGrid strokeDasharray="10 10" opacity={0.2} />
      <Tooltip content={<CustomToolTip />} />
      <Area
        type="monotone"
        dataKey="mx_sp"
        stroke="#8884d8"
        fillOpacity={1}
        fill="url(#colorUv)"
      />
      <Area
        type="monotone"
        dataKey="med_sp"
        stroke="#82ca9d"
        fillOpacity={1}
        fill="url(#colorPv)"
      />
    </AreaChart>
  );
};

const CustomToolTip = ({ active, payload, label }) => {
  if (!active) return;
  let row = getv(payload, "0.payload");
  if (_.isEmpty(row)) return <></>;
  const cmap = _.chain(payload).keyBy("name").mapValues("color").value();
  return (
    <div className="w-[15rem] h-[5rem] bg-dark/90">
      <p className="text-center">{moment(row.date).format("DD-MMM-YY")}</p>
      <table className="def_table">
        <tr style={{ color: cmap["mx_sp"] }}>
          <td>Max Speed</td>
          <td>{_.isNaN(row.mx_sp) ? "na" : dec(row.mx_sp, 2)}</td>
        </tr>
        <tr style={{ color: cmap["med_sp"] }}>
          <td>Median Speed</td>
          <td>{_.isNaN(row.med_sp) ? "na" : dec(row.med_sp, 2)}</td>
        </tr>
      </table>
    </div>
  );
};

export default HorseStatsPage;