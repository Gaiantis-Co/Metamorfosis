<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import SportIcons from '@/components/ui/SportIcons.vue';

const authStore = useAuthStore();
const router = useRouter();
const showingNavigationDropdown = ref(false);

const logout = async () => {
    await authStore.logout();
    router.push('/login');
};
</script>

<template>
    <div class="min-h-screen bg-black text-white bg-soccer">
        <!-- Replicating navigation-menu.blade.php -->
        <nav class="bg-black border-b border-white/10 glass sticky top-0 z-50">
            <!-- Primary Navigation Menu -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex">
                        <!-- Logo -->
                        <div class="shrink-0 flex items-center">
                            <RouterLink to="/dashboard" class="font-display font-bold text-xl text-neon-blue tracking-widest hover:scale-105 transition-transform">
                                METAMORFOSIS
                            </RouterLink>
                        </div>
                        
                        <!-- Navigation Links -->
                        <div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            <RouterLink 
                                to="/dashboard" 
                                class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-tech font-medium leading-5 transition duration-150 ease-in-out"
                                :class="[$route.name === 'dashboard' ? 'border-neon-blue text-white' : 'border-transparent text-zinc-400 hover:text-white hover:border-white/30']"
                            >
                                Dashboard
                            </RouterLink>

                            <!-- Placeholder for other dropdowns as per blade file -->
                            <button class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-zinc-400 hover:text-white focus:outline-none transition ease-in-out duration-150 font-tech">
                                Gestión Académica
                            </button>

                            <button class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-zinc-400 hover:text-white focus:outline-none transition ease-in-out duration-150 font-tech">
                                Entrenamiento
                            </button>
                        </div>
                    </div>

                    <div class="hidden sm:flex sm:items-center sm:ms-6">
                        <!-- Settings Dropdown -->
                        <div class="ms-3 relative">
                            <div class="flex items-center gap-4">
                                <span class="text-sm font-branding text-zinc-400">
                                    {{ authStore.user?.name || 'Usuario' }}
                                </span>
                                <button @click="logout" class="text-xs font-tech text-red-400 hover:text-red-300 uppercase border border-red-500/30 px-3 py-1 rounded hover:bg-red-500/10 transition">
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Hamburger -->
                    <div class="-me-2 flex items-center sm:hidden">
                        <button @click="showingNavigationDropdown = !showingNavigationDropdown" class="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 focus:outline-none transition duration-150 ease-in-out">
                            <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path :class="{'hidden': showingNavigationDropdown, 'inline-flex': !showingNavigationDropdown }" class="inline-flex" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                <path :class="{'hidden': !showingNavigationDropdown, 'inline-flex': showingNavigationDropdown }" class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Mobile Menu -->
             <div :class="{'block': showingNavigationDropdown, 'hidden': !showingNavigationDropdown}" class="sm:hidden glass border-t border-white/10">
                <div class="pt-2 pb-3 space-y-1">
                    <RouterLink to="/dashboard" class="block w-full ps-3 pe-4 py-2 border-l-4 text-start text-base font-medium transition duration-150 ease-in-out border-neon-blue text-neon-blue bg-white/5">
                        Dashboard
                    </RouterLink>
                </div>
             </div>
        </nav>

        <!-- Page Heading -->
        <header class="glass border-b border-white/5" v-if="$slots.header">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <slot name="header" />
            </div>
        </header>

        <!-- Page Content -->
        <main>
            <slot />
        </main>
    </div>
</template>
