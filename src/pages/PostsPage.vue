<template>
  <q-page class="q-pa-md">
    <q-table
      v-model:selected="postsSelected"
      :loading="isPostsLoading"
      :columns="postColumns"
      :rows="postsFiltered"
      row-key="id"
      :rows-per-page-options="[0]"
      :grid="hasPosts"
      :hide-bottom="hasPosts"
      hide-header
      :flat="!hasPosts"
      selection="multiple"
      :style="{ 'overflow-y: auto': hasPosts }"
      class="posts-table"
      @row-click="openCommentsDialog"
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

        <q-space />

        <q-btn
          icon="delete"
          size="md"
          round
          :disable="!postsSelected.length"
          text-color="negative"
          class="q-mr-md"
          @click="openPostsDeleteDialog"
        />

        <q-btn icon="add" size="md" round @click="openPostCreateDialog" />
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import type { QInputProps } from 'quasar';
import type { Post } from 'src/types';
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar, Notify } from 'quasar';
import { fetchPosts } from 'src/api';
import NoData from 'components/NoData.vue';
import PostCreateDialog from 'components/PostCreateDialog.vue';
import PostsDeleteDialog from 'components/PostsDeleteDialog.vue';
import CommentsDialog from 'components/CommentsDialog.vue';
import { useRouteId, useTableColumns } from 'src/composables';

const { t } = useI18n();

const $q = useQuasar();

const userId = useRouteId();
const { postColumns } = useTableColumns();

const posts = ref<Array<Post>>([]);
const isPostsLoading = ref<boolean>(false);

const postsSelected = ref<Array<Post>>([]);

const textFilter = ref<string>('');

const postsFiltered = computed<Array<Post>>(() =>
  posts.value.filter(
    ({ title, body }) => title.includes(textFilter.value) || body.includes(textFilter.value),
  ),
);

const hasPosts = computed<boolean>(() => postsFiltered.value.length > 0);

async function getPosts() {
  try {
    isPostsLoading.value = true;

    const { data } = await fetchPosts(userId.value);

    posts.value = data;
  } catch (e) {
    console.error(e);
  } finally {
    isPostsLoading.value = false;
  }
}

function openPostCreateDialog() {
  $q.dialog({
    component: PostCreateDialog,
    componentProps: {
      userId: userId.value,
    },
  });
}

function openPostsDeleteDialog() {
  $q.dialog({
    component: PostsDeleteDialog,
    componentProps: {
      posts: postsSelected.value,
    },
  }).onOk((payload: Array<PromiseSettledResult<{ id: number }>>) => {
    const idsSuccess: Array<number> = payload.reduce<Array<number>>((acc, item) => {
      if (item.status === 'fulfilled') acc.push(item.value.id);
      return acc;
    }, []);

    const postsSuccess: Array<Post> = postsSelected.value.filter(({ id }) =>
      idsSuccess.includes(id),
    );

    const postsError: Array<Post> = postsSelected.value.filter(
      ({ id }) => !idsSuccess.includes(id),
    );

    postsSuccess.forEach(({ title }) => {
      Notify.create({
        message: t('posts.deleteDialog.result.success', { title }),
        caption: title,
        type: 'positive',
      });
    });

    postsError.forEach(({ title }) => {
      Notify.create({
        message: t('posts.deleteDialog.result.error', { title }),
        caption: title,
        type: 'negative',
      });
    });

    postsSelected.value = [];
  });
}

function updateTextFilter(value: QInputProps['modelValue']) {
  textFilter.value = (value ?? '') as string;
}

function openCommentsDialog(evt: Event, post: Post) {
  $q.dialog({
    component: CommentsDialog,
    componentProps: {
      postId: post.id,
    },
  });
}

onMounted(getPosts);
</script>

<style scoped lang="scss">
.posts-table {
  max-height: calc(100vh - 82px);

  :deep(.q-table__grid-content) {
    gap: 16px;
    max-height: calc(100vh - 140px);
    overflow: auto;
  }

  :deep(.q-table__grid-item) {
    width: 100%;
  }

  :deep(.q-table__grid-item--selected) {
    transform: none;
  }

  :deep(.q-table__grid-item-card) {
    cursor: pointer;
  }
}
</style>
