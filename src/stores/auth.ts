import { defineStore } from 'pinia'
import apiClient from '../services/api'
import { useRouter } from 'vue-router'

interface User {
    id: number
    name: string
    email: string
    profile_photo_url?: string;
    // Add other user properties
}

interface AuthState {
    user: User | null
    isAuthenticated: boolean
    loading: boolean
    error: string | null
    token: string | null
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        token: localStorage.getItem('token') || null,
    }),

    actions: {
        async loginWithRedirect() {
            try {
                // Fetch the redirect URL from the backend (which returns JSON)
                // We use the proxy path '/api/auth/redirect' setup in vite.config.ts
                const response = await apiClient.get('/api/auth/redirect');

                if (response.data && response.data.url) {
                    // Manually redirect the browser to the SSO URL returned by backend
                    window.location.href = response.data.url;
                } else {
                    this.error = 'Respuesta inválida del servidor.';
                    console.error('Invalid response:', response.data);
                }
            } catch (e) {
                this.error = 'Error al conectar con el servicio de autenticación.';
                console.error(e);
            }
        },

        async handleCallback(code: string, state: string) {
            this.loading = true;
            try {
                // Exchange code for token
                // We use the proxy path '/api/auth/callback'
                const response = await apiClient.get(`/auth/callback?code=${code}&state=${state}`);

                // The backend should return the token and user data
                // mirroring BackendApiService.php handleAuthCallback logic
                const data = response.data;

                if (data.token) {
                    this.token = data.token;
                    this.user = data.user;
                    this.isAuthenticated = true;
                    localStorage.setItem('token', data.token);
                }

                return data; // Return full data in case controller needs it (e.g. requires_company)
            } catch (err: any) {
                this.error = 'Falló la autenticación con GAIANTIS';
                console.error(err);
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async login(credentials: any) {
            this.loading = true;
            this.error = null;
            try {
                // 1. Get CSRF Cookie (Sanctum)
                await apiClient.get('/sanctum/csrf-cookie');

                // 2. Login Request
                await apiClient.post('/login', credentials);

                // 3. Fetch User Data
                await this.fetchUser();

                return true;
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Login failed';
                this.isAuthenticated = false;
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async logout() {
            try {
                await apiClient.post('/logout');
            } catch (err) {
                console.error('Logout error', err);
            } finally {
                this.user = null;
                this.isAuthenticated = false;
                // Cleanup potentially
            }
        },

        async fetchUser() {
            try {
                const response = await apiClient.get('/api/user');
                this.user = response.data;
                this.isAuthenticated = true;
            } catch (error) {
                this.user = null;
                this.isAuthenticated = false;
            }
        }
    },
})
