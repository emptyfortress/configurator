<template lang="pug">
q-page(padding)
	.hd Первичная настройка служб docsvision
	p Укажите порты для служб dv или оставьте значения по умолчанию.
	.grid
		.service(v-for="service in services" :key="service.id")
			.zag
				|{{ service.label}}
				q-btn(dense round flat icon="mdi-autorenew" color="grey")
					q-tooltip Вернуть умолчания
			.form
				.label Порт:
				q-input(v-model="service.port" dense color="accent").port
				q-checkbox(v-model="users" :val="service.user" dense color="accent" label="Указать пользователя" ).check

				template(v-if="checkUser(service.user)")
					.label Логин:
					q-input(v-model="service.login" dense color="accent").port
					.label Пароль:
					q-input(v-model="service.password" type="password" dense color="accent").port
			q-btn(flat color="accent" label="Проверка соединения" size="sm").q-mt-lg

	q-card.service.item
		q-expansion-item(
			expand-separator
			icon="mdi-tools"
			label="Дополнительные настройки"
			)

			q-card
				q-card-section
					.log
						div Хранилище логов:
						q-input(v-model="logs" dense color="accent")
						q-btn(flat color="accent" label="Выбрать" size="md")

</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const users = ref([])
const logs = ref('C:\\ProgramData\\Docsvision\\ManagementConsole\\Logs')

const checkUser = (user: string) => {
	return users.value.some((item) => item === user)
}

const services = reactive([
	{ id: 0, label: 'Сервис настроек', port: 5100, user: 'setup', login: '', password: '' },
	{ id: 1, label: 'Консоль управления', port: 5200, user: 'console', login: '', password: '' },
	{ id: 2, label: 'API консоли управления', port: 5300, user: 'api', login: '', password: '' },
])
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.service {
	padding: 1rem;
	background: var(--bg-main);
	box-shadow: 4px 4px 9px rgba(0, 0, 0, 0.2), -4px -4px 4px rgba(255, 255, 255, 1);
	border-radius: 4px;
	align-self: start;
}
.grid {
	margin-top: 2rem;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 2rem;
	font-size: 0.9rem;
}
.zag {
	font-size: 1.1rem;
	margin-bottom: 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.label {
	font-size: 0.9rem;
	width: 60px;
}
.form {
	display: grid;
	grid-template-columns: auto 1fr;
	gap: 1rem;
	> div {
		align-self: center;
		white-space: no-wrap;
	}
}
.check {
	grid-column: 1/-1;
	margin-top: 1rem;
}
.item {
	width: 800px;
	margin: 0 auto;
	margin-top: 5rem;
	.q-card {
		background: transparent;
	}
}
.log {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 1rem;
	.q-input {
		width: 60%;
	}
}
</style>
