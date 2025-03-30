<template>
  <q-page class="q-pa-md">
    <q-table
      :loading="isTodosLoading"
      :columns="todoColumns"
      :rows="todosFiltered"
      row-key="id"
      :rows-per-page-options="[0]"
      :hide-bottom="hasTodos"
      :hide-header="!hasTodos"
      :style="{ 'overflow-y: auto': hasTodos }"
      class="todos-table"
    >
      <template #loading>
        <q-inner-loading showing color="primary" />
      </template>

      <template #no-data>
        <NoData />
      </template>

      <template #top>
        <q-input
          :model-value="textFilter"
          :label="$t('filter')"
          outlined
          clearable
          style="width: 300px"
          @update:model-value="updateTextFilter"
        />

        <q-toggle
          toggle-indeterminate
          v-model="statusFilter"
          :label="$t('todos.status')"
          checked-icon="check_circle"
          unchecked-icon="cancel"
        />

        <q-space />

        <q-btn icon="add" size="md" round @click="openTodoCreateDialog" />
      </template>

      <template #body-cell-status="scope">
        <q-td :props="scope">
          <q-btn
            :icon="scope.row.completed ? 'check_circle' : 'cancel'"
            :text-color="scope.row.completed ? 'positive' : 'negative'"
            size="sm"
            round
            @click="toggleCompleted(scope.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import type { QInputProps } from 'quasar';
import type { Todo } from 'src/types';
import { ref, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { fetchTodos } from 'src/api';
import NoData from 'components/NoData.vue';
import TodoCreateDialog from 'components/TodoCreateDialog.vue';
import { useRouteId, useTableColumns } from 'src/composables';

const $q = useQuasar();

const userId = useRouteId();
const { todoColumns } = useTableColumns();

const todos = ref<Array<Todo>>([]);
const isTodosLoading = ref<boolean>(false);

const textFilter = ref<string>('');
const statusFilter = ref<boolean | null>(null);

const todosFiltered = computed<Array<Todo>>(() => {
  if (statusFilter.value === null) {
    return todos.value.filter(({ title }) => title.includes(textFilter.value));
  }

  return todos.value.filter(
    ({ title, completed }) => title.includes(textFilter.value) && completed === statusFilter.value,
  );
});

const hasTodos = computed<boolean>(() => todosFiltered.value.length > 0);

async function getTodos(userId: number) {
  try {
    isTodosLoading.value = true;

    const { data } = await fetchTodos(userId);

    todos.value = data;
  } catch (e) {
    console.error(e);
  } finally {
    isTodosLoading.value = false;
  }
}

function openTodoCreateDialog() {
  $q.dialog({
    component: TodoCreateDialog,
    componentProps: {
      userId: userId.value,
    },
  });
}

function updateTextFilter(value: QInputProps['modelValue']) {
  textFilter.value = (value ?? '') as string;
}

function toggleCompleted(idToggled: number) {
  const todo = todos.value.find(({ id }) => id === idToggled);

  if (todo) todo.completed = !todo.completed;
}

onMounted(async () => {
  await getTodos(userId.value);
});
</script>

<style scoped lang="scss">
.todos-table {
  max-height: calc(100vh - 82px);
}
</style>
