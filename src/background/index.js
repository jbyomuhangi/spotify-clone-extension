import browser from "webextension-polyfill";

import { getSpotifyCloneTabs } from "../utils/commonUtils";

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case "next-song":
    case "prev-song": {
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
