import type { Enrollment, EnrollmentInput, PlanOption } from '../types/enrollment.types';
import { athletesService } from './athletes.service'; // To resolve athlete names

// Mock Plans
export const mockPlans: PlanOption[] = [
    { id: 1, name: 'Plan Mensual - Básico', price: 50000 },
    { id: 2, name: 'Plan Trimestral - Pro', price: 140000 },
    { id: 3, name: 'Plan Anual - Elite', price: 500000 },
    { id: 4, name: 'Clases Particulares (Pack 10)', price: 300000 },
];

let mockEnrollments: Enrollment[] = [
    {
        id: 1,
        athlete_id: 1,
        athlete_name: 'Juan Pérez',
        plan_id: 2,
        plan_name: 'Plan Trimestral - Pro',
        start_date: '2023-11-01',
        end_date: '2024-02-01',
        status: 'Activo',
        price: 140000,
        created_at: new Date().toISOString()
    },
    {
        id: 2,
        athlete_id: 2,
        athlete_name: 'María García',
        plan_id: 1,
        plan_name: 'Plan Mensual - Básico',
        start_date: '2023-12-01',
        status: 'Pendiente',
        price: 50000,
        created_at: new Date().toISOString()
    }
];

export const enrollmentsService = {
    async getEnrollments(): Promise<Enrollment[]> {
        await new Promise(resolve => setTimeout(resolve, 500));
        return [...mockEnrollments];
    },

    async getEnrollment(id: number): Promise<Enrollment> {
        await new Promise(resolve => setTimeout(resolve, 300));
        const item = mockEnrollments.find(e => e.id === id);
        if (!item) throw new Error('Enrollment not found');
        return { ...item };
    },

    async createEnrollment(data: EnrollmentInput): Promise<Enrollment> {
        await new Promise(resolve => setTimeout(resolve, 600));

        // Resolve Mock Names
        let athleteName = 'Unknown Athlete';
        try {
            const athlete = await athletesService.getAthlete(data.athlete_id);
            athleteName = `${athlete.nombre} ${athlete.apellido}`;
        } catch { }

        const plan = mockPlans.find(p => p.id === data.plan_id);
        const planName = plan ? plan.name : 'Unknown Plan';

        const newItem: Enrollment = {
            ...data,
            id: (Math.max(...mockEnrollments.map(e => e.id), 0) + 1),
            athlete_name: athleteName,
            plan_name: planName,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        } as Enrollment;
        mockEnrollments.push(newItem);
        return newItem;
    },

    async updateEnrollment(id: number, data: EnrollmentInput): Promise<Enrollment> {
        await new Promise(resolve => setTimeout(resolve, 500));
        const index = mockEnrollments.findIndex(e => e.id === id);
        if (index === -1) throw new Error('Enrollment not found');

        // Resolve Mock Names logic again if needed (simplified here)
        const plan = mockPlans.find(p => p.id === data.plan_id);
        const existingEnrollment = mockEnrollments[index];
        const planName = plan ? plan.name : (existingEnrollment ? existingEnrollment.plan_name : 'Unknown Plan');

        if (!existingEnrollment) throw new Error('Enrollment not found');

        const updatedEnrollment = {
            ...existingEnrollment,
            ...data,
            plan_name: planName || 'Unknown',
            updated_at: new Date().toISOString()
        } as Enrollment;

        mockEnrollments[index] = updatedEnrollment;
        return updatedEnrollment;
    },

    async deleteEnrollment(id: number): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 500));
        mockEnrollments = mockEnrollments.filter(e => e.id !== id);
    },

    async getPlans(): Promise<PlanOption[]> {
        return mockPlans;
    }
};
