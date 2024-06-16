<script lang="ts">
import { defineComponent } from "vue";
import Spinner from "../Spinner.vue";

export default defineComponent({
  name: "LoadingState",
  components: {
    Spinner,
  },
});
</script>

<template>
  <div class="grow flex items-center justify-center">
    <Spinner />
  </div>
</template>
