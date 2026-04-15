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
loadState();
