<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const logout = async () => {
    await authStore.logout();
    router.push('/portal/login');
};
</script>

<template>
    <div class="min-h-screen bg-black text-white bg-soccer bg-fixed">
        <!-- Sidebar / Mobile Nav Placeholder -->
        <nav class="fixed top-0 left-0 w-full h-16 bg-black/80 backdrop-blur-md border-b border-neon-blue/30 z-50 px-4 flex items-center justify-between">
            <div class="flex items-center gap-4">
                <span class="font-display text-xl text-neon-blue tracking-widest">PORTAL</span>
            </div>
            
            <div class="flex items-center gap-4">
                <div class="flex gap-2">
                    <RouterLink 
                        to="/portal/dashboard" 
                        active-class="text-neon-yellow"
                        class="text-sm font-tech uppercase hover:text-white/80 transition"
                    >
                        Dashboard
                    </RouterLink>
                    <RouterLink 
                        to="/portal/trainings" 
                        active-class="text-neon-yellow"
                        class="text-sm font-tech uppercase hover:text-white/80 transition"
                    >
                        Training
                    </RouterLink>
                </div>

                <div class="w-px h-6 bg-white/20"></div>

                <button @click="logout" class="text-xs font-tech text-red-400 hover:text-red-300 uppercase">
                    Exit
                </button>
            </div>
        </nav>

        <!-- Main Content -->
        <main class="pt-20 px-4 pb-12 max-w-7xl mx-auto">
            <slot />
        </main>
    </div>
</template>
