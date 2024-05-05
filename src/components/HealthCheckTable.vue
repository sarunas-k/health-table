<script setup lang="ts">
import HealthCheck from './HealthCheck.vue';
import InputCheckbox from './InputCheckbox.vue';
import { CheckboxType } from '@/models/types/HealthTableTypes.mjs';
import InputButton from './InputButton.vue';
import { useTableStore } from '@/stores/tableStore';

const store = useTableStore();
const users = store.getUsers();

function onHeaderCheck(value: boolean) {
	store.isHeadChecked = value;
}
</script>

<template>
	<table class="health-check-table">
		<thead>
			<th role="col">
				<InputCheckbox :type="CheckboxType.Main" icon="minus" @update:model-value="onHeaderCheck" />
			</th>
			<th class="col-2" role="col">
				Full name / Health check
			</th>
			<th role="col">
				Code
			</th>
			<th role="col">
				Expiration
			</th>
			<th role="col">
				Status
			</th>
			<th role="col">
				Department
			</th>
			<th role="col">
				User status
			</th>
			<th role="col">
				Job title
			</th>
			<th role="col">
				<InputButton icon="refresh" :callback="() => console.log('Refresh clicked')" />
			</th>
		</thead>
		<tbody v-if="users.length">
			<HealthCheck v-for="(user, index) in users" :user="user" :key="index" />
		</tbody>
	</table>
</template>

<style>
thead {
    box-shadow: var(--table-shadow);
}
</style>