process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true;
module.exports = {
  presets: [
    [
      "@vue/app", { useBuiltIns: "entry" }
  ]
  ]
};
