<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { useStore } from "vuex";
import { ActivityState } from "@/store/module/activity";
import Modal from "./shared/Modal.vue";
import WarningIcon from "../icons/Warning.vue";

export default defineComponent({
  name: "ModalDelete",
  props: {
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
    const store = useStore<ActivityState>();
    const activity = computed(() => store.getters.selectedActivity);

    const deleteActivity = async (id: number) => {
      try {
        await store.dispatch("deleteActivity", id);
        props.onClose();
      } catch (error) {
        console.error("Failed to delete activity:", error);
      }
    };

    return {
      activity,
      deleteActivity,
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
          Apakah anda yakin menghapus activity
          <span className="font-bold">“{{ activity.title }}”?</span>
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
            :onClick="() => deleteActivity(activity.id)"
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
