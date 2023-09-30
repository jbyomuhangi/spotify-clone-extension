import browser from "webextension-polyfill";

import messageTypeEnums from "../enums/messageTypeEnums";

browser.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case messageTypeEnums.nexSong:
    case messageTypeEnums.prevSong:
    case messageTypeEnums.togglePlayback:
    case messageTypeEnums.toggleShuffle:
    case messageTypeEnums.toggleRepeat: {
      window.postMessage({ type: message.type }, window.origin);
      return;
    }

    default: {
      return;
    }
  }
});

window.addEventListener("message", (event) => {
  const { data } = event;

  switch (data.type) {
    case messageTypeEnums.playbackDataChange: {
      browser.storage.sync
        .set({ playbackData: data.playbackData })
        .catch(console.error);
      break;
    }
    default: {
      break;
    }
  }
});
