<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCoachesStore } from '../../stores/coaches';
import AppLayout from '../../layouts/AppLayout.vue';
import type { CoachInput } from '../../types/coach.types';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import notify from '../../lib/toast';

const route = useRoute();
const router = useRouter();
const store = useCoachesStore();

const isEditMode = computed(() => route.params.id !== undefined);
const title = computed(() => isEditMode.value ? 'Editar Entrenador' : 'Nuevo Entrenador');

const schema = yup.object({
    nombre: yup.string().required('El nombre es obligatorio'),
    apellido: yup.string().required('El apellido es obligatorio'),
    email: yup.string().email('Email inválido').required('El email es obligatorio'),
    telefono: yup.string().required('El teléfono es obligatorio'),
    especialidad: yup.string().required('La especialidad es obligatoria'),
    estado: yup.string().required('El estado es obligatorio'),
});

const initialValues = reactive<CoachInput>({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    especialidad: '',
    estado: 'Activo',
    certificaciones: []
});

const certInput = ref('');

onMounted(async () => {
    if (isEditMode.value) {
        const id = Number(route.params.id);
        await store.fetchCoach(id);
        if (store.currentCoach) {
            Object.assign(initialValues, {
                nombre: store.currentCoach.nombre,
                apellido: store.currentCoach.apellido,
                email: store.currentCoach.email,
                telefono: store.currentCoach.telefono,
                especialidad: store.currentCoach.especialidad,
                estado: store.currentCoach.estado,
                certificaciones: store.currentCoach.certificaciones ? [...store.currentCoach.certificaciones] : []
            });
        } else {
            router.push('/coaches');
        }
    }
});

const addCert = () => {
    if (certInput.value.trim()) {
        if (!initialValues.certificaciones) initialValues.certificaciones = [];
        initialValues.certificaciones.push(certInput.value.trim());
        certInput.value = '';
    }
};

const removeCert = (index: number) => {
    if (initialValues.certificaciones) {
        initialValues.certificaciones.splice(index, 1);
    }
};

const onSubmit = async (values: any) => {
    try {
        // Combinar certificaciones manuales con los valores del formulario
        const payload = { ...values, certificaciones: initialValues.certificaciones };
        
        if (isEditMode.value) {
            await store.updateCoach(Number(route.params.id), payload);
            notify.success('Entrenador actualizado correctamente');
        } else {
            await store.createCoach(payload);
            notify.success('Entrenador creado correctamente');
        }
        router.push('/coaches');
    } catch (e: any) {
        console.error('Error saving coach:', e);
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

                            <!-- Email -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                <Field name="email" type="email" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" :class="{ 'border-red-500': errors.email }" />
                                <ErrorMessage name="email" class="mt-1 text-sm text-red-600" />
                            </div>

                            <!-- Teléfono -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Teléfono</label>
                                <Field name="telefono" type="tel" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" :class="{ 'border-red-500': errors.telefono }" />
                                <ErrorMessage name="telefono" class="mt-1 text-sm text-red-600" />
                            </div>

                            <!-- Especialidad -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Especialidad</label>
                                <Field name="especialidad" type="text" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" :class="{ 'border-red-500': errors.especialidad }" />
                                <ErrorMessage name="especialidad" class="mt-1 text-sm text-red-600" />
                            </div>

                            <!-- Estado -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Estado</label>
                                <Field name="estado" as="select" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                    <option value="Suspendido">Suspendido</option>
                                </Field>
                            </div>

                            <!-- Certificaciones -->
                            <div class="col-span-2">
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Certificaciones</label>
                                <div class="mt-1 flex gap-2">
                                    <input 
                                        v-model="certInput" 
                                        type="text" 
                                        placeholder="Agregar certificación..."
                                        class="block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        @keydown.enter.prevent="addCert"
                                    >
                                    <button 
                                        type="button"
                                        @click="addCert"
                                        class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                                    >
                                        Agregar
                                    </button>
                                </div>
                                <div class="mt-2 flex flex-wrap gap-2">
                                    <span 
                                        v-for="(cert, index) in initialValues.certificaciones" 
                                        :key="index"
                                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                                    >
                                        {{ cert }}
                                        <button 
                                            @click="removeCert(index)"
                                            type="button"
                                            class="ml-1.5 inline-flex items-center justify-center text-indigo-400 hover:text-indigo-600 focus:outline-none"
                                        >
                                            <span class="sr-only">Remove</span>
                                            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <router-link 
                                to="/coaches"
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
