<template lang="pug">
q-page(padding)
	.grid
		.service
			.adress Адрес активного сервиса настроек:
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
				q-btn(flat color="accent" label="Повторить" v-close-popup)
				q-btn(color="accent" @click="restart" label="Ввести настройки заново" v-close-popup)
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Form from '@/components/Form.vue'
import { router } from '@/router/router'

const ser = ref('')
const dialog = ref(false)
const loading = ref(false)
const showSettings = ref(false)
const method = ref('one')

const check = computed(() => {
	if (ser.value.length > 1) {
		return false
	} else return true
})

const getSettings = () => {
	loading.value = true
	if (ser.value === 'err') {
		showSettings.value = false
		setTimeout(() => {
			dialog.value = true
			loading.value = false
		}, 3000)
	} else {
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
	max-width: 1200px;
	margin: 0 auto;
	.service {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 1rem;
		.adress {
			align-self: center;
		}
	}
}
.get {
	align-self: center;
}
.err {
	border-top: 6px solid $negative;
	font-size: 1rem;
}
</style>
