<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>{{ pageTitle }}</q-toolbar-title>

        <div v-if="currentUser" class="q-mr-md">
          <span class="q-mr-xs">{{ $t('users.currentUser') }}:</span>

          <span class="text-weight-bold">{{ currentUser.username }}</span>
        </div>

        <div>
          <q-select
            v-model="locale"
            :options="localeOptions"
            label="Quasar Language"
            dense
            outlined
            emit-value
            map-options
            options-dense
            class="lang-switch"
            style="min-width: 150px"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>{{ $t('navigation') }}</q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { LocalStorage } from 'quasar';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';
import { useRouteId } from 'src/composables';
import { useUsersStore } from 'stores/usersStore';

const localeOptions = [
  { value: 'en-US', label: 'English' },
  { value: 'ru', label: 'Русский' },
];

const route = useRoute();

const { locale, t } = useI18n({ useScope: 'global' });

const userId = useRouteId();

const usersStore = useUsersStore();
const { currentUser } = storeToRefs(usersStore);

const leftDrawerOpen = ref(false);

const pageTitle = computed<string>(() => {
  const page = route.meta.title as string;

  return t(`page.${page}`);
});

const linksList = computed<Array<EssentialLinkProps>>(() => [
  {
    title: t('page.users'),
    icon: 'person',
    to: { name: 'users' },
  },
  {
    title: t('page.posts'),
    icon: 'description',
    to: { name: 'posts', params: { userId: userId.value } },
    disabled: !userId.value,
  },
  {
    title: t('page.albums'),
    icon: 'photo_library',
    to: { name: 'albums', params: { userId: userId.value } },
    disabled: !userId.value,
  },
  {
    title: t('page.todos'),
    icon: 'list_alt',
    to: { name: 'todos', params: { userId: userId.value } },
    disabled: !userId.value,
  },
]);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

watch(locale, () => {
  LocalStorage.setItem('jsonPlaceholderLang', locale.value);
});

onMounted(async () => {
  const lang = LocalStorage.getItem('jsonPlaceholderLang');

  if (lang) locale.value = lang as string;

  await usersStore.getUsers();
});
</script>

<style scoped lang="scss">
.lang-switch {
  min-width: 150px;
  background-color: #fff;
}
</style>
