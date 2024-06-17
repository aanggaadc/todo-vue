<script lang="ts">
import { ref, computed, PropType, defineComponent } from "vue";
import { priorityOptions } from "@/fixtures";

export default defineComponent({
  name: "SelectPriority",
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    options: {
      type: Array as PropType<typeof priorityOptions>,
      required: true,
    },
    colorPriorityMap: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const isOpen = ref(false);

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
    };

    const selectOption = (option: { label: string; value: string }) => {
      emit("update:modelValue", option);
      isOpen.value = false;
    };

    const selectedOption = computed(() => {
      return props.modelValue || props.options[0];
    });

    const selectedOptionColor = computed(() => {
      return props.colorPriorityMap[selectedOption.value.value];
    });

    return {
      isOpen,
      toggleDropdown,
      selectOption,
      selectedOption,
      selectedOptionColor,
    };
  },
});
</script>

<template>
  <div class="relative">
    <div
      @click="toggleDropdown"
      class="w-full rounded-lg p-4 bg-white border-neutral-200 border-solid border cursor-pointer flex items-center justify-between"
    >
      <div class="flex items-center">
        <div :class="['w-4 h-4 rounded-full mr-5', selectedOptionColor]"></div>
        <span class="text-sm">{{ selectedOption.label }}</span>
      </div>
      <div class="dropdown-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
    <div
      data-cy="modal-add-priority-dropdown"
      v-if="isOpen"
      class="absolute w-full bg-white border-neutral-200 border-solid border mt-1 z-10 rounded-lg shadow-lg"
    >
      <div
        data-cy="modal-add-priority-item"
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
        class="flex items-center p-2 cursor-pointer hover:bg-gray-200"
      >
        <div
          :class="['w-4 h-4 rounded-full mr-5', colorPriorityMap[option.value]]"
        ></div>
        <span class="text-sm">{{ option.label }}</span>
      </div>
    </div>
  </div>
</template>
