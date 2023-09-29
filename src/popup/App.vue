<script setup>
import PlaybackControls from "./PlaybackControls.vue";
</script>

<template>
  <div class="appContainer">
    <div class="imageContainer"></div>

    <PlaybackControls />
  </div>
</template>

<style scoped>
.appContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 10px;
}

.imageContainer {
  height: 100px;
  width: 100px;
  background-color: red;
}
</style>
