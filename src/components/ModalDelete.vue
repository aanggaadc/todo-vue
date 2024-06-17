<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";
import Modal from "./shared/Modal.vue";
import ModalInformation from "./ModalInformation.vue";
import WarningIcon from "../icons/Warning.vue";

export default defineComponent({
  name: "ModalDelete",
  props: {
    type: {
      type: String as PropType<"activity" | "todo">,
      default: "activity",
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
    onClose: {
      type: Function as PropType<(payload?: MouseEvent) => void>,
      required: true,
    },
  },
  components: {
    Modal,
    WarningIcon,
  },
  setup(props) {
    const store = useStore();
    const toast = useToast();
    const activity = computed(() => store.getters.selectedActivity);
    const todo = computed(() => store.getters.todo);
    const currentData = props.type === "activity" ? activity : todo;

    const content = {
      component: ModalInformation,
      props: {
        content:
          props.type === "activity"
            ? "Activity berhasil dihapus"
            : "List item berhasil dihapus",
      },
    };

    const handleDelete = async (id: number) => {
      try {
        props.type === "activity"
          ? await store.dispatch("deleteActivity", id)
          : await store.dispatch("deleteTodo", id);
        props.onClose();
        toast(content, {
          icon: false,
          toastClassName: "!bg-white !text-black",
        });
      } catch (error) {
        console.error("Failed to delete activity:", error);
      }
    };

    return {
      currentData,
      handleDelete,
    };
  },
});
</script>

<template>
  <Modal :isOpen="isOpen" :onClose="onClose">
    <div data-cy="modal-delete">
      <div className="max-w-[320px] p-8 rounded-lg font-poppins bg-white">
        <div data-cy="modal-delete-icon">
          <WarningIcon className="block mx-auto mb-7" />
        </div>

        <h4 data-cy="modal-delete-title"></h4>

        <p className="text-sm text-center mb-10">
          Apakah anda yakin menghapus
          {{ type === "activity" ? "activity" : "list item" }}
          <span className="font-bold">“{{ currentData.title }}”?</span>
        </p>

        <div className="flex items-center justify-center gap-2">
          <button
            data-cy="modal-delete-cancel-button"
            :onClick="onClose"
            className="font-poppins text-sm font-semibold text-[#4A4A4A] rounded-3xl px-8 py-3 bg-[#F4F4F4]"
          >
            Batal
          </button>
          <button
            :onClick="() => handleDelete(currentData.id)"
            data-cy="modal-delete-confirm-button"
            className="font-poppins text-sm font-semibold text-white rounded-3xl px-8 py-3 bg-[#ED4C5C]"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  </Modal>
</template>
