<script setup lang="ts">
import InputCheckbox from './InputCheckbox.vue';
import InputButton from './InputButton.vue';
import User from '../models/User';
import StatusBadge from './StatusBadge.vue';

defineProps({
	user: {
		type: User,
		required: true
	}
});
</script>

<template>
	<tr class="row-head">
		<th role="row">
			<InputCheckbox />
		</th>
		<td class="col-2">
			{{ user.firstName + ' ' + user.lastName }}
		</td>
		<td></td>
		<td></td>
		<td></td>
		<td>{{ user.department }}</td>
		<td>
			<StatusBadge badge="users" :value="user.status" />
		</td>
		<td>{{ user.jobTitle }}</td>
		<td>
			<InputButton icon="more" :callback="() => console.log('More button clicked')" />
		</td>
	</tr>
	<tr v-for="(check, index) in user.healthChecks" :key="index">
		<th role="row">
			<InputCheckbox />
		</th>
		<td class="col-2">
			{{ check.title }}
		</td>
		<td>{{ check.code }}</td>
		<td>{{ check.dateFrom }}</td>
		<td><StatusBadge badge="check" :value="check.status" /></td>
		<td></td>
		<td></td>
		<td></td>
		<td><InputButton icon="more" :callback="() => console.log('More button click')" /></td>
	</tr>
</template>

<style scoped>
tr.row-head {
	background-color: var(--color-secondary-green);
}
</style>