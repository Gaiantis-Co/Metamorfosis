export interface Coach {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    especialidad: string;
    certificaciones?: string[];
    estado: 'Activo' | 'Inactivo' | 'Suspendido';
    foto_url?: string;
    created_at?: string;
    updated_at?: string;
}

export type CoachInput = Omit<Coach, 'id' | 'created_at' | 'updated_at'>;
