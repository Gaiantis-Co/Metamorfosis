<script setup lang="ts">
import { onMounted, computed, reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEnrollmentsStore } from '../../stores/enrollments';
import { useAthletesStore } from '../../stores/athletes';
import AppLayout from '../../layouts/AppLayout.vue';
import type { EnrollmentInput } from '../../types/enrollment.types';
import { Form, Field, ErrorMessage, useForm } from 'vee-validate';
import * as yup from 'yup';
import notify from '../../lib/toast';

const route = useRoute();
const router = useRouter();
const store = useEnrollmentsStore();
const athletesStore = useAthletesStore();

const isEditMode = computed(() => route.params.id !== undefined);
const title = computed(() => isEditMode.value ? 'Editar Inscripción' : 'Nueva Inscripción');

const schema = yup.object({
    athlete_id: yup.number().min(1, 'Seleccione un atleta').required('El atleta es obligatorio'),
    plan_id: yup.number().min(1, 'Seleccione un plan').required('El plan es obligatorio'),
    start_date: yup.string().required('La fecha de inicio es obligatoria'),
    end_date: yup.string().optional().nullable(),
    status: yup.string().required('El estado es obligatorio'),
    price: yup.number().min(0, 'El precio no puede ser negativo').required('El precio es obligatorio'),
    notes: yup.string().optional().nullable()
});

const initialValues = reactive<EnrollmentInput>({
    athlete_id: 0,
    plan_id: 0,
    start_date: (new Date().toISOString().split('T')[0] as string),
    end_date: '',
    status: 'Activo',
    price: 0,
    notes: ''
});

onMounted(async () => {
    await Promise.all([
        athletesStore.fetchAthletes(),
        store.fetchPlans()
    ]);

    if (isEditMode.value) {
        const id = Number(route.params.id);
        await store.fetchEnrollment(id);
        if (store.currentEnrollment) {
            Object.assign(initialValues, {
                athlete_id: store.currentEnrollment.athlete_id,
                plan_id: store.currentEnrollment.plan_id,
                start_date: store.currentEnrollment.start_date,
                end_date: store.currentEnrollment.end_date || '',
                status: store.currentEnrollment.status,
                price: store.currentEnrollment.price || 0,
                notes: store.currentEnrollment.notes || ''
            });
        } else {
            router.push('/enrollments');
        }
    }
});

const onPlanChange = (event: Event) => {
    const planId = Number((event.target as HTMLSelectElement).value);
    const selectedPlan = store.availablePlans.find(p => p.id === planId);
    if (selectedPlan) {
        initialValues.price = selectedPlan.price;
        // initialValues.plan_id ya se actualiza por el v-model o Field
    }
};

const onSubmit = async (values: any) => {
    try {
        if (isEditMode.value) {
            await store.updateEnrollment(Number(route.params.id), values);
            notify.success('Inscripción actualizada correctamente');
        } else {
            await store.createEnrollment(values);
            notify.success('Inscripción creada correctamente');
        }
        router.push('/enrollments');
    } catch (e: any) {
        console.error('Error saving enrollment:', e);
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
                            
                            <!-- Athlete Selector -->
                            <div class="col-span-2 md:col-span-1">
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Atleta</label>
                                <Field name="athlete_id" as="select" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" :disabled="isEditMode" :class="{ 'border-red-500': errors.athlete_id }">
                                    <option :value="0" disabled>Seleccione un Atleta</option>
                                    <option v-for="athlete in athletesStore.athletes" :key="athlete.id" :value="athlete.id">
                                        {{ athlete.nombre }} {{ athlete.apellido }} ({{ athlete.documento_identidad }})
                                    </option>
                                </Field>
                                <ErrorMessage name="athlete_id" class="mt-1 text-sm text-red-600" />
                            </div>

                            <!-- Plan Selector -->
                            <div class="col-span-2 md:col-span-1">
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Plan</label>
                                <Field name="plan_id" as="select" @change="onPlanChange" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" :class="{ 'border-red-500': errors.plan_id }">
                                    <option :value="0" disabled>Seleccione un Plan</option>
                                    <option v-for="plan in store.availablePlans" :key="plan.id" :value="plan.id">
                                        {{ plan.name }}
                                    </option>
                                </Field>
                                <ErrorMessage name="plan_id" class="mt-1 text-sm text-red-600" />
                            </div>

                            <!-- Dates -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha Inicio</label>
                                <Field name="start_date" type="date" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" :class="{ 'border-red-500': errors.start_date }" />
                                <ErrorMessage name="start_date" class="mt-1 text-sm text-red-600" />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha Fin (Opcional)</label>
                                <Field name="end_date" type="date" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                                <ErrorMessage name="end_date" class="mt-1 text-sm text-red-600" />
                            </div>

                            <!-- Status & Price -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Estado</label>
                                <Field name="status" as="select" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                    <option value="Activo">Activo</option>
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="Finalizado">Finalizado</option>
                                    <option value="Cancelado">Cancelado</option>
                                </Field>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Precio (COP)</label>
                                <Field name="price" type="number" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" :class="{ 'border-red-500': errors.price }" />
                                <ErrorMessage name="price" class="mt-1 text-sm text-red-600" />
                            </div>

                            <!-- Notes -->
                            <div class="col-span-2">
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Notas Adicionales</label>
                                <Field name="notes" as="textarea" rows="3" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                            </div>
                        </div>

                        <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <router-link 
                                to="/enrollments"
                                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancelar
                            </router-link>
                            <button 
                                type="submit" 
                                :disabled="store.loading"
                                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                {{ store.loading ? 'Guardando...' : (isEditMode ? 'Actualizar' : 'Inscribir') }}
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
