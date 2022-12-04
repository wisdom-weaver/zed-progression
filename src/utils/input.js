import React from "react";
import _ from "lodash";
import { Img, Tag } from "../components/comps";
import { getv, get_color, nano } from "./utils";
import { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import Datepicker from "@themesberg/tailwind-datepicker/Datepicker";

import { registerLocale, setDefaultLocale } from "react-datepicker";
// import es from "date-fns/locale/es";
import { twMerge } from "tailwind-merge";
// registerLocale("es", es);

export const Input = ({
  id,
  setter,
  defaultValue,
  placeholder = "Enter",
  autoComplete = "on",
  show_btn = <>SET</>,
  cont_cn = "",
  inp_cn = "",
  btn_cn = "",
  bg_c = "bg-red-400",
  border_c = "border-red-400",
  keep_track = false,
  onBlur = null,
}) => {
  useEffect(() => {
    // let val =
    // if(defaultValue!==)
    set_val_inp(id, defaultValue);
  }, [defaultValue]);
  return (
    <div className="flex flex-row justify-center">
      <div
        className={`
          rounded-md 
          h-min
          border-2
          ${border_c}
          focus-within:shadow-lg
          focus-within:outline-none
          ease-in duration-300
          ${cont_cn}
        `}
      >
        <div className="w-1"></div>
        <input
          className={`
          outline:none
          focus:outline-none
          text-center
          bg-black
          text-white p-1
          focus:${bg_c}
          ease-in duration-300
          ${inp_cn}
          `}
          id={id}
          placeholder={placeholder}
          type="text"
          defaultValue={defaultValue}
          onKeyDown={(e) => e.keyCode == 13 && setter()}
          onBlur={onBlur || setter}
          autoComplete={autoComplete}
        />
        {show_btn !== false && (
          <button
            onClick={setter}
            className={twMerge(bg_c, `p-1 pr-2 pl-2 `, btn_cn)}
          >
            {show_btn}
          </button>
        )}
      </div>
    </div>
  );
};

export const DateInput = ({
  id,
  setter,
  defaultValue,
  placeholder = "Enter",
  autoComplete = "on",
  show_btn = <>SET</>,
  cont_cn = "",
  inp_cn = "",
  btn_cn = "",
  bg_c = "bg-red-400",
  border_c = "border-red-400",
  keep_track = false,
}) => {
  const [date, set_date] = useState(undefined);
  useEffect(() => {
    // console.log(defaultValue, moment(new Date(defaultValue)).isValid());
    if (!defaultValue || nano(defaultValue) == 0) {
      return set_date(undefined);
    }
    if (moment(new Date(defaultValue)).isValid())
      set_date(new Date(defaultValue));
    else set_date(undefined);
  }, [defaultValue]);
  useEffect(() => {
    if (nano(date) == 0) {
      return set_date(undefined);
    }
    if (moment(new Date(date)).isValid())
      setter(moment(new Date(date)).toISOString());
  }, [date]);
  return (
    <div className="flex flex-row justify-center">
      <div
        className={`
          rounded-md 
          h-min
          border-2
          ${border_c}
          focus-within:shadow-lg
          ease-in duration-300
          ${cont_cn}
        `}
      >
        <div className="w-1"></div>
        <DatePicker
          id={id}
          showTimeSelect
          dateFormat="Pp"
          placeholderText={placeholder}
          className="bg-black text-center"
          value={() => moment(date).format("DD-MM-YYYY HH:mmA")}
          {...(!date ? {} : { selected: date })}
          onChange={(date) => set_date(date)}
        />
      </div>
    </div>
  );
};

export const TWDateInput = () => {
  return <></>;
};

export const extract_inp = (id, type = "txt") => {
  let el = document.getElementById(id);
  if (!el) return undefined;
  let val = el.value;
  if (!val) return undefined;
  if (type == "n") {
    val = parseFloat(val);
    if (!_.isNaN(val)) return val;
    else return undefined;
  }
  return val;
};
export const set_val_inp = (id, txt = "") => {
  let el = document.getElementById(id);
  if (!el) return;
  el.value = txt;
};

export const set_state_ob_inp = (init, set, id, path, type = "txt") => {
  try {
    let ob = _.cloneDeep(init);
    let val = extract_inp(id, type);
    _.set(ob, path, val);
    // console.log(ob);
    set(ob);
  } catch (err) {}
};
export const set_state_ob = (init, set, path, val) => {
  try {
    let ob = _.cloneDeep(init);
    _.set(ob, path, val);
    set(ob);
  } catch (err) {}
};

export const InpRangeWrap = ({ idd, fkey, filters, set_filters }) => {
  const id_gen = (k) => `_${fkey}_${idd}_${k}`;
  const type = getv(filters, `${idd}.type`) ?? [];
  const color_fn = getv(filters, `${idd}.color_fn`) ?? def_color_fn;
  const cn = getv(filters, `${idd}.cn`) ?? " ";
  const label = getv(filters, `${idd}.label`) ?? "label";
  return (
    <div className="flex flex-row mb-1 flex-nowrap w-full items-center">
      <div className="flex flex-row mb-1 flex-wrap">
        <Tag className={`${cn} ${color_fn("label")}`}>{label}</Tag>
      </div>
      <div className="flex flex-row mb-1 flex-wrap flex-1 items-center">
        {[
          ["mi", "Min"],
          ["mx", "Max"],
        ].map(([k, txt]) => (
          <Input
            {...{
              id: id_gen(k),
              key: id_gen(k),
              show_btn: false,
              inp_cn: "w-[4rem] " + cn,
              border_c: cn,
              placeholder: txt,
              defaultValue: getv(filters, `${idd}.vals.${k}`),
              setter: () =>
                set_state_ob_inp(
                  filters,
                  set_filters,
                  id_gen(k),
                  `${idd}.vals.${k}`,
                  "n"
                ),
            }}
          />
        ))}
      </div>
    </div>
  );
};
export const InpOnlyWrap = ({
  idd,
  fkey,
  filters,
  set_filters,
  dir,
  placeholder = null,
}) => {
  const label = getv(filters, `${idd}.label`) ?? "label";
  const id_gen = `_${fkey}_${idd}`;
  const color_fn = getv(filters, `${idd}.color_fn`) ?? def_color_fn;
  const cn = getv(filters, `${idd}.cn`) ?? " ";
  return (
    <div className="flex flex-row mb-1 flex-nowrap w-full items-center">
      <div className="flex flex-row mb-1 flex-wrap">
        <Tag className={`${cn} ${color_fn("label")}`}>{label}</Tag>
      </div>
      <div className="flex flex-row mb-1 flex-wrap flex-1 items-center">
        {
          <Input
            {...{
              id: id_gen,
              key: id_gen,
              show_btn: false,
              inp_cn: "w-[4rem] " + cn,
              border_c: cn,
              placeholder: placeholder || "..",
              defaultValue: getv(filters, `${idd}.vals`),
              setter: () =>
                set_state_ob_inp(
                  filters,
                  set_filters,
                  id_gen,
                  `${idd}.vals`,
                  "n"
                ),
            }}
          />
        }
      </div>
    </div>
  );
};

export const InpSwitch = ({ idd, fkey, filters, set_filters }) => {
  const id_gen = `_${fkey}_${idd}`;
  const val = getv(filters, `${idd}.vals`);
  // console.log("InpSwitch", val);
  const txt = getv(filters, `${idd}.txt`);
  const cn = getv(filters, `${idd}.cn`);
  const onClick = () => set_state_ob(filters, set_filters, `${idd}.vals`, !val);
  return (
    <Tag {...{ onClick, className: `${cn} ${val ? "" : "bg-opacity-40"}` }}>
      {txt}
    </Tag>
  );
};

export const def_txt_fn = (o) => o;
export const def_color_fn = (o) => "bg-green-500";
export const InpOptionsTdHead = ({ idd, fkey, filters, set_filters }) => {
  const type = getv(filters, `${idd}.type`) ?? [];
  const options = getv(filters, `${idd}.options`) ?? [];
  const actives = getv(filters, `${idd}.vals`) ?? [];
  const color_fn = getv(filters, `${idd}.color_fn`) ?? def_color_fn;
  const txt_fn = getv(filters, `${idd}.txt_fn`) ?? def_txt_fn;
  const cn = getv(filters, `${idd}.cn`) ?? " ";
  const add = (o) => _.uniq([...actives, o]);
  const remove = (o) => _.uniq(actives.filter((i) => i !== o));
  return (
    <>
      {options.map((option) => {
        let active = actives.includes(option);
        const click = () => {
          let nops;
          if (type == "options") nops = !active ? add(option) : remove(option);
          if (type == "options-only-ar") nops = !active ? [option] : [];
          set_state_ob(filters, set_filters, `${idd}.vals`, nops);
        };
        return (
          <Tag
            key={`${fkey}-${idd}-${option}`}
            className={bg_active(color_fn(option), active) + " " + cn}
            onClick={click}
          >
            {txt_fn(option)}
          </Tag>
        );
      })}
    </>
  );
};
export const InpOptionsWrap = ({ idd, fkey, filters, set_filters }) => {
  const type = getv(filters, `${idd}.type`) ?? [];
  const options = getv(filters, `${idd}.options`) ?? [];
  const actives = getv(filters, `${idd}.vals`) ?? [];
  const color_fn = getv(filters, `${idd}.color_fn`) ?? def_color_fn;
  const txt_fn = getv(filters, `${idd}.txt_fn`) ?? def_txt_fn;
  const cn = getv(filters, `${idd}.cn`) ?? " ";
  const add = (o) => _.uniq([...actives, o]);
  const remove = (o) => _.uniq(actives.filter((i) => i !== o));
  const label = getv(filters, `${idd}.label`) ?? "label";
  const label_mini = getv(filters, `${idd}.label_mini`) ?? "label_mini";
  return (
    <div className="flex flex-row mb-1 flex-nowrap w-full items-start">
      <div className="flex flex-row mb-1 flex-wrap">
        <Tag className={`${cn} ${color_fn("label")}`}>{label}</Tag>
      </div>
      <div className="flex flex-row mb-1 flex-wrap flex-1">
        {options.map((option) => {
          let active = actives.includes(option);
          const click = () => {
            let nops;
            if (type == "options")
              nops = !active ? add(option) : remove(option);
            if (type == "options-only-ar") nops = !active ? [option] : [];
            if (type == "options-only") nops = !active ? option : [];
            set_state_ob(filters, set_filters, `${idd}.vals`, nops);
          };
          return (
            <Tag
              key={`${fkey}-${idd}-${option}`}
              className={bg_active(color_fn(option), active) + " " + cn}
              onClick={click}
            >
              {txt_fn(option)}
            </Tag>
          );
        })}
      </div>
    </div>
  );
};
export const bg_active = (c, active) =>
  `${c} ${active ? "border-2 border-white" : "bg-opacity-30"}`;

export const InpDatesWrap = ({ idd, fkey, filters, set_filters }) => {
  const type = getv(filters, `${idd}.type`) ?? [];
  const options = getv(filters, `${idd}.options`) ?? [];
  const actives = getv(filters, `${idd}.vals`) ?? [];
  const color_fn = getv(filters, `${idd}.color_fn`) ?? def_color_fn;
  const txt_fn = getv(filters, `${idd}.txt_fn`) ?? def_txt_fn;
  const cn = getv(filters, `${idd}.cn`) ?? " ";
  const add = (o) => _.uniq([...actives, o]);
  const remove = (o) => _.uniq(actives.filter((i) => i !== o));
  const label = getv(filters, `${idd}.label`) ?? "label";
  const label_mini = getv(filters, `${idd}.label_mini`) ?? "label_mini";
  const id_gen = (k) => `_${fkey}_${idd}_${k}`;
  return (
    <div className="flex flex-row mb-1 flex-nowrap w-full items-center">
      <div className="flex flex-row mb-1 flex-wrap">
        <Tag className={`${cn} ${color_fn("label")}`}>{label}</Tag>
      </div>
      <div className="flex flex-row mb-1 flex-wrap flex-1 items-center">
        {[
          ["mi", "Start Date"],
          ["mx", "End Date"],
        ].map(([k, txt]) => (
          <DateInput
            {...{
              id: id_gen(k),
              key: id_gen(k),
              show_btn: false,
              inp_cn: "w-[8rem]",
              placeholder: txt,
              defaultValue: getv(filters, `${idd}.vals.${k}`),
              setter: (val) =>
                set_state_ob(filters, set_filters, `${idd}.vals.${k}`, val),
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const InpDatesRange = ({ idd, label, init, set }) => {
  const cn = "";
  const id_gen = (k) => `_${idd}_${k}`;
  return (
    <div className="flex flex-row mb-1 flex-nowrap w-full items-center">
      <div className="flex flex-row mb-1 flex-wrap">
        <Tag className={`${cn}`}>{label}</Tag>
      </div>
      <div className="flex flex-row mb-1 flex-wrap flex-1 items-center">
        {[
          ["st", "Start Date"],
          ["ed", "End Date"],
        ].map(([k, txt], idx) => (
          <React.Fragment key={id_gen(k)}>
            <DateInput
              {...{
                id: id_gen(k),
                show_btn: false,
                inp_cn: "w-[8rem]",
                placeholder: txt,
                defaultValue: getv(init, `${k}`),
                setter: (val) => set_state_ob(init, set, `${k}`, val),
              }}
            />
            {idx == 0 && <Tag>to</Tag>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export const InputText = ({
  idd,
  fkey,
  filters,
  set_filters,
  dir,
  placeholder = null,
}) => {
  const label = getv(filters, `${idd}.label`) ?? "label";
  const id_gen = `_${fkey}_${idd}`;
  const color_fn = getv(filters, `${idd}.color_fn`) ?? def_color_fn;
  const cn = getv(filters, `${idd}.cn`) ?? " ";
  const format_type = getv(filters, `${idd}.format_type`) ?? "txt";
  const type = getv(filters, `${idd}.type`) ?? "text";
  return (
    <div className="flex flex-row mb-1 flex-nowrap w-full items-center">
      <div className="flex flex-row mb-1 flex-wrap">
        <Tag className={`${color_fn("label")}`}>{label}</Tag>
      </div>
      <div className="flex flex-row mb-1 flex-wrap flex-1 items-center">
        {
          <Input
            {...{
              id: id_gen,
              key: id_gen,
              show_btn: false,
              inp_cn: "w-[4rem] " + cn,
              border_c: cn,
              placeholder: placeholder || "..",
              defaultValue: getv(filters, `${idd}.vals`),
              type,
              setter: () =>
                set_state_ob_inp(
                  filters,
                  set_filters,
                  id_gen,
                  `${idd}.vals`,
                  format_type
                ),
            }}
          />
        }
      </div>
    </div>
  );
};

export const InpAutoWrap = (props) => {
  const type = getv(props, `filters.${props.idd}.type`) ?? null;
  if (type == "options") return <InpOptionsWrap {...props} />;
  if (type == "options-only-ar") return <InpOptionsWrap {...props} />;
  if (type == "options-only") return <InpOptionsWrap {...props} />;
  if (type == "date-range") return <InpDatesWrap {...props} />;
  if (type == "range") return <InpRangeWrap {...props} />;
  if (type == "only") return <InpOnlyWrap {...props} />;
  if (type == "text") return <InputText {...props} />;
  return <></>;
};

export const HorseImage = ({ hid, box, hex_code }) => (
  <Img box={box} img={`https://img.zed.run/horses/${hex_code}.png`} />
);

export const HID_Input = ({
  hid,
  set_hid,
  id = "_horse_name_inp",
  inp_cn = "",
  sug_cn = "",
}) => {
  const [name, set_name] = useState("");
  const [suggestions, set_suggestion] = useState([]);
  const [active_idx, set_active_idx] = useState(0);

  let timeout = null;
  const searcher = () => {
    if (timeout) clearTimeout(timeout);
    // console.log("name", name);
    let api = `https://bszedapi.stackednaks.com/v3/name/${name}`;
    if (!name) set_suggestion([]);
    const action = fetch(api)
      .then((r) => r.json())
      .then((e) => {
        if (e.status !== "success") set_suggestion([]);
        else set_suggestion(e.horses);
        // console.log(e);
      });
    timeout = setTimeout(action, 200);
  };

  useEffect(() => {
    setTimeout(searcher, 500);
  }, [name]);

  const select = (active_idx) => {
    // console.log("select", active_idx)
    if (!_.isNaN(parseInt(name))) {
      set_hid(parseInt(name));
      return;
    }
    const s = suggestions[active_idx];
    let hid = s?.hid;
    if (!hid) return;
    set_hid(hid);
    const el = document.getElementById(id);
    el.value = s.name;
    set_active_idx(-1);
  };

  useEffect(() => {
    const idx = suggestions.findIndex((e) => {
      return e.hid == hid;
    });
    if (idx > -1) {
      set_name(suggestions[idx]?.name);
      set_active_idx(-1);
    }
  }, [hid]);

  return (
    <>
      <form>
        <div className="row-flex input-container glow">
          <div className={`border-2 border-tb3 rounded-md`}>
            <input
              className={`
              bg-black text-white text-center
               min-h[40px]
               focus-visible:outline-none
               ${inp_cn}
              `}
              id={id}
              placeholder="Search Horse"
              autoComplete="off"
              autoCorrect="off"
              onBlur={(e) => setTimeout(() => set_active_idx(-1), 400)}
              style={{ height: 20, width: 240 }}
              value={name}
              defaultValue={name && hid && null}
              onChange={(e) => {
                set_name(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  return select(active_idx);
                }
                if (e.key == "ArrowUp") {
                  set_active_idx(Math.max(0, active_idx - 1));
                } else if (e.key == "ArrowDown") {
                  set_active_idx(Math.min(suggestions.length, active_idx + 1));
                } else {
                  // setTimeout(searcher, 500);
                  set_active_idx(0);
                }
              }}
            ></input>
          </div>
        </div>
        {active_idx > -1 && !_.isEmpty(suggestions) && (
          <div
            style={{
              boxSizing: "border-box",
              width: 240,
              borderRadius: "4px",
              padding: `5px`,
              position: "absolute",
              background: "black",
              zIndex: 999,
            }}
            className="suggestions-container"
          >
            {!_.isEmpty(suggestions) &&
              suggestions.map((s, idx) => {
                const { hid, hex_code, name } = s;
                return (
                  <div
                    style={{
                      ...(active_idx == idx
                        ? {
                            background: get_color("dark-purple"),
                          }
                        : {}),
                      borderBottom: `1px solid white`,
                      borderRadius: "4px",
                    }}
                    className={`flex flex-row cursor-pointer ${sug_cn}`}
                    onClick={() => select(idx)}
                  >
                    <HorseImage {...{ redirect: false, hex_code, box: 50 }} />
                    <p className="mlr5">{name}</p>
                  </div>
                );
              })}
          </div>
        )}
        <input
          type="submit"
          style={{ display: "none" }}
          value=""
          onClick={(e) => {
            e.preventDefault();
          }}
        />
      </form>
    </>
  );
};

export const LabInpWrap = ({
  tagw = "",
  id,
  init,
  set,
  k,
  placeholder,
  tlabel,
  ...props
}) => {
  return (
    <div className="flex flex-row mb-1 items-center flex-wrap">
      <Tag className={`${tagw}`}>{tlabel}</Tag>
      <Input
        {...{
          ...props,
          id: id,
          placeholder: placeholder,
          setter: () => set_state_ob_inp(init, set, id, k),
          defaultValue: getv(init, k),
          show_btn: false,
        }}
      />
    </div>
  );
};

export const LabInpWrapS = ({
  tagw = "",
  id,
  init,
  set,
  placeholder,
  tlabel,
  ...props
}) => {
  return (
    <div className="flex flex-row mb-1 items-center">
      <div className={`${tagw}`}>{tlabel}</div>
      <Input
        {...{
          ...props,
          id: id,
          placeholder: placeholder,
          setter: () => set(extract_inp(id)),
          defaultValue: init,
          show_btn: false,
          keep_track: true,
        }}
      />
    </div>
  );
};
