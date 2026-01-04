<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useAthletesStore } from '../../stores/athletes';
import AppLayout from '../../layouts/AppLayout.vue';
import { useRouter } from 'vue-router';

const store = useAthletesStore();
const router = useRouter();
const searchQuery = ref('');

onMounted(() => {
    store.fetchAthletes();
});

const filteredAthletes = computed(() => {
    if (!searchQuery.value) return store.athletes;
    const query = searchQuery.value.toLowerCase();
    return store.athletes.filter(athlete => 
        athlete.nombre.toLowerCase().includes(query) || 
        athlete.apellido.toLowerCase().includes(query) ||
        athlete.email?.toLowerCase().includes(query)
    );
});

const deleteAthlete = async (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este atleta?')) {
        await store.deleteAthlete(id);
    }
};
</script>

<template>
    <AppLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Atletas
                </h2>
                <router-link 
                    to="/athletes/new"
                    class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium transition duration-150 ease-in-out"
                >
                    Nuevo Atleta
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
                        placeholder="Buscar por nombre o email..."
                        class="w-full md:w-1/3 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                </div>

                <!-- Table -->
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
                    <div v-if="store.loading" class="p-6 text-center text-gray-500 dark:text-gray-400">
                        Cargando atletas...
                    </div>
                    
                    <div v-else-if="filteredAthletes.length === 0" class="p-6 text-center text-gray-500 dark:text-gray-400">
                        No se encontraron atletas.
                    </div>

                    <div v-else class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead class="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Nombre Completo
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Género
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                <tr v-for="athlete in filteredAthletes" :key="athlete.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <div class="h-10 w-10 shrink-0">
                                                <img class="h-10 w-10 rounded-full bg-gray-200" :src="`https://ui-avatars.com/api/?name=${athlete.nombre}+${athlete.apellido}&color=7F9CF5&background=EBF4FF`" alt="">
                                            </div>
                                            <div class="ml-4">
                                                <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {{ athlete.nombre }} {{ athlete.apellido }}
                                                </div>
                                                <div class="text-sm text-gray-500 dark:text-gray-400">
                                                    DOC: {{ athlete.documento_identidad || 'N/A' }}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900 dark:text-gray-100">{{ athlete.email || '-' }}</div>
                                        <div class="text-sm text-gray-500 dark:text-gray-400">{{ athlete.telefono || '-' }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                                            :class="{
                                                'bg-blue-100 text-blue-800': athlete.genero === 'M',
                                                'bg-pink-100 text-pink-800': athlete.genero === 'F',
                                                'bg-gray-100 text-gray-800': athlete.genero === 'Otro'
                                            }">
                                            {{ athlete.genero }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <router-link :to="`/athletes/${athlete.id}`" class="text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-400 mr-3">Ver</router-link>
                                        <router-link :to="`/athletes/${athlete.id}/edit`" class="text-amber-600 hover:text-amber-900 dark:hover:text-amber-400 mr-3">Editar</router-link>
                                        <button @click="deleteAthlete(athlete.id)" class="text-red-600 hover:text-red-900 dark:hover:text-red-400">Eliminar</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
