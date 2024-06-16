<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "EmptyState",
});
</script>

<template>
  <div
    data-cy="activity-empty-state"
    class="grow flex items-center justify-center"
  >
    <img
      src="/images/activity-empty-state.png"
      alt="empty"
      class="w-full md:w-1/2 cursor-pointer"
    />
  </div>
</template>
