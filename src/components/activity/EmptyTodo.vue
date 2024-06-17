<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "EmptyTodo",
});
</script>

<template>
  <div data-cy="todo-empty-state" class="mt-[90px]">
    <img
      src="/images/todo-empty-state.png"
      alt="empty"
      class="block mx-auto w-full md:w-1/2 cursor-pointer"
    />
  </div>
</template>
