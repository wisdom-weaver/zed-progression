import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import { getv } from "./utils";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";

const init = () => {};

export const SortHead = ({ mode = "object", context, k }) => {
  const { sorts, set_sorts, sort_ob } = context;
  let ob = sort_ob[k];
  let { disp = k } = ob || {};
  let [asc, desc] = [`+${k}`, `-${k}`];
  let cn = `flex flex-row items-center justify-center cursor-pointer inline-block `;
  const asc_clk = () => set_sorts([..._.filter(sorts, (i) => i != asc), desc]);
  const rem = () =>
    set_sorts([..._.filter(sorts, (i) => ![asc, desc].includes(i))]);
  const desc_clk = () => set_sorts([..._.filter(sorts, (i) => i != desc), asc]);
  if (sorts?.includes(asc))
    return (
      <div onDoubleClick={rem} onClick={asc_clk} className={cn}>
        <span className="mx-1">{disp}</span>
        <span className="text-yellow-500">
          <FontAwesomeIcon icon={faArrowDown} />
        </span>
      </div>
    );
  else if (sorts?.includes(desc))
    return (
      <div onDoubleClick={rem} onClick={desc_clk} className={cn}>
        <span className="mx-1">{disp}</span>
        <span className="text-yellow-500">
          <FontAwesomeIcon icon={faArrowUp} />
        </span>
      </div>
    );
  else
    return (
      <div onDoubleClick={rem} onClick={desc_clk} className={cn}>
        <span className="mx-1">{disp}</span>
      </div>
    );
};

export const sort_fn = (i1, path, type = "txt", ops) => {
  let a = getv(i1, path);
  if (type == "n") {
    if (!a) return -1e10;
    return +_.toNumber(a);
  } else if (type == "txt") {
    return a;
  } else if (type == "idx") {
    let idx_ar = ops;
    let idx = _.indexOf(idx_ar, a);
    return idx == -1 ? 1e14 : idx;
  } else if (type == "fn_n") {
    let fn_n = ops;
    a = fn_n(i1);
    return a;
  } else return 0;
};
export const get_sort_sign = (sort) => {
  if (!sort) return -1;
  return sort[0] == "+" ? +1 : -1;
};

// export const horses_sort_ob = {
//   hid: { disp: "HorseID", fn: (i) => sort_fn(i, "hid", "n"), type: "n" },
//   name: { disp: "Name", fn: (i) => sort_fn(i, "name", "txt"), type: "txt" },
//   rating: { disp: "Rating", fn: (i) => sort_fn(i, "rating", "n"), type: "n" },
//   rng: { disp: "RNG", fn: (i) => sort_fn(i, "rng", "n"), type: "n" },
//   ba: { disp: "BA", fn: (i) => sort_fn(i, "ba_n", "n"), type: "n" },
//   dp_score: { disp: "DP", fn: (i) => sort_fn(i, "dp_score_n", "n"), type: "n" },
//   dp_dist: { disp: "Dist", fn: (i) => sort_fn(i, "dp_dist_n", "n"), type: "n" },
//   br: { disp: "br", fn: (i) => sort_fn(i, "br", "n"), type: "n" },
//   stud: { disp: "stud", fn: (i) => sort_fn(i, "studs_n", "n"), type: "n" },
//   studs_left: {
//     disp: "left",
//     fn: (i) => sort_fn(i, "studs_left_n", "n"),
//     type: "n",
//   },
//   is_bred: {
//     disp: "is_bred",
//     fn: (i) => sort_fn(i, "is_bred_n", "n"),
//     type: "n",
//   },
//   breed_days: {
//     disp: "days",
//     fn: (i) => sort_fn(i, "bred_diff", "n"),
//     type: "n",
//   },
// };

export const sort_horses = ({ horses, sort_ob, sorts }) => {
  try {
    let hids = _.map(horses, "hid");
    let horses_ar = _.values(horses);
    if (_.isEmpty(sorts)) return _.map(horses_ar, "hid");

    let sorts_n = sorts?.map((sort) => {
      let [sign, k] = [sort[0], sort.slice(1)];
      return [k, sign == "+" ? "asc" : "desc"];
    });
    // let ord = [...sorts_n];
    let ord = [...sorts_n].reverse();
    horses_ar = _.chain(horses_ar)
      .orderBy(
        ord.map(([k, dir]) => (i) => {
          let fn = sort_ob[k]?.fn || null;
          let a = fn ? fn(i) : 0;
          return a;
        }),
        ord.map(([k, dir]) => dir)
      )
      .value();
    hids = _.map(horses_ar, "hid");
    return hids;
  } catch (err) {
    console.log(err);
    return _.map(horses, "hid");
  }
};
export const sorting_fn = (ar, sort_ob, sorts) => {
  try {
    if (_.isEmpty(sorts)) return ar;

    let sorts_n = sorts?.map((sort) => {
      let [sign, k] = [sort[0], sort.slice(1)];
      return [k, sign == "+" ? "asc" : "desc"];
    });
    // let ord = [...sorts_n];
    let ord = [...sorts_n].reverse();
    let filt = _.chain(ar)
      .orderBy(
        ord.map(([k, dir]) => (i) => {
          let fn = sort_ob[k]?.fn || null;
          let a = fn ? fn(i) : 0;
          return a;
        }),
        ord.map(([k, dir]) => dir)
      )
      .value();
    return filt;
  } catch (err) {
    console.log(err);
    return ar;
  }
};

export const filter_fn = (ar, filters) => {
  let filt = _.filter(ar, (h) => {
    let p = 0;
    // if (p) console.log(horse);
    // const { hid } = h;
    for (let [fkey, fob] of _.entries(filters)) {
      let { vals: f, path: k, cfilter = undefined } = fob;
      if (!cfilter) continue;
      if (_.isEmpty(f)) continue;
      let val = h[k];
      if (_.isArray(f)) {
        if (_.isEmpty(f));
        else if (!f.includes(val)) {
          // if (p) console.log(hid, "na array", k, val);
          return false;
        }
      } else {
        let { mi = undefined, mx = undefined } = f;
        val = parseFloat(val);
        // if (p) console.log(k, { mi, mx });
        if (mi == undefined && mx == undefined);
        else if (mx !== undefined && val > mx) {
          // if (p) console.log(hid, "na mx", k, val);
          return false;
        } else if (mi !== undefined && val < mi) {
          // if (p) console.log(hid, "na mi", k, val);
          return false;
        } else if (!_.inRange(val, mi || 1e-5, (mx || 1e5) + 1e-8)) {
          // if (p) console.log(hid, "na range", k, val);
          return false;
        }
      }
    }
    return true;
  });
  return filt;
};

export const filter_horses = ({ horses, filters }) => {
  try {
    const filt = _.filter(horses, (h) => {
      let p = 0;
      // if (p) console.log(horse);
      const { hid } = h;
      for (let [fkey, fob] of _.entries(filters)) {
        let { vals: f, path: k, cfilter = undefined, type } = fob;
        if (!cfilter) continue;
        let val = h[k];

        if (type == "switch") {
          return val == f;
        }
        if (type == "switcht") {
          if (f == true) return val == f;
        }
        if (_.isEmpty(f)) continue;

        if (_.isArray(f)) {
          if (_.isEmpty(f));
          else if (!f.includes(val)) {
            if (p) console.log(hid, "na array", k, val);
            return false;
          }
        } else {
          let { mi = undefined, mx = undefined } = f;
          val = parseFloat(val);
          if (p) console.log(k, { mi, mx });
          if (mi == undefined && mx == undefined);
          else if (mx !== undefined && val > mx) {
            if (p) console.log(hid, "na mx", k, val);
            return false;
          } else if (mi !== undefined && val < mi) {
            if (p) console.log(hid, "na mi", k, val);
            return false;
          } else if (!_.inRange(val, mi || 1e-5, (mx || 1e5) + 1e-8)) {
            if (p) console.log(hid, "na range", k, val);
            return false;
          }
        }
      }
      // if (p) console.log("###", hid, "valid");
      return true;
    });
    return filt;
  } catch (err) {
    console.log(err);
    return horses;
  }
};
