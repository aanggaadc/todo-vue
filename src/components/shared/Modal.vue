<template>
  <div>
    <div
      :class="[
        'fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-[61]',
        isOpen
          ? 'opacity-100 ease-out duration-300'
          : 'opacity-0 ease-in duration-200',
        showBackdrop ? 'visible' : 'invisible',
      ]"
    ></div>

    <div
      @click="onClose"
      :class="[
        'fixed inset-0 w-screen overflow-y-auto z-[62]',
        showBackdrop ? 'visible' : 'invisible',
      ]"
    >
      <div
        class="flex min-h-full items-center justify-center p-4 text-center sm:p-0"
      >
        <div
          @click.stop
          :class="[
            'relative w-fit transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8',
            isOpen
              ? 'ease-out duration-300 opacity-100 translate-y-0 sm:scale-100'
              : 'ease-in duration-200 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
          ]"
        >
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted, onBeforeUnmount, defineComponent } from "vue";

export default defineComponent({
  name: "ModalComponent",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const showBackdrop = ref(false);

    const toggleBodyOverflow = (shouldHide) => {
      if (shouldHide) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.removeAttribute("style");
      }
    };

    watch(
      () => props.isOpen,
      (newVal) => {
        if (newVal) {
          toggleBodyOverflow(true);
          showBackdrop.value = true;
        } else {
          toggleBodyOverflow(false);
          setTimeout(() => {
            showBackdrop.value = false;
          }, 300);
        }
      }
    );

    onMounted(() => {
      if (props.isOpen) {
        toggleBodyOverflow(true);
      }
    });

    onBeforeUnmount(() => {
      toggleBodyOverflow(false);
    });

    return {
      showBackdrop,
    };
  },
});
</script>
