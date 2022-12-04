import { fget, fpost } from "./fetch";
import { test_mode } from "../App";
import {
  cookie_test,
  create_cookie,
  dummy,
  dummy_exists,
  dummy_profit,
  dummy_profit_exists,
  find_cookie,
  rcount_test_data,
  stable_test_data,
} from "./test_data";
import _ from "lodash";
import { getv, jparse, jstr } from "./utils";
import consts from "./consts";
import qs from "query-string";
import { useEffect } from "react";

const backend = // `https://bszedapi.stackednaks.com`;
  true && process.env.NODE_ENV == "development"
    ? `http://localhost:3005`
    : `https://bszedapi.stackednaks.com`;
const base = `${backend}/progression`;

export const q_hdata_dur = (doc, ext = {}) => {
  return {
    queryKey: ["q_hdata_dur", jstr(doc)],
    queryFn: () => {
      return fpost(`${base}/hdata_dur`, doc);
    },
    staleTime: 1e14,
    ...ext,
  };
};
