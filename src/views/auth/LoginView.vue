<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import GuestLayout from '@/layouts/GuestLayout.vue';
import Button from '@/components/ui/Button.vue';

const authStore = useAuthStore();

const handleLogin = () => {
    authStore.loginWithRedirect();
};
</script>

<template>
    <GuestLayout>
        <!-- Logo Area -->
        <div class="mb-8 text-center">
             <!-- Placeholder for Logo -->
            <div class="h-16 w-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4 neon-border-yellow">
                <svg class="w-8 h-8 text-white" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" />
                </svg>
            </div>
        </div>

        <div class="w-full relative">
            <!-- Background Blob -->
             <div class="absolute top-0 right-0 w-32 h-32 bg-neon-yellow/10 blur-[60px] -mr-16 -mt-16 pointer-events-none"></div>
            
            <div class="mb-8 text-center relative z-10">
                <h2 class="text-3xl font-display font-black text-white uppercase tracking-widest italic">
                    Acceso <span class="text-neon-yellow">Portal</span>
                </h2>
                <p class="text-zinc-500 font-branding text-xs uppercase tracking-[0.2em] mt-2">Metamorfosis Digital Ecosystem</p>
            </div>

            <div v-if="authStore.error" class="mb-6 bg-red-500/10 border border-red-500/50 p-4 rounded-xl relative z-10">
                <p class="text-sm text-red-400 font-branding uppercase tracking-wider text-center">
                    {{ authStore.error }}
                </p>
            </div>

            <div class="mt-8 relative z-10">
                <Button 
                    @click="handleLogin"
                    class="w-full inline-flex justify-center items-center px-6 py-4 bg-neon-yellow text-black font-branding font-bold text-lg uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-95 transition transform shadow-[0_0_30px_rgba(248,184,3,0.3)]"
                >
                    <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                    </svg>
                    Ingresar con GAIANTIS
                </Button>
                
                <p class="mt-8 text-center text-zinc-600 font-branding text-[10px] uppercase tracking-[0.3em]">
                    Protección de datos cifrada de extremo a extremo
                </p>
            </div>
        </div>
    </GuestLayout>
</template>
