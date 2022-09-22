import { defineStore } from 'pinia'

export const useStore = defineStore({
	id: 'store',
	state: () => ({
		leftDrawer: true,
		rightDrawer: false,
		mini: false,
		agree: false,
		os: 'windows',
		items: [
			{
				id: 0,
				label: 'Сервис настроек',
				servertype: '',
				servername: '',
				authentification: '',
				port: 5100,
				login: '',
				password: '',
				databaseName: '',
				log: 'C:\\ProgramData\\Docsvision\\ManagementConsole\\Logs',
			},
			{
				id: 1,
				label: 'Консоль управления',
				servertype: '',
				servername: '',
				authentification: '',
				port: 5200,
				login: '',
				password: '',
				databaseName: '',
				log: 'C:\\ProgramData\\Docsvision\\ManagementConsole\\Logs',
			},
			{
				id: 2,
				label: 'API консоли управления',
				servertype: '',
				servername: '',
				authentification: '',
				port: 5300,
				login: '',
				password: '',
				databaseName: '',
				log: 'C:\\ProgramData\\Docsvision\\ManagementConsole\\Logs',
			},
		],
		defaultItems: [
			{
				id: 0,
				label: 'Сервис настроек',
				servertype: '',
				servername: '',
				authentification: '',
				port: 5100,
				login: '',
				password: '',
				databaseName: '',
				log: 'C:\\ProgramData\\Docsvision\\ManagementConsole\\Logs',
			},
			{
				id: 1,
				label: 'Консоль управления',
				servertype: '',
				servername: '',
				authentification: '',
				port: 5200,
				login: '',
				password: '',
				databaseName: '',
				log: 'C:\\ProgramData\\Docsvision\\ManagementConsole\\Logs',
			},
			{
				id: 2,
				label: 'API консоли управления',
				servertype: '',
				servername: '',
				authentification: '',
				port: 5300,
				login: '',
				password: '',
				databaseName: '',
				log: 'C:\\ProgramData\\Docsvision\\ManagementConsole\\Logs',
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
