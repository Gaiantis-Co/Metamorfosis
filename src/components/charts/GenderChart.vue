<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

defineProps<{
  data: {
    labels: string[]
    datasets: any[]
  }
}>()

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        padding: 20,
        usePointStyle: true
      }
    }
  },
  cutout: '70%'
}
</script>

<template>
  <div class="h-64">
    <Doughnut :data="data" :options="options" />
  </div>
</template>
