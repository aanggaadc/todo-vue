<script lang="ts">
import {
  defineComponent,
  computed,
  onMounted,
  ref,
  watch,
  nextTick,
} from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ActivityState } from "@/store/module/activity";
import { Todo } from "@/types";
import Header from "@/components/shared/Header.vue";
import TodoCard from "@/components/activity/TodoCard.vue";
import EmptyTodo from "@/components/activity/EmptyTodo.vue";
import ModalDelete from "@/components/ModalDelete.vue";
import PencilIcon from "../icons/Pencil.vue";
import PlusIcon from "../icons/Plus.vue";
import Spinner from "@/components/shared/Spinner.vue";

export default defineComponent({
  name: "ActivityView",
  components: {
    Header,
    EmptyTodo,
    TodoCard,
    PencilIcon,
    PlusIcon,
    Spinner,
    ModalDelete,
  },
  setup() {
    const route = useRoute();
    const store = useStore<ActivityState>();
    const param = route.params.id;
    const inputRef = ref<HTMLInputElement | null>(null);
    const editMode = ref(false);
    const openDeleteModal = ref(false);
    const activity = computed(() => store.getters.activity);
    const todos = computed(() => store.getters.todos);
    const isLoadingActivity = computed(() => store.getters.loadingActivity);
    const isLoadingTodos = computed(() => store.getters.loadingTodos);

    const handleUpdateActivity = async () => {
      if (
        inputRef.value?.value === activity.value.title ||
        !inputRef.value?.value
      ) {
        editMode.value = false;
        return;
      } else {
        await store.dispatch("updateActivity", {
          id: param,
          title: inputRef.value?.value,
        });
        editMode.value = false;
      }
    };

    const selectTodo = (todo: Todo) => {
      store.dispatch("selectTodo", todo);
    };

    const handleClickEditTodo = (todo: Todo) => {
      selectTodo(todo);
    };

    const handleClickedDeleteTodo = (todo: Todo) => {
      selectTodo(todo);
      openDeleteModal.value = true;
    };

    onMounted(() => {
      store.dispatch("getActivity", param);
      store.dispatch("getTodos", param);
    });

    watch(
      () => editMode.value,
      (newValue) => {
        if (newValue) {
          nextTick(() => {
            inputRef.value?.focus();
          });
        }
      }
    );

    return {
      activity,
      todos,
      isLoadingActivity,
      isLoadingTodos,
      editMode,
      handleUpdateActivity,
      handleClickEditTodo,
      handleClickedDeleteTodo,
      inputRef,
      openDeleteModal,
    };
  },
});
</script>

<template>
  <Header :title="isLoadingActivity ? 'loading...' : activity.title" backNav />

  <main className="p-8 font-poppins max-w-screen-lg mx-auto lg:py-8 lg:px-0">
    <div
      v-if="isLoadingActivity || isLoadingTodos"
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
          ref="inputRef"
          v-if="editMode"
          className="font-bold text-lg md:text-3xl w-[80%] focus:border-none focus:outline-none"
          :value="activity.title"
          @blur="handleUpdateActivity"
        />

        <h2
          v-else
          data-cy="todo-title"
          className="font-bold text-lg md:text-3xl"
          @click="() => (editMode = !editMode)"
        >
          {{ activity.title }}
        </h2>

        <button
          :onClick="() => (editMode = !editMode)"
          data-cy="todo-title-edit-button"
        >
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

    <div v-if="!todos.length" class="mt-[90px]">
      <EmptyTodo />
    </div>

    <div v-else class="flex flex-col gap-2 mt-7">
      <TodoCard
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @clickDelete="handleClickedDeleteTodo(todo)"
        @clickEdit="handleClickEditTodo(todo)"
      />
    </div>
  </main>

  <ModalDelete
    type="todo"
    :isOpen="openDeleteModal"
    :onClose="() => (openDeleteModal = false)"
  />
</template>
