import type { TrainingPlan, TrainingPlanInput } from '../types/plan.types';

let mockPlans: TrainingPlan[] = [
    {
        id: 1,
        name: 'Plan Mensual - Básico',
        description: 'Acceso básico a instalaciones y 2 sesiones grupales por semana.',
        duration_months: 1,
        sessions_per_week: 2,
        price: 50000,
        capacity: 50,
        enrolled_count: 35,
        status: 'Activo',
        created_at: new Date().toISOString()
    },
    {
        id: 2,
        name: 'Plan Trimestral - Pro',
        description: 'Programa completo con seguimiento personalizado y acceso ilimitado.',
        duration_months: 3,
        sessions_per_week: 5,
        price: 140000,
        capacity: 30,
        enrolled_count: 28,
        status: 'Activo',
        created_at: new Date().toISOString()
    },
    {
        id: 3,
        name: 'Clases Particulares (Pack 10)',
        description: 'Paquete de 10 sesiones personalizadas con entrenador dedicado.',
        duration_months: 2,
        sessions_per_week: 10, // Flexible
        price: 300000,
        capacity: 10,
        enrolled_count: 5,
        status: 'Activo',
        created_at: new Date().toISOString()
    }
];

export const plansService = {
    async getPlans(): Promise<TrainingPlan[]> {
        await new Promise(resolve => setTimeout(resolve, 500));
        return [...mockPlans];
    },

    async getPlan(id: number): Promise<TrainingPlan> {
        await new Promise(resolve => setTimeout(resolve, 300));
        const plan = mockPlans.find(p => p.id === id);
        if (!plan) throw new Error('Plan not found');
        return { ...plan };
    },

    async createPlan(data: TrainingPlanInput): Promise<TrainingPlan> {
        await new Promise(resolve => setTimeout(resolve, 600));
        const newPlan: TrainingPlan = {
            ...data,
            id: (Math.max(...mockPlans.map(p => p.id), 0) + 1),
            enrolled_count: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        } as TrainingPlan;
        mockPlans.push(newPlan);
        return newPlan;
    },

    async updatePlan(id: number, data: TrainingPlanInput): Promise<TrainingPlan> {
        await new Promise(resolve => setTimeout(resolve, 500));
        const index = mockPlans.findIndex(p => p.id === id);
        if (index === -1) throw new Error('Plan not found');

        const updatedPlan = {
            ...mockPlans[index],
            ...data,
            updated_at: new Date().toISOString()
        } as TrainingPlan;

        mockPlans[index] = updatedPlan;
        return updatedPlan;
    },

    async deletePlan(id: number): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 500));
        mockPlans = mockPlans.filter(p => p.id !== id);
    }
};
