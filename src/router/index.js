import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { usePermissionStore } from '@/stores/permission'

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
      component: () => import('../views/AboutView.vue'),
      meta: {
        permission: ['user:add', 'user:view'],
      },
    },
  ],
})

export default router

router.beforeEach((to, from) => {
  const permissionStore = usePermissionStore()
  const requiredPermission = to.meta.permission ?? []
  permissionStore.setPermissions(to.name, requiredPermission)
})
