<template>
  <q-dialog ref="dialogRef">
    <q-card class="post-card">
      <q-card-section>
        <div class="text-h6">{{ $t('posts.createDialog.title') }}</div>
      </q-card-section>

      <q-card-section>
        <q-form ref="postForm">
          <q-input
            v-model="postTitle"
            :label="$t('posts.createDialog.form.title')"
            :rules="[(val) => !!val || $t('validation.required')]"
            outlined
            class="q-mb-md"
          />

          <q-input
            v-model="postBody"
            :label="$t('posts.createDialog.form.body')"
            :rules="[(val) => !!val || $t('validation.required')]"
            outlined
          />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn :label="$t('cancel')" color="primary" @click="onDialogCancel" />

        <q-btn :loading="isLoading" :label="$t('submit')" color="primary" @click="uploadPost" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import type { QForm } from 'quasar';
import { ref } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import { createPost } from 'src/api';

const props = defineProps<{
  userId: number;
}>();

const { dialogRef, onDialogCancel, onDialogOK } = useDialogPluginComponent();

const postTitle = ref<string>('');
const postBody = ref<string>('');

const isLoading = ref<boolean>(false);

const postForm = ref<QForm>();

async function uploadPost() {
  try {
    if (!postForm.value) return;

    const isFormValid: boolean = await postForm.value.validate();

    if (!isFormValid) return;

    isLoading.value = true;

    await createPost({
      title: postTitle.value,
      body: postBody.value,
      userId: props.userId,
    });

    onDialogOK();
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped lang="scss">
.post-card {
  width: 600px;
}
</style>
