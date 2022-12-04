import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import { Icon_comp } from "./fixons";
import { geno, getv } from "./utils";

const prop_horses = (horses = []) => {
  let horses_ar = _.values(horses)?.map((e) => {
    let ba_n = parseFloat(e.ba);
    let dp = e.dp;
    if (!dp) dp = `0-null`;
    let [dp_dist, dp_score] = dp.split("-");
    let dp_score_n = parseFloat(dp_score);
    let dp_dist_n = parseFloat(dp_dist) * 100;

    let studs_n = e.is_stud ? 1 : 2;
    let bred_diff = e.diff;
    let is_bred_n = -(e.is_bred ? 2000 - bred_diff : 1000 - bred_diff);
    let studs_left_n = e.studs_left ? e.studs_left : null;

    let gender = ["Stallion", "Colt"].includes(e.horse_type)
      ? "Male"
      : "Female";

    let z = geno(e.genotype);

    return {
      ...e,
      gender,
      z,
      dp_score_n,
      dp_dist_n,
      ba_n,
      is_bred_n,
      bred_diff,
      studs_n,
      studs_left_n,
    };
  });
  return _.keyBy(horses_ar, "hid");
};

export const struct_stable_ssa_data = (qs_ssa) => {
  let all_data = _.map(qs_ssa, "data");
  all_data = _.keyBy(all_data, "stable");
  let all_horses = [];
  let all_finished = [];
  let all_scheduled = [];
  for (let [stable, ssa] of _.entries(all_data)) {
    let { horses, finished, scheduled } = ssa;
    horses = _.compact(horses).map((e) => ({ ...e, stable })) ?? [];
    finished = _.compact(finished).map((e) => ({ ...e, stable })) ?? [];
    scheduled = _.compact(scheduled).map((e) => ({ ...e, stable })) ?? [];
    all_horses.push(horses);
    all_finished.push(finished);
    all_scheduled.push(scheduled);
  }
  all_horses = _.flatten(all_horses);
  all_horses = _.keyBy(all_horses, "hid");
  all_finished = _.flatten(all_finished);
  all_scheduled = _.flatten(all_scheduled);

  all_horses = prop_horses(all_horses);

  return {
    horses: all_horses,
    finished: all_finished,
    scheduled: all_scheduled,
  };
};

export const bg_hex_stable = (stable) => {
  let hex = stable.slice(stable.length - 6);
  return `#${hex}`;
};

const sort_fn = (i, path, type = "txt") => {
  let a = getv(i, path);
  if (!a) return -1e10;
  if (type == "n") return +_.toNumber(a);
  else return a;
};
const get_sort_sign = (sort) => {
  if (!sort) return -1;
  return sort[0] == "+" ? +1 : -1;
};
const sort_btn_click = (k, sort) => {
  if (!sort) return `+${k}`;
  if (sort.slice(1) == k) {
    return sort[0] == "+" ? `-${k}` : `+${k}`;
  } else return `+${k}`;
};

export const horses_sort_ob = {
  hid: { disp: "HorseID", fn: (i) => sort_fn(i, "hid", "n"), type: "n" },
  name: { disp: "Name", fn: (i) => sort_fn(i, "name", "txt"), type: "txt" },
  rating: { disp: "Rating", fn: (i) => sort_fn(i, "rating", "n"), type: "n" },
  rng: { disp: "RNG", fn: (i) => sort_fn(i, "rng", "n"), type: "n" },
  ba: { disp: "BA", fn: (i) => sort_fn(i, "ba_n", "n"), type: "n" },
  dp_score: { disp: "DP", fn: (i) => sort_fn(i, "dp_score_n", "n"), type: "n" },
  dp_dist: { disp: "Dist", fn: (i) => sort_fn(i, "dp_dist_n", "n"), type: "n" },
  br: { disp: "br", fn: (i) => sort_fn(i, "br", "n"), type: "n" },
  stud: { disp: "stud", fn: (i) => sort_fn(i, "studs_n", "n"), type: "n" },
  studs_left: {
    disp: "left",
    fn: (i) => sort_fn(i, "studs_left_n", "n"),
    type: "n",
  },
  is_bred: {
    disp: "is_bred",
    fn: (i) => sort_fn(i, "is_bred_n", "n"),
    type: "n",
  },
  breed_days: {
    disp: "days",
    fn: (i) => sort_fn(i, "bred_diff", "n"),
    type: "n",
  },
};
export const HorsesSortHead = ({ sorts = [], k, set_sorts }) => {
  const asc = `+${k}`;
  const desc = `-${k}`;
  const active =
    !_.isEmpty(sorts) && (sorts.includes(asc) || sorts.includes(desc));

  let cn = `mx-0.5 cursor-pointer `;
  if (!active)
    return (
      <span onClick={() => set_sorts([asc, ...sorts])} className={`${cn}`}>
        {horses_sort_ob[k]?.disp || k}
      </span>
    );
  const sort = sorts.find((i) => i.slice(1) == k);
  const sign = sort == asc ? +1 : -1;
  const next = sort == asc ? desc : asc;
  const icon = active ? (sign == +1 ? faArrowDown : faArrowUp) : null;
  cn += active ? "text-pink-500" : "";
  return (
    <span
      className={`${cn}`}
      onDoubleClick={() =>
        set_sorts((sorts || []).filter((e) => ![asc, desc].includes(e)))
      }
      onClick={() =>
        set_sorts([next, ...(sorts || []).filter((e) => e !== sort)])
      }
    >
      {horses_sort_ob[k]?.disp || k}
      {icon && <Icon_comp {...{ icon }} />}
    </span>
  );
  return <></>;
};

export const sort_horses = ({ horses, sorts, filters = {} }) => {
  try {
    let hids = _.map(horses, "hid");
    let horses_ar = _.values(horses);
    if (!_.isEmpty(filters)) {
      horses_ar = _.filter(horses_ar, (i) => {
        for (let [idd, { type, vals, path }] of _.entries(filters)) {
          if (_.isEmpty(vals)) continue;
          if (type == "range") {
            let { mi = -1e14, mx = 1e14 } = vals;
            console.log(idd, mi, mx, getv(i, path));
            if (!_.inRange(getv(i, path), mi, mx + 1e-8)) return false;
          }
          if (type == "options") {
            let actives = vals;
            if (_.isEmpty(actives));
            else if (!actives.includes(getv(i, path))) return false;
          }
        }
        return true;
      });
    }
    if (!_.isEmpty(sorts)) {
      horses_ar = _.chain(horses_ar)
        .sortBy(
          [...sorts].map((sort) => (i) => {
            let sign = get_sort_sign(sort);
            let k = sort.slice(1);
            let fn = horses_sort_ob[k]?.fn || null;
            let a = fn ? fn(i) : 0;
            return sign * a;
          })
        )
        .value();
    }
    hids = _.map(horses_ar, "hid");
    return hids;
  } catch (err) {
    console.log(err);
    return _.map(horses, "hid");
  }
};

export const gen_horses_profit_ob = (qstables) => {
  let ob = {};
  for (let so of qstables) {
    if (so.status !== "success") continue;
    so = so.data.horses;
    for (let o of so) {
      let { hid, races_n, profit, avg_fee, avg_profit } = o || {};
      ob[hid] = {
        hid,
        races_n,
        profit,
        avg_fee,
        avg_profit,
      };
    }
  }
  return ob;
};
