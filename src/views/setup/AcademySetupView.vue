<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// import { useAuthStore } from '@/stores/auth'; // Not used directly in template yet

const router = useRouter();
const currentStep = ref(1);
const loading = ref(false);
const error = ref('');

// Step 1: Sports
const availableSports = ref([
    { id: 1, nombre: 'Fútbol', icon: '⚽', descripcion: 'Entrenamiento táctico y físico' },
    { id: 2, nombre: 'Baloncesto', icon: '🏀', descripcion: 'Dribbling, tiro y defensa' },
    { id: 3, nombre: 'Tenis', icon: '🎾', descripcion: 'Técnica de golpeo y resistencia' },
    { id: 4, nombre: 'Natación', icon: '🏊', descripcion: 'Estilos y velocidad' },
    // Add more mocks/fetch from API
]);
const selectedSports = ref<number[]>([]);

// Step 2: Configuration
const configuration = reactive({
    description: '',
    phone: '',
    address: '',
    website: '',
    primary_color: '#f8b803',
    secondary_color: '#3b82f6',
});

// Logic
const toggleSport = (id: number) => {
    const index = selectedSports.value.indexOf(id);
    if (index > -1) {
        selectedSports.value.splice(index, 1);
    } else {
        selectedSports.value.push(id);
    }
};

const isSportSelected = (id: number) => selectedSports.value.includes(id);

const nextStep = async () => {
    loading.value = true;
    error.value = '';
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (currentStep.value === 1 && selectedSports.value.length === 0) {
        error.value = 'Debes seleccionar al menos un deporte';
        loading.value = false;
        return;
    }

    loading.value = false;
    currentStep.value++;
};

const prevStep = () => {
    if (currentStep.value > 1) currentStep.value--;
};

const completeSetup = async () => {
    loading.value = true;
    // Simulate API Call
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push('/dashboard');
};

const skip = () => {
    if (currentStep.value < 3) currentStep.value++;
    else completeSetup();
};
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 flex items-center justify-center p-4">
        
        <!-- Wizard Container -->
        <div class="max-w-5xl w-full glass rounded-3xl p-8 shadow-2xl border border-white/10">
            <!-- Header -->
            <div class="text-center mb-8">
                <h1 class="text-5xl font-display font-black uppercase text-white mb-2">
                    <span class="text-neon-yellow">Configura</span> tu Academia
                </h1>
                <p class="text-zinc-400 font-branding tracking-widest uppercase text-sm">
                    Metamorfosis Academy
                </p>
            </div>

            <!-- Progress Steps -->
            <div class="flex justify-between mb-12 relative">
                <!-- Progress Line -->
                <div class="absolute top-5 left-0 right-0 h-1 bg-white/10 -z-10"></div>
                <div class="absolute top-5 left-0 h-1 bg-neon-yellow transition-all duration-500 -z-10" 
                     :style="`width: ${((currentStep - 1) / 2) * 100}%`"></div>

                <!-- Steps Indicators -->
                <div v-for="step in 3" :key="step" class="flex flex-col items-center flex-1">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-2"
                         :class="currentStep >= step ? 'bg-neon-yellow border-neon-yellow text-black' : 'bg-black border-white/20 text-white/50'">
                        <span v-if="currentStep > step">✓</span>
                        <span v-else>{{ step }}</span>
                    </div>
                    <span class="text-xs mt-2 font-branding uppercase tracking-wider transition-colors" 
                          :class="currentStep >= step ? 'text-white' : 'text-white/50'">
                          {{ step === 1 ? 'Deportes' : (step === 2 ? 'Configuración' : 'Finalizar') }}
                    </span>
                </div>
            </div>

            <!-- Step Content -->
            <div class="min-h-[400px]">
                
                <!-- Step 1: Sports Selection -->
                <div v-if="currentStep === 1" class="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div class="text-center mb-8">
                        <h2 class="text-3xl font-display font-bold text-white mb-2">¿Qué deportes entrena tu academia?</h2>
                        <p class="text-zinc-400">Selecciona todos los deportes que ofreces.</p>
                    </div>

                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div v-for="sport in availableSports" :key="sport.id" 
                             @click="toggleSport(sport.id)"
                             class="rounded-xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 relative bg-white/5 border"
                             :class="isSportSelected(sport.id) ? 'border-neon-yellow bg-neon-yellow/10' : 'border-white/10 hover:border-white/30'">
                            <div class="text-center">
                                <div class="text-4xl mb-3">{{ sport.icon }}</div>
                                <h3 class="font-branding font-bold text-white text-lg">{{ sport.nombre }}</h3>
                                <p class="text-zinc-400 text-xs mt-1">{{ sport.descripcion }}</p>
                            </div>
                            <!-- Checkmark -->
                            <div v-if="isSportSelected(sport.id)" class="absolute top-2 right-2 w-6 h-6 bg-neon-yellow rounded-full flex items-center justify-center shadow-lg shadow-neon-yellow/50">
                                <span class="text-black text-xs font-bold">✓</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Step 2: Configuration -->
                <div v-if="currentStep === 2" class="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div class="text-center mb-8">
                        <h2 class="text-3xl font-display font-bold text-white mb-2">Personaliza tu Academia</h2>
                        <p class="text-zinc-400">Agrega información básica sobre tu academia.</p>
                    </div>

                    <div class="max-w-2xl mx-auto space-y-6">
                        <div>
                            <label class="block text-sm font-branding uppercase tracking-wider text-zinc-400 mb-2">Descripción</label>
                            <textarea v-model="configuration.description" rows="4" class="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:border-neon-yellow focus:ring-1 focus:ring-neon-yellow transition outline-none" placeholder="Describe tu academia..."></textarea>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-branding uppercase tracking-wider text-zinc-400 mb-2">Teléfono</label>
                                <input v-model="configuration.phone" type="tel" class="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-yellow outline-none transition" placeholder="+51 999 999 999">
                            </div>
                            <div>
                                <label class="block text-sm font-branding uppercase tracking-wider text-zinc-400 mb-2">Sitio Web</label>
                                <input v-model="configuration.website" type="url" class="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-yellow outline-none transition" placeholder="https://academia.com">
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-6">
                             <div>
                                <label class="block text-sm font-branding uppercase tracking-wider text-zinc-400 mb-2">Color Primario</label>
                                <div class="flex items-center gap-3">
                                    <input type="color" v-model="configuration.primary_color" class="w-12 h-12 rounded cursor-pointer border-none p-0 bg-transparent">
                                    <input type="text" v-model="configuration.primary_color" class="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white uppercase font-mono text-sm">
                                </div>
                             </div>
                             <div>
                                <label class="block text-sm font-branding uppercase tracking-wider text-zinc-400 mb-2">Color Secundario</label>
                                <div class="flex items-center gap-3">
                                    <input type="color" v-model="configuration.secondary_color" class="w-12 h-12 rounded cursor-pointer border-none p-0 bg-transparent">
                                    <input type="text" v-model="configuration.secondary_color" class="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white uppercase font-mono text-sm">
                                </div>
                             </div>
                        </div>
                    </div>
                </div>

                <!-- Step 3: Complete -->
                <div v-if="currentStep === 3" class="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 text-center">
                    <div class="w-20 h-20 bg-neon-yellow rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(248,184,3,0.3)]">
                        <span class="text-4xl">🚀</span>
                    </div>
                    <h2 class="text-4xl font-display font-black uppercase text-white mb-4">¡Todo <span class="text-neon-yellow">Listo</span>!</h2>
                    <p class="text-zinc-400 text-lg mb-8">Tu academia está configurada y lista para usar.</p>
                    
                    <div class="flex justify-center">
                        <button @click="completeSetup" :disabled="loading" class="px-12 py-4 bg-neon-yellow text-black font-branding font-black uppercase tracking-widest text-lg rounded-lg hover:scale-105 transition transform shadow-lg shadow-neon-yellow/50">
                            {{ loading ? 'Finalizando...' : 'Ir al Dashboard' }}
                        </button>
                    </div>
                </div>

            </div>

            <!-- Footer Actions -->
            <div class="flex justify-between pt-8 border-t border-white/5 mt-8" v-if="currentStep < 3">
                <button @click="currentStep === 1 ? skip() : prevStep()" class="px-6 py-3 text-zinc-400 hover:text-white transition font-branding uppercase tracking-wider">
                    {{ currentStep === 1 ? 'Omitir' : '← Atrás' }}
                </button>
                <button @click="nextStep" :disabled="loading" class="px-8 py-3 bg-neon-yellow text-black font-branding font-bold uppercase tracking-widest rounded-lg hover:scale-105 transition transform disabled:opacity-50">
                    {{ loading ? '...' : 'Continuar' }}
                </button>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="mt-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-center animate-pulse">
                {{ error }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.glass {
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(20px);
}
</style>
