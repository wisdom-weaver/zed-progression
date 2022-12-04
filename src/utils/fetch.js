import _ from "lodash";

export const fget = (api, d = null, exheaders = {}) =>
  fetch(api, {
    method: "GET",
    headers: { "Content-Type": "application/json", ...exheaders },
  }).then((r) => r.json());
export const fpost = (api, data, exheaders = {}) =>
  fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...exheaders },
    body: JSON.stringify(data),
  })
    .then((r) => r.json())
    .catch((err) => err.message);

export const fpostr = (api, data, exheaders = {}) =>
  fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...exheaders },
    body: JSON.stringify(data),
  }).then((r) => r);
