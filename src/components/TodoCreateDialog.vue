<template>
  <q-dialog ref="dialogRef">
    <q-card class="todo-card">
      <q-card-section>
        <div class="text-h6">{{ $t('todos.createDialog.title') }}</div>
      </q-card-section>

      <q-card-section>
        <q-form ref="todoForm">
          <q-input
            v-model="todoTitle"
            :label="$t('todos.createDialog.form.title')"
            :rules="[(val) => !!val || $t('validation.required')]"
            outlined
            class="q-mb-md"
          />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn :label="$t('cancel')" color="primary" @click="onDialogCancel" />

        <q-btn :loading="isLoading" :label="$t('submit')" color="primary" @click="uploadTodo" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import type { QForm } from 'quasar';
import { ref } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import { createTodo } from 'src/api';

const props = defineProps<{
  userId: number;
}>();

const { dialogRef, onDialogCancel, onDialogOK } = useDialogPluginComponent();

const todoTitle = ref<string>('');

const isLoading = ref<boolean>(false);

const todoForm = ref<QForm>();

async function uploadTodo() {
  try {
    if (!todoForm.value) return;

    const isFormValid: boolean = await todoForm.value.validate();

    if (!isFormValid) return;

    isLoading.value = true;

    await createTodo({
      title: todoTitle.value,
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
.todo-card {
  width: 600px;
}
</style>
