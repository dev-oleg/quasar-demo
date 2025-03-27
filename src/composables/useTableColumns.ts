import type { QTableColumn } from 'quasar';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export function useTableColumns() {
  const { t } = useI18n();

  const userColumns = computed<Array<QTableColumn>>(() => [
    {
      name: 'id',
      field: 'id',
      label: t('users.table.id'),
      align: 'left',
    },
    {
      name: 'username',
      field: 'username',
      label: t('users.table.username'),
      align: 'left',
    },
    {
      name: 'name',
      field: 'name',
      label: t('users.table.name'),
      align: 'left',
    },
    {
      name: 'email',
      field: 'email',
      label: t('users.table.email'),
      align: 'left',
    },
    {
      name: 'actions',
      field: () => null,
      label: t('users.table.actions'),
      align: 'left',
    },
  ]);

  const postColumns = computed<Array<QTableColumn>>(() => [
    {
      name: 'id',
      field: 'id',
      label: t('posts.table.id'),
      align: 'left',
    },
    {
      name: 'title',
      field: 'title',
      label: t('posts.table.title'),
      align: 'left',
    },
    {
      name: 'body',
      field: 'body',
      label: t('posts.table.body'),
      align: 'left',
    },
  ]);

  const albumColumns = computed<Array<QTableColumn>>(() => [
    {
      name: 'id',
      field: 'id',
      label: t('albums.table.id'),
      align: 'left',
    },
    {
      name: 'title',
      field: 'title',
      label: t('albums.table.title'),
      align: 'left',
    },
  ]);

  const todoColumns = computed<Array<QTableColumn>>(() => [
    {
      name: 'id',
      field: 'id',
      label: t('todos.table.id'),
      align: 'left',
    },
    {
      name: 'title',
      field: 'title',
      label: t('todos.table.title'),
      align: 'left',
    },
    {
      name: 'status',
      field: 'completed',
      label: t('todos.table.completed'),
      align: 'left',
      sortable: true,
    },
  ]);

  return {
    userColumns,
    postColumns,
    albumColumns,
    todoColumns,
  };
}
