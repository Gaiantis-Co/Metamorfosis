<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  name?: string;
  rating?: number;
  position?: string;
  image?: string;
  nation?: string;
  club?: string;
  stats?: Record<string, number>;
  details?: Record<string, any>;
  type?: 'blue' | 'yellow' | 'gold';
  sport?: 'soccer' | 'basketball' | 'mma' | 'gamer';
  size?: 'sm' | 'md' | 'lg';
  flippable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  name: 'NOMBRADO',
  rating: 80,
  position: 'POS',
  type: 'blue',
  sport: 'soccer',
  size: 'md',
  flippable: true,
  stats: () => ({}),
  details: () => ({}),
});

const borderColor = computed(() => {
  switch (props.type) {
    case 'gold': return 'rgba(255, 215, 0, 0.8)';
    case 'yellow': return 'rgba(248, 184, 3, 0.6)';
    case 'blue': default: return 'rgba(59, 130, 246, 0.6)';
  }
});

const shadowColor = computed(() => {
  switch (props.type) {
    case 'gold': return 'rgba(255, 215, 0, 0.4)';
    case 'yellow': return 'rgba(248, 184, 3, 0.3)';
    case 'blue': default: return 'rgba(59, 130, 246, 0.3)';
  }
});

const sportBg = computed(() => {
  switch (props.sport) {
    case 'soccer': return 'bg-soccer';
    case 'basketball': return 'bg-basketball';
    case 'mma': return 'bg-mma';
    case 'gamer': return 'bg-gamer';
    default: return 'bg-soccer';
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'w-48 h-72';
    case 'md': return 'w-64 h-96';
    case 'lg': return 'w-80 h-[30rem]';
    default: return 'w-64 h-96';
  }
});

const textColorClass = computed(() => `text-${props.type}-400`); // Note: Ensure Safelist in Tailwind or use style bindings if creating classes dynamically

// Merge base stats with props.stats
const displayStats = computed(() => {
  const baseStats = { 'SPD': 0, 'POW': 0, 'AGI': 0, 'STA': 0, 'TEC': 0, 'INT': 0 };
  return { ...baseStats, ...props.stats };
});

const statsChunks = computed(() => {
    // Split displayStats into chunks of 3 for the grid layout
    const entries = Object.entries(displayStats.value).slice(0, 6);
    const chunks = [];
    for (let i = 0; i < entries.length; i += 3) {
        chunks.push(entries.slice(i, i + 3));
    }
    return chunks;
});

</script>

<template>
  <div :class="[sizeClasses, 'perspective-1000 group']">
    <div class="relative w-full h-full flip-card-inner" :class="{ 'pointer-events-none': !flippable }">
      
      <!-- FRONT SIDE -->
      <div 
        class="absolute inset-0 card-premium-shape glass overflow-hidden text-white backface-hidden z-20"
        :class="sportBg"
        :style="{ border: `2px solid ${borderColor}`, boxShadow: `0 0 25px ${shadowColor}` }"
      >
        <!-- Overlay -->
        <div class="absolute inset-0 premium-overlay opacity-30 pointer-events-none z-50"></div>
        <div class="absolute top-0 left-[-100%] w-full h-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-30deg] group-hover:left-[100%] transition-all duration-1000 z-50"></div>

        <!-- Sport Icon Watermark -->
        <div class="absolute top-[25%] left-1/2 -translate-x-1/2 opacity-[0.03] z-10 pointer-events-none">
          <svg class="w-48 h-48"><use :href="`#icon-${sport}`"/></svg>
        </div>

        <!-- Rating Info -->
        <div class="absolute top-[8%] left-[8%] z-40 flex flex-col items-center">
            <span class="font-tech font-bold text-5xl leading-none tracking-tighter" style="text-shadow: 0 0 15px rgba(255,255,255,0.4);">{{ rating }}</span>
            <span class="font-branding font-semibold text-xl opacity-90 mt-1 uppercase tracking-widest" :style="{ color: borderColor }">{{ position }}</span>
            <div class="w-10 h-0.5 mt-2 mb-3" :style="{ background: borderColor }"></div>
             <!-- Nation/Club Images (if provided) -->
            <img v-if="nation" :src="nation" class="w-10 h-6 object-contain shadow-lg rounded-sm mb-2" alt="Nation">
            <img v-if="club" :src="club" class="w-10 h-10 object-contain drop-shadow-xl" alt="Club">
        </div>

        <!-- Athlete Image -->
        <div class="absolute top-0 left-0 w-full h-[58%] z-30 overflow-hidden">
             <img v-if="image" :src="image" class="w-full h-full object-contain object-bottom transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" :alt="name">
             <div v-else class="w-full h-full flex items-end justify-center pb-8 opacity-10">
                <svg class="w-32 h-32"><use :href="`#icon-${sport}`"/></svg>
             </div>
        </div>

        <!-- Name Banner -->
        <div class="absolute top-[52%] left-0 w-full z-60">
             <div class="bg-black/90 py-2.5 border-y border-white/20 backdrop-blur-xl shadow-2xl">
                <h3 class="font-display uppercase tracking-[0.2em] text-center text-xl font-bold italic" style="text-shadow: 2px 2px 10px rgba(0,0,0,0.8);">
                    {{ name }}
                </h3>
             </div>
        </div>

        <!-- Stats Grid -->
        <div class="absolute bottom-[8%] left-0 w-full px-6 z-60">
             <div class="grid grid-cols-2 gap-x-6 gap-y-3">
                 <div v-for="(chunk, idx) in statsChunks" :key="idx" class="flex flex-col gap-1.5">
                     <div v-for="[label, value] in chunk" :key="label" class="flex justify-between items-center text-[0.7rem] font-tech border-b border-white/5 pb-0.5">
                        <span class="opacity-70 uppercase tracking-tighter">{{ label }}</span>
                        <span class="font-bold text-sm" :style="{ color: borderColor }">{{ value }}</span>
                     </div>
                 </div>
             </div>
        </div>

      </div>

      <!-- BACK SIDE -->
      <div 
        class="absolute inset-0 card-premium-shape glass overflow-hidden text-white backface-hidden rotate-y-180 z-10"
        :class="sportBg"
        :style="{ border: `2px solid ${borderColor}`, boxShadow: `0 0 25px ${shadowColor}` }"
      >
        <div class="flex flex-col h-full p-8 pt-12">
             <div class="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
                <svg class="w-12 h-12 opacity-50" :style="{ color: borderColor }"><use :href="`#icon-${sport}`"/></svg>
                <div>
                    <h4 class="font-display text-lg uppercase tracking-widest" :style="{ color: borderColor }">{{ name }}</h4>
                    <p class="text-[0.65rem] opacity-50 font-tech uppercase tracking-tighter">Detalles del Atleta</p>
                </div>
             </div>

             <div class="space-y-4">
                 <div v-for="(value, label) in details" :key="label" class="border-l-2 pl-3" :style="{ borderColor: borderColor }">
                     <p class="text-[0.6rem] uppercase opacity-40 font-tech tracking-widest">{{ label }}</p>
                     <p class="text-sm font-semibold tracking-wide">{{ value }}</p>
                 </div>
                 <div v-if="Object.keys(details).length === 0" class="opacity-30 text-center mt-12">
                     <p class="text-xs italic">Cargando datos adicionales...</p>
                 </div>
             </div>
        </div>
      </div>

    </div>
  </div>
</template>
