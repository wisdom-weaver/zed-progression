import _ from "lodash";
import { faDiscord, faHashnode } from "@fortawesome/free-brands-svg-icons";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Img, Tag } from "../components/comps.js";
import { InpText } from "../components/comps2.js";
import svgs from "../static/svg/svgstore.js";
import { set_state_ob } from "../utils/input.js";
import { Loader01 } from "../components/anims.js";
import { useAppContext, useNowContext } from "../App.js";
import {
  check_eth_address,
  getv,
  jstr,
  nano,
  set_path,
} from "../utils/utils.js";
import { MotionPage } from "../layout/motion_helper.js";
import { useNavigate } from "react-router";
import { useQueries } from "react-query";
import { q_get_stable_name } from "../utils/queries.js";

const FlashInpVariants = {
  hidden: { opacity: 0 },
  flash: {
    opacity: [1, 1, 1],
    border: [`2px solid red`, `2px solid green`, `2px solid red`],
    transition: { times: [0, 0.5, 1], repeat: Infinity },
  },
  done: {
    opacity: 1,
    border: `1px solid transparent`,
  },
};

export const SignUpBox = ({ redirect }) => {
  const history = useNavigate();
  const acon = useAppContext();
  const [doc, set_doc] = useState({
    stable_address: null,
    discord: null,
  });
  const nc = useNowContext();
  const pageref = useRef({ init: nano() });
  const q_get_stable_name = () => {};
  const q = useQueries([
    q_get_stable_name(
      { wallet: doc.stable_address },
      { enabled: check_eth_address(doc.stable_address) ? true : false }
    ),
  ])[0];
  const name = getv(q, "data.stable_name");
  // useEffect(() => {
  //   console.log(q);
  // }, [q.dataUpdatedAt]);

  const signupaction = () => {
    const userdoc = { ...doc, name };
    userdoc.stable_address = userdoc.stable_address.toLowerCase();
    userdoc.stable_name = userdoc.stable_address.toLowerCase();
    set_path(acon.appdata, acon.set_appdata, "user", userdoc);
    localStorage.setItem("user", jstr(userdoc));
    setTimeout(() => {
      if (redirect == false) {
      } else {
        history(redirect);
      }
    }, 1000);
  };
  useEffect(() => {
    if (!nc.now) return;
    pageref.current.diff = nc.now - pageref.current.init;
    if (pageref.current.diff < 2000) pageref.current.status = "loading";
    else pageref.current.status = "loaded";
    // console.log(nc.now, pageref.current);
  }, [nc.now]);
  let enteridx =
    (pageref.current.status == "loading" && 0) ||
    ["", null, undefined, NaN].includes(doc.stable_address) ||
    (!check_eth_address(doc.stable_address) && 1) ||
    (["", null, undefined, NaN].includes(doc.discord) && 2) ||
    3;
  return (
    <div className="mx-auto max-w-[95%] w-[350px] min-w-[30%]">
      {pageref.current.status == "loading" ? (
        <>
          <div className="h-[6rem]"></div>
          <motion.div
            className="w-[10rem] mx-auto"
            initial={{ opacity: 1, display: "block" }}
            animate={{ opacity: 0, display: "none" }}
            transition={{ delay: 3 }}
          >
            <Loader01 className="mx-auto w-full" />
          </motion.div>
        </>
      ) : (
        <div className="bg-reg p-4 rounded-md mx-auto ">
          <p className="text-center text-2xl mb-1">SignUp</p>
          <div className="p-2 w-[10rem] h-[10rem] mx-auto">
            <img className="img-obey" src={svgs.avatar} />
          </div>
          <div className="mb-2">
            <div className=" m-1 text-center flex flex-row justify-center items-center gap-2">
              <span>Welcome </span>
              {q.status == "loading" && (
                <Loader01 className="w-[1rem] h-[1rem]" />
              )}
              <span className="text-acc_pu font-bold">{name}</span>{" "}
            </div>

            <motion.div
              variants={FlashInpVariants}
              initial={"hidden"}
              animate={
                (enteridx == 0 && "hidden") ||
                (enteridx == 1 && "flash") ||
                (enteridx == 2 && "done") ||
                (enteridx == 3 && "done") ||
                null
              }
              // transition={{ delay: 0.2 }}
              className="rounded-md flex flex-row justify-start items-baseline gap-2 mb-2"
            >
              <InpText
                label={
                  <motion.div
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    contprops={{ className: "bg-transparent" }}
                  >
                    <div className="flex flex-row justify-start items-baseline gap-2 w-full">
                      <FontAwesomeIcon icon={faWallet} />
                      <p className="text-left text-lg">
                        Enter Stable ETH address
                      </p>
                    </div>
                  </motion.div>
                }
                {...{
                  contprops: { className: "w-full" },
                  inpprops: { className: "w-full" },
                  setter: (val) =>
                    set_state_ob(doc, set_doc, "stable_address", val),
                }}
              />
            </motion.div>
            {!_.isNil(doc.stable_address) &&
              !["", NaN].includes(doc.stable_address) && (
                <motion.div
                  variants={FlashInpVariants}
                  initial={"hidden"}
                  animate={
                    (enteridx == 0 && "hidden") ||
                    (enteridx == 1 && "hidden") ||
                    (enteridx == 2 && "flash") ||
                    (enteridx == 3 && "done") ||
                    null
                  }
                  className="rounded-md flex flex-row justify-start items-baseline gap-2 mb-2"
                >
                  <InpText
                    label={
                      <motion.div
                        initial={{ y: -40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="rounded-md flex flex-row justify-start items-baseline gap-2 w-full"
                      >
                        <FontAwesomeIcon icon={faDiscord} />
                        <p className="text-left text-sm">
                          Enter your Discord or Twitter handle 
                        </p>
                      </motion.div>
                    }
                    {...{
                      contprops: { className: "w-full" },
                      inpprops: { className: "w-full" },
                      setter: (val) =>
                        set_state_ob(doc, set_doc, "discord", val),
                    }}
                  />
                </motion.div>
              )}
            {enteridx == 3 && (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-max mx-auto px-4"
              >
                <Tag onClick={signupaction} className="bg-acc_pu">
                  SignUp
                </Tag>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

function SignUp() {
  return (
    <motion.div {...MotionPage.slide} className="motionpage">
      <SignUpBox {...{ redirect: "/" }} />
    </motion.div>
  );
}

export default SignUp;
