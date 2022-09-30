<template lang="pug">
q-page(padding)
	p Заполните форму или оставьте значения по умолчанию.
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
	q-card-actions(align="center").service.item
		q-btn(color="accent" flat label="Значения по умолчанию" @click="resetAll" icon="mdi-restore")
		q-btn(color="accent" unelevated label="Применить")

</template>

<script setup lang="ts">
import { useStore } from '@/stores/store'
import Database from '@/components/Database.vue'

const mystore = useStore()

const resetAll = () => {
	mystore.$reset()
	// mystore.toggleRightDr()
}
</script>

<style scoped lang="scss">
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
