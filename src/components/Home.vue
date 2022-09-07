<template lang="pug">
.cent
	q-img(src="@/assets/img/bg.png" width="300px" height="300px").q-mt-xl
	h5 Выберите тип настройки:
	q-btn(color="accent" to="/start").q-mr-md
		q-icon(name="mdi-tools").q-mr-sm
		|Первичная настройка
	q-btn(color="accent" to="/refresh")
		q-icon(name="mdi-reload").q-mr-sm
		|Обновление настроек


//- .share
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';

.cent {
	width: 500px;
	margin: 0 auto;
	// background: #ccc;
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
