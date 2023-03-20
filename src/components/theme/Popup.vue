<script setup>
import { ref, onMounted } from "vue";

const props = defineProps(["togglePopup"]);
const modal = ref(null);

onMounted(() => {
  modal.value.focus();
});
</script>

<template>
  <div
    ref="modal"
    tabindex="0"
    @keydown.esc="togglePopup"
    on-focus=""
    class="fixed top-0 left-0 right-0 bottom-0 z-[99] flex items-center justify-center"
  >
    <div
      class="relative bg-bg p-3 border-2 rounded-2xl border-main flex flex-col"
    >
      <slot />
      <button @click="togglePopup" class="btn-primary m-1">Close</button>
    </div>
  </div>
</template>
