<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEnrollmentsStore } from '../../stores/enrollments';
import AppLayout from '../../layouts/AppLayout.vue';

const route = useRoute();
const router = useRouter();
const store = useEnrollmentsStore();

onMounted(async () => {
    const id = Number(route.params.id);
    try {
        await store.fetchEnrollment(id);
    } catch (e) {
        router.push('/enrollments');
    }
});

const deleteEnrollment = async () => {
    if (store.currentEnrollment && confirm('¿Estás seguro de que deseas eliminar esta inscripción?')) {
        await store.deleteEnrollment(store.currentEnrollment.id);
        router.push('/enrollments');
    }
};
</script>

<template>
    <AppLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Detalle de Inscripción
                </h2>
                <div class="flex space-x-3">
                    <router-link 
                        v-if="store.currentEnrollment"
                        :to="`/enrollments/${store.currentEnrollment.id}/edit`"
                        class="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 text-sm font-medium"
                    >
                        Editar
                    </router-link>
                    <button 
                        @click="deleteEnrollment"
                        class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div v-if="store.currentEnrollment" class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
                    <div class="px-6 py-8 border-b border-gray-200 dark:border-gray-700">
                        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {{ store.currentEnrollment.athlete_name }}
                        </h1>
                        <p class="text-lg text-gray-600 dark:text-gray-400">
                            {{ store.currentEnrollment.plan_name }}
                        </p>
                    </div>

                    <div class="px-6 py-8">
                        <dl class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8">
                            <div>
                                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Estado</dt>
                                <dd class="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{{ store.currentEnrollment.status }}</dd>
                            </div>
                            <div>
                                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Precio</dt>
                                <dd class="mt-1 text-sm text-gray-900 dark:text-white">
                                    {{ store.currentEnrollment.price?.toLocaleString('es-CO', {style: 'currency', currency: 'COP'}) }}
                                </dd>
                            </div>
                            <div>
                                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Fecha Inicio</dt>
                                <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ store.currentEnrollment.start_date }}</dd>
                            </div>
                            <div>
                                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Fecha Fin</dt>
                                <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ store.currentEnrollment.end_date || 'N/A' }}</dd>
                            </div>
                            <div class="col-span-2">
                                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Notas</dt>
                                <dd class="mt-1 text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
                                    {{ store.currentEnrollment.notes || 'Sin notas adicionales.' }}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
