<script setup lang="ts">
import { ref } from 'vue'
import Drawer from '@/components/Drawer.vue'
import RDrawer from '@/components/RDrawer.vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/stores/store'

const mystore = useStore()
const route = useRoute()
const en = ref(false)
</script>

<template lang="pug">
q-layout(view="LHh lpR fFf")
	q-header(elevated).header
		q-toolbar.text-black
			q-toolbar-title.q-ml-md {{route.meta.title}}

			q-btn(flat round @click="en = !en")
				img(v-if="en" src="@/assets/img/icons/us.svg" width="24")
				img(v-else src="@/assets/img/icons/russia.svg" width="24")
			//- q-btn(flat round icon="mdi-brightness-4" color="black" @click="dark = !dark")
			//- q-btn(dense flat round icon="menu" @click="mystore.toggleRightDr")
	Drawer
	RDrawer(:show="mystore.rightDrawer")
	q-page-container
		router-view(v-slot="{ Component, route }")
			transition(name="slide-right" mode="out-in")
				component(:is="Component")
</template>

<style scoped lang="scss"></style>
