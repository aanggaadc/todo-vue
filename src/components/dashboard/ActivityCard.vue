<template>
  <div
    class="flex-none font-poppins w-[150px] h-[150px] px-[17px] py-[13px] shadow-[0px_6px_10px_0px_#0000001A] rounded-lg flex flex-col justify-between md:w-[235px] md:h-[234px] md:px-[26px] md:py-[22px]"
  >
    <RouterLink class="grow" :to="`/activity/${id}`">
      <div data-cy="activity-item" class="h-full">
        <h3 data-cy="activity-item-title" class="font-bold text-sm md:text-lg">
          {{ title }}
        </h3>
      </div>
    </RouterLink>

    <div class="flex items-center justify-between">
      <p data-cy="activity-item-date" class="text-xs text-[#888888] md:text-sm">
        {{ formattedDate }}
      </p>
      <button data-cy="activity-item-delete-button" class="relative z-[1]">
        <TrashIcon class="md:w-6 md:h-6" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import dayjs from "dayjs";
import TrashIcon from "../../icons/Trash.vue";

export default defineComponent({
  name: "ActivityCard",
  components: {
    RouterLink,
    TrashIcon,
  },
  props: {
    // onDeleteClick: {
    //   type: Function,
    //   required: true,
    // },
    title: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  computed: {
    formattedDate() {
      return dayjs(this.date).locale("id").format("DD MMMM YYYY");
    },
  },
});
</script>
