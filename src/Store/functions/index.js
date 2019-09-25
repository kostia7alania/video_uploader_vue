export const params = () => {
  const params = window.location.search
    .replace("?", "")
    .split("&")
    .reduce((p, e) => {
      const a = e.split("=");
      p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
      return p;
    }, {});
  if (params.def_uid && params.insp_uid) return params;
  window.store.dispatch("toast", {
    text: window.$t("Url is wrong"),
    type: "warning"
  });
};
