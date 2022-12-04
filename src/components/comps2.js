import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { nano } from "../utils/utils.js";
import { NowContext, useNowContext } from "../App.js";

const inpkeydel = 400;

export const InpText = (props) => {
  const { contprops = {}, inpprops = {}, label, setter, def_val = "" } = props;
  const inpref = useRef();
  const lastkey = useRef(null);
  const nc = useNowContext();
  const diff = nc.now - lastkey.current;
  useEffect(() => {
    if (diff > inpkeydel) {
      let value = inpref.current.value;
      setter(value);
    }
  }, [diff > inpkeydel]);

  return (
    <motion.div
      {...contprops}
      onClick={() => inpref.current.focus()}
      className={twMerge("inp-container ", contprops.className)}
    >
      {label && <div className="inp-label">{label}</div>}
      <input
        onKeyDown={(e) => {
          lastkey.current = nano();
        }}
        onChange={(e) => {
          lastkey.current = nano();
        }}
        onBlur={(e) => {
          lastkey.current = nano();
        }}
        ref={inpref}
        type="text"
        className=""
        {...inpprops}
      />
    </motion.div>
  );
};
