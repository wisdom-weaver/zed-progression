import _ from "lodash";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEffect } from "react";
import { set_paths } from "../utils/utils";
import { DateTimePicker } from "react-rainbow-components";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const MoIconBtnVariants = {
  hidden: { opacity: 0, width: 0, height: 0, borderRadius: "1rem" },
  exit: { opacity: 0, width: 0, height: 0 },
  visible: {
    opacity: 1,
    width: "2.5rem",
    height: "2.5rem",
    transition: { delay: 0.5 },
  },
  hover: {
    borderRadius: "5px",
  },
};
export const MoIconBtn = ({
  icon,
  className,
  onClick,
  state = "visible",
  vars,
}) => {
  return (
    <motion.div
      variants={{ ...MoIconBtnVariants, ...vars }}
      initial="hidden"
      exit="hidden"
      animate={state || "visible"}
      whileHover={"hover"}
      onClick={onClick}
      className={twMerge(
        "flex flex-col justify-center items-center p-2 z-[2000]",
        className
      )}
    >
      <FontAwesomeIcon icon={icon} />
    </motion.div>
  );
};

const MoSubSecSlideVars = {
  hidden: { opacity: 0, x: -100 },
  exit: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.5, when: "beforeChildren" },
  },
};
export const MoSubSecSlide = (props) => {
  let vars = MoSubSecSlide;

  return (
    <motion.div
      variants={vars}
      initial="hidden"
      exit="exit"
      animate={props.state || "visible"}
      onClick={props.onClick}
      className={twMerge(
        "flex flex-col justify-center items-center p-2 z-[2000]",
        props.className
      )}
    >
      {props.children}
    </motion.div>
  );
};

const MoTagBtnVars = {
  hidden: { opacity: 0, x: 150 },
  hover: { scale: 1.1 },
  visible: { opacity: 1, x: 0, transition: { delay: 0.5 } },
};

export const MoTagBtn = (p) => {
  return (
    <motion.div
      variants={MoTagBtnVars}
      initial={"hidden"}
      animate={"visible"}
      whileHover={"hover"}
      onClick={p.onClick}
      className={twMerge(
        "bg-lig rounded-md px-2 py-4 cursor-pointer ",
        p.cn,
        p.active ? p.acn : ""
      )}
    >
      {p.children}
    </motion.div>
  );
};

export const RRDateTimePick = ({ date = null, set_date, id, label }) => {
  const [rdd, set_rdd] = useState({ value: null });
  useEffect(() => {
    if (!date) set_rdd({ value: null });
    else if (date !== rdd.value) set_rdd({ value: new Date(date) });
  }, [date]);
  // if (_.isNil(rdd.value)) return <></>;
  return (
    <DateTimePicker
      id={id}
      label={label}
      value={rdd.value && new Date(rdd.value)}
      onChange={(d) => set_date(d.toISOString())}
      formatStyle="large"
    />
  );
};

export const BackBtn = ({ onClick }) => {
  return (
    <MoIconBtn
      onClick={onClick}
      className={"bg-white text-black"}
      icon={faAngleLeft}
    />
  );
};
