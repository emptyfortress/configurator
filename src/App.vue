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
			q-toolbar-title.q-ml-md
				|{{route.meta.title}}
				span(v-if="mystore.os === 'windows'").q-ml-md (windows)
				span(v-else).q-ml-md (linux)

			q-btn(flat round @click="en = !en")
				img(v-if="en" src="@/assets/img/icons/us.svg" width="24")
				img(v-else src="@/assets/img/icons/russia.svg" width="24")
	RDrawer
	Drawer
	q-page-container
		router-view(v-slot="{ Component }")
			transition(name="fade" mode="out-in")
				component(:is="Component")
transition(name="fade")
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
