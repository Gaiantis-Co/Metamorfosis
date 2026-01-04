<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
    const code = route.query.code as string;
    const state = route.query.state as string;

    if (code) {
        try {
            await authStore.handleCallback(code, state);
            router.push('/dashboard');
        } catch (error) {
            router.push('/login?error=auth_failed');
        }
    } else {
         router.push('/login');
    }
});
</script>

<template>
    <div class="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-neon-yellow mb-4"></div>
        <h2 class="text-xl font-branding uppercase tracking-widest text-neon-yellow animate-pulse">
            Autenticando...
        </h2>
    </div>
</template>
