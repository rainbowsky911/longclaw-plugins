const uriValueEl = document.getElementById("uriValue");

function loadState() {
  chrome.storage.local.get(["interceptUri"], (data) => {
    const uri = data.interceptUri || "";
    if (uri) {
      uriValueEl.textContent = uri;
      uriValueEl.className = "uri-value active";
    } else {
      uriValueEl.textContent = "未设置";
      uriValueEl.className = "uri-value empty";
    }
  });
}

chrome.storage.onChanged.addListener(() => loadState());

// 监听来自 content script 的加载状态请求
window.addEventListener("message", (e) => {
  if (e.data && e.data.type === "LC_LOAD_STATE") {
    loadState();
  }
});

loadState();
