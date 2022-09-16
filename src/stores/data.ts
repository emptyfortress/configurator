const items = [
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
		log: undefined,
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
		log: undefined,
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
		log: undefined,
	},
]

const defaultItems = items.map((item) => ({
	id: item.id,
	label: item.label,
	port: item.port,
	login: item.login,
	password: item.password,
}))

const servertypes = ['Microsoft SQL Server', 'PostgreSQL']

export { items, defaultItems, servertypes }
