import React from "react";

import {
  faArrowUp,
  faCarAlt,
  faChessKnight,
  faChild,
  faClipboard,
  faClipboardList,
  faDollarSign,
  faFire,
  faFlag,
  faFlagCheckered,
  faGenderless,
  faHashtag,
  faTachometerAlt,
  faThumbsDown,
  faTimes,
  faTint,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { get_color } from "./utils";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";

let padding = "1px 1px";
const flame = ({ c }) => (
  <span style={{ padding }}>
    <FontAwesomeIcon color={get_color(c || "fire")} icon={faFire} />
  </span>
);
const blood = ({ c }) => (
  <span style={{ padding }}>
    <FontAwesomeIcon color={get_color(c || "red")} icon={faTint} />
  </span>
);
const horse = ({ c }) => (
  <span style={{ padding }}>
    <FontAwesomeIcon color={get_color(c || "green")} icon={faChessKnight} />
  </span>
);
const trophy = ({ c }) => (
  <span style={{ padding }}>
    <FontAwesomeIcon color={get_color(c || "yellow")} icon={faTrophy} />
  </span>
);

const flag = ({ c }) => (
  <span style={{ padding }}>
    <FontAwesomeIcon
      size="xs"
      color={get_color(c || "yellow")}
      icon={faFlagCheckered}
    />
  </span>
);
const speed = ({ c }) => (
  <span style={{ padding }}>
    <FontAwesomeIcon color={get_color(c || "yellow")} icon={faTachometerAlt} />
  </span>
);
const eth = ({ c }) => (
  <span style={{ padding }}>
    <FontAwesomeIcon color={get_color(c || "green")} icon={faEthereum} />
  </span>
);
const car = ({ c }) => (
  <span style={{ padding }}>
    <FontAwesomeIcon color={get_color(c || "green")} icon={faCarAlt} />
  </span>
);
const clipboard = ({ c }) => (
  <span style={{ padding }}>
    <FontAwesomeIcon color={get_color(c || "green")} icon={faClipboard} />
  </span>
);
const clipboard2 = ({ c }) => (
  <span style={{ padding }}>
    <FontAwesomeIcon color={get_color(c || "green")} icon={faClipboardList} />
  </span>
);
const thumbdown = ({ c }) => (
  <span style={{ padding }}>
    <FontAwesomeIcon color={get_color(c || "green")} icon={faThumbsDown} />
  </span>
);
const usd = ({ c }) => (
  <span style={{ padding }}>
    <FontAwesomeIcon color={get_color(c || "green")} icon={faDollarSign} />
  </span>
);
const kid_logo = ({ c, p }) => (
  <span style={{ padding: p ?? `0px 5px 0px 0px` }}>
    <FontAwesomeIcon color={get_color(c || "pink")} icon={faChild} />
  </span>
);
const base = ({ c, p }) => (
  <span style={{ padding: p ?? `0px 5px 0px 0px` }}>
    <FontAwesomeIcon color={get_color(c || "pink")} icon={faGenderless} />
  </span>
);

const breed = ({ c, p }) => (
  <span style={{ padding: p ?? `0px 5px 0px 0px` }}>
    <FontAwesomeIcon color={get_color(c || "orange")} icon={faArrowUp} />
  </span>
);
const hash = ({ c, p }) => (
  <span style={{ padding: p ?? `0px 5px 0px 0px` }}>
    <FontAwesomeIcon color={get_color(c || "orange")} icon={faHashtag} />
  </span>
);
const close = ({ c, p }) => (
  <span style={{ padding: p ?? `0px 5px 0px 0px` }}>
    <FontAwesomeIcon color={get_color(c || "inherit")} icon={faTimes} />
  </span>
);

const ficons = {
  hash,
  flame,
  blood,
  horse,
  trophy,
  flag,
  speed,
  eth,
  car,
  clipboard,
  clipboard2,
  thumbdown,
  usd,
  kid_logo,
  base,
  breed,
  close,
};

export const Icon_comp = ({ icon, style = {}, ...props }) => {
  return (
    <div
      {...props}
      style={{ ...props.style }}
      className={`p-1 inline-block ${props.className}`}
    >
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};

export default ficons;
