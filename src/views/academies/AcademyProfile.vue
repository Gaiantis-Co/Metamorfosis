<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useContextStore } from '../../stores/context';
import { academiesService } from '../../services/academies.service';
import AppLayout from '../../layouts/AppLayout.vue';

const contextStore = useContextStore();
const academy = ref<any>(null);
const loading = ref(true);

onMounted(async () => {
    if (contextStore.currentContext) {
        try {
            academy.value = await academiesService.getAcademyDetails(contextStore.currentContext.id);
        } catch (error) {
            console.error('Error loading academy:', error);
        } finally {
            loading.value = false;
        }
    }
});
</script>

<template>
    <AppLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Mi Academia
                </h2>
                <router-link 
                    v-if="academy"
                    to="/academy/edit"
                    class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium transition duration-150 ease-in-out"
                >
                    Editar Perfil
                </router-link>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div v-if="loading" class="text-center py-12">
                    <p class="text-gray-500">Cargando datos de la academia...</p>
                </div>

                <div v-else-if="academy" class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
                    <!-- Banner/Header -->
                    <div class="h-48 bg-linear-to-r from-indigo-500 to-purple-600 relative">
                        <div class="absolute -bottom-16 left-8">
                            <img 
                                :src="academy.logo_url || `https://ui-avatars.com/api/?name=${academy.nombre}&size=128&background=random`" 
                                :alt="academy.nombre"
                                class="w-32 h-32 rounded-xl border-4 border-white dark:border-gray-800 shadow-lg object-cover bg-white"
                            >
                        </div>
                    </div>

                    <div class="pt-20 px-8 pb-8">
                        <div class="flex justify-between items-start">
                            <div>
                                <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ academy.nombre }}</h1>
                                <p class="text-gray-500 dark:text-gray-400">{{ academy.razon_social }}</p>
                            </div>
                            <span :class="[
                                'px-3 py-1 rounded-full text-xs font-semibold',
                                academy.estado === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            ]">
                                {{ academy.estado }}
                            </span>
                        </div>

                        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-100 dark:border-gray-700 pt-8">
                            <!-- Basic Info -->
                            <div class="space-y-4">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Información de Contacto</h3>
                                <dl class="space-y-2">
                                    <div class="flex">
                                        <dt class="w-32 text-sm text-gray-500">Email:</dt>
                                        <dd class="text-sm text-gray-900 dark:text-gray-300">{{ academy.email || 'No especificado' }}</dd>
                                    </div>
                                    <div class="flex">
                                        <dt class="w-32 text-sm text-gray-500">Teléfono:</dt>
                                        <dd class="text-sm text-gray-900 dark:text-gray-300">{{ academy.telefono || 'No especificado' }}</dd>
                                    </div>
                                    <div class="flex">
                                        <dt class="w-32 text-sm text-gray-500">Dirección:</dt>
                                        <dd class="text-sm text-gray-900 dark:text-gray-300">{{ academy.direccion || 'No especificada' }}</dd>
                                    </div>
                                    <div class="flex" v-if="academy.sitio_web">
                                        <dt class="w-32 text-sm text-gray-500">Web:</dt>
                                        <dd class="text-sm">
                                            <a :href="academy.sitio_web" target="_blank" class="text-indigo-600 hover:text-indigo-500">
                                                {{ academy.sitio_web }}
                                            </a>
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            <!-- Additional info -->
                            <div class="space-y-4">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Identificación y Registro</h3>
                                <dl class="space-y-2">
                                    <div class="flex">
                                        <dt class="w-32 text-sm text-gray-500">NIT/ID:</dt>
                                        <dd class="text-sm text-gray-900 dark:text-gray-300">{{ academy.nit || 'No especificado' }}</dd>
                                    </div>
                                    <div class="flex">
                                        <dt class="w-32 text-sm text-gray-500">Tipo:</dt>
                                        <dd class="text-sm text-gray-900 dark:text-gray-300">{{ academy.tipo_academia || 'Club Deportivo' }}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        <!-- Description -->
                        <div class="mt-8 border-t border-gray-100 dark:border-gray-700 pt-8" v-if="academy.descripcion">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Sobre Nosotros</h3>
                            <p class="text-gray-600 dark:text-gray-300 whitespace-pre-line text-sm leading-relaxed">
                                {{ academy.descripcion }}
                            </p>
                        </div>
                    </div>
                </div>

                <div v-else class="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-md flex items-center shadow-sm">
                    <p class="text-yellow-700 dark:text-yellow-200 text-sm">
                        No se pudo encontrar información de la academia seleccionada.
                    </p>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
