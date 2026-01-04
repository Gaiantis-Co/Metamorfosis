<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { usePlansStore } from '../../stores/plans';
import AppLayout from '../../layouts/AppLayout.vue';

const store = usePlansStore();
const searchQuery = ref('');

onMounted(() => {
    store.fetchPlans();
});

const filteredPlans = computed(() => {
    if (!searchQuery.value) return store.plans;
    const query = searchQuery.value.toLowerCase();
    return store.plans.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
});

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Activo': return 'bg-green-100 text-green-800';
        case 'Inactivo': return 'bg-gray-100 text-gray-800';
        case 'Archivado': return 'bg-yellow-100 text-yellow-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};
</script>

<template>
    <AppLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Planes de Entrenamiento
                </h2>
                <router-link 
                    to="/plans/new"
                    class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium transition duration-150 ease-in-out"
                >
                    Nuevo Plan
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
                        placeholder="Buscar planes..."
                        class="w-full md:w-1/3 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-if="store.loading" class="col-span-full text-center py-12">
                        <p class="text-gray-500">Cargando planes...</p>
                    </div>

                    <div v-else-if="filteredPlans.length === 0" class="col-span-full text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
                        <p class="text-gray-500">No se encontraron planes.</p>
                    </div>

                    <div v-for="plan in filteredPlans" :key="plan.id" class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg flex flex-col">
                        <div class="p-6 flex-1">
                            <div class="flex justify-between items-start">
                                <h3 class="text-lg font-bold text-gray-900 dark:text-white">{{ plan.name }}</h3>
                                <span :class="['px-2 inline-flex text-xs leading-5 font-semibold rounded-full', getStatusColor(plan.status)]">
                                    {{ plan.status }}
                                </span>
                            </div>
                            <div class="mt-2 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                {{ plan.price.toLocaleString('es-CO', {style: 'currency', currency: 'COP'}) }}
                                <span class="text-sm text-gray-500 dark:text-gray-400 font-normal">/ {{ plan.duration_months }} mes(es)</span>
                            </div>
                            <p class="mt-4 text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                                {{ plan.description }}
                            </p>
                            
                            <div class="mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                <div class="flex flex-col">
                                    <span class="font-semibold text-gray-700 dark:text-gray-200">Capacidad</span>
                                    <span>{{ plan.enrolled_count }} / {{ plan.capacity }}</span>
                                </div>
                                <div class="flex flex-col text-right">
                                    <span class="font-semibold text-gray-700 dark:text-gray-200">Sesiones/Semana</span>
                                    <span>{{ plan.sessions_per_week }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 flex justify-between border-t border-gray-100 dark:border-gray-700">
                            <router-link :to="`/plans/${plan.id}`" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                Ver Detalles
                            </router-link>
                            <router-link :to="`/plans/${plan.id}/edit`" class="text-sm font-medium text-amber-600 hover:text-amber-500">
                                Editar
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
