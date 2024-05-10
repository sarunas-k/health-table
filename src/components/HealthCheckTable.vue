<script setup lang="ts">
import HealthCheck from './HealthCheck.vue';
import InputCheckbox from './InputCheckbox.vue';
import { CheckboxType, type IUser } from '@/models/types/HealthTableTypes.mjs';
import InputButton from './InputButton.vue';
import { useTableStore } from '@/stores/tableStore';
import { ref } from 'vue';

const store = useTableStore();
const users = ref(store.allUsers);
const checkboxStates = ref(store.checkboxStates);

let page = 0; // Starting from 0
let pageEntries = 25;

function onHeaderCheck(value: boolean) {
	for (let i = 0; i < users.value.length; i++)
		checkboxStates.value[users.value[i].id] = { parent: value, checks: [ value, value, value ] };
}
</script>

<template>
	<div class="health-check-table table">
		<header>
			<div role="col">
				<InputCheckbox :type="CheckboxType.Main" :icon="store && store.allChecked ? 'checkmark' : 'minus'" v-model="store.isHeadChecked" @update:model-value="onHeaderCheck" />
			</div>
			<div class="col-2" role="col">
				Full name / Health check
			</div>
			<div role="col">
				Code
			</div>
			<div role="col">
				Expiration
			</div>
			<div role="col">
				Status
			</div>
			<div role="col">
				Department
			</div>
			<div role="col">
				User status
			</div>
			<div role="col">
				Job title
			</div>
			<div role="col">
				<InputButton icon="refresh" :callback="() => console.log('Refresh clicked')" />
			</div>
		</header>
		<HealthCheck v-for="(user, index) in users.slice(page * pageEntries, pageEntries)" :user="user as any" :key="index" />
	</div>
</template>

<style>
header {
    box-shadow: var(--table-shadow);
	display: grid;
	grid-template-columns: 1fr 5fr 1fr 2fr 2fr 3fr 2fr 2fr 1fr;
	grid-template-rows: subgrid;
	font-weight: var(--fw-bold);
}
.table {
	display: grid;
	grid-template-rows: auto repeat(25, auto auto);
	grid-template-columns: 1fr;
}
div[role=col] {
	display: flex;
	align-items: center;
}
</style>