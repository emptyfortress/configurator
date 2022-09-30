<template lang="pug">
.service.item.pad
	.zag База данных для хранения настроек
	.form
		.label.wide Тип СУБД:
		q-select(v-model="mystore.serverType" :options="servertypes"  dense color="accent").port
		.label.wide Сервер БД:
		q-input(v-model="mystore.server" type="text" dense color="accent" clearable).port
		template(v-if="mystore.serverType === 'PostgreSQL'")
			.label.wide Порт:
			q-input(v-model="mystore.port" type="number" dense color="accent").port
		.label.wide Имя БД:
		q-input(v-model="mystore.databaseName" type="text" dense color="accent" clearable).port
		template(v-if="mystore.serverType === 'Microsoft SQL Server'")
			.label.wide Проверка подлинности:
			.q-gutter-lg
				q-radio(color="accent" v-model="mystore.databaseAuth" val="Windows" label="Windows")
				q-radio(color="accent" v-model="mystore.databaseAuth" val="SQL Server" label="SQL Server")
		.label Пользователь:
		q-input(v-model="mystore.login" dense color="accent" clearable).port
		.label Пароль:
		q-input(v-model="mystore.password" :type="calcType" dense color="accent" clearable).port
			template(v-slot:append)
				q-btn(dense flat round @click="pass = !pass")
					q-icon(v-if="pass === true" name="mdi-eye-off")
					q-icon(v-else name="mdi-eye")
		.label
		q-checkbox(v-model="mystore.checkCert" color="accent" label="Проверять сертификат сервера")
		div
		.row.justify-between.items-end
			q-btn(flat color="accent" label="Проверка соединения" size="md" :loading="loading" :disable="checkPass" @click="simulateProgress")
			q-icon(v-if="mystore.connection && validate" name="mdi-check-network" size="32px" color="positive")
			q-icon(v-if="mystore.connection && !validate" name="mdi-alert" size="32px" color="negative").cursor-pointer
				q-menu(padding)
					q-card-section Сервер не отвечает :(
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
// const connection = ref(false)

const checkPass = computed(() => {
	if (
		mystore.login.length > 2 &&
		mystore.password.length > 2 &&
		mystore.databaseName.length > 2 &&
		mystore.server.length > 2
	) {
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
	// const output = document.querySelector('#output')
	setTimeout(() => {
		loading.value = false
		mystore.setConnection(true)
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
			// mystore.rightDrawer = true
			// output!.innerHTML = new Date() + '<br />' + 'Some error messages'
		}
	}, 2000)
}
const calcType = computed(() => {
	if (pass.value === true) {
		return 'password'
	} else return 'text'
})

// const showRefresh = () => {
// 	if (JSON.stringify(mystore.items[e]) === JSON.stringify(mystore.defaultItems[e])) {
// 		return (
// 			false ||
// 			mystore.databaseAuth === 'Windows' ||
// 			mystore.serverType === 'Microsoft SQL Server' ||
// 			mystore.databaseName === 'DV\\SQL-2022'
// 		)
// 	} else return true
// }

// const showApply = computed(() => {
// 	let temp: Boolean[] = []
// 	mystore.items.forEach((_, index) => temp.push(showRefresh(index)))
// 	return temp.some((item) => item === true)
// })
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
</style>
