<template lang="pug">
q-page(padding)
	.grid
		div
			.service
				p Укажите адрес запущенного сервиса настроек:
				q-input(v-model="ser" type="text" dense color="accent" clearable @clear="ser = ''" autogrow).port.q-ml-none
		.get
			q-btn(v-if="method === 'one'" color="accent" :disable="check" label="Получить настройки" @click="getSettings" :loading="loading")

	transition(name="fade")
		.q-mt-lg(v-if="showSettings")
			Form

	q-dialog(v-model="dialog")
		q-card(style="width: 700px; max-width: 80vw;").err
			q-card-section.row.items-center.q-pb-none
				.text-h6 Сервер не отвечает
				q-space
				q-btn(flat round dense icon="mdi-close" v-close-popup)
			q-separator
			q-card-section Какие-то проблемы с сервером настроек. Проверьте адрес и попробуйте еще раз. Если ошибка повторяется, введите настройки заново.
			q-card-actions(align="right")
				q-btn(flat color="accent" label="Отмена" v-close-popup)
				q-space
				div
					q-btn(flat color="accent" label="Повторить" v-close-popup)
					q-btn(flat color="accent" @click="restart" label="Ввести настройки заново" v-close-popup)
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Form from '@/components/Form.vue'
import { useStore } from '@/stores/store'
import { router } from '@/router/router'

const mystore = useStore()

const ser = ref('')
const dialog = ref(false)
const loading = ref(false)
const showSettings = ref(false)
const method = ref('one')

const check = computed(() => {
	if (ser.value.length > 3) {
		return false
	} else return true
})

const getSettings = () => {
	loading.value = true
	if (ser.value === '1111') {
		setTimeout(() => {
			dialog.value = true
			loading.value = false
		}, 3000)
	} else {
		mystore.server = 'data here'
		mystore.databaseName = 'data here'
		mystore.login = 'data here'
		mystore.password = 'data here'
		setTimeout(() => {
			showSettings.value = true
			loading.value = false
		}, 2000)
	}
}
const restart = () => {
	router.push('/start')
}
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.grid {
	max-width: 900px;
	margin: 0 auto;
	display: grid;
	grid-template-columns: 1fr auto;
	gap: 2rem;
	font-size: 0.9rem;
}
.get {
	align-self: center;
}
.err {
	border-top: 6px solid $negative;
	font-size: 1rem;
}
</style>
