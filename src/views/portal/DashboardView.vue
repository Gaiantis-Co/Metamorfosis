<script setup lang="ts">
import PortalLayout from '@/layouts/PortalLayout.vue';
import AthleteCard from '@/components/ui/AthleteCard.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

// This would typically come from the API
const athleteProfile = {
    name: authStore.user?.name || 'ATHLETE',
    rating: 88,
    position: 'FWD',
    type: 'blue' as const,
    sport: 'soccer' as const,
    stats: { SPD: 92, POW: 85, AGI: 90, STA: 88, TEC: 86, INT: 80 }
};
</script>

<template>
    <PortalLayout>
        <div class="flex flex-col md:flex-row gap-8 items-start">
            <!-- Left Column: Card -->
            <div class="w-full md:w-auto flex justify-center">
                <AthleteCard v-bind="athleteProfile" size="lg" />
            </div>

            <!-- Right Column: Quick Actions & Stats -->
            <div class="flex-1 w-full space-y-6">
                <div class="p-6 rounded-lg bg-black/50 border border-white/10 backdrop-blur-sm">
                    <h2 class="font-display text-2xl text-neon-blue mb-4">Training Schedule</h2>
                    <p class="text-gray-400 text-sm">No upcoming sessions today.</p>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="p-4 rounded-lg bg-zinc-900 border border-neon-yellow/20">
                        <span class="text-xs text-neon-yellow font-tech uppercase">Next Event</span>
                        <p class="font-bold text-lg">Championship Final</p>
                    </div>
                    <div class="p-4 rounded-lg bg-zinc-900 border border-neon-purple/20">
                        <span class="text-xs text-neon-purple font-tech uppercase">Performance</span>
                        <p class="font-bold text-lg">+12% vs Last Week</p>
                    </div>
                </div>
            </div>
        </div>
    </PortalLayout>
</template>
