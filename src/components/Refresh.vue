<template lang="pug">
q-page(padding)
	.grid
		div
			q-radio(v-model="method" color="accent" val="one" label="Укажите адрес запущенного сервиса настроек:")
			.service
				.zag Сервис настроек
				q-input(v-model="ser" @focus="switchRadio" type="text" dense color="accent" clearable @clear="ser = ''")
		.get
			q-btn(v-if="method === 'one'" color="accent" :disable="check" label="Получить настройки")
		div
			q-radio(v-model="method" color="accent" val="two" label="Подключитесь к существующей базе с настройками:")
			form(ref="target")
				component(:is="Database")
		.get
			q-btn(v-if="method === 'two'" color="accent" :disable="check" label="Получить настройки")

</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useFocusWithin } from '@vueuse/core'
import Database from '@/components/Database.vue'

const ser = ref('')
const method = ref('one')
const target = ref()
const { focused } = useFocusWithin(target)

watch(focused, (focused) => {
	if (focused) {
		method.value = 'two'
	}
})
const switchRadio = () => {
	method.value = 'one'
}

const check = computed(() => {
	if (ser.value.length > 3) {
		return false
	} else return true
})
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.grid {
	max-width: 1200px;
	margin: 0 auto;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 2rem;
	font-size: 0.9rem;
}
.get {
	align-self: center;
	padding-top: 3rem;
}
</style>
