import { defineStore } from 'pinia'
import api from '../lib/axios'

export const useAnalyticsStore = defineStore('analytics', {
    state: () => ({
        kpis: null as any,
        athleteMetrics: null as any,
        revenueAnalytics: null as any,
        attendanceTrends: null as any,
        loading: false,
        error: null as string | null,
    }),

    actions: {
        async fetchDashboardData(academyId: number, startDate?: string, endDate?: string) {
            this.loading = true;
            this.error = null;
            try {
                const params = { academy_id: academyId, start_date: startDate, end_date: endDate };

                // Parallel requests for dashboard widgets
                const [kpis, athletes, revenue, attendance] = await Promise.allSettled([
                    api.get('/analytics/dashboard', { params }),
                    api.get('/analytics/athletes', { params: { academy_id: academyId } }),
                    api.get('/analytics/revenue', { params }),
                    api.get('/analytics/attendance', { params })
                ]);

                this.kpis = kpis.status === 'fulfilled' ? kpis.value.data : null;
                this.athleteMetrics = athletes.status === 'fulfilled' ? athletes.value.data : null;
                this.revenueAnalytics = revenue.status === 'fulfilled' ? revenue.value.data : null;
                this.attendanceTrends = attendance.status === 'fulfilled' ? attendance.value.data : null;

            } catch (err: any) {
                console.error('Failed to fetch analytics', err);
                this.error = 'Error loading dashboard analytics';
            } finally {
                this.loading = false;
            }
        }
    }
})
