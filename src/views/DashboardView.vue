<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import AthleteCard from '@/components/ui/AthleteCard.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

// Mock data for demonstration
const athlete = {
    name: 'CRISTIANO',
    rating: 94,
    position: 'ST',
    nation: 'https://flagcdn.com/pt.svg', // Example
    club: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png', // Example
    stats: { SPD: 90, POW: 95, AGI: 88, STA: 85, TEC: 92, INT: 98 },
    details: { Note: 'Legendary Status', Goals: 800 },
    type: 'gold' as const,
    sport: 'soccer' as const,
};
</script>

<template>
    <AppLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Dashboard
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <div class="text-gray-900 dark:text-gray-100 mb-8">
                        Welcome, {{ authStore.user?.name || 'User' }}!
                    </div>

                    <h3 class="text-xl font-display text-neon-yellow mb-6">Your Athlete Card</h3>
                    
                    <div class="flex flex-wrap gap-8 justify-center">
                        <AthleteCard v-bind="athlete" />
                        
                        <AthleteCard 
                            name="LEBRON" 
                            :rating="98" 
                            position="SF" 
                            type="blue" 
                            sport="basketball"
                            :stats="{ SPD: 88, POW: 98, AGI: 85, STA: 95, TEC: 90, INT: 99 }"
                        />
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
