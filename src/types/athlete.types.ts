export interface Athlete {
    id: number;
    nombre: string;
    apellido: string;
    fecha_nacimiento: string;
    genero: 'M' | 'F' | 'Otro';
    email?: string;
    telefono?: string;
    documento_identidad?: string;
    created_at?: string;
    updated_at?: string;
}

export type AthleteInput = Omit<Athlete, 'id' | 'created_at' | 'updated_at'>;
