<script setup>
import PlayIcon from "vue-material-design-icons/Play.vue";
import SkipNext from "vue-material-design-icons/SkipNext.vue";
import SkipPrevious from "vue-material-design-icons/SkipPrevious.vue";
import ShuffleVariant from "vue-material-design-icons/ShuffleVariant.vue";
import Repeat from "vue-material-design-icons/Repeat.vue";
import browser from "webextension-polyfill";

import messageTypeEnums from "../enums/messageTypeEnums";

const handleNextClick = () => {
  browser.runtime.sendMessage({ type: messageTypeEnums.nexSong });
};

const handlePrevClick = () => {
  browser.runtime.sendMessage({ type: messageTypeEnums.prevSong });
};

const handleShuffleClick = () => {
  browser.runtime.sendMessage({ type: messageTypeEnums.toggleShuffle });
};

const handleRepeatClick = () => {
  browser.runtime.sendMessage({ type: messageTypeEnums.toggleRepeat });
};

const handlePlaybackClick = () => {
  browser.runtime.sendMessage({ type: messageTypeEnums.togglePlayback });
};
</script>

<template>
  <div class="playbackControlsContainer">
    <button @click="handleShuffleClick">
      <ShuffleVariant :size="25" />
    </button>

    <button @click="handlePrevClick">
      <SkipPrevious :size="25" />
    </button>

    <button @click="handlePlaybackClick">
      <PlayIcon :size="35" />
    </button>

    <button @click="handleNextClick">
      <SkipNext :size="25" />
    </button>

    <button @click="handleRepeatClick">
      <Repeat :size="25" />
    </button>
  </div>
</template>

<style scoped>
.playbackControlsContainer {
  display: flex;
  gap: 15px;
  align-items: center;
}
</style>
