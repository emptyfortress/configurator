<template lang="pug">
q-dialog(v-model="props.modelValue")
	q-card
		q-card-section
			q-card-section(horizontal)
				q-icon(name="mdi-alert" size="80px" color="negative")
				q-card-section
					div Возникла ошибка. Полный лог сообщения об ошибке выведен в консоли.
		q-separator
		q-card-actions(align="right")
			q-btn(flat color="accent" label="Закрыть" @click="close")
			q-btn(flat color="accent" label="Открыть консоль" v-close-popup @click="open")
</template>

<script setup lang="ts">
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
	emit('update:modelValue', false)
}

const open = () => {
	const output = document.querySelector('#output')
	mystore.openRightDr()
	output!.innerHTML = new Date() + '<br />' + 'Some error messages here'
	close()
}
</script>

<style scoped lang="scss"></style>
