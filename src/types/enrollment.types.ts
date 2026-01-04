export interface Enrollment {
    id: number;
    athlete_id: number;
    athlete_name?: string; // For display purposes in list
    plan_id: number;
    plan_name?: string; // For display purposes
    start_date: string;
    end_date?: string;
    status: 'Activo' | 'Pendiente' | 'Finalizado' | 'Cancelado';
    notes?: string;
    price?: number;
    created_at?: string;
    updated_at?: string;
}

export type EnrollmentInput = Omit<Enrollment, 'id' | 'athlete_name' | 'plan_name' | 'created_at' | 'updated_at'>;

// Mock Plans for selection in the form
export interface PlanOption {
    id: number;
    name: string;
    price: number;
}
