<script>
import { defineComponent } from "vue";
import { cn } from "../lib/utils";

export default defineComponent({
  name: "PlusIcon",
  props: {
    className: {
      type: String,
      default: "",
    },
  },
  methods: {
    cn,
  },
});
</script>

<template>
  <svg
    width="12"
    height="13"
    viewBox="0 0 12 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="cn('w-3 h-3', className)"
  >
    <path
      d="M6 2.99994V9.99994"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
    <path
      d="M2.5 6.5H9.5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
  </svg>
</template>
