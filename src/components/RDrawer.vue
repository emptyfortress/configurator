<template lang="pug">
q-drawer(v-model="props.show" side="right" bordered :class="calcClass").right
	.q-mb-lg Console >
	#output


</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/stores/store'

const mystore = useStore()

const props = defineProps({
	show: Boolean,
})

const calcClass = computed(() => {
	if (mystore.os === 'linux') {
		return 'lin'
	}
	return 'win'
})
</script>

<style scoped lang="scss"></style>
