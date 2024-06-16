<script lang="ts">
import { defineComponent, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { ActivityState } from "../store/module/activity";
import Header from "@/components/shared/Header.vue";
import LoadingState from "@/components/dashboard/LoadingState.vue";
import EmptyState from "@/components/dashboard/EmptyState.vue";
import ActivityCard from "@/components/dashboard/ActivityCard.vue";
import PlusIcon from "../icons/Plus.vue";

export default defineComponent({
  name: "DashboardView",
  components: {
    Header,
    LoadingState,
    EmptyState,
    ActivityCard,
    PlusIcon,
  },
  setup() {
    const store = useStore<ActivityState>();
    const activities = computed(() => store.getters.activities);
    const isLoading = computed(() => store.getters.loadingActivities);

    const getActivities = async () => {
      store.dispatch("fetchActivities");
    };

    onMounted(() => {
      getActivities();
    });

    return { activities, isLoading };
  },
});
</script>

<template>
  <Header title="TODO LIST APP" />

  <main
    class="w-full overflow-hidden mx-auto max-w-screen-lg min-h-[calc(100vh_-_64px)] px-5 py-6 lg:px-0 lg:py-8 font-poppins flex flex-col lg:min-h-[calc(100vh_-_105px)]"
  >
    <div class="flex items-center justify-between">
      <h2
        data-cy="activity-title"
        class="font-bold text-base md:text-2xl lg:text-4xl"
      >
        Activity
      </h2>

      <button
        data-cy="activity-add-button"
        class="font-poppins text-xs font-semibold text-white rounded-3xl p-3 bg-primary flex items-center gap-1 md:text-sm md:px-6"
      >
        <PlusIcon />
        Tambah
      </button>
    </div>

    <LoadingState v-if="isLoading" />
    <EmptyState v-else-if="!activities.length" />
    <div v-else class="w-full flex flex-wrap gap-5 mt-9">
      <ActivityCard
        v-for="activity in activities"
        :key="activity.id"
        :id="activity.id"
        :title="activity.title"
        :date="new Date(activity.created_at)"
      />
    </div>
  </main>
</template>
