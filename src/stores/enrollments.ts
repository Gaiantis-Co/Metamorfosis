import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Enrollment, EnrollmentInput, PlanOption } from '../types/enrollment.types';
import { enrollmentsService } from '../services/enrollments.service';

export const useEnrollmentsStore = defineStore('enrollments', () => {
    const enrollments = ref<Enrollment[]>([]);
    const currentEnrollment = ref<Enrollment | null>(null);
    const availablePlans = ref<PlanOption[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchEnrollments() {
        loading.value = true;
        try {
            enrollments.value = await enrollmentsService.getEnrollments();
        } catch (e: any) {
            error.value = e.message;
        } finally {
            loading.value = false;
        }
    }

    async function fetchEnrollment(id: number) {
        loading.value = true;
        try {
            currentEnrollment.value = await enrollmentsService.getEnrollment(id);
        } catch (e: any) {
            error.value = e.message;
        } finally {
            loading.value = false;
        }
    }

    async function fetchPlans() {
        if (availablePlans.value.length === 0) {
            availablePlans.value = await enrollmentsService.getPlans();
        }
    }

    async function createEnrollment(data: EnrollmentInput) {
        loading.value = true;
        try {
            const newItem = await enrollmentsService.createEnrollment(data);
            enrollments.value.push(newItem);
        } catch (e: any) {
            error.value = e.message;
            throw e;
        } finally {
            loading.value = false;
        }
    }

    async function updateEnrollment(id: number, data: EnrollmentInput) {
        loading.value = true;
        try {
            const updated = await enrollmentsService.updateEnrollment(id, data);
            const index = enrollments.value.findIndex(e => e.id === id);
            if (index !== -1) enrollments.value[index] = updated;
            if (currentEnrollment.value?.id === id) currentEnrollment.value = updated;
        } catch (e: any) {
            error.value = e.message;
            throw e;
        } finally {
            loading.value = false;
        }
    }

    async function deleteEnrollment(id: number) {
        loading.value = true;
        try {
            await enrollmentsService.deleteEnrollment(id);
            enrollments.value = enrollments.value.filter(e => e.id !== id);
        } catch (e: any) {
            error.value = e.message;
        } finally {
            loading.value = false;
        }
    }

    return {
        enrollments,
        currentEnrollment,
        availablePlans,
        loading,
        error,
        fetchEnrollments,
        fetchEnrollment,
        fetchPlans,
        createEnrollment,
        updateEnrollment,
        deleteEnrollment
    };
});
