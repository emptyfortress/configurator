<script setup lang="ts">
import { ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import Drawer from '@/components/Drawer.vue'
import RDrawer from '@/components/RDrawer.vue'

const $q = useQuasar()
const dark = ref(false)
const rightDrawer = ref(true)
const en = ref(false)

watch(
	() => dark.value,
	() => {
		$q.dark.toggle()
	}
)
</script>

<template lang="pug">
q-layout(view="LHh lpR fFf")
	q-header(bordered).header
		q-toolbar
			q-toolbar-title
			q-btn(flat round @click="en = !en")
				img(v-if="en" src="@/assets/img/icons/us.svg" width="24")
				img(v-else src="@/assets/img/icons/russia.svg" width="24")
			q-btn(flat round icon="mdi-brightness-4" color="black" @click="dark = !dark")
			q-btn(dense flat round icon="menu" @click="rightDrawer = !rightDrawer")
	Drawer
	RDrawer(:show="rightDrawer")
	q-page-container
		router-view(v-slot="{ Component, route }")
			transition(name="slide-right" mode="out-in")
				component(:is="Component")
</template>

<style scoped lang="scss"></style>
