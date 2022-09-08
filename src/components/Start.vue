<template lang="pug">
q-page(padding)
	p Укажите порты для служб dv или оставьте значения по умолчанию.
	.grid
		.service(v-for="(item, index) in services" :key="item.id")
			.zag
				|{{ item.label}}
				transition(name="slide-right" )
					q-btn(dense round flat icon="mdi-autorenew"
						@click="reset(item, index)"
						v-if="showRefresh(index)")
						q-tooltip Вернуть умолчания
			.form
				.label Порт:
				q-input(v-model="item.port" type="number" dense color="accent").port
				q-checkbox(v-model="login" :val="item.user" dense color="accent" label="Указать пользователя" ).check

				template(v-if="checkUser(item.user)")
					.label Логин:
					q-input(v-model="item.login" dense color="accent").port
					.label Пароль:
					q-input(v-model="item.password" :type="calcType(item)" dense color="accent").port
						template(v-slot:append)
							q-btn(dense flat round @click="item.pass = !item.pass")
								q-icon(v-if="item.pass === true" name="mdi-eye-off")
								q-icon(v-else name="mdi-eye")
			.row.justify-between.items-end
				q-btn(flat color="accent" label="Проверка соединения" size="md" :loading="loading[item.id]" @click="simulateProgress(item.id)").q-mt-lg
				q-icon(v-if="connection[index] && item.id !== 2" name="mdi-check-network" size="32px" color="positive")
				q-icon(v-if="connection[index] && item.id === 2" name="mdi-alert" size="32px" color="negative").cursor-pointer
					q-menu(padding)
						q-card-section Сервер не отвечает :(


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
	q-card-actions.item
		q-btn(color="accent" flat label="Сбросить изменения" @click="resetAll" :disable="!showApply")
		q-btn(color="accent" flat label="Сохранить как настройки по умолчанию" :disable="!showApply")
		q-space
		q-btn(color="accent" unelevated label="Применить")

</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import type { Ref } from 'vue'

import { items, defaultItems } from '@/stores/data'
import { useQuasar } from 'quasar'

const $q = useQuasar()

let services = reactive([...items])

const login: Ref<String[]> = ref([])
const loading = ref([false, false, false])
const connection = ref([false, false, false])
const logs = ref('C:\\ProgramData\\Docsvision\\ManagementConsole\\Logs')

const checkUser = (user: string) => {
	return login.value.some((item) => item === user)
}

const simulateProgress = (e: number) => {
	loading.value[e] = true
	const output = document.querySelector('#output')
	setTimeout(() => {
		loading.value[e] = false
		connection.value[e] = true
		if (e < 2) {
			$q.notify({
				icon: 'mdi-check-bold',
				message: 'Сервер в порядке',
				color: 'positive',
			})
		} else {
			$q.notify({
				message: 'Сервер не отвечает',
				color: 'negative',
			})
			output!.innerHTML =
				new Date() + '<br />' + JSON.stringify(services[2]).split(',').join(', <br />')
		}
	}, 2000)
}
const calcType = (e: any) => {
	if (e.pass === true) {
		return 'password'
	} else return 'text'
}

const reset = (e: any, i: number) => {
	Object.assign(e, defaultItems[i])
}

const resetAll = () => {
	login.value = []
	services.forEach((_, index) => {
		Object.assign(services[index], defaultItems[index])
	})
	logs.value = 'C:\\ProgramData\\Docsvision\\ManagementConsole\\Logs'
}
const showRefresh = (e: number) => {
	if (JSON.stringify(services[e]) === JSON.stringify(defaultItems[e])) {
		return false
	} else return true
}
const showApply = computed(() => {
	let temp: Boolean[] = []
	services.forEach((_, index) => temp.push(showRefresh(index)))
	return temp.some((item) => item === true)
})
console.log(showApply.value)
</script>

<style scoped lang="scss">
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
	height: 32px;
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
	margin-top: 2rem;
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
p {
	font-size: 1rem;
}
</style>
