<template>
  <div>
    <ModalWindow
      v-show="isModalActive"
      @modal-close-pressed="isModalActive = false"
    />
    <UserTable @add-user-button-pressed="isModalActive = true" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ModalWindow from './components/Modal/App.vue';
import UserTable from './components/UserTable/App.vue';
const isModalActive = ref(false);
</script>

<style scoped lang="scss"></style>
