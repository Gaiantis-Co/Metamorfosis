<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCoachesStore } from '../../stores/coaches';
import AppLayout from '../../layouts/AppLayout.vue';

const route = useRoute();
const router = useRouter();
const store = useCoachesStore();

onMounted(async () => {
    const id = Number(route.params.id);
    try {
        await store.fetchCoach(id);
    } catch (e) {
        router.push('/coaches');
    }
});

const deleteCoach = async () => {
    if (store.currentCoach && confirm('¿Estás seguro de que deseas eliminar este entrenador?')) {
        await store.deleteCoach(store.currentCoach.id);
        router.push('/coaches');
    }
};
</script>

<template>
    <AppLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Perfil del Entrenador
                </h2>
                <div class="flex space-x-3">
                    <router-link 
                        v-if="store.currentCoach"
                        :to="`/coaches/${store.currentCoach.id}/edit`"
                        class="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 text-sm font-medium"
                    >
                        Editar
                    </router-link>
                    <button 
                        @click="deleteCoach"
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

                <div v-else-if="store.currentCoach" class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
                    <!-- Header Profile -->
                    <div class="bg-gray-50 dark:bg-gray-700/50 px-6 py-8 border-b border-gray-200 dark:border-gray-700 flex flex-col items-center">
                        <img 
                            class="h-32 w-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md"
                            :src="`https://ui-avatars.com/api/?name=${store.currentCoach.nombre}+${store.currentCoach.apellido}&size=128&rounded=true`"
                            alt="Profile"
                        >
                        <h1 class="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
                            {{ store.currentCoach.nombre }} {{ store.currentCoach.apellido }}
                        </h1>
                        <p class="text-lg text-indigo-600 dark:text-indigo-400 font-medium">
                            {{ store.currentCoach.especialidad }}
                        </p>
                        <span 
                            :class="[
                                'mt-2 px-3 py-1 text-xs font-semibold rounded-full',
                                store.currentCoach.estado === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            ]"
                        >
                            {{ store.currentCoach.estado }}
                        </span>
                    </div>

                    <!-- Info Grid -->
                    <div class="px-6 py-8">
                        <dl class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8">
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                                <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ store.currentCoach.email }}</dd>
                            </div>
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Teléfono</dt>
                                <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ store.currentCoach.telefono }}</dd>
                            </div>
                            <div class="col-span-1 md:col-span-2">
                                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Certificaciones</dt>
                                <dd class="mt-1">
                                    <div v-if="store.currentCoach.certificaciones && store.currentCoach.certificaciones.length > 0" class="flex flex-wrap gap-2">
                                        <span 
                                            v-for="cert in store.currentCoach.certificaciones" 
                                            :key="cert"
                                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                                        >
                                            {{ cert }}
                                        </span>
                                    </div>
                                    <span v-else class="text-sm text-gray-500 dark:text-gray-400">Sin certificaciones registradas.</span>
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <!-- Footer -->
                    <div class="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 flex justify-start">
                        <router-link to="/coaches" class="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                            &larr; Volver a la lista
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
