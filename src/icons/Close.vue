<script>
import { cn } from "../lib/utils";

export default {
  name: "CloseIcon",
  props: {
    className: {
      type: String,
      default: "",
    },
  },
  methods: {
    cn,
  },
};
</script>

<template>
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="cn('w-4 h-4', className)"
  >
    <path
      d="M13.5 4.5L4.5 13.5"
      stroke="#A4A4A4"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.5 4.5L13.5 13.5"
      stroke="#A4A4A4"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</template>
