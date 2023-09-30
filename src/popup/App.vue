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

const handleStorageChange = ({ playbackData }) => {
  if (!playbackData) return;

  const { newValue } = playbackData;

  if (newValue) {
    isShuffleOn.value = newValue.isShuffleOn;
    isPlayingSong.value = newValue.isPlayingSong;
    isRepeatOn.value = newValue.isRepeatOn;
    song.value = newValue.song;
  } else {
    isShuffleOn.value = undefined;
    isPlayingSong.value = undefined;
    isRepeatOn.value = undefined;
    song.value = undefined;
  }
};

const handleRuntimeMessages = (message) => {
  switch (message.type) {
    case messageTypeEnums.popupInitResponse: {
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
  browser.storage.onChanged.addListener(handleStorageChange);
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
  browser.storage.onChanged.removeListener(handleStorageChange);
  browser.runtime.onMessage.removeListener(handleRuntimeMessages);
});
</script>

<template>
  <section v-if="isMainAppOpen">
    <div v-if="song?.id" class="appContainer">
      <div class="imageContainer">
        <img :src="song.songArt" class="songArt" />
      </div>

      <div class="playbackContainer">
        <PlaybackControls
          :isShuffleOn="isShuffleOn"
          :isPlayingSong="isPlayingSong"
          :isRepeatOn="isRepeatOn"
        />
      </div>
    </div>

    <div v-else>No song is currently playing in app</div>
  </section>

  <section v-else>
    <div>
      <p>Spotify clone is not open</p>
    </div>
  </section>
</template>

<style scoped>
.appContainer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.imageContainer {
  height: 80px;
  aspect-ratio: 1/1;
  background-color: red;
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
