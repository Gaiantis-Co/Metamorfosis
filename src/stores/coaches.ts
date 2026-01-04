import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Coach, CoachInput } from '../types/coach.types';
import { coachesService } from '../services/coaches.service';

export const useCoachesStore = defineStore('coaches', () => {
    const coaches = ref<Coach[]>([]);
    const currentCoach = ref<Coach | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchCoaches() {
        loading.value = true;
        error.value = null;
        try {
            coaches.value = await coachesService.getCoaches();
        } catch (e: any) {
            error.value = e.message;
        } finally {
            loading.value = false;
        }
    }

    async function fetchCoach(id: number) {
        loading.value = true;
        error.value = null;
        try {
            currentCoach.value = await coachesService.getCoach(id);
        } catch (e: any) {
            error.value = e.message;
        } finally {
            loading.value = false;
        }
    }

    async function createCoach(data: CoachInput) {
        loading.value = true;
        error.value = null;
        try {
            const newCoach = await coachesService.createCoach(data);
            coaches.value.push(newCoach);
            return newCoach;
        } catch (e: any) {
            error.value = e.message;
            throw e;
        } finally {
            loading.value = false;
        }
    }

    async function updateCoach(id: number, data: CoachInput) {
        loading.value = true;
        error.value = null;
        try {
            const updated = await coachesService.updateCoach(id, data);
            const index = coaches.value.findIndex(c => c.id === id);
            if (index !== -1) {
                coaches.value[index] = updated;
            }
            if (currentCoach.value?.id === id) {
                currentCoach.value = updated;
            }
            return updated;
        } catch (e: any) {
            error.value = e.message;
            throw e;
        } finally {
            loading.value = false;
        }
    }

    async function deleteCoach(id: number) {
        loading.value = true;
        error.value = null;
        try {
            await coachesService.deleteCoach(id);
            coaches.value = coaches.value.filter(c => c.id !== id);
            if (currentCoach.value?.id === id) {
                currentCoach.value = null;
            }
        } catch (e: any) {
            error.value = e.message;
            throw e;
        } finally {
            loading.value = false;
        }
    }

    return {
        coaches,
        currentCoach,
        loading,
        error,
        fetchCoaches,
        fetchCoach,
        createCoach,
        updateCoach,
        deleteCoach
    };
});
