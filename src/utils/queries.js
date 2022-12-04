import { fget, fpost } from "./fetch";
import { backend, test_mode } from "../App";
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
