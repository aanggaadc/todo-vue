<script lang="ts">
import { defineComponent, computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ActivityState } from "@/store/module/activity";
import Header from "@/components/shared/Header.vue";
import PencilIcon from "../icons/Pencil.vue";
import PlusIcon from "../icons/Plus.vue";
import Spinner from "@/components/shared/Spinner.vue";

export default defineComponent({
  name: "ActivityView",
  components: {
    Header,
    PencilIcon,
    PlusIcon,
    Spinner,
  },
  setup() {
    const route = useRoute();
    const store = useStore<ActivityState>();
    const param = route.params.id;
    const editMode = ref(false);
    const activity = computed(() => store.getters.activity);
    const isLoading = computed(() => store.getters.loadingActivity);

    onMounted(() => {
      store.dispatch("fetchActivity", param);
    });

    return { activity, isLoading, editMode };
  },
});
</script>

<template>
  <Header :title="isLoading ? 'loading...' : activity.title" backNav />

  <main className="p-8 font-poppins max-w-screen-lg mx-auto lg:py-8 lg:px-0">
    <div
      v-if="isLoading"
      className="min-h-[calc(100vh_-_64px)] lg:min-h-[calc(100vh_-_105px)] flex items-center justify-center"
    >
      <Spinner />
    </div>

    <div
      v-else
      className="flex flex-col md:flex-row md:items-center md:justify-between"
    >
      <div
        :class="[
          'p-2 flex items-center justify-between mb-6 md:mb-0 md:gap-2',
          { 'border-b': editMode },
        ]"
      >
        <input
          v-if="editMode"
          ref="{inputRef}"
          className="font-bold text-lg md:text-3xl w-[80%] focus:border-none focus:outline-none"
          :value="activity.title"
        />

        <h2
          v-else
          data-cy="todo-title"
          className="font-bold text-lg md:text-3xl"
        >
          {{ activity.title }}
        </h2>

        <button data-cy="todo-title-edit-button">
          <PencilIcon />
        </button>
      </div>

      <div className="flex justify-end gap-2">
        <button
          data-cy="todo-add-button"
          className="w-[100px] md:w-[120px] font-poppins text-xs font-semibold text-white rounded-3xl p-3 bg-primary flex items-center justify-center gap-1 md:text-sm md:px-6"
        >
          <PlusIcon />
          Tambah
        </button>
      </div>
    </div>
  </main>
</template>
