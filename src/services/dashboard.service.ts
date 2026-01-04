export interface DashboardStats {
    totalAthletes: number;
    totalEnrollments: number;
    activePlans: number;
    totalCoaches: number;
    enrollmentTendency: {
        labels: string[];
        data: number[];
    };
    genderDistribution: {
        labels: string[];
        data: number[];
    };
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
    // Simular retraso de red
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
        totalAthletes: 124,
        totalEnrollments: 86,
        activePlans: 12,
        totalCoaches: 8,
        enrollmentTendency: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            data: [30, 45, 38, 52, 48, 60]
        },
        genderDistribution: {
            labels: ['Masculino', 'Femenino', 'Otro'],
            data: [65, 52, 7]
        }
    };
};
