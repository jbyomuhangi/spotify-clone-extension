<script setup>
import PlayIcon from "vue-material-design-icons/Play.vue";
import SkipNext from "vue-material-design-icons/SkipNext.vue";
import SkipPrevious from "vue-material-design-icons/SkipPrevious.vue";
import ShuffleVariant from "vue-material-design-icons/ShuffleVariant.vue";
import Repeat from "vue-material-design-icons/Repeat.vue";
</script>

<template>
  <div class="playbackControlsContainer">
    <input class="playbackInput" type="range" :min="0" :max="100" :step="1" />

    <div class="playbackIconsContainer">
      <ShuffleVariant :size="25" />
      <SkipPrevious :size="25" />
      <PlayIcon :size="35" />
      <SkipNext :size="25" />
      <Repeat :size="25" />
    </div>
  </div>
</template>

<style scoped>
.playbackControlsContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;
}

.playbackInput {
  height: 4px;
  width: 80%;
  widows: 100%;
  accent-color: #1ed760;
}

.playbackIconsContainer {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>
