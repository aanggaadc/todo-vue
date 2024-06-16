<script>
import { cn } from "../../lib/utils";

export default {
  name: "ChecklistIcon",
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
    :class="cn('w-4 h-4', className)"
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.00098 7.69596L5.98597 10.681L11.956 4.71097"
      stroke="#4A4A4A"
      stroke-linecap="square"
    />
  </svg>
</template>
