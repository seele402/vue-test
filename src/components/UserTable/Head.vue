<template>
  <div class="table-head">
    <div
      class="table-cell-left"
      @click="changeSort('name', usersStore.selectedSortType)"
    >
      <div>Имя</div>
      <img
        v-show="usersStore.nameSortType != 0"
        src="@/assets/arrow.svg"
        :class="
          usersStore.nameSortType === 2 ? 'arrow-active' : 'arrow-inactive'
        "
      >
    </div>

    <div
      class="table-cell-right"
      @click="changeSort('phone', usersStore.selectedSortType)"
    >
      <div>Телефон</div>
      <img
        v-show="usersStore.phoneSortType != 0"
        src="@/assets/arrow.svg"
        :class="
          usersStore.phoneSortType === 2 ? 'arrow-active' : 'arrow-inactive'
        "
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '@/store/users';
import { SortType } from '@/types/SortTypes';

const usersStore = useUsersStore();

const changeSort = (sortBy: string, selectedSortType: SortType) => {
  usersStore.sortBy = sortBy;
  const sortTypes = Object.values(SortType) as SortType[];
  if (selectedSortType === sortTypes[sortTypes.length - 1]) {
    usersStore.selectedSortType = SortType.none;
    return;
  }
  usersStore.selectedSortType++;
};
</script>

<style scoped lang="scss">
.table-head {
  display: flex;
  width: 100%;
}

.table-cell-left,
.table-cell-right {
  box-shadow: 2px 0 0 0 #888, 0 2px 0 0 #888, 2px 2px 0 0 #888,
    2px 0 0 0 #888 inset, 0 2px 0 0 #888 inset;
  padding: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
}

.table-cell-left {
  display: flex;
  width: 120px;
  height: 20px;
}

.table-cell-right {
  display: flex;
  width: 240px;
}

.arrow-active,
.arrow-inactive {
  margin-left: auto;
}

.arrow-active {
  transform: rotateX(180deg);
}
</style>
