<script setup lang="ts">
import InputCheckbox from './InputCheckbox.vue';
import InputButton from './InputButton.vue';
import StatusBadge from './StatusBadge.vue';
import User from '@/models/User';
import { CheckboxType, HealthCheckStatus } from '@/models/types/HealthTableTypes.mjs';
import { computed, ref } from 'vue';
import { useTableStore } from '@/stores/tableStore';
const props = defineProps({
	user: {
		type: User,
		required: true
	}
});
const store = useTableStore();
const checkboxes = ref({ parent: false, checks: [ false, false, false] });

// True, if user's every health check is checked
let allChecksChecked = computed(() => !checkboxes.value.checks.includes(false));

const validChecks = computed(() => props.user.healthChecks.filter((check) => check.status === HealthCheckStatus.Active).length);

// Change all checkboxes of that user after clicking on checkbox
function onParentCheck(isParentChecked: boolean) {
	if (store.isHeadChecked)
		return;
	checkboxes.value = {
		parent: isParentChecked,
		checks: [
			isParentChecked,
			isParentChecked,
			isParentChecked]
	}
}

let isClosed = ref(false);

function toggle(event: MouseEvent) {
	isClosed.value = !isClosed.value;
	const target = event.currentTarget;
	console.log(isClosed);
	//const id = target.getAttribute('id');
}

const userIdClass = computed(() => 'userid-' + props.user.id);
</script>

<template>
	<tr class="row-head" :class="userIdClass" @click="toggle">
		<th role="row">
			<InputCheckbox
				:type="CheckboxType.Parent" :icon="allChecksChecked ? 'minus' : 'checkmark'"
				:user="user"
				v-model:checked="checkboxes.parent"
				@update:model-value="onParentCheck"
			/>
		</th>
		<td class="col-2">
			{{ user.firstName + ' ' + user.lastName + ' (' + validChecks + '/3)' }}
		</td>
		<td></td>
		<td></td>
		<td></td>
		<td>{{ user.department }}</td>
		<td>
			<StatusBadge :value="user.status" />
		</td>
		<td>{{ user.jobTitle }}</td>
		<td>
			<InputButton icon="more" :callback="() => console.log('More button clicked')" />
		</td>
	</tr>
	<tr v-for="(check, index) in user.healthChecks" :key="index" :class="{ 'hidden': isClosed }">
		<th role="row">
			<InputCheckbox
				:type="CheckboxType.Child" :user="user"
				v-model="checkboxes.checks[index]"
			/>
		</th>
		<td class="col-2">
			{{ check.title }}
		</td>
		<td>{{ check.code }}</td>
		<td>{{ check.dateTo }}</td>
		<td>
			<StatusBadge :value="check.status" />
		</td>
		<td></td>
		<td></td>
		<td></td>
		<td>
			<InputButton icon="more" :callback="() => console.log('More button click')" />
		</td>
	</tr>
</template>

<style scoped>
tr.row-head {
	background-color: var(--color-secondary-green);
}
.hidden {
	display: none;
}
</style>