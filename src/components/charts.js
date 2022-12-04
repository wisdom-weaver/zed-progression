import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import tailwindcss_colors from "tailwindcss/colors";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { contrastColor } from "contrast-color";
import _ from "lodash";
import { dec, per } from "../utils/utils";
import { data } from "autoprefixer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
ChartJS.register(ChartDataLabels);

export const rc_all = {
  dists: [
    // 9000,
    1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600,
  ],
  cls: [
    // 77,
    0, 1, 2, 3, 4, 5, 6, 99,
  ],
  poss: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  fla: [
    // 0, // n
    1, // free
    2, // paid
    3, // flame
    4, // nflame
    5, // free_flame
    6, // free_nflame
    7, // paid_flame
    8, // paid_nflame
  ],
};

export function BarChart({
  cdata,
  labels,
  title,
  backgroundColor = null,
  label,
  formatter = (val) => val,
  datalabelsColor,
}) {
  if (!backgroundColor) backgroundColor = tailwindcss_colors.blue[600];
  if (!datalabelsColor)
    datalabelsColor = contrastColor({ bgColor: backgroundColor });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: title,
      },
      datalabels: {
        display: true,
        formatter,
        color: datalabelsColor,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: label,
        data: cdata,
        backgroundColor: backgroundColor,
      },
    ],
  };
  return <Bar options={options} data={data} />;
}

export const create_charts_races = (races) => {
  let pc = _.countBy(races, "place");
  let heat_c = { per: {}, c: {}, tot: {} };
  heat_c.per = _.fromPairs(rc_all.cls.map((d) => [d, 0]));
  heat_c.c = _.fromPairs(rc_all.cls.map((d) => [d, 0]));
  heat_c.tot = _.fromPairs(rc_all.cls.map((d) => [d, 0]));
  let cgroup = _.groupBy(races, "thisclass");
  _.entries(cgroup).map(([c, eac_races = []]) => {
    let flamed = _.countBy(eac_races, "flame");
    heat_c.c[c] = flamed[1];
    heat_c.tot[c] = eac_races.length;
    heat_c.per[c] = dec(per(heat_c.c[c], heat_c.tot[c]) * 100, 2);
  });

  let heat_d = { per: {}, c: {}, tot: {} };
  heat_d.per = _.fromPairs(rc_all.dists.map((d) => [d, 0]));
  heat_d.c = _.fromPairs(rc_all.dists.map((d) => [d, 0]));
  heat_d.tot = _.fromPairs(rc_all.dists.map((d) => [d, 0]));
  let dgroup = _.groupBy(races, "distance");
  _.entries(dgroup).map(([d, eac_races = []]) => {
    let flamed = _.countBy(eac_races, "flame");
    heat_d.c[d] = flamed[1];
    heat_d.tot[d] = eac_races.length;
    heat_d.per[d] = dec(per(heat_d.c[d], heat_d.tot[d]) * 100, 2);
  });

  return { poss: { pc }, heat_c, heat_d };
};

const ton = (n) => {
  if (_.isNaN(parseFloat(n))) return 0;
  return parseFloat(n);
};

export const create_horseshoe_charts = (races) => {
  let ob = {};
  for (let d of rc_all.dists) {
    let filt = _.filter(races, (i) => i.distance == d);
    let n = filt.length || 0;
    let pcc = _.countBy(filt, "place");
    let pc = _.fromPairs(rc_all.poss.map((p) => [p, pcc[p] || 0]));
    let flames = _.filter(filt, (i) => i.flame == 1);
    let fees = _.reduce(filt, (sum, i) => (sum += ton(i.fee)), 0);
    let prizes = _.reduce(filt, (sum, i) => (sum += ton(i.prize)), 0);
    let profit = prizes - fees;
    let flame_rate = per(flames.length, n);
    let win_rate = per(pc[1].length, n);
    ob[d] = { n, profit, prizes, fees, flame_rate, win_rate, pc };
  }
  return ob;
};

export const get_overall_stats = (races) => {
  let pob = _.countBy(races, "place");
  let tot = races.length;
  let p1 = pob[1] ?? 0;
  let p2 = pob[2] ?? 0;
  let p3 = pob[3] ?? 0;
  let flames = _.countBy(races, "flames")[1] || 0;
  let win_rate = per(p1, tot);
  let place_rate = per(p1 + p2, tot);
  let show_rate = per(p1 + p2 + p3, tot);
  let flame_rate = per(flames, tot);
  let fees = _.sumBy(races, (i) => parseFloat(i["entryfee"])) ?? 0;
  let prizes = _.sumBy(races, "prize") ?? 0;
  let profit = prizes - fees;
  let roi = per(profit, fees);
  return {
    win_rate,
    place_rate,
    show_rate,
    flame_rate,
    tot,
    fees,
    prizes,
    profit,
    roi,
  };
};
