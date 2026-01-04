<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useCoachesStore } from '../../stores/coaches';
import AppLayout from '../../layouts/AppLayout.vue';
import { useRouter } from 'vue-router';

const store = useCoachesStore();
const router = useRouter();
const searchQuery = ref('');

onMounted(() => {
    store.fetchCoaches();
});

const filteredCoaches = computed(() => {
    if (!searchQuery.value) return store.coaches;
    const query = searchQuery.value.toLowerCase();
    return store.coaches.filter(coach => 
        coach.nombre.toLowerCase().includes(query) || 
        coach.apellido.toLowerCase().includes(query) ||
        coach.especialidad.toLowerCase().includes(query)
    );
});

const deleteCoach = async (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este entrenador?')) {
        await store.deleteCoach(id);
    }
};
</script>

<template>
    <AppLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Entrenadores
                </h2>
                <router-link 
                    to="/coaches/new"
                    class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium transition duration-150 ease-in-out"
                >
                    Nuevo Entrenador
                </router-link>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <!-- Search -->
                <div class="mb-4">
                    <input 
                        v-model="searchQuery"
                        type="text"
                        placeholder="Buscar por nombre o especialidad..."
                        class="w-full md:w-1/3 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                </div>

                <!-- Cards Grid -->
                <div v-if="store.loading" class="text-center py-12">
                    <p class="text-gray-500">Cargando entrenadores...</p>
                </div>

                <div v-else-if="filteredCoaches.length === 0" class="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
                    <p class="text-gray-500">No se encontraron entrenadores.</p>
                </div>

                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="coach in filteredCoaches" :key="coach.id" class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg flex flex-col">
                        <div class="p-6 flex-1 flex flex-col items-center">
                            <img 
                                class="h-24 w-24 rounded-full object-cover border-4 border-gray-100 dark:border-gray-700 mb-4"
                                :src="`https://ui-avatars.com/api/?name=${coach.nombre}+${coach.apellido}&size=128&rounded=true`"
                                alt=""
                            >
                            <h3 class="text-lg font-bold text-gray-900 dark:text-white">{{ coach.nombre }} {{ coach.apellido }}</h3>
                            <p class="text-indigo-600 dark:text-indigo-400 font-medium text-sm">{{ coach.especialidad }}</p>
                            
                            <div class="mt-4 w-full space-y-2">
                                <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                    <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    {{ coach.email }}
                                </div>
                                <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                    <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    {{ coach.telefono }}
                                </div>
                            </div>

                            <div class="mt-4 flex flex-wrap justify-center gap-2">
                                <span 
                                    :class="[
                                        'px-2 py-1 text-xs font-semibold rounded-full',
                                        coach.estado === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    ]"
                                >
                                    {{ coach.estado }}
                                </span>
                            </div>
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 flex justify-between border-t border-gray-100 dark:border-gray-700">
                            <router-link :to="`/coaches/${coach.id}`" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                Ver Detalles
                            </router-link>
                            <div class="flex space-x-3">
                                <router-link :to="`/coaches/${coach.id}/edit`" class="text-sm font-medium text-amber-600 hover:text-amber-500">
                                    Editar
                                </router-link>
                                <button @click="deleteCoach(coach.id)" class="text-sm font-medium text-red-600 hover:text-red-500">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
