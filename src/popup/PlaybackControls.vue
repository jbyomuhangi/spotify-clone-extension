<script setup>
import { toRefs } from "vue";
import PauseIcon from "vue-material-design-icons/Pause.vue";
import PlayIcon from "vue-material-design-icons/Play.vue";
import Repeat from "vue-material-design-icons/Repeat.vue";
import ShuffleVariant from "vue-material-design-icons/ShuffleVariant.vue";
import SkipNext from "vue-material-design-icons/SkipNext.vue";
import SkipPrevious from "vue-material-design-icons/SkipPrevious.vue";
import browser from "webextension-polyfill";

import messageTypeEnums from "../enums/messageTypeEnums";

const props = defineProps({
  isShuffleOn: Boolean,
  isPlayingSong: Boolean,
  isRepeatOn: Boolean,
});
const { isShuffleOn, isPlayingSong, isRepeatOn } = toRefs(props);

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
      <ShuffleVariant :size="25" :class="{ greenIcon: isShuffleOn }" />
    </button>

    <button @click="handlePrevClick">
      <SkipPrevious :size="25" />
    </button>

    <button @click="handlePlaybackClick">
      <component :is="isPlayingSong ? PauseIcon : PlayIcon" :size="35" />
    </button>

    <button @click="handleNextClick">
      <SkipNext :size="25" />
    </button>

    <button @click="handleRepeatClick">
      <Repeat :size="25" :class="{ greenIcon: isRepeatOn }" />
    </button>
  </div>
</template>

<style scoped>
.playbackControlsContainer {
  display: flex;
  gap: 15px;
  align-items: center;
}

.greenIcon {
  color: #1ed760;
}
</style>
