import browser from "webextension-polyfill";

import messageTypeEnums from "../enums/messageTypeEnums";
import { getSpotifyCloneTabs } from "../utils/commonUtils";

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case messageTypeEnums.nexSong:
    case messageTypeEnums.prevSong: {
      getSpotifyCloneTabs()
        .then((tabs) => {
          tabs.forEach((tab) => {
            browser.tabs
              .sendMessage(tab.id, { type: message.type })
              .catch((error) => {
                console.log("error sending message", { error });
              });
          });
        })
        .catch((error) => {
          console.log({ error });
        });

      return;
    }

    default: {
      return;
    }
  }
});
