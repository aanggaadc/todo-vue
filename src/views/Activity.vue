<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";

export default defineComponent({
  name: "ActivityView",
  components: {
    Header,
  },
});
</script>

<template>
  <Header title="TODO LIST APP" backNav />
</template>
