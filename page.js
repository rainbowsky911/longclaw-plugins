/**
 * page.js - 注入到页面上下文
 * 直接操作 Vue 组件的 query.uri，调用 search() 方法
 */
(function () {
  "use strict";

  window.addEventListener("message", (e) => {
    if (!e.data || e.data.type !== "LC_SEARCH") return;
    doSearch(e.data.uri);
  });

  function doSearch(uri) {
    // 找到表格所在的业务组件（第2层父组件，有 query 和 result）
    const table = document.querySelector(".el-table");
    if (!table || !table.__vue__) return;

    let vue = table.__vue__;
    let depth = 0;
    while (vue && depth < 20) {
      if (vue.query && vue.result !== undefined && typeof vue.search === "function") {
        // 设置 uri
        vue.query.uri = (uri || "").trim();
        vue.query.pageNum = 1;
        console.log("[LC] query =", JSON.stringify(vue.query));
        vue.search();
        console.log("[LC] search() 已调用");
        return;
      }
      vue = vue.$parent;
      depth++;
    }
    console.log("[LC] 未找到业务组件");
  }
})();
