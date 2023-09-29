import browser from "webextension-polyfill";

import messageTypeEnums from "../enums/messageTypeEnums";

browser.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case messageTypeEnums.nexSong:
    case messageTypeEnums.prevSong: {
      window.postMessage({ type: message.type }, window.origin);
      return;
    }

    default: {
      return;
    }
  }
});
