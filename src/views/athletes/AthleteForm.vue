<script setup lang="ts">
import { onMounted, computed, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAthletesStore } from '../../stores/athletes';
import AppLayout from '../../layouts/AppLayout.vue';
import type { AthleteInput } from '../../types/athlete.types';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import notify from '../../lib/toast';

const route = useRoute();
const router = useRouter();
const store = useAthletesStore();

const isEditMode = computed(() => route.params.id !== undefined);
const title = computed(() => isEditMode.value ? 'Editar Atleta' : 'Nuevo Atleta');

const schema = yup.object({
    nombre: yup.string().required('El nombre es obligatorio'),
    apellido: yup.string().required('El apellido es obligatorio'),
    fecha_nacimiento: yup.string().required('La fecha de nacimiento es obligatoria'),
    genero: yup.string().required('El género es obligatorio'),
    email: yup.string().email('Email inválido').optional().nullable(),
    telefono: yup.string().optional().nullable(),
    documento_identidad: yup.string().optional().nullable(),
});

const initialValues = reactive<AthleteInput>({
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    genero: 'M',
    email: '',
    telefono: '',
    documento_identidad: ''
});

onMounted(async () => {
    if (isEditMode.value) {
        const id = Number(route.params.id);
        await store.fetchAthlete(id);
        if (store.currentAthlete) {
            Object.assign(initialValues, {
                nombre: store.currentAthlete.nombre,
                apellido: store.currentAthlete.apellido,
                fecha_nacimiento: (store.currentAthlete.fecha_nacimiento || '').split('T')[0],
                genero: store.currentAthlete.genero,
                email: store.currentAthlete.email || '',
                telefono: store.currentAthlete.telefono || '',
                documento_identidad: store.currentAthlete.documento_identidad || ''
            });
        } else {
            router.push('/athletes');
        }
    }
});

const onSubmit = async (values: any) => {
    try {
        if (isEditMode.value) {
            await store.updateAthlete(Number(route.params.id), values);
            notify.success('Atleta actualizado correctamente');
        } else {
            await store.createAthlete(values);
            notify.success('Atleta creado correctamente');
        }
        router.push('/athletes');
    } catch (e: any) {
        // El interceptor de Axios ya maneja los errores generales
        console.error('Error saving athlete:', e);
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
                            <!-- Nombre -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
                                <Field name="nombre" type="text" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" :class="{ 'border-red-500': errors.nombre }" />
                                <ErrorMessage name="nombre" class="mt-1 text-sm text-red-600" />
                            </div>

                            <!-- Apellido -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Apellido</label>
                                <Field name="apellido" type="text" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" :class="{ 'border-red-500': errors.apellido }" />
                                <ErrorMessage name="apellido" class="mt-1 text-sm text-red-600" />
                            </div>

                            <!-- Documento -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Documento de Identidad</label>
                                <Field name="documento_identidad" type="text" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                                <ErrorMessage name="documento_identidad" class="mt-1 text-sm text-red-600" />
                            </div>

                            <!-- Fecha Nacimiento -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha de Nacimiento</label>
                                <Field name="fecha_nacimiento" type="date" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" :class="{ 'border-red-500': errors.fecha_nacimiento }" />
                                <ErrorMessage name="fecha_nacimiento" class="mt-1 text-sm text-red-600" />
                            </div>

                            <!-- Género -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Género</label>
                                <Field name="genero" as="select" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                    <option value="M">Masculino</option>
                                    <option value="F">Femenino</option>
                                    <option value="Otro">Otro</option>
                                </Field>
                            </div>

                            <!-- Email -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                <Field name="email" type="email" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                                <ErrorMessage name="email" class="mt-1 text-sm text-red-600" />
                            </div>

                            <!-- Teléfono -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Teléfono</label>
                                <Field name="telefono" type="tel" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                            </div>
                        </div>

                        <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <router-link 
                                to="/athletes"
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
