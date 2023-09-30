<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import browser from "webextension-polyfill";

import messageTypeEnums from "../enums/messageTypeEnums";
import { getSpotifyCloneTabs } from "../utils/commonUtils";
import PlaybackControls from "./PlaybackControls.vue";

const isMainAppOpen = ref(false);

const song = ref();
const isShuffleOn = ref();
const isPlayingSong = ref();
const isRepeatOn = ref();

const handleRuntimeMessages = (message) => {
  switch (message.type) {
    case messageTypeEnums.playbackDataChange: {
      const { playbackData } = message;

      if (playbackData) {
        isShuffleOn.value = playbackData.isShuffleOn;
        isPlayingSong.value = playbackData.isPlayingSong;
        isRepeatOn.value = playbackData.isRepeatOn;
        song.value = playbackData.song;
      } else {
        isShuffleOn.value = undefined;
        isPlayingSong.value = undefined;
        isRepeatOn.value = undefined;
        song.value = undefined;
      }

      break;
    }

    default: {
      break;
    }
  }
};

onMounted(() => {
  browser.runtime.onMessage.addListener(handleRuntimeMessages);

  getSpotifyCloneTabs()
    .then((tabs) => {
      if (tabs.length === 0) {
        /* No tabs are open with the main app */
        isMainAppOpen.value = false;
      } else {
        /* At least 1 tab is open with the main app */
        isMainAppOpen.value = true;

        tabs.forEach((tab) => {
          browser.tabs
            .sendMessage(tab.id, { type: messageTypeEnums.popupInit })
            .catch(console.error);
        });
      }
    })
    .catch(console.error);
});

onBeforeUnmount(() => {
  browser.runtime.onMessage.removeListener(handleRuntimeMessages);
});
</script>

<template>
  <section v-if="isMainAppOpen">
    <div v-if="song?.id" class="appContainer">
      <div class="imageContainer">
        <img :key="song.id" :src="song.songArt" class="songArt" />
      </div>

      <div class="playbackContainer">
        <PlaybackControls
          :isShuffleOn="isShuffleOn"
          :isPlayingSong="isPlayingSong"
          :isRepeatOn="isRepeatOn"
        />
      </div>
    </div>

    <div v-else class="basicAppContainer">
      <p>No song is currently playing in app</p>
    </div>
  </section>

  <section v-else>
    <div class="basicAppContainer">
      <p>Spotify clone is not open</p>
    </div>
  </section>
</template>

<style scoped>
.basicAppContainer {
  display: flex;
  width: 200px;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.appContainer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.imageContainer {
  height: 80px;
  aspect-ratio: 1/1;
}

.playbackContainer {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 0px 10px;
}

.songArt {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
</style>
