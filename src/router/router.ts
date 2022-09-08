import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/components/Home.vue'

declare module 'vue-router' {
	interface RouteMeta {
		// is optional
		isAdmin?: boolean
		// must be declared by every route
		requiresAuth: boolean
		title: string
	}
}

export const router = createRouter({
	history: createWebHashHistory(),

	routes: [
		{
			path: '/',
			component: Home,
			meta: {
				transition: 'slide-left',
				title: 'Здесь вы можете настроить docsvision',
				requiresAuth: false,
			},
		},
		{
			path: '/start',
			component: () => import('@/components/Start.vue'),
			meta: {
				transition: 'slide-left',
				title: 'Первичная настройка служб docsvision',
				requiresAuth: false,
			},
		},
		{
			path: '/refresh',
			component: () => import('@/components/Refresh.vue'),
			meta: { transition: 'slide-left', title: 'Обновление настроек', requiresAuth: false },
		},
	],
})
