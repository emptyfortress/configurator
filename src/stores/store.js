import { defineStore } from 'pinia'

export const useStore = defineStore({
	id: 'store',
	state: () => ({
		leftDrawer: true,
		rightDrawer: true,
		mini: false,
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
	},
})
