export const fee_tag_fn = {
  color_fn: (f) => {
    if (f == "label")
      return `bg-purple-500 bg-opacity-10 border border-purple-500 min-w-[6rem]`;
    if (f == "A") return "bg-red-500";
    if (f == "B") return "bg-pink-500";
    if (f == "C") return "bg-blue-500";
    if (f == "D") return "bg-orange-500";
    if (f == "E") return "bg-green-500";
    if (f == "F") return "bg-yellow-500";
    return "bg-indigo-500";
  },
  txt_fn: (f) => {
    if (f == "lable") return "Fees";
    if (f == "A") return "$25.00";
    if (f == "B") return "$15.00";
    if (f == "C") return "$10.00";
    if (f == "D") return "$5.00";
    if (f == "E") return "$2.50";
    if (f == "F") return "$0.00";
  },
};

export const poss_fn = {
  color_fn: (i) => {
    if (i === null) return "bg-black";
    if (i == "label")
      return `bg-c0 bg-opacity-10 border border-c0 min-w-[6rem]`;
    if (i <= 3) return `bg-yellow-500`;
    return `bg-slate-500`;
  },
  txt_fn: (i) => {
    if (i === null) return "na";
    if (i == 1) return `1st`;
    if (i == 2) return `2nd`;
    if (i == 3) return `3rd`;
    if (i >= 4) return `${i}th`;
  },
};
