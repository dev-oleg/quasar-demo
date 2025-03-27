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
            icon="description"
            size="sm"
            round
            class="q-mr-sm"
            @click="goToRoute('posts', scope.row.id)"
          />

          <q-btn
            icon="photo_library"
            size="sm"
            round
            class="q-mr-sm"
            @click="goToRoute('albums', scope.row.id)"
          />

          <q-btn icon="list_alt" size="sm" round @click="goToRoute('todos', scope.row.id)" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import NoData from 'components/NoData.vue';
import { useTableColumns } from 'src/composables';
import { useUsersStore } from 'stores/usersStore';

const router = useRouter();

const usersStore = useUsersStore();
const { users, isUsersLoading } = storeToRefs(usersStore);

const { userColumns } = useTableColumns();

const hasUsers = computed<boolean>(() => users.value.length > 0);

async function goToRoute(name: string, id: number) {
  await router.push({ name, params: { userId: id } });
}
</script>

<style scoped lang="scss">
.users-table {
  max-height: calc(100vh - 82px);
}
</style>
