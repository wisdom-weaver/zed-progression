import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import load2 from "../static/gifs/load2.gif";
import { Img } from "./comps";

const loading_gif = {
  simple: "https://i.stack.imgur.com/kOnzy.gif",
};

export const Anim = (props) => {
  return (
    <>
      <div className={props.className}>
        <Img w="100%" h="auto" img={props.img} />
      </div>
    </>
  );
};
export const LoadAnim2 = (props) => {
  return <Anim {...props} img={loading_gif.simple} />;
};

export const Loader01 = (props) => {
  const cn = `w-[10rem] aspect-square bg-acc_pu rounded-md`;
  return (
    <motion.div
      className={twMerge(cn, props.className)}
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["3%", "3%", "50%", "50%", "0%"],
      }}
      transition={{
        duration: 1,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 0.3,
      }}
    />
  );
};

export const Loader01c = ({
  ccn = "w-[15rem] h-[15rem] mx-auto",
  cn = "w-[5rem] h-[5rem]",
}) => {
  return (
    <div className={twMerge("flex flex-col justify-center items-center", ccn)}>
      <Loader01 className={cn} />
    </div>
  );
};
