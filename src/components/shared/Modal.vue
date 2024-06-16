<template>
  <Teleport to="#modal">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed z-[999] w-screen h-screen bg-[rgba(0,0,0,0.5)] flex items-center justify-center left-0 top-0"
      >
        <div
          ref="modal"
          class="relative shadow-[0_10px_5px_2px_rgba(0,0,0,0.1)] w-fit"
        >
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import { onClickOutside } from "@vueuse/core";

export default defineComponent({
  name: "ModalComponent",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    onClose: {
      type: Function as PropType<(payload: MouseEvent) => void>,
      required: true,
    },
  },
  setup(props) {
    const modal = ref<HTMLElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
      if (props.isOpen) {
        props.onClose(event);
      }
    };

    onClickOutside(modal, handleClickOutside);

    return {
      modal,
    };
  },
});
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
