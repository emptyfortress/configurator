<template lang="pug">
q-drawer(v-model="show" dark side="left" :mini="store.mini" :width="width" bordered).left
	.logo
		component(:is="Logo")
		span(v-if="!store.mini") Конфигуратор dv
	br
	br
	q-list
		q-item(clickable to="/")
			q-item-section(avatar)
				q-icon(name="mdi-license")
			q-item-section Лицензия
		q-item(clickable to="/start" :disable="!store.agree")
			q-item-section(avatar)
				q-icon(name="mdi-tools")
			q-item-section Первичная настройка
		q-item(clickable to="/refresh" :disable="!store.agree")
			q-item-section(avatar)
				q-icon(name="mdi-cached")
			q-item-section Обновление настроек

	component(:is="Motion" :animate="{rotate: rot}" :transition="transition").mini
		q-btn(round flat dense icon="mdi-backburger" @click="setMini")

	a(href="https://docsvision.com/" v-if="!store.mini").dv
		img(src="@/assets/img/dv.svg")
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/store'
import { Motion } from 'motion/vue'
import { spring } from 'motion'
import Logo from '@/components/Logo.vue'

const store = useStore()
const show = ref(true)

const rot = ref(0)

const transition = {
	easing: spring({
		stiffness: 300,
		damping: 17,
	}),
}

const setMini = () => {
	if (store.mini) {
		rot.value = 0
	} else rot.value = 180
	store.toggleMini()
}

const width = 256
</script>

<style scoped lang="scss">
.mini {
	position: absolute;
	bottom: 0.5rem;
	left: 0.5rem;
}
.dv {
	position: absolute;
	bottom: 0.9rem;
	right: 1rem;
	cursor: pointer;
}
.logo {
	font-size: 1.1rem;
	padding: 0.5rem;
	display: grid;
	grid-template-columns: auto 1fr;
	align-items: center;
	gap: 1rem;
}
.q-item.q-router-link--active {
	background: #5642a6;
}
</style>
