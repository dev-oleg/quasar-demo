<template>
  <q-page class="q-pa-md">
    <q-table
      :loading="isUsersLoading"
      :columns="userColumns"
      :rows="users"
      row-key="id"
      :rows-per-page-options="[0]"
      :hide-bottom="hasUsers"
      :hide-header="!hasUsers"
      :style="{ 'overflow-y: auto': hasUsers }"
      class="users-table"
      @row-click="selectUser"
    >
      <template #loading>
        <q-inner-loading showing color="primary" />
      </template>

      <template #no-data>
        <NoData />
      </template>

      <template #body-cell-actions="scope">
        <q-td :props="scope">
          <q-btn
            :to="{ name: 'posts', params: { userId: scope.row.id } }"
            icon="description"
            size="sm"
            round
            class="q-mr-sm"
          />

          <q-btn
            :to="{ name: 'albums', params: { userId: scope.row.id } }"
            icon="photo_library"
            size="sm"
            round
            class="q-mr-sm"
          />

          <q-btn
            :to="{ name: 'todos', params: { userId: scope.row.id } }"
            icon="list_alt"
            size="sm"
            round
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import type { User } from 'src/types';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import NoData from 'components/NoData.vue';
import { useRouteId, useTableColumns } from 'src/composables';
import { useUsersStore } from 'stores/usersStore';

const router = useRouter();

const userId = useRouteId();

const usersStore = useUsersStore();
const { users, isUsersLoading } = storeToRefs(usersStore);

const { userColumns } = useTableColumns();

const hasUsers = computed<boolean>(() => users.value.length > 0);

async function selectUser(event: Event, { id }: User) {
  if (id === userId.value) {
    await router.push({ name: 'users' });
    return;
  }

  await router.push({ name: 'user', params: { userId: id } });
}
</script>

<style scoped lang="scss">
.users-table {
  max-height: calc(100vh - 82px);
}
</style>
