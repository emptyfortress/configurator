<template lang="pug">
.cent
	q-img(src="@/assets/img/bg.png" width="300px" height="300px").q-mt-xl
	.row.items-center.q-mt-lg
		q-checkbox(v-model="mystore.agree" color="accent")
		q-label Я согласен с <a href="#" @click.prevent="showLic">лицензионным соглашением</a> docsvision.
	.head Ваша система:
	.q-gutter-sm
		q-radio(color="accent" v-model="mystore.os" val="windows" label="Windows")
		q-radio(color="accent" v-model="mystore.os" val="linux" label="Linux (в том числе, через docker)")

	.head Выберите тип настройки:
	q-card-actions
		q-btn(color="accent" to="/start" icon="mdi-tools" label="Первичная настройка" :disable="!mystore.agree")
		q-btn(color="accent" to="/refresh" icon="mdi-reload" label="Обновление настроек" :disable="!mystore.agree")

	q-dialog(v-model="lic")
		q-card.lic
			q-card-section.row.justify-between.items-center
				.text-h6
					img(src="@/assets/img/license.svg").license
					|Лицензионное соглашение с конечным пользователем
				q-btn(flat round icon="mdi-close" v-close-popup)
			q-separator
			License
</template>

<script setup lang="ts">
import { ref } from 'vue'
import License from '@/components/License.vue'
import { useStore } from '@/stores/store'

const mystore = useStore()

const lic = ref(false)

const showLic = () => {
	lic.value = !lic.value
}
</script>

<style scoped lang="scss">
.head {
	font-size: 1.1rem;
	font-weight: 600;
	margin-top: 1.5rem;
	margin-left: 0.5rem;
}
.license {
	width: 42px;
	vertical-align: middle;
	margin-right: 1rem;
}
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
.lic {
	min-width: 900px;
}
</style>
