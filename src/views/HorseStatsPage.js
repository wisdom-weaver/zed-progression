import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useParams } from "react-router";
import { useAppContext } from "../App.js";
import { useQueries } from "react-query";
import { q_hdata_dur } from "../utils/queries.js";
import { useMemo } from "react";
import { dec, decp, getv, iso, jstr, nils } from "../utils/utils.js";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import _ from "lodash";
import moment from "moment";
import { Card, Tag, ToolTip } from "../components/comps.js";
import { twMerge } from "tailwind-merge";
import { compile_ddata } from "../utils/progression_logic.js";
import { Doughnut } from "react-chartjs-2";

const ndays = 30;
const HStatsContext = createContext();
const useHStatsContext = () => useContext(HStatsContext);

function HorseStatsPage() {
  const { history, location } = useAppContext();
  const params = useParams();
  const hid = useMemo(() => {
    return parseInt(params.hid);
  }, [params]);

  const ed = iso().slice(0, 10) + "T00:00:00Z";
  const st = moment(ed).add(-ndays, "days").toISOString();

  const [qhdata_dur] = useQueries([q_hdata_dur({ hid, st, ed })]);

  const hcon = {
    hid,
    ndays,
    st,
    ed,
    qhdata_dur,
  };
  return (
    <div className="page">
      <HStatsContext.Provider value={hcon}>
        {qhdata_dur.status == "success" && <HStatsView />}
      </HStatsContext.Provider>
    </div>
  );
}

const dists = ["ALL", 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600];

const HStatsView = () => {
  const hcon = useHStatsContext();
  const d = getv(hcon, "qhdata_dur.data");
  const [dist, set_dist] = useState("ALL");
  const distdata = useMemo(() => {
    return _.map(d, (e) => {
      return { hid: e.hid, date: e.date, ...getv(e, `${dist}`) };
    });
  }, [dist]);

  const compdata = compile_ddata(
    _.map(d, (e) => {
      return { hid: e.hid, date: e.date, ...getv(e, `${"ALL"}`) };
    }) || [],
    hcon.ndays
  );

  const ccn = `w-full p-4 rounded-sm bg-lig mx-auto`;

  return (
    <div className="px-4">
      <div className="flex flex-row justify-center items-start gap-4">
        <div className="grid grid-cols-5">
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
      </div>
      <div className="max-w-[100vw] grid xs:grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <Card className={ccn}>
          <p className="text-center text-xl italic bold">Speed</p>
          <SpeeedsChart chart_data={distdata} />
        </Card>
        <Card className={ccn}>
          <p className="text-center text-xl italic bold">Finish Distro</p>
          <AvgPosChart chart_data={distdata} />
        </Card>
        <Card className={ccn}>
          <PossGainChart possible_gain={compdata?.possible_gain} />
        </Card>
      </div>
    </div>
  );
};

const AvgPosChart = ({ chart_data }) => {
  chart_data = _.map(chart_data, (e) => {
    return {
      ...e,
      avg_place2:
        parseInt(e.avg_place) > 0 ? Math.abs(12 - e.avg_place + 1) : 0,
    };
  });
  return (
    <ResponsiveContainer width={"100%"} height={400}>
      <AreaChart
        // width={800}
        // height={400}
        data={chart_data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.6} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          tickFormatter={(tickItem) => moment(tickItem).format("MM/DD")}
          dataKey="date"
          tickCount={chart_data.length}
        />
        <YAxis
          tickCount={24}
          tickFormatter={(tickItem) => `#${dec(12 - tickItem + 1, 0)}`}
          // domain={["dataMin", "dataMax + 1"]}
          domain={[1, 12]}
        />
        <CartesianGrid strokeDasharray="10 10" opacity={0.2} />
        <Tooltip content={<CustomPosToolTip />} />
        {/* <Tooltip /> */}
        <Area
          type="monotone"
          dataKey="avg_place2"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const SpeeedsChart = ({ chart_data }) => {
  let [chart_mi, chart_mx] = [58, 65];
  chart_data = chart_data.map((e) => {
    let mx_sp_val = e.mx_sp == null ? chart_mi : e.mx_sp;
    let med_sp_val = e.med_sp == null ? chart_mi : e.med_sp;
    return { ...e, mx_sp_val, med_sp_val };
  });
  return (
    <ResponsiveContainer width={"100%"} height={400}>
      <AreaChart
        // width={800}
        // height={400}
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
        <Tooltip content={<CustomSpeedToolTip />} />
        <Area
          type="monotone"
          dataKey="mx_sp_val"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="med_sp_val"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const PossGainChart = ({ possible_gain }) => {
  const rot = possible_gain * 180 - 90;
  console.log({ possible_gain, rot });
  const data = {
    datasets: [
      {
        label: "# of Votes",
        data: [30, 60, 180, 90],
        backgroundColor: [
          "rgba(255, 206, 86, 0.4)", // yellow
          "rgba(75, 192, 192, 0.4)", // green
          "rgba(54, 162, 235, 0)", // blue
          "rgba(255, 99, 132, 0.4)", // red
          "rgba(153, 102, 255, 0.4)", // purple
          "rgba(255, 159, 64, 0.4)", // orange
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)", // yellow
          "rgba(75, 192, 192, 1)", // green
          "rgba(54, 162, 235, 0)", // blue
          "rgba(255, 99, 132, 1)", // red
          "rgba(153, 102, 255, 1)", // purple
          "rgba(255, 159, 64, 1)", // orange
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="">
      <div className="w-[500px] max-h-[250px] overflow-hidden mx-auto relative">
        <div className="">
          <div
            style={{
              transform: `rotate(${rot}deg) translate(-50% , -5px)`,
              transformOrigin: `0% 100%`,
            }}
            className={twMerge(
              `needle`,
              `h-[200px] w-[10px] bg-black border border-white rounded-md `,
              `absolute bottom-[7px] left-[50%]`
              // `[transform-origin:100%_100%]`
            )}
          ></div>
          <Doughnut width={500} options={{}} data={data} />
        </div>
      </div>
      <p className="text-center text-xl font-bold italic">
        Possible Gain {decp(possible_gain, 1)}
      </p>
    </div>
  );
};

const CustomSpeedToolTip = ({ active, payload, label }) => {
  if (!active) return;
  let row = getv(payload, "0.payload");
  if (_.isEmpty(row)) return <></>;
  const cmap = _.chain(payload).keyBy("name").mapValues("color").value();
  return (
    <div className="w-[15rem] h-[5rem] bg-dark/90">
      <p className="text-center">{moment(row.date).format("DD-MMM-YY")}</p>
      <table className="def_table">
        <tr style={{ color: cmap["mx_sp_val"] }}>
          <td>Max Speed</td>
          <td>{nils(row.mx_sp) ? "na" : dec(row.mx_sp, 2)}</td>
        </tr>
        <tr style={{ color: cmap["med_sp_val"] }}>
          <td>Median Speed</td>
          <td>{nils(row.med_sp) ? "na" : dec(row.med_sp, 2)}</td>
        </tr>
      </table>
    </div>
  );
};

const CustomPosToolTip = ({ active, payload, label }) => {
  if (!active) return;
  let row = getv(payload, "0.payload");
  if (_.isEmpty(row)) return <></>;
  const cmap = _.chain(payload).keyBy("name").mapValues("color").value();
  return (
    <div className="w-[15rem] h-[5rem] bg-dark/90">
      <p className="text-center">{moment(row.date).format("DD-MMM-YY")}</p>
      <table className="def_table">
        <tr style={{ color: cmap["avg_place2"] }}>
          <td>Avg Place</td>
          <td>{nils(row.avg_place) ? "na" : dec(row.avg_place, 2)}</td>
        </tr>
      </table>
    </div>
  );
};

export default HorseStatsPage;
