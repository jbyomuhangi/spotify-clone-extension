import browser from "webextension-polyfill";

import messageTypeEnums from "../enums/messageTypeEnums";
import { getSpotifyCloneTabs } from "../utils/commonUtils";

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case messageTypeEnums.nexSong:
    case messageTypeEnums.prevSong:
    case messageTypeEnums.togglePlayback:
    case messageTypeEnums.toggleShuffle:
    case messageTypeEnums.toggleRepeat: {
      getSpotifyCloneTabs()
        .then((tabs) => {
          tabs.forEach((tab) => {
            browser.tabs
              .sendMessage(tab.id, { type: message.type })
              .catch(console.error);
          });
        })
        .catch(console.error);

      return;
    }

    default: {
      return;
    }
  }
});
