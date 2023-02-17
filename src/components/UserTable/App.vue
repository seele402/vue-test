<template>
  <div class="main-container">
    <div class="users-table">
      <TableHead />
      <div
        v-if="!usersStore.users.length"
        class="empty-message"
      >
        Пока здесь пусто. Используйте форму ниже, чтобы добавить новых
        пользователей
      </div>
      <TableBody />
    </div>
    <button
      class="add-user-button"
      @click="emit('add-user-button-pressed')"
    >
      Добавить
    </button>
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '@/store/users';
import TableBody from './Body.vue';
import TableHead from './Head.vue';

const emit = defineEmits<{
  (e: 'add-user-button-pressed'): void 
}>()

const usersStore = useUsersStore();
</script>

<style scoped lang="scss">
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  .users-table {
    display: flex;
    flex-direction: column;
  }
  .add-user-button {
    margin-top: 20px;
  }
}

.empty-message {
  box-shadow: 2px 0 0 0 #888, 0 2px 0 0 #888, 2px 2px 0 0 #888,
    2px 0 0 0 #888 inset, 0 2px 0 0 #888 inset;
  padding: 20px;
  height: 20px;
  text-align: center;
  overflow-wrap: break-word;
  width: 400px;
  text-align: center;
  height: fit-content;
  padding: 20px;
}
</style>
