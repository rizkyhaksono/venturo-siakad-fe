<template>
  <div v-if="isModalOpen"
    class="fixed inset-0 bg-slate-950/50 dark:bg-gray-950/70 flex justify-center items-center z-[9999] transition-colors duration-200">
    <div ref="modalContent"
      class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl shadow-slate-950/5 dark:shadow-gray-950/30 scale-95 transition-transform duration-300 ease-out"
      :class="modalWidth">

      <!-- Header Modal -->
      <div class="pt-4 px-4 flex justify-between items-start">
        <div class="flex flex-col text-gray-800 dark:text-white transition-colors duration-200">
          <slot name="title">Default Title</slot>
        </div>
        <button @click="closeModal"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Body Modal -->
      <div class="p-4 overflow-y-auto max-h-[60vh] text-gray-800 dark:text-gray-200 transition-colors duration-200">
        <slot name="body">Isi default modal</slot>
      </div>

      <!-- Footer Modal -->
      <div
        class="px-4 py-4 flex justify-end gap-2 border-t border-gray-100 dark:border-gray-700 transition-colors duration-200">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits, defineProps, defineExpose, onUnmounted } from "vue";


const isModalOpen = ref(false);
const emit = defineEmits(["close"]);

const props = defineProps({
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg", "xl", "full"].includes(value),
  },
});

const modalWidth = computed(() => {
  return {
    sm: "w-3/12",
    md: "w-5/12",
    lg: "w-7/12",
    xl: "w-9/12",
    full: "w-11/12",
  }[props.size] || "w-5/12";
});

const openModal = () => {
  isModalOpen.value = true;
  // Add class to body to prevent scrolling when modal is open
  document.body.classList.add('overflow-hidden');
};

const closeModal = () => {
  isModalOpen.value = false;
  // Remove class from body when modal is closed
  document.body.classList.remove('overflow-hidden');
  emit("close");
};

// Handle ESC key press to close modal
const handleKeyDown = (event) => {
  if (event.key === 'Escape' && isModalOpen.value) {
    closeModal();
  }
};

// Add event listener when component is mounted
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', handleKeyDown);
}

// Clean up event listener when component is unmounted
if (typeof window !== 'undefined') {
  const cleanup = () => {
    window.removeEventListener('keydown', handleKeyDown);
    // Make sure to clean up body class if component is unmounted while modal is open
    if (isModalOpen.value) {
      document.body.classList.remove('overflow-hidden');
    }
  };

  // Use onUnmounted hook if available
  if (typeof onUnmounted === 'function') {
    onUnmounted(cleanup);
  }
}

defineExpose({
  openModal,
  closeModal,
  isOpen: isModalOpen
});
</script>