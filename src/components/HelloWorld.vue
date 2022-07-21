<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template lang="pug">
h1 {{ msg }}
div(class="card")
	button(type="button" @click="count++") count is {{ count }}

br
q-btn(unelevated color="primary") lakjsdl
</template>

<style scoped>
.read-the-docs {
	color: #888;
}
</style>
