import React, { useEffect } from "react";
import _ from "lodash";
import { q_tourinfo } from "../utils/queries";
import { useQueries } from "react-query";
import {
  Card,
  ErrText,
  Img,
  ITag,
  LoadingAnim,
  Tag,
  TdTag,
  TimerAd,
} from "./comps";
import {
  faArrowRight,
  faDollarSign,
  faEye,
  faEyeSlash,
  faHorse,
  faQuestion,
  faTrophy,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { faEthereum, faInvision } from "@fortawesome/free-brands-svg-icons";
import { dec, getv, iso, iso_format, usiso_format } from "../utils/utils";
import { Icon_comp } from "../utils/fixons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { play_loop_audio } from "../utils/audio";

export const help_doc_link = `https://docs.google.com/document/d/161KA9Wn2PzVEPAIiog7EwlP42kij9VAyT5nXxrpdDmk/edit`;

export const TInfoWrap = (props) => {
  const { tid } = props;
  let q = useQueries([q_tourinfo({ tid })])[0];
  if (q.status == "loading") return <LoadingAnim />;
  if (q.status == "error") return <ErrText err={"Error!!"} />;
  return <TInfo {...{ tdoc: q.data }} />;
};

export const status_cn = (status) => {
  if (status == "open") return "bg-blue-400/80";
  if (status == "live") return "bg-green-500/80";
  if (status == "upcoming") return "bg-yellow-400/80";
  if (status == "ended") return "bg-red-500/80";
};

export const type_cn = (type) => {
  if (!type) type = "regular";
  if (type == "regular") return "border-2 border-green-500 text-green-500";
  if (type == "flash") return "border-2 border-yellow-500 text-yellow-500";
};

const TimeRow = ({ label, date }) => (
  <div className="flex flex-row w-full whitespace-pre-wrap items-center">
    <div className="ffr">
      <Tag className="min-w-[6.5rem]">{label}</Tag>
      <span>{iso_format(date)}</span>
    </div>
    <div className="flex-1"></div>
    <TimerAd {...{ date }} />
  </div>
);

export const StatusTag = ({ status, ...props }) => (
  <Tag
    {...props}
    className={twMerge(
      `bg-opacity-40 text-center ${status_cn(status)}`,
      props.className
    )}
  >
    {status}
  </Tag>
);
export const TypeTag = ({ type, ...props }) => (
  <Tag
    {...props}
    className={twMerge(
      `bg-opacity-40 text-center ${type_cn(type)}`,
      props.className
    )}
  >
    {type}
  </Tag>
);

export const TInfoHead = ({ tdoc }) => {
  const {
    tag,
    status,
    type,
    prize_pool,
    prize_pool_usd,
    title,
    entry_fee,
    entry_fee_usd,
    score_mode,
    token,
    horses_n,
  } = tdoc;
  const is_elo = score_mode == "elo";
  return (
    <>
      <div className="ffr">
        <Tag className="border-2 border-tb3 mb-3">{tag}</Tag>
        <Tag className="text-lg">{title}</Tag>
        <div className="flex-1"></div>
        <div className="ffr">
          <ITag
            className="text-blue-400 m-0 p-0 px-2 font-bold italic"
            icon={faWallet}
          >
            {tdoc.payout_mode}
          </ITag>
        </div>
        <StatusTag {...{ status }} />
      </div>
      <div className="flex flex-col">
        <div className="ffr">
          <TypeTag {...{ type }} />
          {<Tag className="text-orange-400 italic">{score_mode}</Tag>}
          {tdoc.sn_pro_only == "on" && (
            <Tag className="text-black bg-white m-0 p-0 px-2 flex flex-row">
              <Img img="https://www.stackednaks.com/static/media/logo.8da37828e8deccfd822d.jpg" />
              SN PRO ONLY
            </Tag>
          )}
          <div className="flex-1"></div>
          <span className="px-2 text-green-500">PrizePool:</span>
          <ITag
            className="m-0 p-0 px-2 text-green-400 font-bold italic"
            icon={null}
          >
            {dec(prize_pool || 0, 4)}
            <span className="mx-1">{token}</span>
          </ITag>
          {
            <ITag
              className="m-0 p-0 px-2 text-green-400 font-bold italic"
              icon={faDollarSign}
            >
              {dec(prize_pool_usd || 0, 2)}
            </ITag>
          }
        </div>
        <div className="ffr text-yellow-400">
          <Tag className="border border-green-500 text-green-500 itlaic font-bold w-max">
            {horses_n} entrant{horses_n > 1 ? "s" : ""}
          </Tag>
          <div className="flex-1"></div>
          <Tag>Entry Fee</Tag>
          <ITag className="m-0 p-0 px-2 font-bold italic" icon={null}>
            {entry_fee == "multi"
              ? "dynamic fee on criteria"
              : dec(entry_fee || 0, 4)}
            <span className="mx-1">{token}</span>
          </ITag>
          {
            <ITag className="m-0 p-0 px-2 font-bold italic" icon={faDollarSign}>
              {entry_fee == "multi"
                ? "dynamic fee on criteria"
                : dec(entry_fee_usd || 0, 2)}
            </ITag>
          }
        </div>
        {!_.isNil(tdoc.stable_horses_n) && (
          <div className="ffr border border-green-400 justify-center p-2 rounded-md px-4 m-1">
            <p className="text-green-400 text-center w-full">
              {tdoc.stable_horses_n} horses allowed per stable
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export const TInfoTimes = ({ tdoc }) => {
  const {
    status,
    type,
    tourney_st,
    tourney_ed,
    entry_st,
    entry_ed,
    flash_params,
    terminated,
    horses_n,
    score_mode,
  } = tdoc;
  const is_team = score_mode == "team";

  return (
    <>
      {status == "ended" && (
        <>
          <div className="ffr">
            Tourney Started at
            <span className="mx-2 text-red-500">
              {usiso_format(tourney_st)}
            </span>
          </div>
          {terminated == true ? (
            <div className="ffr">
              <span className="text-red-400">
                {"This tourney was terminated and refunded"}
              </span>
            </div>
          ) : (
            <div className="ffr">
              Tourney Ended at
              <span className="mx-2 text-green-500">
                {usiso_format(tourney_ed)}
              </span>
              @ <TimerAd date={tourney_ed} />
            </div>
          )}
        </>
      )}
      {type == "regular" && status == "open" && (
        <>
          <div className="ffr">
            Tourney Starts in
            <TimerAd date={tourney_st} />
            {/* <span className="mx-2 text-purple-500">{iso_format(tourney_st)}</span> */}
          </div>
          <div className="ffr">
            Entry closes in
            <TimerAd date={entry_ed} />
            {/* <span className="mx-2 text-yellow-500">{iso_format(entry_ed)}</span> */}
          </div>
          <div className="ffr">
            Tourney ends in
            <TimerAd date={tourney_ed} />
            {/* <span className="mx-2 text-red-500">{iso_format(tourney_ed)}</span> */}
          </div>
        </>
      )}
      {type == "flash" && status == "open" && !is_team && (
        <>
          <div className="ffr">
            <div className="flex-1"></div>
            <div className="ffr border p-1 px-4 border-yellow-400 rounded-md p-1 text-yellow-400 font-bold gap-1 text-lg ">
              <span>{getv(tdoc, "horses_n") ?? 0}</span>
              <span>/</span>
              <span className="">{getv(flash_params, "minh")}</span>
              <span>HORSES</span>
            </div>
          </div>
          <div className="ffr gap-1 text-lg">
            Tourney will run
            <span className="mx-2 text-purple-500">
              {getv(flash_params, "duration")} hrs
            </span>
            starting when we have
            <span className="text-yellow-400">
              {getv(flash_params, "minh")} horses
            </span>
          </div>
          {tourney_st && (
            <div className="ffr">
              Tourney Starts in
              {/* <span className="mx-2 text-green-500">{iso_format(entry_st)}</span> */}
              <TimerAd date={tourney_st} />
            </div>
          )}
          <div className="ffr">
            Entry Starts in
            {/* <span className="mx-2 text-green-500">{iso_format(entry_st)}</span> */}
            <TimerAd date={entry_st} />
          </div>
          {entry_ed && (
            <div className="ffr">
              Entry Ends in
              {/* <span className="mx-2 text-green-500">{iso_format(entry_st)}</span> */}
              <TimerAd date={entry_ed} />
            </div>
          )}
        </>
      )}

      {type == "flash" && status == "open" && is_team && (
        <>
          <div className="ffr">
            <div className="flex-1"></div>
            <div className="ffr border p-1 px-4 border-yellow-400 rounded-md p-1 text-yellow-400 font-bold gap-1 text-lg ">
              <span>{getv(tdoc, "stables_n") ?? 0}</span>
              <span>/</span>
              <span className="">{2}</span>
              <span>TEAMS</span>
            </div>
          </div>
          <div className="ffr gap-1 text-lg">
            Tourney will run
            <span className="mx-2 text-purple-500">
              {getv(flash_params, "duration")} hrs
            </span>
            starting when we have
            <span className="text-yellow-400">2 teams</span>
          </div>
          {tourney_st && (
            <div className="ffr">
              Tourney Starts in
              {/* <span className="mx-2 text-green-500">{iso_format(entry_st)}</span> */}
              <TimerAd date={tourney_st} />
            </div>
          )}
          <div className="ffr">
            Entry Starts in
            {/* <span className="mx-2 text-green-500">{iso_format(entry_st)}</span> */}
            <TimerAd date={entry_st} />
          </div>
          {entry_ed && (
            <div className="ffr">
              Entry Ends in
              {/* <span className="mx-2 text-green-500">{iso_format(entry_st)}</span> */}
              <TimerAd date={entry_ed} />
            </div>
          )}
        </>
      )}

      {type == "flash" && status == "upcoming" && (
        <>
          <div className="ffr">
            Tourney will run
            <span className="mx-2 text-purple-500">
              {getv(flash_params, "duration")} hrs
            </span>
            starting when we have
            <span className="text-yellow-400 font-bold">
              {getv(flash_params, "minh")} horses
            </span>
          </div>
          <div className="ffr">
            Entry Starts in
            <TimerAd date={entry_st} />
            {/* <span className="mx-2 text-green-500">{iso_format(entry_st)}</span> */}
          </div>
        </>
      )}
      {type == "regular" && status == "upcoming" && (
        <>
          <div className="ffr">
            Tourney Starts in <TimerAd date={tourney_st} />
            {/* <span className="mx-2 text-purple-500">{iso_format(tourney_st)}</span> */}
          </div>
          <div className="ffr">
            Entry Starts in <TimerAd date={entry_st} />
            {/* <span className="mx-2 text-green-500">{iso_format(entry_st)}</span> */}
          </div>
          <div className="ffr">
            Tourney ends in <TimerAd date={tourney_ed} />
            {/* <span className="mx-2 text-red-500">{iso_format(tourney_ed)}</span> */}
          </div>
        </>
      )}
       {status == "scheduled" && (
        <>
          <div className="ffr">
            <span className="text-green-400 italic font-bold mr-2">
              Tourney scheduled at 
            </span>
            <span className="mx-2 text-purple-500">{iso_format(tourney_st)}</span>
          </div>
          <div className="ffr">
            starts in <TimerAd date={tourney_st} />
            {/* <span className="mx-2 text-green-500">{iso_format(tourney_ed)}</span> */}
          </div>
        </>
      )}
      {status == "live" && (
        <>
          <div className="ffr">
            <span className="text-green-400 italic font-bold mr-2">
              Tourney running
            </span>
            {/* <span className="mx-2 text-purple-500">{iso_format(tourney_st)}</span> */}
          </div>
          <div className="ffr">
            Tourney Ends in <TimerAd date={tourney_ed} />
            {/* <span className="mx-2 text-green-500">{iso_format(tourney_ed)}</span> */}
          </div>
        </>
      )}
    </>
  );
};
export const TInfoLinks = ({ tdoc, rule_btn = false, audio_btn = false }) => {
  const { tid, rules, status, type, horses_n } = tdoc;
  const [show_rules, set_show_rules] = useState(false);
  const links = [
    // [`/`, faHome, "Home", "bg-yellow-600 px-2"],
    [`/leaderboard/${tid}`, faTrophy, "Leaderboard", "bg-yellow-600 px-2"],
    ...(status == "open"
      ? [
          [`/signup/${tid}`, faInvision, "SignUP", "bg-purple-600 px-2"],
          [`/stable/${tid}`, faHorse, "Stable", "bg-red-600 px-2"],
        ]
      : []),
  ];

  return (
    <>
      <div className="ffr text-xs flex-wrap">
        {links.map((link, idx) => {
          let [to, i, txt, cn] = link;
          return (
            <React.Fragment key={idx}>
              <Link key={txt} to={to}>
                <ITag icon={i} className={cn}>
                  {txt}
                </ITag>
              </Link>
              {idx == 0 && (
                <>
                  <div className="flex-1"></div>
                  {audio_btn}
                  <div className="flex-1"></div>

                  <Link target={"_blank"} to="/faq">
                    <ITag icon={faQuestion} className="bg-blue-400">
                      Help
                    </ITag>
                  </Link>
                </>
              )}
            </React.Fragment>
          );
        })}
        {rule_btn && (
          <ITag
            onClick={() => set_show_rules(!show_rules)}
            icon={show_rules ? faEyeSlash : faEye}
            className={"bg-red-400"}
          >
            {"Rules"}
          </ITag>
        )}
      </div>
      <div className="flex flex-col p-1 text-xs">
        {rule_btn &&
          show_rules &&
          !_.isEmpty(rules) &&
          rules.map((rule, idx) => (
            <div
              key={idx}
              className="flex flex-row justify-start items-center w-full max-w-[35rem]"
            >
              <p>
                {idx}
                <Icon_comp icon={faArrowRight} />
              </p>
              <div className="flex flex-row justify-start items-center flex-wrap flex-1">
                {rule}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export function TInfo({ tdoc }) {
  let { tid, horses_n } = tdoc;

  return (
    <div className="border-2 border-red-500 mb-3 rounded-lg p-2 backdrop-blur-md	">
      <TInfoHead {...{ tdoc }} />
      <TInfoTimes {...{ tdoc }} />
      <TInfoLinks {...{ tdoc, rule_btn: true }} />
    </div>
  );
}

export const CardWrap = (props) => {
  return <Card className={props.card_cn}>{props.children}</Card>;
};
