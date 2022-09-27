<template lang="pug">
q-drawer(v-model="mystore.rightDrawer" side="right" bordered).right
	.q-mb-lg Console >
	#output


</template>

<script setup lang="ts">
import { useStore } from '@/stores/store'

const mystore = useStore()
</script>

<style scoped lang="scss"></style>
