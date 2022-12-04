import React from "react";
import { useAppContext } from "../App.js";
import { InpHorse } from "../components/comps2.js";
import zicon from "../static/svg/ztlogo.svg";

function Home() {
  const appcon = useAppContext();
  const { history } = appcon;
  return (
    <div className="flex flex-col w-full justify-center items-center gap-4">
      <div>
        <div
          className={`
            xs:mx-2 xs:my-4 xs:w-[8rem]  xs:h-[2.5rem]
            md:mx-4 md:my-4 md:w-[20rem] md:h-[5rem]
            lg:mx-4 lg:my-4 lg:w-[20rem] lg:h-[7rem]
          `}
        >
          <img className="img-obey" src={zicon} alt="" />
        </div>
        <div>
          <InpHorse
            {...{
              id: "home_hsearch",
              setter: (h) => {
                let url = `/progress/${h}`;
                history(url);
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
