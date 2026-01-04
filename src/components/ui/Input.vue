<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    modelValue: string | number;
    disabled?: boolean;
}>(), {
    disabled: false,
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
});
</script>

<template>
    <input
        v-model="value"
        :disabled="disabled"
        class="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
    />
</template>
