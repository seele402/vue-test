import { ref, watch, computed, Ref } from "vue";
import { defineStore } from "pinia";
import type { User } from "@/types/User";
import { SortType } from "@/types/SortTypes";

export const useUsersStore = defineStore("users", () => {
  const users = ref<User[]>([]);
  const sortBy = ref<string>("");
  const selectedSortType = ref<SortType>(SortType.none);
  const nameSortType = ref<SortType>(SortType.none);
  const phoneSortType = ref<SortType>(SortType.none);
  const sortedUsersRef = ref<User[]>([]);
  // hack: захардкоженный id, который в реальной ситуации бы приходил с backend с объектом.
  const currentUserIndex = ref(0);

  const addNewUser = (
    newUserName: string,
    newUserPhone: string,
    userParent?: User
  ) => {
    const newUser = <User>{
      id: currentUserIndex.value,
      name: newUserName,
      phone: newUserPhone,
      children: [],
    };

    currentUserIndex.value = currentUserIndex.value + 1;
    if (userParent) {
      userParent.children.push(newUser);
      return;
    }

    users.value.push(newUser);
  };

  const sortedUsers = computed(() => {
    sortedUsersRef.value = JSON.parse(JSON.stringify(users.value));

    if (sortBy.value === "phone") {
      sortBySelectedType(phoneSortType, nameSortType);
      return sortedUsersRef.value;
    }

    sortBySelectedType(nameSortType, phoneSortType);
    return sortedUsersRef.value;
  });

  const sortBySelectedType = (
    activeSortType: Ref<SortType>,
    inactiveSortType: Ref<SortType>
  ) => {
    activeSortType.value = selectedSortType.value;
    inactiveSortType.value = SortType.none;
    sortUsers(sortedUsersRef.value, activeSortType.value);
  };

  function sortUsers(users: User[], sortType: SortType) {
    users.forEach((user) => {
      if (user.children.length) {
        sortUsers(user.children, sortType);
      }
    });

    switch (sortType) {
      case SortType.none:
        users.sort(() => 0);
        break;
      case SortType.ascending:
        if (sortBy.value === "phone") {
          users.sort((a, b) => Number(a.phone) - Number(b.phone));
          break;
        }
        users.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SortType.descending:
        if (sortBy.value === "phone") {
          users.sort((a, b) => Number(b.phone) - Number(a.phone));
          break;
        }
        users.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
  }

  if (localStorage.getItem("users")) {
    users.value = JSON.parse(localStorage.getItem("users") || "{}");
  }

  if (localStorage.getItem("currentUserIndex")) {
    currentUserIndex.value = JSON.parse(
      localStorage.getItem("currentUserIndex") || "{}"
    );
  }

  watch(
    () => users.value,
    (state) => {
      if (users.value) localStorage.setItem("users", JSON.stringify(state));
      if (users.value[0] === undefined) localStorage.removeItem("users");
    },
    { deep: true }
  );

  watch(
    () => currentUserIndex.value,
    (state) => {
      if (currentUserIndex.value)
        localStorage.setItem("currentUserIndex", JSON.stringify(state));
      if (currentUserIndex.value === undefined)
        localStorage.removeItem("currentUserIndex");
    },
    { deep: true }
  );

  return {
    users,
    sortBy,
    addNewUser,
    sortedUsers,
    nameSortType,
    phoneSortType,
    selectedSortType,
  };
});
