<template>
  <div class="modal-form-container">
    <div class="header">
      <h2>Добавление пользователя</h2>
      <button
        class="close-button"
        @click="emit('modal-close-button-pressed')"
      />
    </div>

    <form
      action=""
      @submit.prevent="onSumbit"
    >
      <div class="input-container">
        <label class="input-label">Имя</label>
        <input
          v-model="newName"
          class="name-input"
          type="text"
          pattern="^[а-яА-ЯёЁa-zA-Z]+$"
          maxlength="30"
          placeholder="Имя"
          required
        >
      </div>

      <div class="input-container">
        <label class="input-label">Телефон</label>
        <div class="phone-input-container">
          +7
          <input
            v-model="newPhone"
            class="phone-input"
            type="string"
            pattern="^\d{10}$"
            maxlength="10"
            placeholder="##########"
            required
          >
        </div>
      </div>

      <div class="input-container">
        <label class="input-label">Начальник</label>
        <select
          v-model="userParent"
          class="parent-input"
        >
          <option>
            <option
              v-for="user in flattenedUsers"
              :key="user.id"
              :value="user"
            >
              {{ user.name }}
            </option>
          </option>
        </select>
      </div>

      <button
        class="save-button"
        type="submit"
      >
        Сохранить
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUsersStore } from '@/store/users';
import { User } from '@/types/user';

const emit = defineEmits(['modal-close-button-pressed'])

const usersStore = useUsersStore();
const newName = ref<string>('');
const newPhone = ref<string>('');
const userParent = ref<User>();

const flattenedUsers = computed(() => {
  return flattenUsers(usersStore.users);
});

const flattenUsers = (users: User[]) => {
  return users.reduce((prev, user) => {
    prev.push(user);

    if (!user.children.length) return prev;
    const children = flattenUsers(user.children);
    prev.push(...children);
    return prev;
  }, [] as User[]);
};

const onSumbit = () => {
  if (
    usersStore.users.some(
      (user) => user.name === newName.value && user.phone === newPhone.value
    )
  ) {
    alert('Такой пользователь уже есть в таблице.');
    return null;
  }
  usersStore.addNewUser(newName.value, newPhone.value, userParent.value);
  newName.value = '';
  newPhone.value = '';
};
</script>

<style scoped lang="scss">
h2 {
  margin: 0;
}

span {
  text-align: center;
}

.modal-form-container {
  box-sizing: border-box;
  margin-top: 20vh;
  width: 30vw;
  height: fit-content;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  padding: 40px;
  z-index: 100;
}

.header {
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;

  .close-button {
    border: none;
    box-shadow: none;
    padding: 0;
    width: 30px;
    height: 30px;
    background: no-repeat center url("https://svgshare.com/i/qEz.svg");

    &:hover {
      transform: scale(1.2);
    }
  }
}

.input-container {
  display: flex;
  gap: 100px;
  margin-bottom: 30px;
  justify-content: space-between;
  align-items: center;
}

.input-label {
  width: 30%;
  margin: 0;
}

.name-input,
.phone-input,
.parent-input {
  box-sizing: border-box;
  height: fit-content;
  width: 200px;
  padding: 4px;
  outline: none;
  font-size: 16px;
}

.phone-input-container {
  display: flex;
  text-align: center;
  align-items: center;
}

.phone-input {
  width: 176px;
  margin-left: 4px;
}
</style>
