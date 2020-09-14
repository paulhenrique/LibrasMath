import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home')
  },
  {
    path: '/sobre',
    name: 'Sobre',
    component: () => import('@/pages/About')
  },
  {
    path: '/jogar',
    name: 'Jogar',
    component: () => import('@/pages/Play')
  },
  {
    path: '/configuracoes',
    name: 'Configuracoes',
    component: () => import('@/pages/Settings')
  },
  {
    path: '/pontuacao',
    name: 'Pontuacao',
    component: () => import('@/pages/Score')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
