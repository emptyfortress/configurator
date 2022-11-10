<template lang="pug">
q-dialog(v-model="props.modelValue")
	q-card(:class="{wide : json}")
		q-card-section
			q-card-section(horizontal)
				q-icon(name="mdi-check-bold" size="90px" color="positive")
				q-card-section
					div Модуль "Docsvision 5 консоль управления" готов к использованию и доступен по адресу:
					a(href="https://ya.ru") https://yandex.ru
		q-separator
		q-card-actions(align="right").q-px-md
			q-btn(flat color="accent" label="Посмотреть json"  @click="showJson")
			q-btn(flat color="accent" label="Закрыть" @click="close")
		q-card-section(v-if="json")
			pre {{ data }}

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/store'

const mystore = useStore()

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false,
	},
})
const emit = defineEmits(['update:modelValue'])

const close = () => {
	json.value = false
	emit('update:modelValue', false)
}
const json = ref(false)
const data: any = ref()
const showJson = () => {
	json.value = true
	data.value = mystore.settings
}
</script>

<style scoped lang="scss">
.q-card {
	transition: 0.5s ease all;
}
.wide {
	max-width: 80%;
}
</style>
