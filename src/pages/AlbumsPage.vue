<template>
  <q-page class="q-pa-md">
    <q-table
      v-model:expanded="albumsExpanded"
      :loading="isAlbumsLoading"
      :columns="albumColumns"
      :rows="albums"
      row-key="id"
      :rows-per-page-options="[0]"
      :hide-bottom="hasAlbums"
      :hide-header="!hasAlbums"
      :style="{ 'overflow-y: auto': hasAlbums }"
      class="albums-table"
    >
      <template #loading>
        <q-inner-loading showing color="primary" />
      </template>

      <template #no-data>
        <NoData />
      </template>

      <template #header="scope">
        <q-tr :props="scope">
          <q-th auto-width />

          <q-th v-for="col in scope.cols" :key="col.name" :props="scope">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template #body="scope">
        <q-tr :props="scope">
          <q-td auto-width>
            <q-btn
              size="sm"
              color="primary"
              round
              @click="scope.expand = !scope.expand"
              :icon="scope.expand ? 'remove' : 'add'"
            />
          </q-td>

          <q-td v-for="col in scope.cols" :key="col.name" :props="scope">
            {{ col.value }}
          </q-td>
        </q-tr>

        <q-tr v-if="scope.expand" :props="scope" class="relative-position">
          <div v-if="albumPhotosLoadingSet.has(scope.row.id)" class="spinner-wrapper full-width">
            <q-inner-loading showing />
          </div>

          <q-td v-else colspan="100%">
            <q-list separator>
              <q-item v-for="photo in photos[scope.row.id]" :key="photo.id">
                <q-item-section avatar>
                  <q-avatar rounded>
                    <img :src="photo.url" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>#{{ photo.id }}</q-item-label>

                  <q-item-label caption>{{ photo.title }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import type { Album, Photo } from 'src/types';
import { ref, computed, onMounted, watch } from 'vue';
import { fetchAlbums, fetchPhotos } from 'src/api';
import NoData from 'components/NoData.vue';
import { useRouteId, useTableColumns } from 'src/composables';

const userId = useRouteId();
const { albumColumns } = useTableColumns();

const albums = ref<Array<Album>>([]);
const isAlbumsLoading = ref<boolean>(false);

const albumsExpanded = ref<Array<number>>([]);

const photos = ref<Record<number, Array<Photo>>>({});

const albumPhotosLoadingSet = ref(new Set<number>());

const hasAlbums = computed<boolean>(() => albums.value.length > 0);

async function getAlbums(userId: number) {
  try {
    isAlbumsLoading.value = true;

    const { data } = await fetchAlbums(userId);

    albums.value = data;
  } catch (e) {
    console.error(e);
  } finally {
    isAlbumsLoading.value = false;
  }
}

async function getPhotos(albumId: number) {
  try {
    albumPhotosLoadingSet.value.add(albumId);

    const { data } = await fetchPhotos(albumId);

    data.forEach((photo) => {
      photo.url = photo.url.replace('via.placeholder.com', 'placehold.co').concat('/ffffff');
    });

    photos.value[albumId] = data;
  } catch (e) {
    console.error(e);
  } finally {
    albumPhotosLoadingSet.value.delete(albumId);
  }
}

watch(
  albumsExpanded,
  async (newValue, oldValue) => {
    if (newValue.length > oldValue.length) {
      const albumId = newValue[newValue.length - 1];

      if (albumId) {
        await getPhotos(albumId);
      }
    }
  },
  { deep: true },
);

onMounted(async () => {
  await getAlbums(userId.value);
});
</script>

<style scoped lang="scss">
.albums-table {
  max-height: calc(100vh - 82px);
}

.spinner-wrapper {
  height: 56px;
}
</style>
