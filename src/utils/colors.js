import _ from "lodash";
import cmap from "../utils/cmap.json";
import { contrastColor } from "contrast-color";
import theme_colors from "../static/json/theme_colors.json";

const hcolors = _.chain(cmap)
  .keyBy("cid")
  .mapValues((e) => {
    let ob = {};
    ob.hex = e.hex;
    ob.bg = `bg-${e.cid}`;
    ob.text = `text-${e.cid}`;
    return ob;
  })
  .value();

export const hcolor_cn = (c) => {
  if (!c) return "";
  c = c.toString().toLowerCase().split(" ").join("_");
  let ob = hcolors[c];
  if (_.isEmpty(ob)) return "bg-pk text-white";
  let { bg, hex } = ob;
  let text = contrastColor({ bgColor: hex });
  if (text == "#000000") text = "text-black";
  else text = "text-white";
  return `${bg} ${text} `;
};

const print_ncolors_html = (colors_ob) => {
  let ar = _.chain(colors_ob)
    .entries()
    .map(([k, v]) => {
      let cn = `bg-${k} text-${k}`;
      return `<div className={"${cn}"}></div>`;
    })
    .value();
  console.log(ar.join("\n"));
};

export const NoneDispColors = () => {
  // let ar = _.values(hcolors).map(({ bg, text }) => {
  //   let cn = `${bg} ${text} h-0 display-none`;
  //   return `<div className={"${cn}"}></div>`;
  // });
  // print_ncolors_html(theme_colors)
  return (
    <div className="#colors hidd">
      <div className="bg-acc_pu "></div>
      <div className="bg-green-500/30"></div>
      <div className="bg-green-500/50"></div>
      <div className="bg-c0 h-0 display-none"></div>
      <div className="bg-c1 h-0 display-none"></div>
      <div className="bg-c2 h-0 display-none"></div>
      <div className="bg-c3 h-0 display-none"></div>
      <div className="bg-c4 h-0 display-none"></div>
      <div className="bg-c5 h-0 display-none"></div>
      <div className="bg-c6 h-0 display-none"></div>
      <div className="bg-c7 h-0 display-none"></div>
      <div className="bg-c77 h-0 display-none"></div>
      <div className="bg-c99 h-0 display-none"></div>
      <div
        className={"bg-aggressive_azure text-aggressive_azure h-0 display-none"}
      ></div>
      <div className={"bg-alice_blue text-alice_blue h-0 display-none"}></div>
      <div className={"bg-cadet_blue text-cadet_blue h-0 display-none"}></div>
      <div className={"bg-powder_blue text-powder_blue h-0 display-none"}></div>
      <div className={"bg-royal_blue text-royal_blue h-0 display-none"}></div>
      <div
        className={"bg-absolute_zero text-absolute_zero h-0 display-none"}
      ></div>
      <div
        className={
          "bg-air_superiority_blue text-air_superiority_blue h-0 display-none"
        }
      ></div>
      <div className={"bg-azure_mist text-azure_mist h-0 display-none"}></div>
      <div
        className={"bg-cosmic_cobalt text-cosmic_cobalt h-0 display-none"}
      ></div>
      <div className={"bg-azure text-azure h-0 display-none"}></div>
      <div className={"bg-bondi_blue text-bondi_blue h-0 display-none"}></div>
      <div
        className={"bg-bleu_de_france text-bleu_de_france h-0 display-none"}
      ></div>
      <div
        className={"bg-celestial_blue text-celestial_blue h-0 display-none"}
      ></div>
      <div
        className={"bg-cerulean_frost text-cerulean_frost h-0 display-none"}
      ></div>
      <div
        className={"bg-egyptian_blue text-egyptian_blue h-0 display-none"}
      ></div>
      <div
        className={"bg-bright_cerulean text-bright_cerulean h-0 display-none"}
      ></div>
      <div className={"bg-honeydew text-honeydew h-0 display-none"}></div>
      <div className={"bg-rosy_brown text-rosy_brown h-0 display-none"}></div>
      <div
        className={"bg-antique_brass text-antique_brass h-0 display-none"}
      ></div>
      <div className={"bg-brown_sugar text-brown_sugar h-0 display-none"}></div>
      <div
        className={"bg-champagne_papi text-champagne_papi h-0 display-none"}
      ></div>
      <div className={"bg-cinereous text-cinereous h-0 display-none"}></div>
      <div
        className={"bg-copper_penny text-copper_penny h-0 display-none"}
      ></div>
      <div
        className={"bg-coyote_brown text-coyote_brown h-0 display-none"}
      ></div>
      <div className={"bg-dark_lava text-dark_lava h-0 display-none"}></div>
      <div className={"bg-deep_taupe text-deep_taupe h-0 display-none"}></div>
      <div className={"bg-field_drab text-field_drab h-0 display-none"}></div>
      <div className={"bg-sienna text-sienna h-0 display-none"}></div>
      <div className={"bg-taupe text-taupe h-0 display-none"}></div>
      <div className={"bg-gainsboro text-gainsboro h-0 display-none"}></div>
      <div className={"bg-chartreuse text-chartreuse h-0 display-none"}></div>
      <div
        className={"bg-sir_aquamarine text-sir_aquamarine h-0 display-none"}
      ></div>
      <div className={"bg-ao text-ao h-0 display-none"}></div>
      <div className={"bg-feldgrau text-feldgrau h-0 display-none"}></div>
      <div
        className={"bg-cal_poly_pomona text-cal_poly_pomona h-0 display-none"}
      ></div>
      <div
        className={"bg-caribbean_green text-caribbean_green h-0 display-none"}
      ></div>
      <div className={"bg-dark_moss text-dark_moss h-0 display-none"}></div>
      <div
        className={"bg-dartmouth_green text-dartmouth_green h-0 display-none"}
      ></div>
      <div
        className={"bg-space_sparkle text-space_sparkle h-0 display-none"}
      ></div>
      <div className={"bg-slate_gray text-slate_gray h-0 display-none"}></div>
      <div
        className={"bg-stronghold_ivory text-stronghold_ivory h-0 display-none"}
      ></div>
      <div className={"bg-arctic_snow text-arctic_snow h-0 display-none"}></div>
      <div className={"bg-ghost_white text-ghost_white h-0 display-none"}></div>
      <div className={"bg-white_smoke text-white_smoke h-0 display-none"}></div>
      <div
        className={"bg-anti-flash_white text-anti-flash_white h-0 display-none"}
      ></div>
      <div
        className={"bg-antique_white text-antique_white h-0 display-none"}
      ></div>
      <div
        className={
          "bg-battle_horse_gray text-battle_horse_gray h-0 display-none"
        }
      ></div>
      <div
        className={"bg-midnight_black text-midnight_black h-0 display-none"}
      ></div>
      <div className={"bg-alabaster text-alabaster h-0 display-none"}></div>
      <div
        className={"bg-black_chocolate text-black_chocolate h-0 display-none"}
      ></div>
      <div
        className={"bg-shadow_fighter text-shadow_fighter h-0 display-none"}
      ></div>
      <div className={"bg-peach_puff text-peach_puff h-0 display-none"}></div>
      <div className={"bg-coral_wave text-coral_wave h-0 display-none"}></div>
      <div className={"bg-firebrick text-firebrick h-0 display-none"}></div>
      <div
        className={"bg-alizarin_crimson text-alizarin_crimson h-0 display-none"}
      ></div>
      <div
        className={"bg-atomic_tangerine text-atomic_tangerine h-0 display-none"}
      ></div>
      <div
        className={"bg-big_dip_o’ruby text-big_dip_o’ruby h-0 display-none"}
      ></div>
      <div
        className={
          "bg-bittersweet_shimmer text-bittersweet_shimmer h-0 display-none"
        }
      ></div>
      <div
        className={"bg-colombo_spice text-colombo_spice h-0 display-none"}
      ></div>
      <div className={"bg-burnt_umber text-burnt_umber h-0 display-none"}></div>
      <div
        className={"bg-crimson_tide text-crimson_tide h-0 display-none"}
      ></div>
      <div
        className={
          "bg-english_vermillion text-english_vermillion h-0 display-none"
        }
      ></div>
      <div className={"bg-fuzzy_wuzzy text-fuzzy_wuzzy h-0 display-none"}></div>
      <div
        className={"bg-burnt_sienna text-burnt_sienna h-0 display-none"}
      ></div>
      <div className={"bg-cinnabar text-cinnabar h-0 display-none"}></div>
      <div className={"bg-fire_opal text-fire_opal h-0 display-none"}></div>
      <div className={"bg-cornsilk text-cornsilk h-0 display-none"}></div>
      <div className={"bg-golden_rod text-golden_rod h-0 display-none"}></div>
      <div className={"bg-burlywood text-burlywood h-0 display-none"}></div>
      <div
        className={"bg-arylide_yellow text-arylide_yellow h-0 display-none"}
      ></div>
      <div
        className={"bg-banana_mania text-banana_mania h-0 display-none"}
      ></div>
      <div className={"bg-buff_gold text-buff_gold h-0 display-none"}></div>
      <div
        className={"bg-café_au_lait text-café_au_lait h-0 display-none"}
      ></div>
      <div
        className={"bg-chrome_yellow text-chrome_yellow h-0 display-none"}
      ></div>
      <div
        className={"bg-cosmic_latte text-cosmic_latte h-0 display-none"}
      ></div>
      <div className={"bg-desert_sand text-desert_sand h-0 display-none"}></div>
      <div className={"bg-fawn text-fawn h-0 display-none"}></div>
      <div className={"bg-flex text-flex h-0 display-none"}></div>
      <div
        className={"bg-hairy_canary text-hairy_canary h-0 display-none"}
      ></div>
      <div className={"bg-papaya_whip text-papaya_whip h-0 display-none"}></div>
      <div className={"bg-misty_rose text-misty_rose h-0 display-none"}></div>
      <div className={"bg-pale_violet text-pale_violet h-0 display-none"}></div>
      <div
        className={"bg-mystic_maroon text-mystic_maroon h-0 display-none"}
      ></div>
      <div className={"bg-oval_orchid text-oval_orchid h-0 display-none"}></div>
      <div className={"bg-thistle text-thistle h-0 display-none"}></div>
      <div className={"bg-amethyst text-amethyst h-0 display-none"}></div>
      <div
        className={
          "bg-baker-miller_pink text-baker-miller_pink h-0 display-none"
        }
      ></div>
      <div className={"bg-byzantine text-byzantine h-0 display-none"}></div>
      <div className={"bg-byzantium text-byzantium h-0 display-none"}></div>
      <div className={"bg-china_pink text-china_pink h-0 display-none"}></div>
      <div className={"bg-china_rose text-china_rose h-0 display-none"}></div>
      <div
        className={"bg-cinnamon_satin text-cinnamon_satin h-0 display-none"}
      ></div>
      <div
        className={"bg-cotton_candy text-cotton_candy h-0 display-none"}
      ></div>
      <div className={"bg-cyclamen text-cyclamen h-0 display-none"}></div>
      <div
        className={"bg-dark_byzantium text-dark_byzantium h-0 display-none"}
      ></div>
      <div className={"bg-destiny text-destiny h-0 display-none"}></div>
      <div
        className={"bg-electric_violet text-electric_violet h-0 display-none"}
      ></div>
      <div className={"bg-eminence text-eminence h-0 display-none"}></div>
      <div className={"bg-fandango text-fandango h-0 display-none"}></div>
      <div className={"bg-fiery_rose text-fiery_rose h-0 display-none"}></div>
      <div className={"bg-suave_mauve text-suave_mauve h-0 display-none"}></div>
      <div className={"bg-tb0 text-tb0"}></div>
      <div className={"bg-tt0 text-tt0"}></div>
      <div className={"bg-tb1 text-tb1"}></div>
      <div className={"bg-tt1 text-tt1"}></div>
      <div className={"bg-tb2 text-tb2"}></div>
      <div className={"bg-tt2 text-tt2"}></div>
      <div className={"bg-tb3 text-tb3"}></div>
      <div className={"bg-tt3 text-tt3"}></div>
      <div className={"bg-tb4 text-tb4"}></div>
      <div className={"bg-tt4 text-tt4"}></div>
    </div>
  );
};
