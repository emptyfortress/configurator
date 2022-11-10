import { defineStore } from 'pinia'

export const useStore = defineStore({
	id: 'store',
	state: () => ({
		leftDrawer: true,
		rightDrawer: false,
		mini: false,
		agree: true,
		settings: {
			os: 'windows',
			connection: false,
			topBlocks: [
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
			database: {
				serverType: 'Microsoft SQL Server',
				serverTypesOptions: ['Microsoft SQL Server', 'PostgreSQL'],
				server: 'VEGA\\MSSQL2017',
				port: 5432,
				name: 'Test',
				auth: 'Windows',
				login: 'kmg01',
				password: 'kmg001',
				checkCert: false,
			},
		},
	}),
	getters: {},
	actions: {
		toggleLeftDr() {
			this.leftDrawer = !this.leftDrawer
		},
		toggleRightDr() {
			this.rightDrawer = !this.rightDrawer
		},
		openRightDr() {
			this.rightDrawer = true
		},
		toggleMini() {
			this.mini = !this.mini
		},
		setConnection(payload: boolean) {
			this.settings.connection = payload
		},
	},
})
