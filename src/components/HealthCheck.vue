<script setup lang="ts">
import InputCheckbox from './InputCheckbox.vue';
import User from '../models/User';
import StatusBadge from './StatusBadge.vue';

const props = defineProps({
	user: {
		type: User,
		required: true
	}
});
</script>

<template>
	<tr>
		<th role="row">
			<InputCheckbox />
		</th>
		<td>{{ user.firstName + ' ' + user.lastName }}</td>
		<td></td>
		<td></td>
		<td></td>
		<td>{{ user.department }}</td>
		<td>
			<StatusBadge
				badge="users"
				:value="user.status"
			/>
		</td>
	</tr>
</template>

<style scoped>

</style>
