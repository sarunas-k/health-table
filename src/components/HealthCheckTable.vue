<script setup lang="ts">
import HealthCheck from './HealthCheck.vue';
import InputCheckbox from './InputCheckbox.vue';
import InputButton from './InputButton.vue';
import User from '../models/User';
import { useTableStore } from '@/stores/tableStore';

const store = useTableStore();
</script>

<template>
	<table class="health-check-table">
		<thead>
			<th role="col">
				<InputCheckbox icon="minus" />
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
		<tbody>
			<HealthCheck v-for="(user, index) in useTableStore().getUsers()" :user="user" :key="index" />
		</tbody>
	</table>
</template>

<style>
thead {
    box-shadow: var(--table-shadow);
}
</style>