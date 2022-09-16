<template lang="pug">
q-page(padding)
	p Заполните формы или оставьте значения по умолчанию.
	.grid
		.service(v-for="(item, index) in mystore.items" :key="item.id")
			.zag
				|{{ item.label}}
				transition(name="slide-right" )
					q-btn(dense round flat icon="mdi-autorenew"
						@click="reset(item, index)"
						v-if="showRefresh(index)")
						q-tooltip Вернуть умолчания
			.form
				q-input(v-model="item.servername" label="Имя сервера" color="accent" clearable).ful
				.label Тип сервера:
				q-select(v-model="item.servertype" :options="servertypes" dense color="accent").port

				template(v-if="item.servertype === 'Microsoft SQL Server'")
					.label Аутентификация:
					q-select(v-model="item.authentification" :options="authentifications" dense color="accent").port
				template(v-if="item.servertype === 'PostgreSQL'")
					.label Порт:
					q-input(v-model="item.port" type="number" dense color="accent").port

				.label Логин:
				q-input(v-model="item.login" dense color="accent").port
				.label Пароль:
				q-input(v-model="item.password" :type="calcType(index)" dense color="accent").port
					template(v-slot:append)
						q-btn(dense flat round @click="pass[index] = !pass[index]")
							q-icon(v-if="pass[index] === false" name="mdi-eye-off")
							q-icon(v-else name="mdi-eye")
				q-input(v-model="item.databaseName" label="Название базы данных" color="accent" clearable).ful
			br
			q-expansion-item(dense
				label="Дополнительные настройки")
				q-card-section
					q-input(v-model="item.log" type="text" label="Хранилище логов" color="accent" clearable)

			.row.justify-between.items-end
				q-btn(flat color="accent" label="Проверка соединения" size="md" :loading="loading[item.id]" @click="simulateProgress(item.id)").q-mt-lg
				q-icon(v-if="connection[index] && item.id !== 2" name="mdi-check-network" size="32px" color="positive")
				q-icon(v-if="connection[index] && item.id === 2" name="mdi-alert" size="32px" color="negative").cursor-pointer
					q-menu(padding)
						q-card-section Сервер не отвечает :(

	q-card-actions(align="center").service.item
		transition(name="slide-botton")
			q-btn(color="accent" flat label="Сбросить изменения" @click="resetAll" :disable="!showApply")
				q-tooltip Вернуть значения по умолчанию
		q-btn(color="accent" unelevated label="Применить")

</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useStore } from '@/stores/store'
import { useQuasar } from 'quasar'
import type { Ref } from 'vue'
import { servertypes } from '@/stores/data'

const mystore = useStore()
const $q = useQuasar()

const pass: Ref<Boolean[]> = ref([false, false, false])
const loading = ref([false, false, false])
const connection = ref([false, false, false])
const authentifications = ref(['SQL Server', 'Windows'])

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
			mystore.rightDrawer = true
			output!.innerHTML = new Date() + '<br />' + 'Some error messages'
		}
	}, 2000)
}
const calcType = (e: number) => {
	if (pass.value[e] === false) {
		return 'password'
	} else return 'text'
}

const reset = (e: any, i: number) => {
	Object.assign(e, mystore.defaultItems[i])
}

const resetAll = () => {
	mystore.items.forEach((_, index) => {
		Object.assign(mystore.items[index], mystore.defaultItems[index])
	})
	mystore.toggleRightDr()
	connection.value = [false, false, false]
}

const showRefresh = (e: number) => {
	if (JSON.stringify(mystore.items[e]) === JSON.stringify(mystore.defaultItems[e])) {
		return false
	} else return true
}
const showApply = computed(() => {
	let temp: Boolean[] = []
	mystore.items.forEach((_, index) => temp.push(showRefresh(index)))
	return temp.some((item) => item === true)
})
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
	width: 100px;
}
.form {
	display: grid;
	grid-template-columns: auto 1fr;
	gap: 1rem;
	> div {
		align-self: center;
		white-space: no-wrap;
	}
	.ful {
		grid-column: 1/-1;
		font-size: 1.1rem;
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
