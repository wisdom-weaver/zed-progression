import { twMerge } from "tailwind-merge";
import {
  faArrowUp,
  faBolt,
  faCheck,
  faChild,
  faDollarSign,
  faDumbbell,
  faSpinner,
  faTachometerAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { contrastColor } from "contrast-color";
import _ from "lodash";
import {
  bg_code_cn_ob,
  get_ba_cn,
  get_dp_cn,
  get_rng_cn,
} from "../utils/color_codes";
import ficons, { Icon_comp } from "../utils/fixons";
import { bg_hex_stable } from "../utils/logic";
import {
  dec,
  d_from,
  geno,
  getv,
  mini_breed_type,
  nano,
  pad,
} from "../utils/utils";
import { set_state_ob_inp } from "../utils/input";
import { useContext } from "react";
import { NowContext } from "../App";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Img = ({ box = 30, h, w, img, ...props }) => {
  if (!h && !w) h = w = box;
  return (
    <div
      {...props}
      style={{
        height: h,
        width: w,
      }}
      className={twMerge(`img-icon-cont`, props.className)}
    >
      <img className={props.img_cn || ""} src={img} alt="" />
    </div>
  );
};

export const Tag = (props) => {
  let pointer = props.onClick || props.redirect ? "cursor-pointer" : "";
  return (
    <a
      {...(props.redirect
        ? {
            href: props.redirect,
            target: props.target ?? "_blank",
          }
        : {})}
      {...{
        className: props.acn ?? "",
      }}
    >
      <div
        {...props}
        style={{ ...props.style }}
        className={`
          xs:text-[10px] sm:text-xs md:text-base
          xs:px-1 md:px-2
          xs:py-0.5 md:py-1
          rounded-md 
          ${pointer} 
          ${props.className}
          ${props?.active === false ? "bg-opacity-25" : ""}
        `}
      >
        {props.children}
      </div>
    </a>
  );
};

export const Runh = ({ box = 60, color = "white" }) => {
  let svg = (
    <svg
      style={{ display: "inline-block" }}
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      width="1280.000000pt"
      height="650.000000pt"
      viewBox="0 0 1280.000000 650.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <metadata>
        Created by potrace 1.15, written by Peter Selinger 2001-2017
      </metadata>
      <g
        transform="translate(0.000000,650.000000) scale(0.100000,-0.100000)"
        fill={color}
        stroke="none"
      >
        <path d="M10965 6338 c-202 -162 -294 -208 -423 -208 -132 0 -223 52 -318 180 -32 44 -64 80 -71 80 -11 0 -35 -63 -48 -127 -6 -28 -11 -33 -35 -33 -15 0 -45 7 -66 16 -31 13 -61 15 -144 11 -111 -6 -170 -20 -170 -43 0 -7 16 -16 38 -20 49 -9 136 -50 158 -75 26 -29 8 -53 -42 -57 -34 -2 -135 21 -186 43 -14 6 -18 2 -18 -16 0 -17 22 -45 71 -90 59 -56 70 -71 67 -95 -3 -25 -9 -29 -63 -41 -132 -29 -220 -39 -280 -31 -56 8 -158 42 -179 60 -15 12 -36 10 -36 -4 0 -6 34 -46 75 -89 41 -42 75 -81 75 -87 0 -13 -71 -34 -207 -61 -116 -24 -156 -26 -219 -10 -38 10 -48 9 -61 -4 -14 -14 -13 -18 14 -46 17 -16 41 -32 54 -35 89 -17 164 -38 175 -47 24 -20 16 -46 -18 -59 -18 -6 -49 -18 -68 -26 -60 -24 -211 -45 -313 -43 -54 1 -100 -1 -104 -4 -12 -13 8 -37 44 -55 21 -10 72 -25 113 -32 144 -24 154 -42 53 -92 -66 -32 -72 -33 -227 -38 -102 -3 -161 -9 -163 -16 -2 -6 16 -24 39 -39 83 -55 158 -116 158 -131 0 -7 -19 -27 -42 -44 -36 -26 -49 -30 -109 -30 -37 0 -102 5 -143 11 -131 18 -126 -2 24 -97 60 -38 112 -77 116 -87 19 -55 -171 -147 -274 -133 -26 4 -68 12 -95 18 -73 18 -80 0 -18 -52 68 -57 66 -71 -11 -96 -48 -14 -92 -19 -188 -19 l-125 0 -41 -79 c-46 -90 -67 -109 -168 -159 -93 -47 -174 -73 -297 -97 -85 -17 -142 -20 -367 -20 -275 0 -390 9 -622 51 -122 22 -256 52 -330 74 -25 7 -106 30 -180 50 -74 20 -155 43 -180 50 -118 35 -252 66 -395 89 -44 8 -118 28 -165 45 l-85 32 -270 -5 c-279 -5 -418 -20 -615 -65 -146 -34 -211 -44 -259 -38 -44 5 -168 51 -276 102 -327 152 -425 194 -565 237 -106 32 -290 32 -405 -1 -138 -40 -451 -148 -520 -181 -11 -5 -38 -16 -60 -24 -22 -7 -85 -30 -140 -50 -266 -97 -334 -114 -399 -97 -65 16 -112 14 -155 -9 -38 -19 -56 -43 -45 -61 3 -5 31 -20 62 -35 31 -14 71 -31 87 -39 17 -8 59 -26 95 -40 36 -14 74 -30 85 -35 31 -15 105 -40 165 -57 41 -11 78 -13 151 -8 112 8 124 0 88 -65 -33 -58 -24 -66 86 -80 253 -31 397 2 644 148 181 107 228 130 352 166 138 40 372 -3 486 -90 46 -35 43 -63 -14 -126 -161 -179 -320 -384 -365 -473 -60 -117 -116 -381 -138 -653 -27 -333 -66 -430 -193 -491 -136 -65 -453 -89 -778 -60 -154 14 -171 9 -212 -71 -100 -193 -264 -439 -412 -617 -122 -147 -384 -407 -532 -527 -128 -104 -136 -115 -148 -206 -13 -92 -48 -183 -87 -222 -50 -50 -82 -50 -129 -2 -46 49 -65 54 -124 37 -81 -24 -119 -48 -231 -145 -119 -103 -140 -130 -149 -199 -9 -65 4 -87 58 -93 23 -2 94 -12 157 -20 182 -25 222 -22 299 20 134 74 313 240 697 651 509 542 737 733 881 736 88 2 115 -42 90 -148 -46 -194 -309 -615 -481 -771 l-56 -51 0 -124 c0 -68 -4 -129 -8 -135 -4 -6 -21 -19 -39 -28 -42 -21 -74 -9 -122 46 -67 75 -101 58 -318 -156 -106 -104 -153 -156 -153 -172 0 -28 47 -56 141 -85 61 -19 87 -21 173 -16 96 6 190 28 246 58 60 33 103 70 243 208 102 101 154 160 168 191 11 25 28 54 38 65 11 11 42 65 71 120 29 55 71 134 93 175 22 41 64 122 94 180 113 216 192 321 313 415 185 144 549 211 909 169 72 -8 253 21 347 56 128 48 194 93 379 260 218 196 260 228 357 273 76 36 212 67 293 67 79 0 229 -34 365 -83 174 -63 212 -80 605 -267 168 -80 199 -94 265 -120 30 -12 66 -26 80 -32 26 -10 126 -44 215 -71 28 -9 97 -26 155 -38 95 -21 129 -23 345 -21 132 1 317 6 410 12 94 6 292 15 440 20 149 5 380 15 515 21 220 11 255 10 345 -5 103 -17 117 -21 315 -80 227 -68 234 -70 313 -50 77 19 178 15 347 -12 124 -21 459 -20 640 0 153 18 341 33 510 42 l115 6 60 -52 c33 -29 61 -59 63 -66 2 -7 -3 -25 -11 -41 -8 -15 -18 -76 -22 -137 -7 -104 -9 -113 -55 -203 -75 -145 -77 -154 -46 -217 30 -61 32 -79 11 -96 -18 -15 -81 -5 -139 21 -66 30 -84 25 -142 -36 -56 -59 -154 -211 -203 -314 -46 -98 -35 -103 158 -76 309 45 443 149 603 465 70 137 76 162 49 196 -27 34 -26 48 3 106 13 25 28 60 34 77 17 47 42 39 120 -38 151 -150 375 -484 396 -590 7 -39 22 -61 42 -61 8 0 44 -14 81 -32 113 -53 203 -163 228 -278 16 -72 67 -124 156 -161 48 -20 76 -23 250 -26 223 -5 239 -2 239 52 0 44 -36 78 -104 100 -28 9 -67 26 -86 38 -87 52 -290 277 -481 532 -185 246 -533 760 -657 970 l-41 70 6 120 c6 115 -2 197 -27 286 -12 41 -27 48 -190 88 -287 69 -238 65 -645 57 -381 -7 -477 -2 -562 31 -51 19 -51 22 -24 161 32 161 41 289 41 592 0 317 12 469 41 536 12 26 44 65 84 100 53 47 66 64 75 103 6 25 20 80 31 121 11 41 27 98 34 125 7 28 27 92 44 144 17 52 31 99 31 104 0 28 97 221 164 326 28 44 71 112 94 150 71 114 61 112 198 42 66 -33 155 -76 199 -96 198 -92 325 -160 383 -206 63 -50 125 -133 138 -183 8 -33 37 -54 149 -107 66 -32 92 -40 104 -32 9 5 30 39 48 75 17 36 36 69 42 72 6 4 32 -4 59 -18 l48 -24 31 19 c17 11 35 32 41 47 34 90 86 271 86 296 0 39 -72 143 -336 483 -247 319 -319 417 -316 432 2 8 19 19 38 24 61 15 64 25 24 92 -20 33 -49 89 -65 125 -28 61 -34 68 -107 110 -98 58 -116 87 -97 163 8 29 23 78 35 110 30 84 19 90 -74 46 -22 -11 -48 -19 -59 -19 -17 0 -19 5 -11 48 12 74 10 96 -6 99 -8 1 -82 -52 -165 -119z" />
      </g>
    </svg>
  );
  return (
    <div
      style={{
        height: box,
        width: box,
      }}
      className="img-icon-cont"
    >
      {svg}
    </div>
  );
};

export const LoadingTag = () => (
  <div className="w-full">
    <Tag className="mx-auto w-max text-center bg-blue-400">loading...</Tag>
  </div>
);
export const LoadingTxt = () => (
  <Tag className="mx-2 text-blue-400">loading...</Tag>
);
export const ErrrorTag = () => (
  <Tag className="mx-auto w-max text-center bg-red-500">error</Tag>
);

export const TimeLeft = ({ now, date }) => {
  let n = nano(date);
  let txt;
  let cn;
  let off = (n - now) / 1000;
  if (off <= -2.5 * 60 * 1000) {
    txt = "Finished";
    cn = "text-blue-400";
  } else if (off <= 0) {
    txt = "LIVE";
    cn = "text-yellow-400";
  } else {
    let hh = parseInt((off / (24 * 60)) % 60);
    let mm = parseInt((off / 60) % 60);
    let ss = parseInt(off % 60);
    txt = `${hh}h ${mm}m ${ss}s`;
    cn = "text-green-500";
  }
  return <Tag className={cn}>{txt}</Tag>;
};
export const Position = ({ position }) => {
  let cn = "w-12 text-center";
  if (position == 1) cn += " bg-yellow-400 text-black";
  if (position == 2) cn += " bg-orange-400";
  if (position == 3) cn += " bg-green-400";
  if (_.inRange(position, 4, 6.1)) cn += " bg-slate-400";
  if (_.inRange(position, 7, 12.1)) cn += " bg-pink-400";
  let txt =
    (position == 1 && `1st`) ||
    (position == 2 && `2nd`) ||
    (position == 3 && `3rd`) ||
    `${position}th`;
  return <Tag className={`${cn}`}>{txt}</Tag>;
};

export const Flame = ({ flame }) => {
  let cn = "";
  if (flame == 1) cn += "";
  else cn += "opacity-0";

  return (
    <Tag className={cn}>
      <ficons.flame />
    </Tag>
  );
};

const mini_stable = (stable, n = 3) => {
  // let a = stable.slice(0,n)
  let b = stable.slice(stable.length - n);
  return `..${b}`;
  // let a = stable.slice(0,n)
  // let b = stable.slice(stable.length-n)
  // return `${a}...${b}`
};

export const StableMini = ({ stable }) => {
  const bg = bg_hex_stable(stable);
  const color = contrastColor({ bgColor: bg });
  const st = mini_stable(stable);
  return (
    <Tag
      key={stable}
      style={{ background: bg, color }}
      className={`cursor-pointer flex flex-row justify-center items-center px-2 py-0`}
    >
      {st}
    </Tag>
  );
};

export const Tick = ({ n }) => {
  const c =
    n == 0 || _.isNaN(n)
      ? "text-yellow-500"
      : n < 0
      ? "text-red-500"
      : "text-green-500";
  return (
    <span className={`${c} rounded-md px-1`}>
      <span>
        <Icon_comp icon={faDollarSign} />
      </span>
      <span>{dec(n, 2)}</span>
    </span>
  );
};

export const RNG_Tag = ({ rng, redirect }) => (
  <Tag redirect={redirect} className={`${get_rng_cn(rng)}`}>
    <Icon_comp {...{ icon: faBolt }} />
    {dec(rng, 3)}
  </Tag>
);

export const DP_Tag = ({ dp, redirect }) => (
  <Tag redirect={redirect} className={`${get_dp_cn(dp)} flex flex-row`}>
    <Runh {...{ box: 25, c: "white" }} />
    {dp}
  </Tag>
);
export const DP4_Tag = ({ dp4, redirect }) => {
  const dp = `${dp4?.dist / 100}-${dec(dp4.dp, 3)}`;
  return (
    <Tag redirect={redirect} className={`${get_dp_cn(dp)} flex flex-row`}>
      <Runh {...{ box: 25, c: "white" }} />
      {dp}
    </Tag>
  );
};

export const BA_Tag = ({ ba, redirect }) => {
  // if (ba.toString().includes(" A"));
  // else ba = dec(ba, 3);
  return (
    <Tag redirect={redirect} className={`${get_ba_cn(ba)} text-left`}>
      <Icon_comp {...{ icon: faDumbbell }} />
      {ba}
    </Tag>
  );
};
export const BR_Tag = ({ br: val, redirect }) => {
  let code = "y";
  if (!val) {
    val = "na";
    code = "bk";
  } else val = dec(val, 3);
  const icon = faArrowUp;
  const cn = bg_code_cn_ob[code];
  return (
    <Tag redirect={redirect} className={`${cn} text-left`}>
      <Icon_comp {...{ icon }} />
      {val}
    </Tag>
  );
};

export const Speed_Tag = ({ speed: val, redirect }) => {
  let code = "g";
  if (!val) {
    val = "na";
    code = "bk";
  } else val = dec(val, 3);
  const icon = faTachometerAlt;
  const cn = bg_code_cn_ob[code];
  return (
    <Tag redirect={redirect} className={`${cn} text-left`}>
      <Icon_comp {...{ icon }} />
      {val}
    </Tag>
  );
};
export const YMCA_Tag = ({ ymca5: val, redirect }) => {
  let code = "b";
  if (!val) {
    val = "na";
    code = "bk";
  } else val = dec(val, 3);
  const icon = faChild;
  const cn = bg_code_cn_ob[code];
  return (
    <Tag redirect={redirect} className={`${cn} text-left`}>
      <Icon_comp {...{ icon }} />
      {val}
    </Tag>
  );
};

export const Det_Tag = ({ bloodline, breed_type, genotype, redirect }) => {
  const bl = bloodline.slice(0, 1);
  let bt = mini_breed_type(breed_type);
  const z = geno(genotype);
  return (
    <Tag redirect={redirect} className={"bg-black flex flex-row"}>
      <div className="px-0.5">{bl}</div>
      <div className="px-0.5">{bt}</div>
      <div className="text-right px-0.5 w-[2rem]">{z}</div>
    </Tag>
  );
};

export const HTag = ({ hdata }) => {
  return <></>;
};

export const Card = (props) => {
  return (
    <>
      <div
        className={twMerge(
          `rounded-md p-3 m-1 mb-2 ${props.bg || "bg-tb5"}`,
          props.className
        )}
      >
        {props.children}
      </div>
    </>
  );
};

export const PageTitle = ({ title }) => {
  return <Tag className="text-2xl text-center text-tb3 text-bold">{title}</Tag>;
};

export const BarHead = ({ title, ...props }) => {
  return (
    <div
      {...props}
      className={twMerge(
        `w-full flex flex-row items-center text-lg font-bold text-tb2`,
        props.className
      )}
    >
      <span className="m-1 px-1">{title}</span>
      <div className="flex-1">
        <hr className="border-tb2 border-2 rounded-md" />
      </div>
    </div>
  );
};

export const CBarHead = ({ title, ...props }) => {
  return (
    <div
      {...props}
      className={twMerge(
        `w-full flex flex-row items-center text-lg font-bold text-tb2`,
        props.className
      )}
    >
      <div className="flex-1">
        <hr className="border-tb2 border-2 rounded-md" />
      </div>
      <span className="m-1 px-1">{title}</span>
      <div className="flex-1">
        <hr className="border-tb2 border-2 rounded-md" />
      </div>
    </div>
  );
};

export const LoadingAnim = (props) => {
  let className = twMerge(
    `w-full h-full max-h-[25rem] overflow-hidden`,
    props.className
  );
  let src =
    "https://assets.materialup.com/uploads/d897134f-48d1-4302-b3fd-ea045f3d4151/preview.gif";
  return (
    <div {...props} className={className}>
      <img src={src} alt="loading..." className="img-obey rounded-md" />
    </div>
  );
};

export const ITag = ({ icon, ...props }) => {
  const className = twMerge("flex flex-row justify-start items-center", props.className);
  return (
    <Tag {...props} className={className}>
      <Icon_comp icon={icon} />
      {props.children}
    </Tag>
  );
};

export const rem_time = (date) => {
  const now = Date.now();
  date = nano(date);
  let rem = date > now ? date - now : 0;
  return rem;
};

const mt = 60 * 1000;
export const Timer = ({ date, hot = 20 * mt }) => {
  const { now } = useContext(NowContext);
  date = nano(date);
  let rem = date > now ? date - now : 0;
  let cn = rem < hot ? "text-red-400" : "text-green-400";
  rem = rem / 1000;
  let s = parseInt(rem % 60);
  rem = rem / 60;
  let m = parseInt(rem % 60);
  rem = rem / 60;
  let h = parseInt(rem % 24);
  rem = rem / 24;
  let d = parseInt(rem);
  let ar = [
    [d, "d"],
    [h, "h"],
    [m, "m"],
    [s, "s"],
  ];
  let st = false;
  return (
    <Tag className={`ffr m-1 px-2  ${cn}`}>
      {ar.map(([val, txt]) => {
        if (st == false) st = val > 0;
        if (st == true)
          return <span className="px-0.5">{`${pad(val)}${txt}`}</span>;
      })}
    </Tag>
  );
};

export const TimerAd = ({ date, ...props }) => {
  const { now } = useContext(NowContext);
  date = nano(date);
  let rem = date > now ? date - now : 0;
  return rem > 0 ? (
    <Timer {...{ date, ...props }} />
  ) : (
    <Tag className={"text-tb3"}>{d_from(date)}</Tag>
  );
};

export const TdTag = (props) => {
  return (
    <td>
      <Tag {...props} />
    </td>
  );
};

const status_ob = {
  "-1": [faTimes, "text-red-500  border-red-500", "failed"],
  0: [faSpinner, "text-blue-400  border-blue-400", "processing"],
  1: [faCheck, "text-green-400   border-green-400", "paid"],
};

export const PayStatus = ({ status_code, ...props }) => {
  // if (!_.includes(_.keys(status_ob), status_code)) return <></>;
  const [i, cn, txt] = status_ob[status_code] || ["err", "bg-black"];
  return (
    <Tag {...props} className={twMerge("border-2", cn, props.className)}>
      {txt}
    </Tag>
  );
};

export const ErrText = ({ err, ...props }) => {
  if (!err) return <></>;
  return (
    <Tag {...props} className={twMerge("text-red-400 px-2", props.className)}>
      {err}
    </Tag>
  );
};

export const CostTag = ({ cost = null, token = "", cost_n = 4, ...props }) => {
  cost = cost !== null ? dec(cost, cost_n) : "na";
  return (
    <Tag {...props} className={twMerge("px-1 text-green-400", props.className)}>
      <span className="px-0.5 min-w-[3.5rem] text-right">{cost}</span>
      {token && <span className="mx-2 text-green-600">{token}</span>}
    </Tag>
  );
};
export const Cost2Tag = ({ cost = null, token = "", ...props }) => {
  cost = cost !== null ? dec(cost, 2) : "na";
  return (
    <Tag {...props} className={twMerge("px-1 text-green-400", props.className)}>
      <FontAwesomeIcon icon={faDollarSign} />
      <span className="px-0.5 min-w-[3.5rem] text-right">{cost}</span>
      {token && <span className="mx-2 text-green-600">{token}</span>}
    </Tag>
  );
};

export const RespITag = ({ icon, ...props }) => {
  const className = twMerge("flex-row", props.className);
  return (
    <Tag {...props} className={className}>
      <Icon_comp icon={icon} />
      {props.children}
    </Tag>
  );
};

export const ToolTip = ({ children, message }) => {
  return (
    <div className="relative flex flex-col items-center group cursor-pointer">
      {children}
      <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
        <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">
          {message}
        </span>
        <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-600"></div>
      </div>
    </div>
  );
};
export const TokenZed = (props) => (
  <Img
    {...props}
    w="100%"
    h="auto"
    img="https://zedtoken.com/wp-content/uploads/elementor/thumbs/ZedCoin64-poel8blmegmbxpr736gpobhugqnhs72pz58ubhfx4k.png"
    className={props.className}
  />
);

export const TokenWETH = (props) => (
  <Img
    {...props}
    w="100%"
    h="auto"
    img="https://dappimg.com/media/image/token/a412fe82bd2c11eb8d1e0242ac130005.png"
    className={props.className}
  />
);

export const TokCostTag = ({ token, cost, n, tclassname, textclassname }) => {
  if (_.isNil(n)) {
    if (token == "USD") n = 2;
    if (token == "ZED") n = 2;
    if (token == "WETH") n = 4;
  }
  return (
    <div className="flex flex-row gap-1 items-center">
      <span className={twMerge("font-bold font-mono", textclassname)}>
        {dec(cost, n)}
      </span>
      <div className={tclassname}>
        {token == "USD" && <FontAwesomeIcon icon={faDollarSign} />}
        {token == "ZED" && <TokenZed />}
        {token == "WETH" && <TokenWETH />}
      </div>
    </div>
  );
};
