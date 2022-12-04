import _ from "lodash";

export const create_test_tourney = {
  tid: "test01",
  title: "Tourney Test 01",
  tourney_st: "2022-04-02T18:30:00.000Z",
  tourney_ed: "2022-04-15T18:30:00.000Z",
  entry_st: "2022-03-31T18:30:00.000Z",
  entry_ed: "2022-04-11T18:30:00.000Z",
  logo: "https://asset.brandfetch.io/idVB5ger5E/idHgO7KsdA.png",
  horse_cr: {
    tc: [],
    horse_type: [],
    bloodline: ["Szabo", "Finney"],
    breed_type: [],
    z: {},
    races_max: 50,
  },
  race_cr: {
    thisclass: [],
    distance: [],
    fee_tag: [],
  },
  score_cr: [
    {
      thisclass: [],
      distance: [],
      fee_tag: [],
      flame: [1],
      pos: [1, 2, 3],
      score: 5,
    },
    {
      thisclass: [],
      distance: [],
      fee_tag: [],
      flame: [0],
      pos: [1, 2, 3],
      score: 3,
    },
    {
      thisclass: [],
      distance: [],
      fee_tag: [],
      flame: [],
      pos: [11, 12],
      score: 1,
    },
  ],
  rules: [
    "szabo and finney horses allowed",
    "horse shoud have max races 50 for it to be valid",
  ],
};
