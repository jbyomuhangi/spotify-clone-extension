<script setup>
import PlayIcon from "vue-material-design-icons/Play.vue";
import SkipNext from "vue-material-design-icons/SkipNext.vue";
import SkipPrevious from "vue-material-design-icons/SkipPrevious.vue";
import ShuffleVariant from "vue-material-design-icons/ShuffleVariant.vue";
import Repeat from "vue-material-design-icons/Repeat.vue";
</script>

<template>
  <div class="playbackControlsContainer">
    <ShuffleVariant :size="25" />
    <SkipPrevious :size="25" />
    <PlayIcon :size="35" />
    <SkipNext :size="25" />
    <Repeat :size="25" />
  </div>
</template>

<style scoped>
.playbackControlsContainer {
  display: flex;
  gap: 15px;
  align-items: center;
}
</style>
