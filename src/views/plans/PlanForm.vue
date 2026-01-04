<script setup lang="ts">
import { onMounted, computed, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePlansStore } from '../../stores/plans';
import AppLayout from '../../layouts/AppLayout.vue';
import type { TrainingPlanInput } from '../../types/plan.types';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import notify from '../../lib/toast';

const route = useRoute();
const router = useRouter();
const store = usePlansStore();

const isEditMode = computed(() => route.params.id !== undefined);
const title = computed(() => isEditMode.value ? 'Editar Plan' : 'Nuevo Plan');

const schema = yup.object({
    name: yup.string().required('El nombre es obligatorio'),
    description: yup.string().required('La descripción es obligatoria'),
    duration_months: yup.number().min(1, 'Mínimo 1 mes').required('La duración es obligatoria'),
    sessions_per_week: yup.number().min(1, 'Mínimo 1 sesión').required('Las sesiones son obligatorias'),
    price: yup.number().min(0, 'El precio no puede ser negativo').required('El precio es obligatorio'),
    capacity: yup.number().min(1, 'Mínimo 1 cupo').required('La capacidad es obligatoria'),
    status: yup.string().required('El estado es obligatorio'),
});

const initialValues = reactive<TrainingPlanInput>({
    name: '',
    description: '',
    duration_months: 1,
    sessions_per_week: 3,
    price: 0,
    capacity: 20,
    status: 'Activo'
});

onMounted(async () => {
    if (isEditMode.value) {
        const id = Number(route.params.id);
        await store.fetchPlan(id);
        if (store.currentPlan) {
            Object.assign(initialValues, {
                name: store.currentPlan.name,
                description: store.currentPlan.description,
                duration_months: store.currentPlan.duration_months,
                sessions_per_week: store.currentPlan.sessions_per_week,
                price: store.currentPlan.price,
                capacity: store.currentPlan.capacity,
                status: store.currentPlan.status
            });
        } else {
            router.push('/plans');
        }
    }
});

const onSubmit = async (values: any) => {
    try {
        if (isEditMode.value) {
            await store.updatePlan(Number(route.params.id), values);
            notify.success('Plan actualizado correctamente');
        } else {
            await store.createPlan(values);
            notify.success('Plan creado correctamente');
        }
        router.push('/plans');
    } catch (e: any) {
        console.error('Error saving plan:', e);
    }
};
</script>

<template>
    <AppLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                {{ title }}
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg p-6">
                    <Form :validation-schema="schema" :initial-values="initialValues" @submit="onSubmit" v-slot="{ errors }" class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            <!-- Name -->
                            <div class="col-span-2">
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre del Plan</label>
                                <Field name="name" type="text" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" :class="{ 'border-red-500': errors.name }" />
                                <ErrorMessage name="name" class="mt-1 text-sm text-red-600" />
                            </div>

                            <!-- Description -->
                            <div class="col-span-2">
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción</label>
                                <Field name="description" as="textarea" rows="3" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" :class="{ 'border-red-500': errors.description }" />
                                <ErrorMessage name="description" class="mt-1 text-sm text-red-600" />
                            </div>

                            <!-- Duration -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Duración (Meses)</label>
                                <Field name="duration_months" type="number" min="1" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" :class="{ 'border-red-500': errors.duration_months }" />
                                <ErrorMessage name="duration_months" class="mt-1 text-sm text-red-600" />
                            </div>

                            <!-- Sessions -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Sesiones por Semana</label>
                                <Field name="sessions_per_week" type="number" min="1" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" :class="{ 'border-red-500': errors.sessions_per_week }" />
                                <ErrorMessage name="sessions_per_week" class="mt-1 text-sm text-red-600" />
                            </div>

                            <!-- Price -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Precio (COP)</label>
                                <Field name="price" type="number" min="0" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" :class="{ 'border-red-500': errors.price }" />
                                <ErrorMessage name="price" class="mt-1 text-sm text-red-600" />
                            </div>

                            <!-- Capacity -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Capacidad Máxima</label>
                                <Field name="capacity" type="number" min="1" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" :class="{ 'border-red-500': errors.capacity }" />
                                <ErrorMessage name="capacity" class="mt-1 text-sm text-red-600" />
                            </div>

                            <!-- Status -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Estado</label>
                                <Field name="status" as="select" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                    <option value="Archivado">Archivado</option>
                                </Field>
                            </div>
                        </div>

                        <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <router-link 
                                to="/plans"
                                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancelar
                            </router-link>
                            <button 
                                type="submit" 
                                :disabled="store.loading"
                                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                {{ store.loading ? 'Guardando...' : (isEditMode ? 'Actualizar' : 'Crear') }}
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
