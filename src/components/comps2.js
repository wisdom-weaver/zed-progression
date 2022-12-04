import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { nano } from "../utils/utils.js";
import { NowContext, useNowContext } from "../App.js";
import { HorseImage } from "../utils/input.js";
import _ from "lodash";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const inpkeydel = 400;

export const InpText = (props) => {
  const {
    contprops = {},
    inpprops = {},
    label,
    setter,
    def_val = "",
    type,
  } = props;
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
  useEffect(() => {
    inpref.current.value = def_val;
  }, [def_val]);
  const [showpass, set_showpass] = useState(false);
  return (
    <motion.div
      {...contprops}
      onClick={() => inpref.current.focus()}
      className={twMerge("inp-container ", contprops.className)}
    >
      {label && <div className="inp-label">{label}</div>}
      {
        <div className="flex flex-row justify-start">
          <input
            id={props.id}
            placeholder={props.placeholder ?? ""}
            onKeyDown={(e) => {
              lastkey.current = nano();
              if (props.onKeyDown) props.onKeyDown(e);
            }}
            onChange={(e) => {
              lastkey.current = nano();
              if (props.onKeyDown) props.onChange(e);
            }}
            onBlur={(e) => {
              lastkey.current = nano();
              if (props.onKeyDown) props.onBlur(e);
            }}
            ref={inpref}
            type={showpass ? "text" : type || "text"}
            defaultValue={def_val}
            className=""
            {...inpprops}
          />
          {type == "password" ? (
            <div
              className="p-1 w-[1.5rem] cursor-pointer"
              onClick={() => {
                if (type == "password") set_showpass(!showpass);
              }}
            >
              <FontAwesomeIcon icon={showpass ? faEyeSlash : faEye} />
            </div>
          ) : (
            <div className="w-[1.5rem]"></div>
          )}
        </div>
      }
    </motion.div>
  );
};

const trim_n = (name, n = 25) => {
  if (!name) return "---";
  if (name.length > n) return `${name.slice(0, n)}...`;
  return name;
};

export const InpHorse = (props) => {
  const [name, set_name] = useState(props.name);
  const [active_idx, set_active_idx] = useState(0);
  const [suggestions, set_suggestions] = useState([]);
  const [open, set_open] = useState(false);
  const searcher = () => {
    let api = `https://bszedapi.stackednaks.com/v3/name/${name}`;
    if (!name || name == "") set_suggestions([]);
    fetch(api)
      .then((r) => r.json())
      .then((e) => {
        if (e.status !== "success") set_suggestions([]);
        else set_suggestions(e.horses);
        console.log(e);
      });
  };
  useEffect(() => {
    searcher();
  }, [name]);

  const select = (hid) => {
    console.log(hid);
    props.setter(hid);
    set_open(false);
  };

  // useEffect(() => {
  //   console.log(open, suggestions);
  // }, [open, suggestions]);

  return (
    <div className="relative">
      <div className="my-2">
        <InpText
          id={props.id}
          {...{
            contprops: {
              className: "bg-reg focus-within:bg-lig w-full",
            },
            inpprops: {
              className: "bg-reg w-full h-[3rem]",
            },
            ...props,
            setter: (v) => set_name(v),
          }}
          placeholder={props.placeholder || "Enter Horse Name:"}
          onChange={(e) => {
            set_open(true);
          }}
          onKeyDown={(e) => {
            if (e.key == "ArrowUp") {
              set_active_idx(Math.max(0, active_idx - 1));
            } else if (e.key == "ArrowDown") {
              set_active_idx(Math.min(suggestions.length, active_idx + 1));
            } else if (e.key == "Enter") {
              select(suggestions[active_idx]?.hid);
            } else {
              set_active_idx(0);
            }
          }}
        />
      </div>
      {open && !_.isEmpty(suggestions) && (
        <div className="absolute top-100 rounded-md p-1 bg-lig w-full z-[1000] ">
          {suggestions.map((s, idx) => {
            return (
              <>
                <div
                  className={twMerge(
                    `flex flex-row cursor-pointer`,
                    idx == active_idx
                      ? "bg-reg border border-gaccent rounded-md"
                      : ""
                  )}
                  onClick={() => select(s.hid)}
                >
                  <HorseImage
                    {...{
                      redirect: false,
                      hex_code: s?.hex_code || "000000",
                      box: 50,
                    }}
                  />
                  <p className="mlr5">{trim_n(s.name)}</p>
                </div>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};
