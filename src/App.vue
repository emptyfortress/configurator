<script setup lang="ts">
import { ref } from 'vue'
import Drawer from '@/components/Drawer.vue'

const leftDrawer = ref(true)
const rightDrawer = ref(true)
</script>

<template lang="pug">
q-layout(view="lHh lpR fFf")
	q-header(bordered class="bg-primary text-white")
		q-toolbar
			q-btn(dense flat round icon="menu" @click="leftDrawer = !leftDrawer")
			q-toolbar-title
				q-avatar
					img(src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg")
			q-btn(dense flat round icon="menu" @click="rightDrawer = !rightDrawer")
	Drawer
	q-drawer(show-if-above v-model="rightDrawer" side="right" bordered)
	q-page-container
		router-view
</template>

<style scoped lang="scss"></style>
