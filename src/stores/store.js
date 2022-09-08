import { defineStore } from 'pinia'
import { items } from '@/stores/data'

export const useStore = defineStore({
	id: 'store',
	state: () => ({
		leftDrawer: true,
		rightDrawer: false,
		mini: true,
		services: [...items],
	}),
	getters: {},
	actions: {
		toggleLeftDr() {
			this.leftDrawer = !this.leftDrawer
		},
		toggleRightDr() {
			this.rightDrawer = !this.rightDrawer
		},
		toggleMini() {
			this.mini = !this.mini
		},
		loadServices() {
			console.log('fuck')
			this.services = [...items]
		},
	},
})
