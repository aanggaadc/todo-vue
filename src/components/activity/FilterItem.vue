<script lang="ts">
import { defineComponent, watch } from "vue";
import { useStore } from "vuex";
import ChecklistIcon from "@/icons/Checklist.vue";

export default defineComponent({
  name: "FilterItem",
  components: {
    ChecklistIcon,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    filterType: {
      type: String,
      required: true,
      validator: (value: string) =>
        ["newest", "oldest", "ascending", "descending", "active"].includes(
          value
        ),
    },
    sortFunction: {
      type: Function,
      required: true,
    },
    icon: {
      type: Object,
      required: true,
    },
    activeFilter: {
      type: String,
      required: true,
    },
    setActiveFilter: {
      type: Function,
      required: true,
    },
    closeDropdown: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    let todos = store.getters.todos;

    const handleClick = () => {
      store.commit("setTodos", props.sortFunction(todos));
      props.setActiveFilter(props.filterType);
      props.closeDropdown();
    };

    watch(
      () => store.getters.todos,
      (newTodos) => {
        todos = newTodos;
      }
    );

    return {
      handleClick,
    };
  },
});
</script>

<template>
  <button
    data-cy="sort-selection"
    class="relative w-full px-4 py-3 text-sm text-gray-700 flex items-center gap-3"
    @click="handleClick"
  >
    <div data-cy="sort-selection-icon">
      <component :is="icon" />
    </div>
    <p data-cy="sort-selection-title">{{ label }}</p>
    <div v-if="activeFilter === filterType" class="absolute right-3">
      <ChecklistIcon />
    </div>
  </button>
</template>
