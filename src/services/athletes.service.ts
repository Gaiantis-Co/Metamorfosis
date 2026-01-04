import type { Athlete, AthleteInput } from '../types/athlete.types';

// Mock Data
let mockAthletes: Athlete[] = [
    {
        id: 1,
        nombre: 'Juan',
        apellido: 'Perez',
        fecha_nacimiento: '1995-05-15',
        genero: 'M',
        email: 'juan.perez@example.com',
        telefono: '+1234567890',
        documento_identidad: '12345678',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: 2,
        nombre: 'Maria',
        apellido: 'Gomez',
        fecha_nacimiento: '1998-11-20',
        genero: 'F',
        email: 'maria.gomez@example.com',
        telefono: '+0987654321',
        documento_identidad: '87654321',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }
];

export const athletesService = {
    async getAthletes(): Promise<Athlete[]> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return [...mockAthletes];
    },

    async getAthlete(id: number): Promise<Athlete> {
        await new Promise(resolve => setTimeout(resolve, 300));
        const athlete = mockAthletes.find(a => a.id === id);
        if (!athlete) throw new Error('Athlete not found');
        return { ...athlete };
    },

    async createAthlete(data: AthleteInput): Promise<Athlete> {
        await new Promise(resolve => setTimeout(resolve, 500));
        const newAthlete: Athlete = {
            ...data,
            id: (Math.max(...mockAthletes.map(a => a.id), 0) + 1),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        } as Athlete;
        mockAthletes.push(newAthlete);
        return newAthlete;
    },

    async updateAthlete(id: number, data: AthleteInput): Promise<Athlete> {
        await new Promise(resolve => setTimeout(resolve, 500));
        const index = mockAthletes.findIndex(a => a.id === id);
        if (index === -1) throw new Error('Athlete not found');

        const updatedAthlete = {
            ...mockAthletes[index],
            ...data,
            updated_at: new Date().toISOString()
        } as Athlete;

        mockAthletes[index] = updatedAthlete;
        return updatedAthlete;
    },

    async deleteAthlete(id: number): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 500));
        mockAthletes = mockAthletes.filter(a => a.id !== id);
    }
};
