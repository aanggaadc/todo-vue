<script lang="ts">
import { defineComponent } from "vue";
import { cn } from "../lib/utils";

export default defineComponent({
  name: "PencilIcon",
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
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="cn('w-5 h-5', className)"
  >
    <path
      d="M3.33325 16.6665H6.66659L15.4166 7.91651C15.8586 7.47448 16.1069 6.87497 16.1069 6.24985C16.1069 5.62472 15.8586 5.02521 15.4166 4.58318C14.9746 4.14115 14.375 3.89282 13.7499 3.89282C13.1248 3.89282 12.5253 4.14115 12.0833 4.58318L3.33325 13.3332V16.6665Z"
      stroke="#A4A4A4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.25 5.4165L14.5833 8.74984"
      stroke="#A4A4A4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</template>
