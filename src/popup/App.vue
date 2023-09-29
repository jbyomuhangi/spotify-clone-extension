<script setup>
import PlaybackControls from "./PlaybackControls.vue";
</script>

<template>
  <div class="appContainer">
    <div class="imageContainer"></div>

    <div class="playbackContainer">
      <PlaybackControls />
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
</style>
