<script lang="ts">
import { ref, defineComponent, PropType, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Modal from "../shared/Modal.vue";
import CustomSelect from "./CustomSelect.vue";
import CloseIcon from "../../icons/Close.vue";
import { colorPriorityMap, priorityOptions } from "@/fixtures";
import { TodoState } from "@/store/module/todo";

const initialForm = {
  title: "",
  priority: {
    value: "very-high",
    label: "Very High",
  },
};

export default defineComponent({
  name: "ModalTodo",
  components: {
    Modal,
    CloseIcon,
    CustomSelect,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    onClose: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const todoId = route.params.id;
    const store = useStore<TodoState>();
    const form = ref({ ...initialForm });
    const todo = computed(() => store.getters.todo);

    const handleSaveModal = async () => {
      if (todo.value) {
        await store.dispatch("updateTodo", {
          id: todo.value.id,
          ...form.value,
        });
      } else {
        await store.dispatch("createTodo", {
          activity_group_id: todoId,
          title: form.value.title,
          priority: form.value.priority.value,
        });
      }

      props.onClose();
      form.value = { ...initialForm };
    };

    return {
      form,
      todo,
      priorityOptions,
      colorPriorityMap,
      handleSaveModal,
    };
  },
});
</script>

<template>
  <Modal :isOpen="isOpen" :onClose="onClose">
    <div
      data-cy="modal-add"
      class="w-[320px] lg:w-[830px] rounded-lg font-poppins bg-white"
    >
      <div class="py-4 px-5 border-b flex items-center justify-between">
        <h3
          data-cy="modal-add-title"
          class="text-base font-semibold lg:text-lg"
        >
          {{ todo ? "Edit List Item" : "Tambah List Item" }}
        </h3>
        <button data-cy="modal-add-close-button" @click="onClose">
          <CloseIcon />
        </button>
      </div>

      <div class="px-4 py-7 border-b">
        <div class="mb-4">
          <label
            data-cy="modal-add-name-title"
            for="title"
            class="font-semibold text-[10px] mb-3 lg:text-xs"
          >
            NAMA LIST ITEM
          </label>

          <input
            data-cy="modal-add-name-input"
            type="text"
            class="w-full rounded-lg p-4 text-[14px] border border-neutral-200 border-solid"
            placeholder="Tambahkan nama list item"
            name="title"
            id="title"
            v-model="form.title"
          />
        </div>

        <label
          data-cy="modal-add-priority-title"
          for="priority"
          class="font-semibold text-[10px] mb-3 lg:text-xs"
        >
          PRIORITY
        </label>
        <CustomSelect
          v-model="form.priority"
          :options="priorityOptions"
          :colorPriorityMap="colorPriorityMap"
        />
      </div>

      <div class="py-4 px-6 flex justify-end">
        <button
          data-cy="modal-add-save-button"
          @click="handleSaveModal"
          class="rounded-3xl px-10 py-3 bg-primary disabled:bg-[#67ccff] text-white font-semibold"
        >
          Simpan
        </button>
      </div>
    </div>
  </Modal>
</template>
