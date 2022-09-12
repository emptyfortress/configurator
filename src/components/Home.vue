<template lang="pug">
.cent
	q-img(src="@/assets/img/bg.png" width="300px" height="300px").q-mt-xl
	h6 Выберите тип настройки:
	q-card-actions
		q-btn(color="accent" to="/start" icon="mdi-tools" label="Первичная настройка")
		q-btn(color="accent" to="/refresh" icon="mdi-reload" label="Обновление настроек")

</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.cent {
	width: 500px;
	margin: 0 auto;
	img {
		display: block;
		margin: 0 auto;
	}
}
.grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;
}
</style>
