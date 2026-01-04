<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAthletesStore } from '../../stores/athletes';
import AppLayout from '../../layouts/AppLayout.vue';

const route = useRoute();
const router = useRouter();
const store = useAthletesStore();

onMounted(async () => {
    const id = Number(route.params.id);
    try {
        await store.fetchAthlete(id);
    } catch (e) {
        router.push('/athletes');
    }
});

const deleteAthlete = async () => {
    if (store.currentAthlete && confirm('¿Estás seguro de que deseas eliminar este atleta?')) {
        await store.deleteAthlete(store.currentAthlete.id);
        router.push('/athletes');
    }
};
</script>

<template>
    <AppLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Detalle del Atleta
                </h2>
                <div class="flex space-x-3">
                    <router-link 
                        v-if="store.currentAthlete"
                        :to="`/athletes/${store.currentAthlete.id}/edit`"
                        class="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 text-sm font-medium"
                    >
                        Editar
                    </router-link>
                    <button 
                        @click="deleteAthlete"
                        class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div v-if="store.loading" class="text-center py-12">
                    <p class="text-gray-500">Cargando...</p>
                </div>

                <div v-else-if="store.currentAthlete" class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
                    <!-- Header Profile -->
                    <div class="bg-gray-50 dark:bg-gray-700/50 px-6 py-8 border-b border-gray-200 dark:border-gray-700 flex flex-col items-center">
                        <img 
                            class="h-24 w-24 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md"
                            :src="`https://ui-avatars.com/api/?name=${store.currentAthlete.nombre}+${store.currentAthlete.apellido}&size=128&color=7F9CF5&background=EBF4FF`"
                            alt="Profile"
                        >
                        <h1 class="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                            {{ store.currentAthlete.nombre }} {{ store.currentAthlete.apellido }}
                        </h1>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            ID: {{ store.currentAthlete.id }}
                        </p>
                    </div>

                    <!-- Info Grid -->
                    <div class="px-6 py-8">
                        <dl class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8">
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Documento de Identidad</dt>
                                <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ store.currentAthlete.documento_identidad || 'No registrado' }}</dd>
                            </div>
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Género</dt>
                                <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ store.currentAthlete.genero === 'M' ? 'Masculino' : (store.currentAthlete.genero === 'F' ? 'Femenino' : 'Otro') }}</dd>
                            </div>
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Fecha de Nacimiento</dt>
                                <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ store.currentAthlete.fecha_nacimiento }}</dd>
                            </div>
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                                <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ store.currentAthlete.email || 'No registrado' }}</dd>
                            </div>
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Teléfono</dt>
                                <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ store.currentAthlete.telefono || 'No registrado' }}</dd>
                            </div>
                        </dl>
                    </div>

                    <!-- Footer -->
                    <div class="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 flex justify-start">
                        <router-link to="/athletes" class="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                            &larr; Volver a la lista
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
