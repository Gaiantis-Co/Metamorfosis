export interface TrainingPlan {
    id: number;
    name: string;
    description: string;
    duration_months: number;
    sessions_per_week: number;
    price: number;
    capacity: number;
    enrolled_count?: number; // Calculated field
    status: 'Activo' | 'Inactivo' | 'Archivado';
    created_at?: string;
    updated_at?: string;
}

export type TrainingPlanInput = Omit<TrainingPlan, 'id' | 'enrolled_count' | 'created_at' | 'updated_at'>;
