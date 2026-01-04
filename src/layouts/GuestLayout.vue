<script setup lang="ts">
// Simple centered layout for auth pages
</script>

<template>
    <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-black text-white">
        
        <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-zinc-900 shadow-2xl overflow-hidden sm:rounded-lg border border-white/10 relative">
            <!-- Glow effect -->
            <div class="absolute -top-10 -left-10 w-40 h-40 bg-neon-blue/20 rounded-full blur-3xl"></div>
            <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-neon-purple/20 rounded-full blur-3xl"></div>
            
            <div class="relative z-10">
                <slot />
            </div>
        </div>
    </div>
</template>
