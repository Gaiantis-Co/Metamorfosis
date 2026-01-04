<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePlansStore } from '../../stores/plans';
import AppLayout from '../../layouts/AppLayout.vue';

const route = useRoute();
const router = useRouter();
const store = usePlansStore();

onMounted(async () => {
    const id = Number(route.params.id);
    try {
        await store.fetchPlan(id);
    } catch (e) {
        router.push('/plans');
    }
});

const deletePlan = async () => {
    if (store.currentPlan && confirm('¿Estás seguro de que deseas eliminar este plan?')) {
        await store.deletePlan(store.currentPlan.id);
        router.push('/plans');
    }
};
</script>

<template>
    <AppLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Detalle del Plan
                </h2>
                <div class="flex space-x-3">
                    <router-link 
                        v-if="store.currentPlan"
                        :to="`/plans/${store.currentPlan.id}/edit`"
                        class="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 text-sm font-medium"
                    >
                        Editar
                    </router-link>
                    <button 
                        @click="deletePlan"
                        class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div v-if="store.currentPlan" class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
                    <div class="px-6 py-8 border-b border-gray-200 dark:border-gray-700 bg-indigo-50 dark:bg-indigo-900/20">
                        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {{ store.currentPlan.name }}
                        </h1>
                        <p class="text-xl text-indigo-600 dark:text-indigo-400 font-semibold">
                            {{ store.currentPlan.price.toLocaleString('es-CO', {style: 'currency', currency: 'COP'}) }}
                        </p>
                    </div>

                    <div class="px-6 py-8">
                        <dl class="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8">
                            <div class="col-span-1 md:col-span-3">
                                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Descripción</dt>
                                <dd class="mt-1 text-base text-gray-900 dark:text-white">{{ store.currentPlan.description }}</dd>
                            </div>
                            
                            <div>
                                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Duración</dt>
                                <dd class="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{{ store.currentPlan.duration_months }} Meses</dd>
                            </div>

                            <div>
                                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Sesiones Semanales</dt>
                                <dd class="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{{ store.currentPlan.sessions_per_week }}</dd>
                            </div>

                            <div>
                                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Estado</dt>
                                <dd class="mt-1">
                                    <span :class="[
                                        'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                                        store.currentPlan.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    ]">
                                        {{ store.currentPlan.status }}
                                    </span>
                                </dd>
                            </div>

                            <div>
                                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Inscritos / Capacidad</dt>
                                <dd class="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                                    {{ store.currentPlan.enrolled_count }} / {{ store.currentPlan.capacity }}
                                </dd>
                                <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
                                    <div class="bg-indigo-600 h-2.5 rounded-full" :style="`width: ${(store.currentPlan.enrolled_count || 0) / store.currentPlan.capacity * 100}%`"></div>
                                </div>
                            </div>
                        </dl>
                    </div>

                    <!-- Footer -->
                    <div class="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 flex justify-start">
                        <router-link to="/plans" class="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                            &larr; Volver a la lista
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
