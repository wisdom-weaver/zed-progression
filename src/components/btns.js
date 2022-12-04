import { twMerge } from "tailwind-merge";

import ended_btn from "../static/btns/ended.png";
import flash_btn from "../static/btns/flash.png";
import help_btn from "../static/btns/help.png";
import join_btn from "../static/btns/join.png";
import leaderboard_btn from "../static/btns/leaderboard.png";
import live_btn from "../static/btns/live.png";
import open_btn from "../static/btns/open.png";
import signup_btn from "../static/btns/signup.png";
import stable_btn from "../static/btns/stable.png";
import upcoming_btn from "../static/btns/upcoming.png";

const btn_map = {
  help: help_btn,
  ended: ended_btn,
  flash: flash_btn,
  help: help_btn,
  join: join_btn,
  leaderboard: leaderboard_btn,
  live: live_btn,
  open: open_btn,
  signup: signup_btn,
  stable: stable_btn,
  upcoming: upcoming_btn,
};
const BtnWrap = ({ redirect, img, size, ...props }) => {
  let cn = size == "lg" ? "h-[3.5rem]" : "h-[2rem]";
  return (
    <a {...(redirect ? { href: redirect, target: "_blank" } : {})}>
      <div {...props} className={twMerge(cn, props.className)}>
        <img className="img-obey" src={img} />
      </div>
    </a>
  );
};

export const Btn = ({ k, ...props }) => {
  return <BtnWrap {...{ img: btn_map[k], props }} />;
};
export const BtnLg = ({ k, ...props }) => {
  return <BtnWrap {...{ size: "lg", img: btn_map[k], props }} />;
};
