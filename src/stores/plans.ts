import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { TrainingPlan, TrainingPlanInput } from '../types/plan.types';
import { plansService } from '../services/plans.service';

export const usePlansStore = defineStore('plans', () => {
    const plans = ref<TrainingPlan[]>([]);
    const currentPlan = ref<TrainingPlan | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchPlans() {
        loading.value = true;
        try {
            plans.value = await plansService.getPlans();
        } catch (e: any) {
            error.value = e.message;
        } finally {
            loading.value = false;
        }
    }

    async function fetchPlan(id: number) {
        loading.value = true;
        try {
            currentPlan.value = await plansService.getPlan(id);
        } catch (e: any) {
            error.value = e.message;
        } finally {
            loading.value = false;
        }
    }

    async function createPlan(data: TrainingPlanInput) {
        loading.value = true;
        try {
            const newItem = await plansService.createPlan(data);
            plans.value.push(newItem);
        } catch (e: any) {
            error.value = e.message;
            throw e;
        } finally {
            loading.value = false;
        }
    }

    async function updatePlan(id: number, data: TrainingPlanInput) {
        loading.value = true;
        try {
            const updated = await plansService.updatePlan(id, data);
            const index = plans.value.findIndex(p => p.id === id);
            if (index !== -1) plans.value[index] = updated;
            if (currentPlan.value?.id === id) currentPlan.value = updated;
        } catch (e: any) {
            error.value = e.message;
            throw e;
        } finally {
            loading.value = false;
        }
    }

    async function deletePlan(id: number) {
        loading.value = true;
        try {
            await plansService.deletePlan(id);
            plans.value = plans.value.filter(p => p.id !== id);
        } catch (e: any) {
            error.value = e.message;
        } finally {
            loading.value = false;
        }
    }

    return {
        plans,
        currentPlan,
        loading,
        error,
        fetchPlans,
        fetchPlan,
        createPlan,
        updatePlan,
        deletePlan
    };
});
