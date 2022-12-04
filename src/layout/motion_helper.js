export const MotionPage = {
  slide: {
    variants: {
      hidden: { opacity: 0, x: "100vw" },
      visible: {
        opacity: 1,
        x: 0,
        transition: { delay: 0.4 },
        beforeChildren: true,
      },
      exit: { opacity: 0, x: "-100vw" },
    },
    transition: { when: "beforeChildren" },
    initial: "hidden",
    animate: "visible",
    exit: "exit",
  },
};

export const MotionSection = {
  slide: {
    variants: {
      hidden: { opacity: 0, x: 100 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { delay: 0.4 },
        beforeChildren: true,
      },
      exit: { opacity: 1, x: 100 },
    },
    transition: { when: "beforeChildren" },
    initial: "hidden",
    animate: "visible",
    exit: "exit",
  },
  fade: {
    variants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { delay: 0.5 },
        when: "beforeChildren",
      },
      exit: { opacity: 0 },
    },
    initial: "hidden",
    animate: "visible",
    exit: "exit",
  },
};

export const Mo = {
  slide: ({
    variants = [],
    x = [0, 0, 0],
    y = [0, 0, 0],
    opacity = [0, 1, 0],
    transition = {},
  } = {}) => ({
    variants: {
      hidden: { opacity: opacity[0], x: x[0], y: y[0] },
      visible: { opacity: opacity[1], x: x[1], y: y[1] },
      exit: { opacity: opacity[2], x: x[2], y: y[2] },
      ...variants,
    },
    initial: "hidden",
    animate: "visible",
    exit: "exit",
    transition: { when: "beforeChildren", ...transition },
    className: "",
  }),
  expand: ({ transition = {} } = {}) => ({
    initial: { height: 0, width: "100%", opacity: 0 },
    exit: { height: 0, width: "100%", opacity: 0 },
    animate: { height: "auto", width: "100%", opacity: 1 },
    transition: { when: "beforeChildren", ...transition },
  }),
};
