<script lang="ts">
import { defineComponent } from "vue";
import InformationIcon from "@/icons/Information.vue";

export default defineComponent({
  name: "ModalInformation",
  components: {
    InformationIcon,
  },
  props: {
    content: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <div
    data-cy="modal-information"
    className="flex items-center gap-2 font-poppins font-semibold text-xs md:text-sm lg:text-base"
  >
    <div data-cy="modal-information-icon">
      <InformationIcon />
    </div>
    <p data-cy="modal-information-title">{{ content }}</p>
  </div>
</template>
