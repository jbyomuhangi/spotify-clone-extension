import browser from "webextension-polyfill";

export const getSpotifyCloneTabs = async () => {
  const validSpotifyCloneHostNames = ["localhost"];

  try {
    const allTabs = await browser.tabs.query({});

    const spotifyCloneTabs = allTabs.filter((tab) => {
      const parsedTabUrl = new URL(tab.url);
      const hostname = parsedTabUrl.hostname;

      const isSpotifyCloneApp = validSpotifyCloneHostNames.some((host) =>
        hostname.endsWith(host)
      );

      return isSpotifyCloneApp;
    });

    return spotifyCloneTabs;
  } catch (error) {
    return [];
  }
};
