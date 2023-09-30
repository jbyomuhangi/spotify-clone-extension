<script setup>
import browser from "webextension-polyfill";
import { onMounted, onBeforeUnmount, ref, watch } from "vue";

import PlaybackControls from "./PlaybackControls.vue";

const songArt = ref();
const isShuffleOn = ref();
const isPlayingSong = ref();
const isRepeatOn = ref();

const handleStorageChange = ({ playbackData }) => {
  if (!playbackData) return;
  const { newValue } = playbackData;

  isShuffleOn.value = newValue.isShuffleOn;
  isPlayingSong.value = newValue.isPlayingSong;
  isRepeatOn.value = newValue.isRepeatOn;
  songArt.value = newValue.songArt;
};

onMounted(() => {
  browser.storage.onChanged.addListener(handleStorageChange);
});

onBeforeUnmount(() => {
  browser.storage.onChanged.removeListener(handleStorageChange);
});
</script>

<template>
  <div class="appContainer">
    <div class="imageContainer"><img :src="songArt" class="songArt" /></div>

    <div class="playbackContainer">
      <PlaybackControls
        :isShuffleOn="isShuffleOn"
        :isPlayingSong="isPlayingSong"
        :isRepeatOn="isRepeatOn"
      />
    </div>
  </div>
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
