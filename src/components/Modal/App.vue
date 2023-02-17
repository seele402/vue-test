<template>
  <div class="modal-container">
    <div
      class="modal-background"
      @click="emit('modal-close-pressed')"
    />
    <ModalForm @modal-close-button-pressed="$emit('modal-close-pressed')" />
  </div>
</template>

<script setup lang='ts'>
import ModalForm from './Form.vue';
const emit = defineEmits(['modal-close-pressed'])
</script>

<style scoped lang="scss">
.modal-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.103);
  display: flex;
  justify-content: center;
}
.modal-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}
</style>
