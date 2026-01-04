import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import CallbackView from '../views/auth/CallbackView.vue'
import DashboardView from '../views/DashboardView.vue'
import AcademySetupView from '../views/setup/AcademySetupView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/auth/callback',
      name: 'auth.callback',
      component: CallbackView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/setup',
      name: 'setup',
      component: AcademySetupView,
      meta: { requiresAuth: true },
    },
    // Portal Routes
    {
      path: '/portal/dashboard',
      name: 'portal.dashboard',
      component: () => import('../views/portal/DashboardView.vue'),
      meta: { requiresAuth: true, type: 'portal' },
    },
    {
      path: '/portal/trainings',
      name: 'portal.trainings',
      component: () => import('../views/portal/DashboardView.vue'), // Placeholder
      meta: { requiresAuth: true, type: 'portal' },
    },
    // Athletes Module
    {
      path: '/athletes',
      name: 'athletes.index',
      component: () => import('../views/athletes/AthletesList.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/athletes/new',
      name: 'athletes.create',
      component: () => import('../views/athletes/AthleteForm.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/athletes/:id',
      name: 'athletes.show',
      component: () => import('../views/athletes/AthleteDetail.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/athletes/:id/edit',
      name: 'athletes.edit',
      component: () => import('../views/athletes/AthleteForm.vue'),
      meta: { requiresAuth: true }
    },
    // Coaches Module
    {
      path: '/coaches',
      name: 'coaches.index',
      component: () => import('../views/coaches/CoachesList.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/coaches/new',
      name: 'coaches.create',
      component: () => import('../views/coaches/CoachForm.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/coaches/:id',
      name: 'coaches.show',
      component: () => import('../views/coaches/CoachDetail.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/coaches/:id/edit',
      name: 'coaches.edit',
      component: () => import('../views/coaches/CoachForm.vue'),
      meta: { requiresAuth: true }
    },
    // Training Plans
    {
      path: '/plans',
      name: 'plans.index',
      component: () => import('../views/plans/PlansList.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/plans/new',
      name: 'plans.create',
      component: () => import('../views/plans/PlanForm.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/plans/:id',
      name: 'plans.show',
      component: () => import('../views/plans/PlanDetail.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/plans/:id/edit',
      name: 'plans.edit',
      component: () => import('../views/plans/PlanForm.vue'),
      meta: { requiresAuth: true }
    },
    // Enrollments
    {
      path: '/enrollments',
      name: 'enrollments.index',
      component: () => import('../views/enrollments/EnrollmentsList.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/enrollments/new',
      name: 'enrollments.create',
      component: () => import('../views/enrollments/EnrollmentForm.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/enrollments/:id',
      name: 'enrollments.show',
      component: () => import('../views/enrollments/EnrollmentDetail.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/enrollments/:id/edit',
      name: 'enrollments.edit',
      component: () => import('../views/enrollments/EnrollmentForm.vue'),
      meta: { requiresAuth: true }
    },
    // Academy Module
    {
      path: '/academy',
      name: 'academy.profile',
      component: () => import('../views/academies/AcademyProfile.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/academy/edit',
      name: 'academy.edit',
      component: () => import('../views/academies/AcademyForm.vue'),
      meta: { requiresAuth: true }
    }
  ],
})

// Navigation Guard Placeholder
router.beforeEach((to, from, next) => {
  // TODO: Implement actual Auth check via Pinia
  const isAuthenticated = false;

  if (to.meta.requiresAuth && !isAuthenticated && to.name !== 'login') {
    // For now, allow navigation to test UI without auth
    // console.log('Auth required but skipped for dev');
    next();
    // next({ name: 'login' }); // Uncomment when Auth is ready
  } else {
    next();
  }
})

export default router
