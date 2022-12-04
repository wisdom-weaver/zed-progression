import _ from "lodash";

const code_cn_ob = {
  r: "bg-red-500",
  o: "bg-orange-500",
  y: "bg-yellow-500 text-black",
  g: "bg-green-500",
  p: "bg-purple-600",
  b: "bg-blue-500",
  bk: "bg-black",
};
export const bg_code_cn_ob = {
  r: "bg-red-500",
  o: "bg-orange-500",
  y: "bg-yellow-500 text-black",
  g: "bg-green-500",
  p: "bg-purple-600",
  b: "bg-blue-500",
  bk: "bg-black",
};
export const text_code_cn_ob = {
  r: "text-red-500",
  o: "text-orange-500",
  y: "text-yellow-500",
  g: "text-green-500",
  p: "text-purple-600",
  b: "text-blue-500",
  bk: "text-black",
};
export const code_cn = (c) => code_cn_ob[c];

const speed_dist_ob = {
  1000: 62.42549974,
  1200: 60.523951221,
  1400: 60.264939971,
  1600: 60.121104911,
  1800: 60.033337925,
  2000: 59.958352854,
  2200: 59.894376615,
  2400: 59.875304908,
  2600: 59.81205861,
};
const speed_fact = { y: 1.033, r: 1.04 };
export const get_speed_code = (speed, rdist) => {
  try {
    if (!speed || _.isNaN(speed)) return "bk";
    if (speed >= speed_dist_ob[rdist] * speed_fact.r) return "r";
    if (speed >= speed_dist_ob[rdist] * speed_fact.y) return "y";
    return "g";
  } catch (err) {
    return "b";
  }
};

export const class_cn = (c) => {
  return `bg-c${c}`;
};

export const get_rng_code = (rng) => {
  rng = parseFloat(rng);
  if ([null, NaN, undefined].includes(rng)) return "bk";
  if (rng >= 1.2) return "r";
  if (rng >= 1.0) return "o";
  if (rng >= 0.7) return "y";
  return "b";
};

const dp_dist_ob = {
  10: [2.46, 3.12],
  12: [1.91, 2.43],
  14: [1.48, 1.89],
  16: [0.72, 0.91],
  18: [1.44, 1.83],
  20: [1.87, 2.38],
  22: [2.35, 2.99],
  24: [2.46, 3.13],
  26: [2.58, 3.28],
};

const dp_dist_allowed = {
  1000: [12, 14],
  1200: [10, 12, 14],
  1400: [10, 12, 16, 18],
  1600: [14, 18, 20],
  1800: [20, 22, 16, 14],
  2000: [16, 18, 22, 24, 26],
  2200: [20, 18, 24, 26],
  2400: [22, 20, 26],
  2600: [22, 20, 24],
};

export const get_dp_code = (dp, rdist) => {
  try {
    if (!rdist) return "p";
    let [dp_dist, score] = dp.split("-");
    dp_dist = parseFloat(dp_dist);
    score = parseFloat(score);
    rdist = parseFloat(rdist);
    if (dp_dist == 0) return "bk";
    // console.log(dp_dist, rdist, Math.abs(dp_dist - rdist / 100));
    let diff = Math.abs(dp_dist - rdist / 100);
    if (diff > 6) return "g";
    if (diff == 0 || dp_dist_allowed[rdist].includes(dp_dist))
      if (score >= dp_dist_ob[dp_dist][1]) return "r";
      else if (score >= dp_dist_ob[dp_dist][0]) return "o";
      else return "y";
    return "b";
  } catch (err) {
    console.log(err);
    return "bk";
  }
};
export const get_ba_code = (ba) => {
  try {
    ba = parseFloat(ba);
    if (!ba || _.isNaN(ba)) return "cbg-black";
    // if (ba.includes(" A")) return "bg-slate-600";
    if (ba >= 4) return "r";
    if (ba >= 3) return "o";
    if (ba >= 2) return "y";
    if (ba >= 1) return "b";
    return "g";
  } catch (err) {
    console.log(err);
    return "b";
  }
};

export const get_rng_cn = (n) => code_cn(get_rng_code(n));
export const get_dp_cn = (n) => code_cn(get_dp_code(n));
export const get_ba_cn = (n) => code_cn(get_ba_code(n));
