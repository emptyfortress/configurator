<template lang="pug">
q-page(padding :class="calcClass")
	p Заполните формы или оставьте значения по умолчанию.
	.grid
		.service(v-for="(item, index) in mystore.items" :key="item.id")
			.zag
				|{{ item.label}}
				transition(name="slide-right" )
					q-btn(dense round flat icon="mdi-autorenew"
						@click="reset(item, index)"
						v-if="showRefresh(index)")
						q-tooltip Вернуть умолчания
			.form
				.label Порт:
				q-input(v-model="item.port" type="number" dense color="accent").port
			br
			q-expansion-item(dense
				label="Дополнительные настройки")
				q-card-section
					q-input(v-model="item.log" type="text" label="Хранилище логов" color="accent" clearable)

	q-card-actions(align="center").service.item
		transition(name="slide-botton")
			q-btn(color="accent" flat label="Сбросить изменения" @click="resetAll" :disable="!showApply")
				q-tooltip Вернуть значения по умолчанию
		q-btn(color="accent" unelevated label="Применить")

</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useStore } from '@/stores/store'
import { useQuasar } from 'quasar'
import type { Ref } from 'vue'
import { servertypes } from '@/stores/data'

const mystore = useStore()
const $q = useQuasar()

const user = ref([false, false, false])
const pass: Ref<Boolean[]> = ref([false, false, false])
const loading = ref([false, false, false])
const connection = ref([false, false, false])
const authentifications = ref(['SQL Server', 'Windows'])

const calcClass = computed(() => {
	if (mystore.os === 'linux') {
		return 'lin'
	}
	return 'win'
})

const simulateProgress = (e: number) => {
	loading.value[e] = true
	const output = document.querySelector('#output')
	setTimeout(() => {
		loading.value[e] = false
		connection.value[e] = true
		if (e < 2) {
			$q.notify({
				icon: 'mdi-check-bold',
				message: 'Сервер в порядке',
				color: 'positive',
			})
		} else {
			$q.notify({
				message: 'Сервер не отвечает',
				color: 'negative',
			})
			mystore.rightDrawer = true
			output!.innerHTML = new Date() + '<br />' + 'Some error messages'
		}
	}, 2000)
}
const calcType = (e: number) => {
	if (pass.value[e] === false) {
		return 'password'
	} else return 'text'
}

const reset = (e: any, i: number) => {
	Object.assign(e, mystore.defaultItems[i])
}

const resetAll = () => {
	mystore.items.forEach((_, index) => {
		Object.assign(mystore.items[index], mystore.defaultItems[index])
	})
	mystore.toggleRightDr()
	connection.value = [false, false, false]
}

const showRefresh = (e: number) => {
	if (JSON.stringify(mystore.items[e]) === JSON.stringify(mystore.defaultItems[e])) {
		return false
	} else return true
}
const showApply = computed(() => {
	let temp: Boolean[] = []
	mystore.items.forEach((_, index) => temp.push(showRefresh(index)))
	return temp.some((item) => item === true)
})
</script>

<style scoped lang="scss">
.service {
	padding: 1rem;
	background: var(--bg-main);
	box-shadow: 4px 4px 9px rgba(0, 0, 0, 0.2), -4px -4px 4px rgba(255, 255, 255, 1);
	border-radius: 4px;
	align-self: start;
}
.grid {
	margin-top: 2rem;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 2rem;
	font-size: 0.9rem;
}
.zag {
	font-size: 1.1rem;
	margin-bottom: 1rem;
	height: 32px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.label {
	font-size: 0.9rem;
	width: 100px;
}
.form {
	display: grid;
	grid-template-columns: auto 1fr;
	gap: 1rem;
	> div {
		align-self: center;
		white-space: no-wrap;
	}
	.ful {
		grid-column: 1/-1;
		font-size: 1.1rem;
		&.small {
			font-size: 0.9rem;
		}
	}
}
.check {
	grid-column: 1/-1;
	margin-top: 1rem;
}
.item {
	width: 800px;
	margin: 0 auto;
	margin-top: 2rem;
	.q-card {
		background: transparent;
	}
}
.log {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 1rem;
	.q-input {
		width: 60%;
	}
}
p {
	font-size: 1rem;
}
.win {
	background: img('@/assets/img/linux.svg');
}
</style>
