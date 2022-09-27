import { defineStore } from 'pinia'

export const useStore = defineStore({
	id: 'store',
	state: () => ({
		leftDrawer: true,
		rightDrawer: false,
		mini: false,
		agree: false,
		os: 'windows',
		databaseAuth: 'Windows',
		server: '',
		databaseName: '',
		serverType: 'Microsoft SQL Server',
		port: 5432,
		login: '',
		password: '',
		checkCert: false,
		items: [
			{
				id: 0,
				label: 'Сервис настроек',
				port: 5100,
				log: 'C:\\ProgramData\\Docsvision\\ManagementConsole\\Logs',
				loglinux: '/usr/share/Docsvision/ManagementConsole/Logs/',
			},
			{
				id: 1,
				label: 'Консоль управления',
				port: 5200,
				log: 'C:\\ProgramData\\Docsvision\\SettingsService\\Logs',
				loglinux: '/usr/share/Docsvision/SettingsService/Logs/',
			},
			{
				id: 2,
				label: 'API консоли управления',
				port: 5300,
				log: 'C:\\ProgramData\\Docsvision\\ManagementConsole.ExternalAPI\\Logs',
				loglinux: '/usr/share/Docsvision/ManagementConsole.ExternalAPI/Logs/',
			},
		],
		defaultItems: [
			{
				id: 0,
				label: 'Сервис настроек',
				port: 5100,
				log: 'C:\\ProgramData\\Docsvision\\ManagementConsole\\Logs',
				loglinux: '/usr/share/Docsvision/ManagementConsole/Logs/',
			},
			{
				id: 1,
				label: 'Консоль управления',
				port: 5200,
				log: 'C:\\ProgramData\\Docsvision\\SettingsService\\Logs',
				loglinux: '/usr/share/Docsvision/SettingsService/Logs/',
			},
			{
				id: 2,
				label: 'API консоли управления',
				port: 5300,
				log: 'C:\\ProgramData\\Docsvision\\ManagementConsole.ExternalAPI\\Logs',
				loglinux: '/usr/share/Docsvision/ManagementConsole.ExternalAPI/Logs/',
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
