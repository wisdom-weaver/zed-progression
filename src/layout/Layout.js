import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation, useParams } from "react-router";
import { Icon_comp } from "../utils/fixons";
import {
  faBullseye,
  faFile,
  faHome,
  faMagnet,
  faPerson,
  faSitemap,
  faUser,
  faUserAlt,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { compose } from "redux";
import { useQueries, useQuery } from "react-query";
import { qs_zlead } from "../utils/queries";
import { getv, jstr } from "../utils/utils";
import zicon from "../static/svg/ztlogo.svg";
import { Img, Tag } from "../components/comps";
import { HID_Input, Input } from "../utils/input";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppContext } from "../App.js";

const links_common = [["/", "Explore", faHome, null]];

const DisplayLink = ({ to, txt, icon, ic = `text-tb3` }) => {
  return (
    <div className="flex flex-row text-tb3 hover:tracking-[0.15rem] ease-in items-center cursor-pointer">
      <Icon_comp icon={icon} c={ic} />
      <div className="flex-1">
        <p className="px-2">
          <Link to={to}>{txt}</Link>
        </p>
      </div>
    </div>
  );
};

const ZIcon = () => {
  return (
    <div
      className={`
      mx-2 my-4 w-[5rem] h-[2rem]
      md:mx-4 md:my-4 md:w-[15rem] md:h-[3rem]
      lg:mx-4 lg:my-4 lg:w-[15rem] lg:h-[5rem]
    `}
    >
      <img className="img-obey" src={zicon} alt="" />
    </div>
  );
};

const Nav = () => {
  const acon = useAppContext();
  const history = useNavigate();
  const location = useLocation();
  const [hid, set_hid] = useState(undefined);
  useEffect(() => {
    if (hid !== undefined) history(`/horses/${hid}`);
  }, [hid]);
  return (
    <div className="flex flex-row items-center">
      <div
        className="cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          if (e.nativeEvent.altKey == true)
            window.open("https://zed-tourney.vercel.app/admin");
          else history("/");
        }}
      >
        <motion.div
          className="bg-transparent rounded-lg"
          initial={{ opacity: 0.1, x: "-550px" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.1,
            duration: 0.3,
            type: "spring",
          }}
        >
          <ZIcon />
        </motion.div>
      </div>
      <div className="flex-1"></div>
      {_.isNil(acon.appdata.user) && (
        <Link to="/signup">
          <motion.div
            initial={{ opacity: 0.1, x: "+550px" }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.1 }}
            className={
              "rounded-lg mr-2 border border-acc_pu p-2 bg-acc_pu text-white flex flex-row justify-center items-center gap-2 text-resp"
            }
          >
            <FontAwesomeIcon icon={faWallet} />
            <span>SignUp</span>
          </motion.div>
        </Link>
      )}
      {!_.isNil(acon.appdata.user) && (
        <motion.div
          initial={{ opacity: 0.1, x: "+550px" }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-row items-center"
        >
          <Link to={`/history/${acon.appdata.user.stable_name}`}>
            <Tag className="mr-2 xs:text-xs md:text-lg rounded-md text-acc_pu px-4 flex flex-row items-center gap-2">
              <FontAwesomeIcon icon={faUserAlt} />
              <span>{getv(acon, "appdata.user.name")}</span>
            </Tag>
          </Link>
          <Tag
            onClick={acon.logout}
            className="mr-2 text-xs rounded-md bg-red-400/40 px-4"
          >
            {"logout"}
          </Tag>
        </motion.div>
      )}
    </div>
  );
};

const SideBar = () => {
  return (
    <div className="sidebar border-r-tt0 border-r">
      {links_common.map(([to, txt, icon, ic], idx) => (
        <DisplayLink key={idx} {...{ to, txt, icon, ic }} />
      ))}
    </div>
  );
};

function Layout(props) {
  const history = useNavigate();
  const location = useLocation();
  const params = useParams();
  return (
    <div className="Layout">
      {true && (
        <div className="nav-container">
          <Nav />
        </div>
      )}
      <div className="flex flex-row overflow-hidden">
        <div className="page-container flex-1 overflow-hidden">
          <div className="page-wrapper max-h-full max-w-full overflow-auto">
            <div className="page mx-auto md:container">{props.children}</div>
            <div className="h-[5rem]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
