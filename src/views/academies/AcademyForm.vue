<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useContextStore } from '../../stores/context';
import { academiesService, type AcademyDetails } from '../../services/academies.service';
import AppLayout from '../../layouts/AppLayout.vue';
import { useRouter } from 'vue-router';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import notify from '../../lib/toast';

const contextStore = useContextStore();
const router = useRouter();
const loading = ref(false);
const submitting = ref(false);

const schema = yup.object({
    nombre: yup.string().required('El nombre es obligatorio'),
    alias: yup.string().required('El alias es obligatorio'),
    email_contacto: yup.string().email('Email inválido').nullable(),
    telefono_contacto: yup.string().nullable(),
    website: yup.string().nullable(),
    description: yup.string().nullable()
});

const initialValues = reactive<Partial<AcademyDetails>>({
    nombre: '',
    alias: '',
    email_contacto: '',
    telefono_contacto: '',
    website: '',
    description: ''
});

onMounted(async () => {
    if (contextStore.currentContext?.id) {
        loading.value = true;
        try {
            const data = await academiesService.getAcademyDetails(contextStore.currentContext.id);
            Object.assign(initialValues, data);
        } catch (e) {
            console.error(e);
            router.push('/academy');
        } finally {
            loading.value = false;
        }
    }
});

const onSubmit = async (values: any) => {
    if (!contextStore.currentContext?.id) return;
    
    submitting.value = true;
    try {
        await academiesService.updateAcademy(contextStore.currentContext.id, values);
        notify.success('Configuración de la academia actualizada');
        router.push('/academy');
    } catch (e) {
        console.error(e);
    } finally {
        submitting.value = false;
    }
};
</script>

<template>
    <AppLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Editar Academia
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg p-6">
                    <div v-if="loading" class="text-center py-6">
                        <p class="text-gray-500">Cargando...</p>
                    </div>
                    
                    <Form v-else :validation-schema="schema" :initial-values="initialValues" @submit="onSubmit" v-slot="{ errors }" class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Basic Info -->
                            <div class="col-span-2">
                                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4 border-b pb-2 dark:border-gray-700">Información General</h3>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre de la Academia</label>
                                <Field name="nombre" type="text" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" :class="{ 'border-red-500': errors.nombre }" />
                                <ErrorMessage name="nombre" class="mt-1 text-sm text-red-600" />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Alias / Siglas</label>
                                <Field name="alias" type="text" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" :class="{ 'border-red-500': errors.alias }" />
                                <ErrorMessage name="alias" class="mt-1 text-sm text-red-600" />
                            </div>

                            <div class="col-span-2">
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción</label>
                                <Field name="description" as="textarea" rows="3" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                            </div>

                            <!-- Contact Info -->
                            <div class="col-span-2 mt-4">
                                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4 border-b pb-2 dark:border-gray-700">Contacto</h3>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email de Contacto</label>
                                <Field name="email_contacto" type="email" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" :class="{ 'border-red-500': errors.email_contacto }" />
                                <ErrorMessage name="email_contacto" class="mt-1 text-sm text-red-600" />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Teléfono</label>
                                <Field name="telefono_contacto" type="tel" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                            </div>

                            <div class="col-span-2">
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Sitio Web</label>
                                <Field name="website" type="text" placeholder="www.ejemplo.com" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                            </div>
                        </div>

                        <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <router-link 
                                to="/academy"
                                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancelar
                            </router-link>
                            <button 
                                type="submit" 
                                :disabled="submitting"
                                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                {{ submitting ? 'Guardando...' : 'Guardar Cambios' }}
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
