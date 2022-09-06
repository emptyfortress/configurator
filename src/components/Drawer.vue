<template lang="pug">
q-drawer(v-model="show" side="left" :mini="mini" :width="width" bordered)

	q-btn(round flat dense :icon="minitoogle" @click="mini = !mini").mini.gt-sm
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
// import { useColor } from '@/stores/colors'
// import { useRoute } from '@/router/router'

// import SvgIcon from '@/components/SvgIcon.vue'

const width = 256
const mini = ref(false)
const show = ref(true)

const minitoogle = computed(() => {
	return mini.value ? 'mdi-forwardburger' : 'mdi-backburger'
})
</script>

<style scoped lang="scss">
.mini {
	position: absolute;
	bottom: 0.5rem;
	left: 0.5rem;
	overflow-x: hidden;
}
.fill {
	color: #fff !important;
	.q-item--active,
	.q-item.q-router-link--active {
		color: #fff;
	}
}
</style>
