import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Athlete, AthleteInput } from '../types/athlete.types';
import { athletesService } from '../services/athletes.service';

export const useAthletesStore = defineStore('athletes', () => {
    const athletes = ref<Athlete[]>([]);
    const currentAthlete = ref<Athlete | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchAthletes() {
        loading.value = true;
        error.value = null;
        try {
            athletes.value = await athletesService.getAthletes();
        } catch (e: any) {
            error.value = e.message;
        } finally {
            loading.value = false;
        }
    }

    async function fetchAthlete(id: number) {
        loading.value = true;
        error.value = null;
        try {
            currentAthlete.value = await athletesService.getAthlete(id);
        } catch (e: any) {
            error.value = e.message;
        } finally {
            loading.value = false;
        }
    }

    async function createAthlete(data: AthleteInput) {
        loading.value = true;
        error.value = null;
        try {
            const newAthlete = await athletesService.createAthlete(data);
            athletes.value.push(newAthlete);
            return newAthlete;
        } catch (e: any) {
            error.value = e.message;
            throw e;
        } finally {
            loading.value = false;
        }
    }

    async function updateAthlete(id: number, data: AthleteInput) {
        loading.value = true;
        error.value = null;
        try {
            const updated = await athletesService.updateAthlete(id, data);
            const index = athletes.value.findIndex(a => a.id === id);
            if (index !== -1) {
                athletes.value[index] = updated;
            }
            if (currentAthlete.value?.id === id) {
                currentAthlete.value = updated;
            }
            return updated;
        } catch (e: any) {
            error.value = e.message;
            throw e;
        } finally {
            loading.value = false;
        }
    }

    async function deleteAthlete(id: number) {
        loading.value = true;
        error.value = null;
        try {
            await athletesService.deleteAthlete(id);
            athletes.value = athletes.value.filter(a => a.id !== id);
            if (currentAthlete.value?.id === id) {
                currentAthlete.value = null;
            }
        } catch (e: any) {
            error.value = e.message;
            throw e;
        } finally {
            loading.value = false;
        }
    }

    return {
        athletes,
        currentAthlete,
        loading,
        error,
        fetchAthletes,
        fetchAthlete,
        createAthlete,
        updateAthlete,
        deleteAthlete
    };
});
