import { jparse } from "./utils";

const dummy_tdoc_json = `{"tid":"76aab016","type":"flash","tag":"team test 01","title":"team test 01","tourney_st":null,"tourney_ed":null,"entry_st":"2022-05-15T18:30:00.000Z","entry_ed":null,"logo":"https://asset.brandfetch.io/idVB5ger5E/idHgO7KsdA.png","horse_cr":[{"tc":[],"horse_type":[],"bloodline":["Nakamoto","Szabo","Finney","Buterin"],"breed_type":[],"z":{},"cost":0.002}],"score_mode":"team","payout_mode":null,"rules":["team test 01"],"flash_params":{"minh":6,"duration":3},"status":"open","hide":true,"entry_fee":0.002,"entry_fee_usd":4.01714,"ft":"FT2","horses_n":0,"prize_pool":0,"prize_pool_usd":0,"tactive":false,"entry_active":false}`;

export const dummy_team_tdoc = () => {
  let tdoc = jparse(dummy_tdoc_json);
  tdoc.score_mode = "team";
  tdoc.status = "live";
  tdoc.tourney_ed = "2022-05-17T00:00:00Z";
  return tdoc;
};

export const dummy_team_leader = () => {
  let json = {
    score_mode: "team",
    type: "flash",
    status: "live",
    stables: [
      {
        wallet: "0x6078EaA05C9A253A22c4B0d24E895617616eA9D8",
        stable_name: "Buffy Mac",
        horses_n: 2,
        score: 12.5,
        traces: 10,
        horses: [
          {
            hid: 183646,
            avg_score: 0,
            stable_name: "Buffy Mac",
            tot_score: 15,
            traces_n: 6,
            elo_last: null,
            elo_score: null,
            rank: null,
            bloodline: "Buterin",
            breed_type: "legendary",
            color: "Field Drab",
            genotype: "Z18",
            hex_code: "6C541E",
            horse_type: "Colt",
            name: "Brad Cage",
            tc: 4,
            wallet: "0x6078EaA05C9A253A22c4B0d24E895617616eA9D8",
            discord: "macbuff#9320",
          },
          {
            hid: 17270,
            avg_score: 0,
            stable_name: "Buffy Mac",
            tot_score: 10,
            traces_n: 4,
            elo_last: null,
            elo_score: null,
            rank: null,
            bloodline: "Nakamoto",
            breed_type: "legendary",
            color: "Cinnamon Satin",
            genotype: "Z2",
            hex_code: "CD607E",
            horse_type: "Stallion",
            name: "Valentine",
            tc: 1,
            wallet: "0x6078EaA05C9A253A22c4B0d24E895617616eA9D8",
            discord: "macbuff#9320",
          },
        ],
      },
      {
        wallet: "0xC8c8E184dE4EDaA569Bdc36317995D09E2bC762b",
        stable_name: "Moo Moo Stable",
        horses_n: 2,
        score: 13,
        traces: 9,
        horses: [
          {
            hid: 364008,
            avg_score: 0,
            stable_name: "Moo Moo Stable",
            tot_score: 9,
            traces_n: 3,
            elo_last: null,
            elo_score: null,
            rank: null,
            bloodline: "Buterin",
            breed_type: "legendary",
            color: "Bondi Blue",
            genotype: "Z19",
            hex_code: "0095B6",
            horse_type: "Mare",
            name: "Highland Ice",
            tc: 3,
            wallet: "0xC8c8E184dE4EDaA569Bdc36317995D09E2bC762b",
            discord: "MooMoo177#3278",
          },
          {
            hid: 353429,
            avg_score: 0,
            stable_name: "Moo Moo Stable",
            tot_score: 17,
            traces_n: 6,
            elo_last: null,
            elo_score: null,
            rank: null,
            bloodline: "Finney",
            breed_type: "elite",
            color: "Buff Gold",
            genotype: "Z13",
            hex_code: "F0DC82",
            horse_type: "Mare",
            name: "Polygon Issues",
            tc: 4,
            wallet: "0xC8c8E184dE4EDaA569Bdc36317995D09E2bC762b",
            discord: "MooMoo177#3278",
          },
        ],
      },
    ],
  };
  return json;
};
