<template>
  <q-dialog ref="dialogRef">
    <q-card style="width: 300px">
      <q-card-section>
        <div class="text-h6">{{ $t('posts.deleteDialog.title') }}</div>
      </q-card-section>

      <q-card-section>{{ $t('posts.deleteDialog.message') }}</q-card-section>

      <q-card-actions align="right">
        <q-btn :label="$t('cancel')" color="primary" @click="onDialogCancel" />

        <q-btn :loading="isLoading" :label="$t('submit')" color="primary" @click="confirmDelete" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import type { Post } from 'src/types';
import { ref } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import { deletePost } from 'src/api';

const props = defineProps<{
  posts: Array<Post>;
}>();

const isLoading = ref<boolean>(false);

const { dialogRef, onDialogCancel, onDialogOK } = useDialogPluginComponent();

async function confirmDelete() {
  try {
    isLoading.value = true;

    const response: Array<PromiseSettledResult<{ id: number }>> = await Promise.allSettled(
      props.posts.map(async ({ id }) => {
        await deletePost(id);

        return { id };
      }),
    );

    onDialogOK(response);
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
}
</script>
