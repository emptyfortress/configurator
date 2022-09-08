<template lang="pug">
q-drawer(v-model="show" dark side="left" :mini="mystore.mini" :width="width" bordered).left
	.logo
		img(src="@/assets/img/logo.svg" width="40" @click="mystore.toggleRightDr").cursor-pointer
		span(v-if="!mystore.mini") Конфигуратор ДВ
	br
	br
	q-list
		q-item(clickable to="/")
			q-item-section(avatar)
				q-icon(name="mdi-flag-checkered")
			q-item-section Начало
		q-item(clickable to="/start")
			q-item-section(avatar)
				q-icon(name="mdi-tools")
			q-item-section Первичная настройка
		q-item(clickable to="/refresh")
			q-item-section(avatar)
				q-icon(name="mdi-reload")
			q-item-section Обновление настроек


	q-btn(round flat dense :icon="minitoogle" @click="mystore.toggleMini").mini.gt-sm
	img(src="@/assets/img/dv.svg" v-if="!mystore.mini").dv
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useStore } from '@/stores/store'

const mystore = useStore()

const width = 256
const show = ref(true)

const minitoogle = computed(() => {
	return mystore.mini ? 'mdi-forwardburger' : 'mdi-backburger'
})
</script>

<style scoped lang="scss">
.mini {
	position: absolute;
	bottom: 0.5rem;
	left: 0.5rem;
	overflow-x: hidden;
}
.dv {
	position: absolute;
	bottom: 1.1rem;
	right: 1rem;
}
.logo {
	font-size: 1.1rem;
	padding: 0.5rem;
	overflow: hidden;
	img {
		vertical-align: middle;
		margin-right: 1rem;
	}
}
</style>
