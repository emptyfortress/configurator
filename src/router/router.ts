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
			meta: { transition: 'slide-left', title: 'DV prototypes', requiresAuth: false },
		},
	],
})
