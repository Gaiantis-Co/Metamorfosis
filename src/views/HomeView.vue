<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const currentYear = new Date().getFullYear();
</script>

<template>
  <div class="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white font-sans antialiased selection:bg-neon-yellow selection:text-black">
    
    <!-- Background Decals -->
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
      <div class="absolute -top-24 -left-24 w-96 h-96 bg-neon-yellow rounded-full blur-[160px]"></div>
      <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-neon-orange rounded-full blur-[160px]"></div>
    </div>

    <!-- Header -->
    <header class="absolute top-0 w-full p-6 flex justify-between items-center z-20 glass">
      <!-- Logo SVG Placeholder (or use actual SVG if available) -->
      <RouterLink to="/" class="font-display font-bold text-2xl text-white tracking-wider flex items-center gap-2">
         <svg class="h-10 w-10 text-white" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" />
         </svg>
         METAMORFOSIS
      </RouterLink>
      
      <nav class="flex gap-6 items-center">
        <!-- Auth Links Mockup -->
        <RouterLink to="/login" class="text-sm font-branding uppercase tracking-widest text-zinc-400 hover:text-white transition cursor-pointer">
          Iniciar Sesión
        </RouterLink>
        <!-- Register Mockup -->
        <a href="#" class="hidden md:block px-6 py-2 bg-neon-yellow text-black font-branding font-bold uppercase tracking-widest rounded shadow-[0_0_20px_rgba(248,184,3,0.3)] hover:scale-105 transition transform">
          Registro
        </a>
      </nav>
    </header>

    <main class="relative z-10 text-center px-6 w-full max-w-7xl mx-auto">
      <!-- Hero Section -->
      <div class="mb-8 flex justify-center">
         <!-- Placeholder for Image -->
         <div class="h-64 md:h-80 w-64 md:w-80 flex items-center justify-center glow-yellow drop-shadow-[0_0_30px_rgba(248,184,3,0.2)]">
            <svg class="w-full h-full text-white/10" viewBox="0 0 24 24" fill="currentColor">
               <path d="M20.2 5.9l.8-.8C19.6 3.7 17.8 3 16 3c-2.3 0-4.4 1.1-5.7 2.8C9 4.1 6.9 3 4.6 3c-1.8 0-3.6.7-5 2.1l.8.8C1.6 4.8 3.1 4.2 4.6 4.2c2 0 3.8.9 5 2.5h1.7c1.2-1.6 3-2.5 5-2.5 1.5 0 3 .6 3.9 1.7z"/>
            </svg>
         </div>
      </div>
      
      <h1 class="text-6xl md:text-8xl font-branding font-black uppercase tracking-tighter mb-4 italic">
        <span class="text-neon-yellow">Meta</span>morfosis
      </h1>
      
      <p class="max-w-2xl mx-auto text-xl md:text-2xl text-zinc-400 font-light leading-relaxed mb-12">
        Lleva tu entrenamiento al siguiente nivel. <br> Gestión deportiva de <span class="text-white font-medium">alto rendimiento</span>.
      </p>

      <div class="flex flex-col md:flex-row gap-6 justify-center items-center mb-24">
        <RouterLink to="/login" class="w-full md:w-auto px-12 py-4 bg-white text-black font-branding font-bold text-xl uppercase tracking-widest rounded hover:bg-neon-yellow transition duration-300">
          Comenzar Ahora
        </RouterLink>
        <a href="#athletes" class="w-full md:w-auto px-12 py-4 border border-white/20 hover:border-white/40 font-branding font-bold text-xl uppercase tracking-widest rounded transition duration-300">
          Ver Atletas
        </a>
      </div>

      <!-- Athletes Showcase Section -->
      <section id="athletes" class="py-24">
        <h2 class="text-4xl font-branding font-black uppercase tracking-widest mb-16 italic">
          Elite <span class="text-neon-orange">Athletes</span>
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
          <!-- Card 1 -->
          <div class="group relative overflow-hidden rounded-2xl glass p-1 aspect-[3/4] md:aspect-video">
            <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 z-10"></div>
             <!-- Mock Image -->
            <div class="w-full h-full bg-zinc-900 flex items-center justify-center transform group-hover:scale-105 transition duration-700">
                <span class="text-white/20 text-6xl">ATHLETE 01</span>
            </div>
            <div class="absolute bottom-8 left-8 z-20 text-left">
              <h3 class="text-3xl font-branding font-black uppercase tracking-tight text-white mb-1">Performance</h3>
              <p class="text-neon-yellow font-branding uppercase tracking-widest text-sm">Meta Pro Mode</p>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="group relative overflow-hidden rounded-2xl glass p-1 aspect-[3/4] md:aspect-video">
            <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 z-10"></div>
            <!-- Mock Image -->
            <div class="w-full h-full bg-zinc-900 flex items-center justify-center transform group-hover:scale-105 transition duration-700">
                <span class="text-white/20 text-6xl">ATHLETE 02</span>
            </div>
            <div class="absolute bottom-8 left-8 z-20 text-left">
              <h3 class="text-3xl font-branding font-black uppercase tracking-tight text-white mb-1">Evolution</h3>
              <p class="text-neon-orange font-branding uppercase tracking-widest text-sm">Elite Training</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Full Breadth Visual -->
      <div class="w-full max-w-5xl mx-auto my-24 relative rounded-3xl overflow-hidden glass min-h-64 flex items-center justify-center bg-zinc-900/50">
        <div class="absolute inset-0 flex items-center justify-center">
            <p class="text-5xl font-branding font-black uppercase tracking-[0.2em] text-white/40 italic z-10">Power Your Game</p>
        </div>
      </div>
    </main>

    <footer class="w-full p-12 text-center text-zinc-600 font-branding uppercase tracking-[0.5em] text-xs">
      &copy; {{ currentYear }} GAIANTIS &bull; METAMORFOSIS FRONTEND
    </footer>
  </div>
</template>
