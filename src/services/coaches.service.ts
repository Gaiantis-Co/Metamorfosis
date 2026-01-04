import type { Coach, CoachInput } from '../types/coach.types';

// Mock Data
let mockCoaches: Coach[] = [
    {
        id: 1,
        nombre: 'Carlos',
        apellido: 'Rodríguez',
        email: 'carlos.rodriguez@example.com',
        telefono: '+57 320 111 2233',
        especialidad: 'Fútbol - Táctico',
        certificaciones: ['Licencia FIFA A', 'Preparación Física'],
        estado: 'Activo',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: 2,
        nombre: 'Ana',
        apellido: 'Martínez',
        email: 'ana.martinez@example.com',
        telefono: '+57 315 444 5566',
        especialidad: 'Natación',
        certificaciones: ['Certificación FINA'],
        estado: 'Activo',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: 3,
        nombre: 'Luis',
        apellido: 'Hernández',
        email: 'luis.hernandez@example.com',
        telefono: '+57 300 777 8899',
        especialidad: 'Baloncesto',
        estado: 'Inactivo',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }
];

export const coachesService = {
    async getCoaches(): Promise<Coach[]> {
        await new Promise(resolve => setTimeout(resolve, 500));
        return [...mockCoaches];
    },

    async getCoach(id: number): Promise<Coach> {
        await new Promise(resolve => setTimeout(resolve, 300));
        const coach = mockCoaches.find(c => c.id === id);
        if (!coach) throw new Error('Coach not found');
        return { ...coach };
    },

    async createCoach(data: CoachInput): Promise<Coach> {
        await new Promise(resolve => setTimeout(resolve, 500));
        const newCoach: Coach = {
            ...data,
            id: (Math.max(...mockCoaches.map(c => c.id), 0) + 1),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        } as Coach;
        mockCoaches.push(newCoach);
        return newCoach;
    },

    async updateCoach(id: number, data: CoachInput): Promise<Coach> {
        await new Promise(resolve => setTimeout(resolve, 500));
        const index = mockCoaches.findIndex(c => c.id === id);
        if (index === -1) throw new Error('Coach not found');

        const updatedCoach = {
            ...mockCoaches[index],
            ...data,
            updated_at: new Date().toISOString()
        } as Coach;

        mockCoaches[index] = updatedCoach;
        return updatedCoach;
    },

    async deleteCoach(id: number): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 500));
        mockCoaches = mockCoaches.filter(c => c.id !== id);
    }
};
