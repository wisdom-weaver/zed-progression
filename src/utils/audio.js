import _ from "lodash";
import aud1 from "../static/audio/pop0.wav";
import aud2 from "../static/audio/pop1.wav";
import aud3 from "../static/audio/pop2.mp3";
import aud4 from "../static/audio/pop4.mp3";
import aud5 from "../static/audio/chime.mp3";

import loop1 from "../static/audio/siren.mp3";

import flash_pop from "../static/audio/flash_pop.mp3";

const auds = { aud1, aud2, aud3, aud4, aud5, flash_pop };
const loop_auds = { loop1, flash_pop };

const _audio_el = (i, loop = false) =>
  document.querySelector(
    loop ? `.audio-loop-element-${i}` : `.audio-loop-element-${i}`
  );

export const play_audio = (i = 0) => {
  // console.log("play");
  const audioEl = _audio_el(i, false);
  audioEl?.play();
};
export const stop_audio = (i = 0) => {
  const audioEl = _audio_el(i, false);
  audioEl?.pause();
  if (audioEl) audioEl.currentTime = 0;
};

export const play_loop_audio = (i = 0) => {
  // console.log("play");
  const audioEl = _audio_el(i, true);
  audioEl?.play();
};
export const stop_loop_audio = (i = 0) => {
  const audioEl = _audio_el(i, true);
  audioEl?.pause();
  if (audioEl) audioEl.currentTime = 0;
};

export const is_playing = (i, loop = false) => {
  let audioEl = _audio_el(i, loop);
  return audioEl.duration > 0 && !audioEl.paused;
};

export const AudioAll = () => {
  return (
    <>
      {_.entries(auds).map(([k, aud], idx) => {
        let key = `audio-element-${k}`;
        return (
          <audio loop={false} className={`audio-element ${key}`}>
            <source src={aud}></source>
          </audio>
        );
      })}
      {_.entries(loop_auds).map(([k, aud], idx) => {
        let key = `audio-loop-element-${k}`;
        return (
          <audio loop={true} className={`audio-loop-element ${key}`}>
            <source src={aud}></source>
          </audio>
        );
      })}
    </>
  );
};
