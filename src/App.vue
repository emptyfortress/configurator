<script setup lang="ts">
import { ref, computed } from 'vue'
import Drawer from '@/components/Drawer.vue'
import RDrawer from '@/components/RDrawer.vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/stores/store'

const mystore = useStore()
const route = useRoute()
const en = ref(false)

const calcClass = computed(() => {
	if (mystore.os === 'linux') {
		return 'lin'
	}
	return 'win'
})
</script>

<template lang="pug">
q-layout(view="LHh lpR fFf")
	q-header(elevated).header
		q-toolbar.text-black
			q-toolbar-title.q-ml-md
				|{{route.meta.title}}
				template(v-if="route.fullPath === '/start'")
					span(v-if="mystore.os === 'windows'").q-ml-md (windows)
					span(v-else).q-ml-md (linux)

			q-btn(flat round @click="en = !en")
				img(v-if="en" src="@/assets/img/icons/us.svg" width="24")
				img(v-else src="@/assets/img/icons/russia.svg" width="24")
			//- q-btn(flat round icon="mdi-brightness-4" color="black" @click="dark = !dark")
			//- q-btn(dense flat round icon="menu" @click="mystore.toggleRightDr")
	RDrawer
	Drawer
	q-page-container
		router-view(v-slot="{ Component, route }")
			transition(name="fade" mode="out-in")
				component(:is="Component")
img(v-if="mystore.os === 'windows'" src="@/assets/img/windows.svg").logo
img(v-else src="@/assets/img/linux.svg").logo
</template>

<style scoped lang="scss">
.logo {
	width: 100px;
	position: fixed;
	bottom: 2rem;
	right: 2rem;
}
</style>
