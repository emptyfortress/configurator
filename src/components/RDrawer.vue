<template lang="pug">
q-drawer(v-model="show" side="right" ).right
	p hello


</template>

<script setup lang="ts">
// import { ref, reactive, watch } from 'vue'

const props = defineProps({
	show: Boolean,
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/theme.scss';

.right {
	background: #ccc;
}
</style>
