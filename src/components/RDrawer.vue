<template lang="pug">
q-drawer(v-model="props.show" side="right" bordered ).right
	.q-mb-lg Console >
	#output


</template>

<script setup lang="ts">
const props = defineProps({
	show: Boolean,
})
</script>

<style scoped lang="scss"></style>
