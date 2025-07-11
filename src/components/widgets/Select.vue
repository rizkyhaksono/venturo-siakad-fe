<script setup>
import { ref, computed, defineProps, defineEmits, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
    modelValue: [String, Array, null], // Bisa single atau multiple select
    label: String,
    placeholder: String,
    options: Array, // Bisa berupa array string atau array objek [{ value: "", label: "" }]
    multiple: Boolean, // Jika true, multi-select aktif
    errors: Array,
    position: { // Added position prop with auto as default
        type: String,
        default: 'auto', // 'auto', 'up', 'down'
        validator: (value) => ['auto', 'up', 'down'].includes(value)
    }
});

const emit = defineEmits(["update:modelValue"]);
const isOpen = ref(false);
const searchQuery = ref("");
const selectContainer = ref(null);
const dropdownPosition = ref('down');

// Calculate dropdown position based on space available
const calculatePosition = () => {
    if (props.position !== 'auto') {
        dropdownPosition.value = props.position;
        return;
    }

    if (selectContainer.value) {
        const rect = selectContainer.value.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        // If space below is less than 200px and there's more space above, show dropdown above
        if (spaceBelow < 200 && spaceAbove > spaceBelow) {
            dropdownPosition.value = 'up';
        } else {
            dropdownPosition.value = 'down';
        }
    }
};

// Filter opsi berdasarkan pencarian
const filteredOptions = computed(() => {
    return props.options.filter((option) => {
        const label = getOptionLabel(option).toLowerCase();
        return label.includes(searchQuery.value.toLowerCase());
    });
});

const selectedItems = computed(() => {
    return Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue].filter(Boolean);
});

const toggleDropdown = () => {
    if (!isOpen.value) {
        calculatePosition();
    }
    isOpen.value = !isOpen.value;
    searchQuery.value = ""; // Reset pencarian setiap kali dropdown dibuka
};

const selectItem = (option) => {
    if (props.multiple) {
        if (!selectedItems.value.includes(option.value)) {
            emit("update:modelValue", [...selectedItems.value, option.value]);
        } else {
            emit("update:modelValue", selectedItems.value.filter(v => v !== option.value));
        }
    } else {
        emit("update:modelValue", option.value);
        isOpen.value = false;
    }
};

const removeItem = (value) => {
    emit("update:modelValue", selectedItems.value.filter(v => v !== value));
};

const selectedLabels = computed(() => {
    return props.options
        .filter(opt => selectedItems.value.includes(opt.value))
        .map(opt => opt.label)
        .join(", ");
});

const getOptionLabel = (option) => {
    return typeof option === "string" ? option : option.label;
};

const getOptionValue = (option) => {
    return typeof option === "string" ? option : option.value;
};

// Close dropdown when clicked outside
const closeDropdownOnOutsideClick = (event) => {
    if (isOpen.value && selectContainer.value && !selectContainer.value.contains(event.target)) {
        isOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener('click', closeDropdownOnOutsideClick);
    window.addEventListener('resize', calculatePosition);
    window.addEventListener('scroll', calculatePosition);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', closeDropdownOnOutsideClick);
    window.removeEventListener('resize', calculatePosition);
    window.removeEventListener('scroll', calculatePosition);
});
</script>

<template>
    <div class="space-y-1.5" ref="selectContainer">
        <label v-if="label"
            class="text-sm text-slate-800 dark:text-white font-bold capitalize transition-colors duration-200">{{ label
            }}</label>
        <div class="relative">
            <div @click="toggleDropdown"
                class="w-full border border-slate-200 dark:border-gray-700 rounded-md py-2 px-2.5 text-sm shadow-sm flex items-center justify-between cursor-pointer hover:border-slate-800 dark:hover:border-gray-500 focus:border-slate-800 dark:focus:border-gray-500 focus:ring focus:ring-slate-800/10 dark:focus:ring-gray-500/10 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-200">
                <span class="truncate" v-if="selectedItems.length">{{ selectedLabels }}</span>
                <span class="text-gray-400 dark:text-gray-500" v-else>{{ placeholder || "Pilih opsi..." }}</span>
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                </svg>
            </div>

            <div v-if="isOpen" :class="[
                'absolute z-10 w-full bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto transition-colors duration-200',
                dropdownPosition === 'up' ? 'bottom-full mb-1' : 'top-full mt-1'
            ]">

                <div class="p-2">
                    <input type="text" v-model="searchQuery" placeholder="Cari..."
                        class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-700 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200">
                </div>

                <div v-if="filteredOptions.length">
                    <div v-for="(option, index) in filteredOptions" :key="index"
                        class="px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center cursor-pointer text-gray-800 dark:text-gray-200 transition-colors duration-200"
                        @click="selectItem({ value: getOptionValue(option), label: getOptionLabel(option) })">
                        <input v-if="multiple" type="checkbox" :checked="selectedItems.includes(getOptionValue(option))"
                            class="w-4 h-4 mr-2 text-blue-600 dark:text-blue-500 accent-blue-600 dark:accent-blue-500">
                        {{ getOptionLabel(option) }}
                    </div>
                </div>

                <div v-else class="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                    Tidak ada hasil ditemukan</div>
            </div>
        </div>

        <div v-if="multiple && selectedItems.length" class="flex flex-wrap gap-2 mt-2">
            <span v-for="(option, index) in options.filter(opt => selectedItems.includes(getOptionValue(opt)))"
                :key="index"
                class="flex items-center bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-xs px-2 py-1 rounded-md transition-colors duration-200">
                {{ getOptionLabel(option) }}
                <button type="button" class="ml-1 text-red-500 dark:text-red-400 transition-colors duration-200"
                    @click="removeItem(getOptionValue(option))">
                    ✕
                </button>
            </span>
        </div>

        <div v-if="errors && errors.length"
            class="text-red-500 dark:text-red-400 text-xs mt-1 transition-colors duration-200">
            <span v-for="(err, index) in errors" :key="index">{{ err }}</span>
        </div>
    </div>
</template>