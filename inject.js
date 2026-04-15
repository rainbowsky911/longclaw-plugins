/**
 * inject.js - content script
 * 1. 注入 page.js 到页面上下文
 * 2. 在"选择应用接口"旁边注入 URI 输入框
 */
(function () {
  "use strict";

  // 注入 page.js
  const s = document.createElement("script");
  s.src = chrome.runtime.getURL("page.js");
  s.onload = () => s.remove();
  (document.head || document.documentElement).appendChild(s);

  const WIDGET_ID = "lc-uri-filter";
  let debounceTimer = null;

  function findTargetCell() {
    for (const label of document.querySelectorAll(".el-descriptions-item__label")) {
      if (label.textContent.trim() === "选择应用接口") {
        const row = label.closest("tr");
        return row ? row.querySelector(".el-descriptions-item__content") : null;
      }
    }
    return null;
  }

  function createWidget() {
    const wrap = document.createElement("span");
    wrap.id = WIDGET_ID;
    wrap.innerHTML = `
      <span class="lc-label">URI:</span>
      <input type="text" class="lc-input" placeholder="输入URI回车搜索" />
      <button class="lc-btn-search">搜索</button>
      <button class="lc-btn-clear">清空</button>
    `;

    const input = wrap.querySelector(".lc-input");
    const searchBtn = wrap.querySelector(".lc-btn-search");
    const clearBtn = wrap.querySelector(".lc-btn-clear");

    function doSearch() {
      const uri = input.value.trim();
      input.classList.toggle("active", uri.length > 0);
      window.postMessage({ type: "LC_SEARCH", uri }, "*");
    }

    function doClear() {
      input.value = "";
      input.classList.remove("active");
      // 清空后重新搜索（不带 uri）
      window.postMessage({ type: "LC_SEARCH", uri: "" }, "*");
    }

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { e.preventDefault(); doSearch(); }
    });
    searchBtn.addEventListener("click", doSearch);
    clearBtn.addEventListener("click", doClear);

    return wrap;
  }

  function tick() {
    const exists = document.getElementById(WIDGET_ID);
    const cell = findTargetCell();
    if (cell && !exists) cell.appendChild(createWidget());
    else if (!cell && exists) exists.remove();
  }

  function init() {
    if (!document.body) { document.addEventListener("DOMContentLoaded", init); return; }
    new MutationObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(tick, 300);
    }).observe(document.body, { childList: true, subtree: true });
    setTimeout(tick, 500);
    setInterval(tick, 1500);
  }

  init();
})();
