<template lang="pug">
.grid
	.service(v-for="item in mystore.settings.topBlocks" :key="item.id")
		.zag
			|{{ item.label}}
		.form
			.label Порт:
			q-input(v-model="item.port" type="number" dense color="accent").port
		br
		q-expansion-item(dense label="Дополнительно")
			q-card-section.q-pt-none
				q-input(v-if="mystore.settings.os === 'windows'" v-model="item.log" type="text" label="Хранилище логов" color="accent" autogrow)
				q-input(v-else v-model="item.loglinux" type="text" autogrow label="Хранилище логов" color="accent" )

Database
.service.item
	q-card-actions(align="center")
		q-btn(color="accent" flat label="Значения по умолчанию" @click="resetAll" icon="mdi-restore")
		q-btn(color="accent" unelevated :disable="fill" label="Применить" @click="apply")

ValidDialog(v-model="valid")
InvalidDialog(v-model="invalid")

</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'
import { useQuasar } from 'quasar'
import Database from '@/components/Database.vue'
import ValidDialog from '@/components/ValidDialog.vue'
import InvalidDialog from '@/components/InvalidDialog.vue'

import { useStore } from '@/stores/store'

const mystore = useStore()
const valid = ref(false)
const invalid = ref(false)
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

const fill = computed(() => {
	if (
		mystore.settings.database.server.length > 2 &&
		mystore.settings.database.name.length > 2 &&
		mystore.settings.database.login.length > 1 &&
		mystore.settings.database.password.length > 2
	) {
		return false
	} else return true
})

const apply = () => {
	$q.loading.show({
		message:
			'<h6 style="text-align: center;">Пожалуйста, подождите.<br />Применяем настройки...</h6>',
	})

	timer = setTimeout(() => {
		$q.loading.hide()
		if (
			mystore.settings.database.server === 'VEGA\\MSSQL2017' &&
			mystore.settings.database.name === 'Test' &&
			mystore.settings.database.login === 'kmg01' &&
			mystore.settings.database.password === 'kmg001'
		) {
			valid.value = true
		} else invalid.value = true
		timer = void 0
	}, 3000)
}
const open = () => {
	const output = document.querySelector('#output')
	mystore.toggleRightDr()
	output!.innerHTML = new Date() + '<br />' + 'Some error messages here'
}
const saveJson = () => {
	let file = mystore.settings
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
	font-size: 1rem;
	.q-card {
		background: transparent;
	}
	&.pad {
		padding: 1rem 2rem;
	}
}
.nounder {
	text-decoration: none;
}
</style>
