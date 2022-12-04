const family = (hid, key) => `https://zed-family-v5.vercel.app/?hid=${hid}`;
const opensea = (hid) =>
  `https://opensea.io/assets/matic/0x67f4732266c7300cca593c814d46bee72e40659f/${hid}`;
const kyh = (hid) => `https://knowyourhorses.com/horses/${hid}`;
const zed = (hid) => `https://zed.run/racehorse/${hid}`;
const overall = (hid, key) => `https://zed-overall.vercel.app/?hid=${hid}`;
const leader = () => `https://bd-zed-leaderboard.vercel.app/`;
const zed_mate = (hid) => `https://zed.run/${hid}/select-mate`;
const ymca_table = `https://zed-ymca2-table.vercel.app/`;
const sn_color = `https://www.stackednaks.com/colorpair`;
const zed_stable = (slug) => `https://zed.run/stable/${slug}`;
const sn = (hid) => `https://www.stackednaks.com/horse/${hid}`;
const details = (hid) => `https://zed-horse-details.vercel.app/?hid=${hid}`;
const hawkuh = (h) => `https://www.hawku.com/horse/${h}`;

const race = (rid) => `https://zed.run/race/${rid}`;
const kyh_race = (rid) => `https://knowyourhorses.com/races/${rid}`;
const results = (rid) => `https://zed-race-results.vercel.app/?rid=${rid}`;
const links_fn = {
  family,
  opensea,
  kyh,
  zed,
  overall,
  leader,
  zed_mate,
  race,
  kyh_race,
  sn,
  details,
  results,
  zed_stable,
  hawkuh,
};

const links = (hid) => {
  return {
    family: family(hid),
    opensea: opensea(hid),
    kyh: kyh(hid),
    zed: zed(hid),
    overall: overall(hid),
    leader: leader(hid),
    zed_mate: zed_mate(hid),
    details: details(hid),
    ymca_table,
    sn_color,
    zed_stable,
    race,
    kyh_race,
  };
};

const lob = { links, links_fn };

export default lob;
export const zlead_h = (a) => `https://zlead.vercel.app/horses/${a}`;
export const zlead_r = (a) => `https://zlead.vercel.app/race/${a}`;
export const zlead_s = (a) => `https://zlead.vercel.app/stable/${a}`;
