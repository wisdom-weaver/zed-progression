import _ from "lodash";
import moment from "moment";

export const extract_inp = (id, type = "txt") => {
  let el = document.getElementById(id);
  if (!el) return undefined;
  let val = el.value;
  if (!val) return undefined;
  if (type == "n") {
    val = parseFloat(val);
    if (!_.isNaN(val)) return val;
    else return undefined;
  }
  return val;
};
export const set_val_inp = (id, txt = "") => {
  let el = document.getElementById(id);
  if (!el) return;
  el.value = txt;
};
export const getv = (ob, path) => {
  try {
    let a = _.get(ob, path);
    if (a === undefined) return undefined;
    return a;
  } catch (err) {
    return undefined;
  }
};

export const colors_ob = {
  green: "#308671",
  purple: "#563D6D",
  pink: "#ad3966",
  red: "#5E3846",
  yellow: "#FEE912",
  orange: "#66513E",
  neon: "#375B55",
  blue: "#326373",
  red: "#d13524",
  fire: "#FB5739",
  "dark-orange": "#CA5C20",
  "dark-purple": "#292D3E",
  gray: "#383C42",
};
export const get_color = (t) => {
  if (t == "inherit") return "inherit";
  return colors_ob[t] || "";
};
export const dec = (n, d = 2) => {
  if (!_.isNumber(parseFloat(n))) return;
  return parseFloat(n).toFixed(d);
};
export const pad = (n, d = 2) => {
  if (!_.isNumber(parseFloat(n))) return;
  return parseFloat(n).toString().padStart(d, "0");
};
export const decp = (n, d = 2) => {
  if (!_.isNumber(parseFloat(n))) return;
  return parseFloat(n * 100).toFixed(d) + "%";
};
const class_map = {
  7: ["ALL", "c6", "A", "A"],
  0: ["DISCOVERY", "c0", "G", "G"],
  1: ["CLASS I", "c1", "1", "I"],
  2: ["CLASS II", "c2", "2", "II"],
  3: ["CLASS III", "c3", "3", "III"],
  4: ["CLASS IV", "c4", "4", "IV"],
  5: ["CLASS V", "c5", "5", "V"],
  6: ["CLASS VI", "c6", "6", "VI"],
  99: ["Tournament", "c99", "99", "Tour"],
  "-1": ["ERROR", "c-1", "er", "A"],
};

export const get_class_code = (txt) => {
  txt = txt.trim().toUpperCase();
  for (let [c, [t, p, q, r]] of _.entries(class_map))
    if ([t, r].includes(txt)) return c;
  return 7;
};
export const get_class_txt = (c) => {
  let ob = class_map[c] ?? {};
  return ob[0]?.toUpperCase() ?? "Error";
};
export const get_class_mini_txt = (c) => {
  let ob = class_map[c] ?? {};
  return ob[3]?.toUpperCase() ?? "Error";
};
export const get_compact_class = (c) => {
  let ob = class_map[c] ?? {};
  return ob[2] ?? "Error";
};
export const iso = (d = new Date()) => {
  try {
    return new Date(d).toISOString();
  } catch (err) {
    return "iso-err";
  }
};
export const nano = (d = Date.now()) => {
  try {
    return new Date(d).getTime();
  } catch (err) {
    return "nano-err";
  }
};

export const qs_conf = { arrayFormat: "bracket" };
export const geno = (g) => {
  if (parseInt(g) == g) return `Z${g}`;
  return parseFloat(g?.slice(1));
};
export const mini_breed_type = (breed_type, n = 2) => {
  let bt = breed_type.slice(0, n);
  bt = bt[0].toUpperCase() + bt.slice(1);
  return bt;
};
export const mini_name = (name, n = 30) => {
  if (!name) return "NA";
  if (name.length > n) return name.slice(0, n) + "...";
  else return name;
};

const fee_tags_ob = {
  A: [25.0, 17.5, 5000],
  B: [15.0, 12.5, 17.5],
  C: [10.0, 7.5, 12.5],
  D: [5.0, 3.75, 7.5],
  E: [2.5, 1.25, 3.75],
  F: [0.0, 0.0, 0.0],
};
export const get_fee_tag = (entryfee_usd, f = 1) => {
  for (let [tag, [rep, mi, mx]] of _.entries(fee_tags_ob))
    if (_.inRange(entryfee_usd, mi, mx + 1e-3)) {
      if (f == 2) return rep;
      return tag;
    }
};
export const jparse = (json, def = undefined) => {
  try {
    return JSON.parse(json);
  } catch (err) {
    return def;
  }
};
export const jstr = (jsonob, def = undefined) => {
  try {
    return JSON.stringify(jsonob);
  } catch (err) {
    return def;
  }
};

export const himg_url = (hex) => `https://img.zed.run/horses/${hex}.png`;

export const per = (a, b) => {
  return (a || 0) / (b || 1);
};

export const iso_format = (d, format = `DD-MM-YYYY HH:mma`) => {
  try {
    return moment(new Date(d)).format(format);
  } catch (err) {
    console.log("iso_format", d, err.messsage);
    return "invalid-date";
  }
};
export const usiso_format = (d, format = `Do MMMM HH:mma`) => {
  try {
    return moment(new Date(d)).format(format);
  } catch (err) {
    console.log("iso_format", d, err.messsage);
    return "invalid-date";
  }
};

export const d_from = (d) => {
  try {
    return moment(new Date(d)).fromNow();
  } catch (err) {
    console.log("iso_format", d, err.messsage);
    return "inval";
  }
};

export const d_to = (d) => {
  try {
    return moment(new Date(d)).toNow();
  } catch (err) {
    console.log("iso_format", d, err.messsage);
    return "inval";
  }
};

export const clear_all_inps_in = (sel) => {
  let inps = document.querySelectorAll(`${sel} input[type=text]`);
  [...inps].map((inp) => (inp.value = ""));
};
export const blur_all_inps_in = (sel) => {
  let inps = document.querySelectorAll(`${sel} input[type=text]`);
  [...inps].map((inp) => inp.blur());
};

export const cdelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const copyToClipboard = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

export const set_path = (init, setter, path, val) => {
  let o = _.cloneDeep(init);
  _.set(o, path, _.cloneDeep(val));
  setter(o);
};
export const set_paths = (init, setter, ar) => {
  let o = _.cloneDeep(init);
  ar.map(([path, val]) => {
    _.set(o, path, _.cloneDeep(val));
    setter(o);
  });
};

export const copy_clip = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

export const check_eth_address = (s) => {
  if (_.isNil(s) || s == "") return null;
  return s.match(`^0x[a-fA-F0-9]{40}$`);
};

export const nils = (s) => (_.isNil(s) || s == "" ? true : false);
