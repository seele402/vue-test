<template>
  <div class="table-row">
    <div class="table-cell-left">
      <button
        v-if="hasChildren"
        :class="isExpanded ? 'expand-button-active' : 'expand-button-inactive'"
        @click="isExpanded = !isExpanded"
      />
      <div>{{ props.user.name }}</div>
    </div>

    <div class="table-cell-right">
      +7 {{ userPhone }}
    </div>

    <div
      v-if="hasChildren"
      v-show="isExpanded"
      class="subbody"
    >
      <Row
        v-for="child in user.children"
        :key="child.id"
        :user="child"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { User } from '@/types/User';
import { defineProps, computed, ref } from 'vue';

const isExpanded = ref(false);
const RANDOM_COLOR = `#${((Math.random() * 0xffffff) << 0).toString(16)}`;

const props = defineProps<{
  user: User;
}>();
const hasChildren = computed(() => !!props.user.children.length);

const userPhone = computed(
  () =>
    `${props.user.phone.slice(0, 3)} ${props.user.phone.slice(
      3,
      6
    )} ${props.user.phone.slice(6, 8)} ${props.user.phone.slice(8, 10)}`
);
</script>

<style scoped lang="scss">
.table-row {
  display: flex;
  flex-wrap: wrap;
}
.table-cell-left,
.table-cell-right {
  box-shadow: 2px 0 0 0 #888, 0 2px 0 0 #888, 2px 2px 0 0 #888,
    2px 0 0 0 #888 inset, 0 2px 0 0 #888 inset;
  padding: 20px;
  height: 20px;
  text-align: center;
}
.table-cell-left {
  width: 120px;
  height: 20px;
  display: flex;
}
.table-cell-right {
  width: 240px;
}
.expand-button-inactive,
.expand-button-active {
  width: 20px;
  height: 20px;
  padding: 0;
  border: 0;
  background: no-repeat center url("@/assets/arrow.svg");
  box-shadow: 0px 0px 0px;
  &:hover {
    background-color: transparent;
  }
}
.expand-button-inactive {
  transform: rotate(270deg);
}
.subbody {
  align-self: flex-end;
  box-shadow: inset 8px 0px 0px 0px v-bind(RANDOM_COLOR);
}
</style>
