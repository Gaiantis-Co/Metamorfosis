import { defineStore } from 'pinia'
import api from '../lib/axios'

interface Academy {
    id: number
    name: string
    logo?: string
}

interface AcademyState {
    currentAcademy: Academy | null
    academies: Academy[]
}

export const useAcademyStore = defineStore('academy', {
    state: (): AcademyState => ({
        currentAcademy: null,
        academies: [],
    }),

    actions: {
        async fetchAcademies() {
            // const response = await apiClient.get('/api/academies')
            // this.academies = response.data
        },

        setAcademy(academy: Academy) {
            this.currentAcademy = academy
            // Persist choice if needed
        },
    },
})
