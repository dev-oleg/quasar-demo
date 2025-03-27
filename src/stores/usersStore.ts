import type { User } from 'src/types';
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { fetchUsers } from 'src/api';
import { useRouteId } from 'src/composables';

export const useUsersStore = defineStore('users', () => {
  const userId = useRouteId();

  const users = ref<Array<User>>([]);
  const isUsersLoading = ref<boolean>(false);

  const currentUser = computed<User | undefined>(() =>
    users.value.find(({ id }) => id === userId.value),
  );

  async function getUsers() {
    try {
      isUsersLoading.value = true;

      const { data } = await fetchUsers();

      users.value = data;
    } catch (e) {
      console.error(e);
    } finally {
      isUsersLoading.value = false;
    }
  }

  return {
    users,
    isUsersLoading,
    currentUser,
    getUsers,
  };
});
