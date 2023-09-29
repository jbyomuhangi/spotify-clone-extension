import browser from "webextension-polyfill";

browser.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case "next-song":
    case "prev-song": {
      window.postMessage({ type: message.type }, window.origin);
      return;
    }

    default: {
      return;
    }
  }
});
