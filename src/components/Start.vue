<template lang="pug">
q-page(padding)
	p Заполните форму или оставьте значения по умолчанию.
	.grid
		.service(v-for="item in mystore.items" :key="item.id")
			.zag
				|{{ item.label}}
			.form
				.label Порт:
				q-input(v-model="item.port" type="number" dense color="accent").port
			br
			q-expansion-item(dense label="Дополнительно")
				q-card-section
					q-input(v-if="mystore.os === 'windows'" v-model="item.log" type="text" label="Хранилище логов" color="accent" clearable)
					q-input(v-else v-model="item.loglinux" type="text" label="Хранилище логов" color="accent" clearable)

	.service.item.pad
		.zag База данных
		.form
			.label.wide Тип сервера:
			q-select(v-model="mystore.serverType" :options="servertypes"  dense color="accent").port
			.label.wide Название базы:
			q-input(v-model="mystore.databaseName" type="text" dense color="accent").port
			.label Аутентификация:
			.q-gutter-lg
				q-radio(color="accent" v-model="mystore.databaseAuth" val="Windows" label="Windows")
				q-radio(color="accent" v-model="mystore.databaseAuth" val="SQL Server" label="SQL Server")
			.label Логин:
			q-input(v-model="mystore.login" dense color="accent").port
			.label Пароль:
			q-input(v-model="mystore.password" :type="calcType" dense color="accent").port
				template(v-slot:append)
					q-btn(dense flat round @click="pass = !pass")
						q-icon(v-if="pass === true" name="mdi-eye-off")
						q-icon(v-else name="mdi-eye")
			.label
			.row.justify-between.items-end
				q-btn(flat color="accent" label="Проверка соединения" size="md" :loading="loading" :disable="checkPass" @click="simulateProgress").q-mt-lg
				q-icon(v-if="connection && validate" name="mdi-check-network" size="32px" color="positive")
				q-icon(v-if="connection && !validate" name="mdi-alert" size="32px" color="negative").cursor-pointer
					q-menu(padding)
						q-card-section Сервер не отвечает :(

	q-card-actions(align="center").service.item
		transition(name="slide-botton")
			q-btn(color="accent" flat label="Сбросить изменения" @click="resetAll" :disable="!showApply" icon="mdi-restore")
				q-tooltip Вернуть значения по умолчанию
		q-btn(color="accent" unelevated label="Применить")

</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '@/stores/store'
import { useQuasar } from 'quasar'
import { servertypes } from '@/stores/data'

const mystore = useStore()
const $q = useQuasar()

const pass = ref(true)
const loading = ref(false)
const connection = ref(false)

const checkPass = computed(() => {
	if (mystore.login.length > 2 && mystore.password.length > 2) {
		return false
	}
	return true
})

const validate = computed(() => {
	if (mystore.login === 'kmg01' && mystore.password === 'kmg001') {
		return true
	}
	return false
})

const simulateProgress = () => {
	loading.value = true
	const output = document.querySelector('#output')
	setTimeout(() => {
		loading.value = false
		connection.value = true
		if (validate.value === true) {
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
const calcType = computed(() => {
	if (pass.value === true) {
		return 'password'
	} else return 'text'
})

// const reset = (e: any, i: number) => {
// 	Object.assign(e, mystore.defaultItems[i])
// }

const resetAll = () => {
	// mystore.items.forEach((_, index) => {
	// 	Object.assign(mystore.items[index], mystore.defaultItems[index])
	// })
	// mystore.toggleRightDr()
	connection.value = false
}

const showRefresh = (e: number) => {
	if (JSON.stringify(mystore.items[e]) === JSON.stringify(mystore.defaultItems[e])) {
		return (
			false ||
			mystore.databaseAuth === 'Windows' ||
			mystore.serverType === 'Microsoft SQL Server' ||
			mystore.databaseName === 'DV\\SQL-2022'
		)
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
	margin-top: 1rem;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 2rem;
	font-size: 0.9rem;
}
.zag {
	font-size: 1.1rem;
	font-weight: 600;
	margin-bottom: 1rem;
	height: 32px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.label {
	font-size: 0.9rem;
	width: 80px;
	&.wide {
		width: 150px;
	}
}
.form {
	display: grid;
	grid-template-columns: auto 1fr;
	gap: 0.5rem;
	> div {
		align-self: center;
		white-space: no-wrap;
	}
	.ful {
		grid-column: 1/-1;
		font-size: 1.1rem;
		&.small {
			font-size: 0.9rem;
		}
	}
}
.check {
	grid-column: 1/-1;
	margin-top: 1rem;
}
.item {
	width: 600px;
	margin: 0 auto;
	margin-top: 2rem;
	.q-card {
		background: transparent;
	}
	&.pad {
		padding: 1rem 2rem;
	}
}
// .log {
// 	display: flex;
// 	justify-content: flex-start;
// 	align-items: center;
// 	gap: 1rem;
// 	.q-input {
// 		width: 60%;
// 	}
// }
p {
	font-size: 1rem;
}
</style>
