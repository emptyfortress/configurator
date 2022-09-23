import { defineStore } from 'pinia'

export const useStore = defineStore({
	id: 'store',
	state: () => ({
		leftDrawer: true,
		rightDrawer: true,
		mini: false,
		agree: false,
		os: 'windows',
		databaseAuth: 'Windows',
		databaseName: 'DV\\SQL-2022',
		serverType: 'Microsoft SQL Server',
		login: '',
		password: '',
		items: [
			{
				id: 0,
				label: 'Сервис настроек',
				port: 5100,
				log: 'C:\\ProgramData\\Docsvision\\ManagementConsole\\Logs',
				loglinux: 'log linux',
			},
			{
				id: 1,
				label: 'Консоль управления',
				port: 5200,
				log: 'C:\\ProgramData\\Docsvision\\SettingsService\\Logs',
				loglinux: 'log linux',
			},
			{
				id: 2,
				label: 'API консоли управления',
				port: 5300,
				log: 'C:\\ProgramData\\Docsvision\\WebAdminConsole.ExternalAPI\\Logs',
				loglinux: 'log linux',
			},
		],
		defaultItems: [
			{
				id: 0,
				label: 'Сервис настроек',
				port: 5100,
				log: 'C:\\ProgramData\\Docsvision\\ManagementConsole\\Logs',
				loglinux: 'log linux',
			},
			{
				id: 1,
				label: 'Консоль управления',
				port: 5200,
				log: 'C:\\ProgramData\\Docsvision\\SettingsService\\Logs',
				loglinux: 'log linux',
			},
			{
				id: 2,
				label: 'API консоли управления',
				port: 5300,
				log: 'C:\\ProgramData\\Docsvision\\WebAdminConsole.ExternalAPI\\Logs',
				loglinux: 'log linux',
			},
		],
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
