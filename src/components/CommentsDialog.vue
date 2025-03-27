<template>
  <q-dialog ref="dialogRef">
    <q-card class="comments-card">
      <q-card-section class="row">
        <div class="text-h6">{{ $t('comments.dialog.title') }}</div>

        <q-space />

        <q-btn icon="close" size="sm" round @click="onDialogCancel" />
      </q-card-section>

      <q-card-section>
        <div v-if="isLoading" class="spinner-wrapper">
          <q-inner-loading showing />
        </div>

        <q-list v-else bordered separator>
          <q-item v-for="item in comments" :key="item.id">
            <q-item-section>
              <q-item-label caption>{{ item.email }}</q-item-label>
              <q-item-label>{{ item.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import type { Comment } from 'src/types';
import { ref, onMounted } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import { fetchComments } from 'src/api';

const props = defineProps<{
  postId: number;
}>();

const { dialogRef, onDialogCancel } = useDialogPluginComponent();

const comments = ref<Array<Comment>>([]);
const isLoading = ref<boolean>(false);

async function getComments() {
  try {
    isLoading.value = true;

    const { data } = await fetchComments(props.postId);

    comments.value = data;
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
}

onMounted(getComments);
</script>

<style scoped lang="scss">
.comments-card {
  width: 600px;
}

.spinner-wrapper {
  height: 40px;
}
</style>
