// Reusing types from Context Store since they represent the Company/Academy
export interface AcademyDetails {
    id: number;
    nombre: string;
    alias: string;
    identificador: string;
    tipo_identificador: string;
    pais: string;
    email_contacto?: string;
    telefono_contacto?: string;
    direccion?: string;
    website?: string;
    logo_url?: string;
    description?: string;
}

// Mock Data Storage
const mockAcademiesDetails: Record<number, AcademyDetails> = {
    1: {
        id: 1,
        nombre: 'Academia Demo',
        alias: 'DEMO',
        identificador: '900123456',
        tipo_identificador: 'NIT',
        pais: 'CO',
        email_contacto: 'contacto@demo.com',
        telefono_contacto: '+57 300 123 4567',
        direccion: 'Calle 123 # 45-67',
        website: 'www.demo.com',
        description: 'Una academia de alto rendimiento enfocada en el desarrollo integral.'
    },
    2: {
        id: 2,
        nombre: 'Club Deportivo Elite',
        alias: 'ELITE',
        identificador: '800987654',
        tipo_identificador: 'RUT',
        pais: 'CO',
        email_contacto: 'info@eliteclub.com'
    }
};

export const academiesService = {
    async getAcademyDetails(id: number): Promise<AcademyDetails> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Return mock data or default if not found
        return mockAcademiesDetails[id] || {
            id,
            nombre: 'Academia Desconocida',
            alias: 'UNK',
            identificador: '000000',
            tipo_identificador: 'ID',
            pais: 'CO'
        };
    },

    async updateAcademy(id: number, data: Partial<AcademyDetails>): Promise<AcademyDetails> {
        await new Promise(resolve => setTimeout(resolve, 800));

        const existing = mockAcademiesDetails[id] || {};
        mockAcademiesDetails[id] = { ...existing, ...data } as AcademyDetails;

        return mockAcademiesDetails[id];
    }
};
