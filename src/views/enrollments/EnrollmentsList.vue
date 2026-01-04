<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useEnrollmentsStore } from '../../stores/enrollments';
import AppLayout from '../../layouts/AppLayout.vue';

const store = useEnrollmentsStore();
const searchQuery = ref('');

onMounted(() => {
    store.fetchEnrollments();
});

const filteredEnrollments = computed(() => {
    if (!searchQuery.value) return store.enrollments;
    const query = searchQuery.value.toLowerCase();
    return store.enrollments.filter(e => 
        e.athlete_name?.toLowerCase().includes(query) ||
        e.plan_name?.toLowerCase().includes(query)
    );
});

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Activo': return 'bg-green-100 text-green-800';
        case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
        case 'Finalizado': return 'bg-gray-100 text-gray-800';
        case 'Cancelado': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};
</script>

<template>
    <AppLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Inscripciones
                </h2>
                <router-link 
                    to="/enrollments/new"
                    class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium transition duration-150 ease-in-out"
                >
                    Nueva Inscripción
                </router-link>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <!-- Search -->
                <div class="mb-6">
                    <input 
                        v-model="searchQuery"
                        type="text"
                        placeholder="Buscar por atleta o plan..."
                        class="w-full md:w-1/3 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                </div>

                <div class="bg-white dark:bg-gray-800 shadow-xl sm:rounded-lg overflow-hidden">
                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead class="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Atleta</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Plan</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fechas</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Estado</th>
                                <th scope="col" class="relative px-6 py-3">
                                    <span class="sr-only">Acciones</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            <tr v-if="store.loading">
                                <td colspan="5" class="px-6 py-4 text-center text-gray-500">Cargando...</td>
                            </tr>
                            <tr v-else-if="filteredEnrollments.length === 0">
                                <td colspan="5" class="px-6 py-4 text-center text-gray-500">No se encontraron inscripciones.</td>
                            </tr>
                            <tr v-for="item in filteredEnrollments" :key="item.id">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ item.athlete_name }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900 dark:text-white">{{ item.plan_name }}</div>
                                    <div class="text-sm text-gray-500">{{ item.price?.toLocaleString('es-CO', {style: 'currency', currency: 'COP'}) }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900 dark:text-white">Desde: {{ item.start_date }}</div>
                                    <div class="text-sm text-gray-500" v-if="item.end_date">Hasta: {{ item.end_date }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span :class="['px-2 inline-flex text-xs leading-5 font-semibold rounded-full', getStatusColor(item.status)]">
                                        {{ item.status }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <router-link :to="`/enrollments/${item.id}`" class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4">Ver</router-link>
                                    <router-link :to="`/enrollments/${item.id}/edit`" class="text-amber-600 hover:text-amber-900 dark:text-amber-400 dark:hover:text-amber-300">Editar</router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
