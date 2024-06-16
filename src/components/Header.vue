<template>
  <header class="bg-primary w-full font-poppins">
    <div
      data-cy="header-background"
      class="max-w-screen-lg mx-auto h-[64px] px-5 lg:p-0 lg:h-[105px] text-white font-poppins font-bold text-xl flex items-center gap-3 md:text-2xl"
    >
      <button v-if="backNav" data-cy="todo-back-button" @click="navigateBack">
        <LeftArrowIcon />
      </button>

      <h1 data-cy="header-title" class="uppercase text-[18px] md:text-[24px]">
        {{ title }}
      </h1>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import LeftArrowIcon from "../icons/LeftArrow.vue";

export default defineComponent({
  name: "HeaderComponent",
  components: {
    LeftArrowIcon,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    backNav: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const router = useRouter();
    const navigateBack = () => {
      router.go(-1);
    };

    return {
      navigateBack,
    };
  },
});
</script>
