import _ from "lodash";

const cn_ob = {
  b: [`bg-blue-400`],
  b4: [`bg-blue-400`],
  b5: [`bg-blue-500`],
  r: [`bg-red-500`],
  r5: [`bg-red-500`],
  r4: [`bg-red-400`],
  y: [`bg-yellow-500`],
  y4: [`bg-yellow-400`],
  y5: [`bg-yellow-500`],
  y6: [`bg-yellow-600`],
  o: [`bg-orange-500`],
  o4: [`bg-orange-400`],
  o5: [`bg-orange-500`],
  o6: [`bg-orange-600`],
  o: [`bg-orange-500`],
  p: [`bg-pink-600`],
  p4: [`bg-pink-400`],
  p5: [`bg-pink-500`],
  p6: [`bg-pink-600`],
  pr: [`bg-purple-500`],
  pr4: [`bg-purple-400`],
  pr5: [`bg-purple-500`],
  pr6: [`bg-purple-600`],
  g: [`bg-green-500`],
  g4: [`bg-green-400`],
  g5: [`bg-green-500`],
  g6: [`bg-green-600`],
  bk: [`bg-black`],
};

const bcn_ob = _.chain(cn_ob)
  .entries()
  .map(([k, ar]) => [k, ar[0]])
  .fromPairs()
  .value();

const o_ob = {
  0: `bg-opacity-0 `,
  10: `bg-opacity-10 `,
  20: " bg-opacity-20 ",
  30: " bg-opacity-30 ",
  40: " bg-opacity-40 ",
  50: " bg-opacity-50 ",
  60: " bg-opacity-60 ",
  70: " bg-opacity-70 ",
  80: " bg-opacity-80 ",
  90: " bg-opacity-90 ",
  100: " bg-opacity-100 ",
};
export const bcn = (k) => {
  let [c = "bk", o = null] = k.toString().split("-");
  let col = bcn_ob[c] || bcn_ob["bk"];
  let opa = o_ob[o] || "";
  return ` ${col} ${opa} `;
};
