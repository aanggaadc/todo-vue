<script lang="ts">
import { ref, defineComponent } from "vue";
import { cn } from "@/lib/utils";
import FilterItem from "./FilterItem.vue";
import FilterGeneralIcon from "@/icons/FilterGeneral.vue";
import FilterAscendingIcon from "@/icons/FilterAscending.vue";
import FilterDescendingIcon from "@/icons/FilterDescending.vue";
import FilterNewestIcon from "@/icons/FilterNewest.vue";
import FilterOldestIcon from "@/icons/FilterOldest.vue";
import {
  sortByAscending,
  sortByDescending,
  sortByNewest,
  sortByOldest,
  sortByIsActive,
} from "@/lib/utils";
export default defineComponent({
  name: "FilterComponent",
  components: {
    FilterItem,
    FilterGeneralIcon,
  },
  setup() {
    const isOpen = ref(false);
    const activeFilter = ref("newest");

    const filterData = [
      {
        label: "Terbaru",
        filterType: "newest",
        sortFunction: sortByNewest,
        icon: FilterNewestIcon,
      },
      {
        label: "Terlama",
        filterType: "oldest",
        sortFunction: sortByOldest,
        icon: FilterOldestIcon,
      },
      {
        label: "A-Z",
        filterType: "ascending",
        sortFunction: sortByAscending,
        icon: FilterAscendingIcon,
      },
      {
        label: "Z-A",
        filterType: "descending",
        sortFunction: sortByDescending,
        icon: FilterDescendingIcon,
      },
      {
        label: "Belum Selesai",
        filterType: "active",
        sortFunction: sortByIsActive,
        icon: {
          ...FilterGeneralIcon,
          props: { class: "w-3 h-3", color: "#16ABF8" },
        },
      },
    ];

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
    };

    const closeDropdown = () => {
      isOpen.value = false;
    };

    const setActiveFilter = (filterType: string) => {
      activeFilter.value = filterType;
    };

    return {
      isOpen,
      activeFilter,
      filterData,
      toggleDropdown,
      closeDropdown,
      setActiveFilter,
      cn,
    };
  },
});
</script>

<template>
  <div class="relative inline-block text-left font-poppins">
    <div>
      <button
        data-cy="todo-sort-button"
        @click="toggleDropdown"
        class="w-10 h-10 rounded-full flex justify-center items-center border border-neutral-200 border-solid"
      >
        <FilterGeneralIcon />
      </button>
    </div>

    <div
      data-cy="sort-parent"
      :class="[
        'absolute right-0 z-10 mt-2 w-[190px] origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
        isOpen
          ? 'transition ease-in duration-75 transform opacity-100 scale-100 visible'
          : 'transition ease-out duration-100 transform opacity-0 scale-95 invisible',
      ]"
    >
      <div class="py-1" role="none">
        <FilterItem
          v-for="filter in filterData"
          :key="filter.filterType"
          :label="filter.label"
          :filterType="filter.filterType"
          :sortFunction="filter.sortFunction"
          :icon="filter.icon"
          :activeFilter="activeFilter"
          :setActiveFilter="setActiveFilter"
          :closeDropdown="closeDropdown"
        />
      </div>
    </div>
  </div>
</template>
