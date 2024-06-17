<script lang="ts">
import { ref, watch, nextTick, defineComponent, PropType } from "vue";
import { useStore } from "vuex";
import { TodoState } from "@/store/module/todo";
import { Todo } from "@/types";
import { colorPriorityMap } from "../../fixtures";
import TrashIcon from "../../icons/Trash.vue";
import PencilIcon from "../../icons/Pencil.vue";

export default defineComponent({
  name: "TodoCard",
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true,
    },
    onClickDelete: {
      type: Function as PropType<() => void>,
      required: true,
    },
    onClickEdit: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  components: {
    TrashIcon,
    PencilIcon,
  },
  setup(props) {
    const store = useStore<TodoState>();
    const inputRef = ref<HTMLInputElement | null>(null);
    const editTitle = ref(false);

    const handleCheckTodo = () => {
      store.dispatch("updateTodo", {
        id: props.todo.id,
        is_active: !props.todo.is_active,
      });
    };

    const handleEditTitle = async () => {
      if (
        !inputRef.value?.value ||
        inputRef.value?.value === props.todo.title
      ) {
        editTitle.value = false;
        return;
      }

      await store.dispatch("updateTodo", {
        id: props.todo.id,
        title: inputRef.value?.value,
        is_active: true,
      });
      editTitle.value = false;
    };

    watch(
      () => editTitle,
      (newValue) => {
        if (newValue) {
          nextTick(() => {
            inputRef.value?.focus();
          });
        }
      }
    );

    return {
      inputRef,
      editTitle,
      colorPriorityMap,
      handleEditTitle,
      handleCheckTodo,
    };
  },
});
</script>

<template>
  <div
    data-cy="todo-item"
    class="w-full rounded-lg py-5 px-4 shadow-[0px_6px_10px_0px_#0000001A] bg-white flex items-center justify-between font-poppins"
  >
    <div class="flex items-center">
      <input
        data-cy="todo-item-checkbox"
        type="checkbox"
        :checked="!todo.is_active"
        @change="handleCheckTodo"
        class="w-3 h-3 rounded-none mr-3 md:h-5 md:w-5 checked:bg-primary checked:border-primary"
      />
      <div
        data-cy="todo-item-priority-indicator"
        :class="[
          'rounded-full w-[5px] h-[5px] md:w-[9px] md:h-[9px] mr-3',
          colorPriorityMap[todo.priority],
        ]"
      ></div>

      <input
        v-if="editTitle"
        ref="inputRef"
        class="font-semibold text-sm md:text-base mr-2 w-[40%] md:w-[50%] border-b focus:border-none focus:outline-none"
        :value="todo.title"
        @blur="handleEditTitle"
      />
      <p
        v-else
        @click="editTitle = true"
        data-cy="todo-item-title"
        :class="[
          'font-semibold text-sm md:text-base mr-2',
          !todo.is_active && 'line-through text-[#888]',
        ]"
      >
        {{ todo.title }}
      </p>

      <button data-cy="todo-item-edit-button" @click="onClickEdit">
        <PencilIcon class="w-3 h-3 md:w-4 md:h-4" />
      </button>
    </div>

    <button data-cy="todo-item-delete-button" @click="onClickDelete">
      <TrashIcon class="md:w-4 md:h-4" />
    </button>
  </div>
</template>
