<template lang="pug">
.service.item.pad
	.zag База данных для хранения настроек
	.form
		.label.wide Тип СУБД:
		q-select(v-model="mystore.settings.database.serverType" :options="mystore.settings.database.serverTypesOptions"  dense color="accent").port
		.label.wide Сервер БД:
		q-input(v-model="mystore.settings.database.server" type="text" dense color="accent" clearable @clear="mystore.settings.database.server = ''").port
		template(v-if="mystore.settings.database.serverType === 'PostgreSQL'")
			.label.wide Порт:
			q-input(v-model="mystore.settings.database.port" type="number" dense color="accent").port
		.label.wide Имя БД:
		q-input(v-model="mystore.settings.database.name" type="text" dense color="accent" clearable @clear="mystore.settings.database.name = ''").port
		template(v-if="mystore.settings.database.serverType === 'Microsoft SQL Server'")
			.label.wide Проверка подлинности:
			.q-gutter-lg
				q-radio(color="accent" v-model="mystore.settings.database.auth" val="Windows" label="Windows")
				q-radio(color="accent" v-model="mystore.settings.database.auth" val="SQL Server" label="SQL Server")
		.label Пользователь:
		q-input(v-model="mystore.settings.database.login" dense color="accent" clearable @clear="mystore.settings.database.login = ''").port
		.label Пароль:
		q-input(v-model="mystore.settings.database.password" :type="calcType" dense color="accent" clearable @clear="mystore.settings.database.password = ''").port
			template(v-slot:append)
				q-btn(dense flat round @click="pass = !pass")
					q-icon(v-if="pass === true" name="mdi-eye-off")
					q-icon(v-else name="mdi-eye")
		.label
		q-checkbox(v-model="mystore.settings.database.checkCert" color="accent" label="Проверять сертификат сервера")
		div
		.row.justify-between.items-end
			q-btn(flat color="accent" label="Проверка соединения" size="md" :loading="loading" :disable="checkPass" @click="simulateProgress")
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '@/stores/store'
import { useQuasar } from 'quasar'

const mystore = useStore()
const $q = useQuasar()

const pass = ref(true)
const loading = ref(false)

const checkPass = computed(() => {
	if (
		mystore.settings.database.login.length > 2 &&
		mystore.settings.database.password.length > 2 &&
		mystore.settings.database.name.length > 2 &&
		mystore.settings.database.server.length > 2
	) {
		return false
	}
	return true
})

const validate = computed(() => {
	if (
		mystore.settings.database.login === 'kmg01' &&
		mystore.settings.database.password === 'kmg001'
	) {
		return true
	}
	return false
})

const simulateProgress = () => {
	loading.value = true
	const output = document.querySelector('#output')
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
			mystore.rightDrawer = true
			output!.innerHTML = new Date() + '<br />' + 'Some error messages here'
		}
	}, 2000)
	mystore.setConnection(false)
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
