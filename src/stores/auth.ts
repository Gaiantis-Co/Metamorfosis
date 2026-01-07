import { defineStore } from 'pinia'
import api from '../lib/axios'
import { ref, computed } from 'vue'

interface User {
    id: number
    name: string
    email: string
    profile_photo_url?: string
}

interface Company {
    id: number
    nombre: string
    identificacion: string
    alias?: string
    logo?: string
}

interface AccessMode {
    type: 'global_admin' | 'company'
    rol: string
    empresa_id: number | null
    empresa?: Company
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'))
    const token = ref<string | null>(localStorage.getItem('auth_token'))
    const sincronizerCode = ref<string | null>(localStorage.getItem('sincronizer_code'))
    const accessModes = ref<AccessMode[]>([])
    const requiresCompany = ref<boolean | 'optional'>(true)
    const selectedCompany = ref<Partial<Company> | null>(null)
    const companies = ref<Company[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const isAuthenticated = computed(() => !!user.value && !!token.value)

    /**
     * Iniciar flujo OAuth - redirige a AccountsApp
     */
    async function loginWithRedirect() {
        try {
            loading.value = true
            error.value = null
            const response = await api.get('/api/auth/redirect')
            if (response.data && response.data.url) {
                window.location.href = response.data.url
            }
        } catch (err: any) {
            error.value = 'Error al iniciar sesión con GAIANTIS'
            console.error('Error al iniciar OAuth:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    /**
     * Manejar callback OAuth
     */
    async function handleOAuthCallback(code: string, state?: string) {
        try {
            loading.value = true
            error.value = null
            const response = await api.get('/api/auth/callback', {
                params: { code, state },
            })

            const {
                token: sanctumToken,
                user: userData,
                access_modes,
                requires_company,
                companies: responseCompanies,
                sincronizer: responseSincronizer,
            } = response.data

            token.value = sanctumToken
            user.value = userData
            sincronizerCode.value = responseSincronizer
            accessModes.value = access_modes || []
            requiresCompany.value = requires_company
            companies.value = responseCompanies || []

            localStorage.setItem('auth_token', sanctumToken)
            localStorage.setItem('user', JSON.stringify(userData))
            if (responseSincronizer) {
                localStorage.setItem('sincronizer_code', responseSincronizer)
            }

            return response.data
        } catch (err) {
            error.value = 'Falló la autenticación con GAIANTIS'
            console.error('Error en callback OAuth:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    /**
     * Seleccionar empresa/academia
     */
    async function selectCompany(companyId: number) {
        try {
            loading.value = true
            const response = await api.post('/api/select-company', {
                company_id: companyId,
            })

            selectedCompany.value = response.data
            return response.data
        } catch (err) {
            console.error('Error al seleccionar empresa:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    /**
     * Obtener usuario autenticado
     */
    async function fetchUser() {
        try {
            const response = await api.get('/api/user')
            user.value = response.data.user
            selectedCompany.value = response.data.selected_company_id
                ? { id: response.data.selected_company_id }
                : null
            return response.data
        } catch (err) {
            logout()
            throw err
        }
    }

    /**
     * Cerrar sesión
     */
    async function logout() {
        try {
            if (token.value) {
                await api.post('/api/logout', {
                    sincronizer: sincronizerCode.value,
                })
            }
        } catch (err) {
            console.error('Logout error', err)
        } finally {
            user.value = null
            token.value = null
            sincronizerCode.value = null
            accessModes.value = []
            selectedCompany.value = null
            companies.value = []

            localStorage.removeItem('auth_token')
            localStorage.removeItem('user')
            localStorage.removeItem('sincronizer_code')
            localStorage.removeItem('current_context')
        }
    }

    return {
        user,
        token,
        sincronizerCode,
        isAuthenticated,
        accessModes,
        requiresCompany,
        selectedCompany,
        companies,
        loading,
        error,
        loginWithRedirect,
        handleOAuthCallback,
        selectCompany,
        fetchUser,
        logout,
    }
})
