import { bcn } from "./cn";
import { faBank, faHome } from "@fortawesome/free-solid-svg-icons";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faHorse } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

export const get_links_ob = (tid, op=50) => {
  const b = (c) => bcn(`${c}-${op}`);
  let ar = [
    ["/:tid", "Home", faHome, b("b")],
    ["/leaderboard/:tid", "Leaderboard", faTrophy, b("y6")],
    ["/signup/:tid", "SignUp", faArrowUp, b("p")],
    ["/stable/:tid", "Stable", faHorse, b("r4")],
    ["/admin/tourney/:tid", "Ad.Home", faHome, b("bk")],
    ["/admin/tourney/:tid/edit", "Ad.Edit", faPencil, b("y5")],
    ["/admin/tourney/:tid/transactions", "Ad.Txns", faBank, b("g")],
    ["/admin/tourney/:tid/payout", "Ad.Payout", faSignOut, b("pr")],
  ];
  ar.forEach((e) => {
    e[0] = e[0].toString().replace(":tid", tid);
  });
  return ar;
};
