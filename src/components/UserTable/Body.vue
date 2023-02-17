<template>
  <div class="table-body">
    <TableRow
      v-for="user in usersStore.sortedUsers"
      :key="user.id"
      :user="user"
    />
  </div>
</template>

<script setup lang="ts">
import TableRow from './Row.vue';
import { useUsersStore } from '@/store/users';

const usersStore = useUsersStore();
</script>

<style scoped lang="scss">
.table-body {
  display: grid;
  width: 440px;
}
</style>
