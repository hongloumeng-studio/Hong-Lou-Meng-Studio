import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/About.vue'),
    },
    {
      path: '/riddles',
      name: 'riddles',
      component: () => import('../views/Riddles.vue')
    },
    {
      path: '/characterSummary',
      name: 'characterSummary',
      component: () => import('../views/CharacterSummary.vue')
    },
    {
      path: '/twelveActresses',
      name: 'twelveActresses',
      component: () => import('../views/TwelveActresses.vue')
    },
    {
      path: '/correctioList',
      name: 'correctioList',
      component: () => import('../views/CorrectioList.vue')
    },
    {
      path: '/installZhVoices',
      name: 'installZhVoices',
      component: () => import('../views/InstallZhVoices.vue')
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: () => import('../views/Timeline.vue')
    },
    {
      path: '/reference',
      name: 'referenc',
      component: () => import('../views/Reference.vue')
    }
  ]
})

export default router
