const items = [
	{
		id: 0,
		label: 'Сервис настроек',
		port: 5100,
		user: 'setup',
		login: '',
		password: '',
		pass: true,
	},
	{
		id: 1,
		label: 'Консоль управления',
		port: 5200,
		user: 'console',
		login: '',
		password: '',
		pass: true,
	},
	{
		id: 2,
		label: 'API консоли управления',
		port: 5300,
		user: 'api',
		login: '',
		password: '',
		pass: true,
	},
]

const defaultItems = items.map((item) => ({
	id: item.id,
	label: item.label,
	port: item.port,
	user: item.user,
	login: item.login,
	password: item.password,
	pass: item.pass,
}))

export { items, defaultItems }
