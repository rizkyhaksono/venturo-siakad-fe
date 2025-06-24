<script setup>
import { ref, computed, defineEmits, defineProps } from "vue";
import { mdiEye, mdiEyeOff } from "@mdi/js";

const props = defineProps({
    modelValue: [String, Number, Boolean, Array],
    label: String,
    type: String, // "textarea", "checkbox", "select", "radio", "password"
    placeholder: String,
    options: Array, // Untuk select, radio, dan checkbox (jika multiple)
    errors: Array,
    disabled: Boolean,
});

const emit = defineEmits(["update:modelValue"]);
const showPassword = ref(false);
const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

const computedModelValue = computed(() => {
    return Array.isArray(props.modelValue) ? props.modelValue : [];
});
</script>

<template>
    <div class="space-y-1.5">
        <label class="text-sm text-slate-800 dark:text-slate-200 font-bold capitalize" v-if="label">{{ label }}</label>
        <div class="relative">

            <!-- Textarea -->
            <textarea v-if="type === 'textarea'" :placeholder="placeholder" :value="modelValue"
                @input="emit('update:modelValue', $event.target.value)" class="w-full border border-slate-200 dark:border-slate-700 rounded-md py-2 px-2.5 text-sm
                shadow-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100
                hover:border-slate-800 dark:hover:border-slate-400
                focus:border-slate-800 dark:focus:border-slate-400
                focus:ring focus:ring-slate-800/10 dark:focus:ring-slate-400/10"></textarea>

            <!-- Checkbox (Multiple) -->
            <div v-else-if="type === 'checkbox' && options" class="flex flex-col gap-1">
                <label v-for="(option, index) in options" :key="index" class="flex items-center gap-2">
                    <input type="checkbox" :value="option.value" :checked="computedModelValue.includes(option.value)"
                        @change="
                            $event.target.checked
                                ? emit('update:modelValue', [...computedModelValue, option.value])
                                : emit('update:modelValue', computedModelValue.filter(v => v !== option.value))
                            " class="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 
                        bg-white dark:bg-slate-800 rounded focus:ring focus:ring-blue-500" />
                    <span class="text-base text-slate-800 dark:text-slate-200">{{ option.label }}</span>
                </label>
            </div>

            <!-- Checkbox (Single) -->
            <div v-else-if="type === 'checkbox'" class="flex items-center gap-2">
                <input type="checkbox" :checked="modelValue" @change="emit('update:modelValue', $event.target.checked)"
                    class="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-slate-800 rounded focus:ring focus:ring-blue-500" />
                <span class="text-base text-slate-800 dark:text-slate-200">{{ label }}</span>
            </div>

            <!-- File -->
            <div v-else-if="type === 'file'" class="relative">
                <input type="file" :placeholder="placeholder"
                    @change="emit('update:modelValue', $event.target.files[0])"
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                <div class="w-full border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4
                    hover:border-slate-500 dark:hover:border-slate-400 transition-colors duration-200">
                    <div class="flex flex-col items-center justify-center gap-2">
                        <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span class="text-sm text-slate-600 dark:text-slate-400">
                            {{ modelValue ? (typeof modelValue === 'object' ? modelValue.name : modelValue) :
                                (placeholder || 'Click or drag file to upload') }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Select -->
            <select v-else-if="type === 'select'" :value="modelValue"
                @change="emit('update:modelValue', $event.target.value)" class="w-full border border-slate-200 dark:border-slate-700 rounded-md py-2 px-2.5 text-sm
                shadow-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100
                hover:border-slate-800 dark:hover:border-slate-400
                focus:border-slate-800 dark:focus:border-slate-400
                focus:ring focus:ring-slate-800/10 dark:focus:ring-slate-400/10">
                <option disabled selected value="">Pilih salah satu</option>
                <option v-for="(option, index) in options" :key="index" :value="option.value">{{ option.label }}
                </option>
            </select>

            <!-- Radio -->
            <div v-else-if="type === 'radio'" class="flex flex-col gap-1">
                <label v-for="(option, index) in options" :key="index" class="flex items-center gap-2">
                    <input type="radio" :value="option.value" :checked="modelValue === option.value"
                        @change="emit('update:modelValue', option.value)" class="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 
                        bg-white dark:bg-slate-800 focus:ring focus:ring-blue-500" />
                    <span class="text-base text-slate-800 dark:text-slate-200">{{ option.label }}</span>
                </label>
            </div>

            <!-- Password Input -->
            <div v-else-if="type === 'password'" class="relative">
                <input :type="showPassword ? 'text' : 'password'" :placeholder="placeholder" :value="modelValue"
                    @input="emit('update:modelValue', $event.target.value)" class="w-full border border-slate-200 dark:border-slate-700 rounded-md py-2 px-2.5 text-sm
                    shadow-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100
                    hover:border-slate-800 dark:hover:border-slate-400
                    focus:border-slate-800 dark:focus:border-slate-400
                    focus:ring focus:ring-slate-800/10 dark:focus:ring-slate-400/10" />
                <button type="button"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400"
                    @click="togglePasswordVisibility">
                    <svg class="h-5 w-5" viewBox="0 0 24 24">
                        <path :d="showPassword ? mdiEyeOff : mdiEye" fill="currentColor" />
                    </svg>
                </button>
            </div>

            <!-- Default Input -->
            <input v-else :type="type" :placeholder="placeholder" :value="modelValue"
                @input="emit('update:modelValue', $event.target.value)" :disabled="disabled" class="w-full border border-slate-200 dark:border-slate-700 rounded-md py-2 px-2.5 text-sm
                shadow-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100
                hover:border-slate-800 dark:hover:border-slate-400
                focus:border-slate-800 dark:focus:border-slate-400
                focus:ring focus:ring-slate-800/10 dark:focus:ring-slate-400/10
                disabled:bg-slate-100 dark:disabled:bg-slate-900 disabled:opacity-60" />
        </div>

        <!-- Error Messages -->
        <div v-if="errors && errors.length" class="text-red-500 dark:text-red-400 text-xs mt-1">
            <span v-for="(err, index) in errors" :key="index">{{ err }}</span>
        </div>
    </div>
</template>