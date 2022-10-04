<template lang="pug">
.grid
	.service(v-for="item in mystore.items" :key="item.id")
		.zag
			|{{ item.label}}
		.form
			.label Порт:
			q-input(v-model="item.port" type="number" dense color="accent").port
		br
		q-expansion-item(dense label="Дополнительно")
			q-card-section.q-pt-none
				q-input(v-if="mystore.os === 'windows'" v-model="item.log" type="text" label="Хранилище логов" color="accent" autogrow)
				q-input(v-else v-model="item.loglinux" type="text" autogrow label="Хранилище логов" color="accent" )

Database
.service.item
	q-card-actions(align="center")
		q-btn(color="accent" flat label="Значения по умолчанию" @click="resetAll" icon="mdi-restore")
		q-btn(color="accent" unelevated label="Применить" @click="apply")
	template(v-if="applying")
		h4 fuck
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { useQuasar } from 'quasar'
import Database from '@/components/Database.vue'
import { useStore } from '@/stores/store'

const mystore = useStore()
const applying = ref(false)
const $q = useQuasar()

const resetAll = () => {
	mystore.$reset()
	// mystore.toggleRightDr()
}

let timer: any

onBeforeUnmount(() => {
	if (timer !== void 0) {
		clearTimeout(timer)
		$q.loading.hide()
	}
})
const apply = () => {
	// applying.value = true
	$q.loading.show({
		message:
			'<h6 style="text-align: center;">Пожалуйста, подождите.<br />Применяем настройки...</h6>',
	})

	// hiding in 2s
	timer = setTimeout(() => {
		$q.loading.hide()
		timer = void 0
	}, 2000)
}
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.grid {
	max-width: 1200px;
	margin: 0 auto;
	// margin-top: 1rem;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 2rem;
	font-size: 0.9rem;
}
.item {
	width: 600px;
	margin: 0 auto;
	margin-top: 2rem;
	.q-card {
		background: transparent;
	}
	&.pad {
		padding: 1rem 2rem;
	}
}
</style>
