const _ = require("lodash");

export const compile_ddata = (rs, ndays) => {
  let gain = 0;
  for (let r of rs) {
    let p = r.n_paid;
    let f = r.n_free;
    let ea = p + 0.5 * f;
    gain += Math.min(16, ea);
    // gain += 16;
  }
  let mx_r = ndays * 16;
  let possible_gain = gain / mx_r;

  return { possible_gain, gain, mx_r };
};
