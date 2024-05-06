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
let atLeastOneChecked = computed(() => checkboxes.value.checks.includes(true));
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

function onChildCheck(isChecked: boolean) {
	if (atLeastOneChecked.value)
		checkboxes.value.parent = true;
	else
		checkboxes.value.parent = false;
}

let isClosed = ref(false);

function toggle(event: MouseEvent) {
	if (typeof event.target.localName !== 'undefined' && event.target.localName !== 'label' && event.target.localName !== 'input') {
		isClosed.value = !isClosed.value;
		const target = event.currentTarget.nextSibling;
		let height = !isClosed.value ? 0 : target.scrollHeight;
		let iteration = target.scrollHeight / 100;
		for (let i = 0; i < 100; i++) {
			setTimeout(() => {
				height = !isClosed.value ? height + iteration : height - iteration;
				target.style.height = Math.floor(height) + 'px';
			}, 100);
		}
	}
}

const userIdClass = computed(() => 'userid-' + props.user.id);
</script>

<template>
	<div class="row-head" :class="userIdClass" @click="toggle">
		<div role="row" class="col">
			<InputCheckbox
				:type="CheckboxType.Parent" :icon="allChecksChecked ? 'minus' : 'checkmark'"
				:user="user"
				@update:model-value="onParentCheck"
				v-model="checkboxes.parent"
			/>
		</div>
		<div class="col-2 col">
			<InputButton :icon="isClosed ? 'down' : 'up'" :callback="() => console.log('Clicked on user row')" />{{ user.firstName + ' ' + user.lastName + ' (' + validChecks + '/3)' }}
		</div>
		<div></div>
		<div></div>
		<div></div>
		<div class="col">
			{{ user.department }}
		</div>
		<div class="col">
			<StatusBadge :value="user.status" />
		</div>
		<div class="col">
			{{ user.jobTitle }}
		</div>
		<div class="col">
			<InputButton icon="more" :callback="() => console.log('More button clicked')" />
		</div>
	</div>
	<div class="checks">
		<div v-for="(check, index) in user.healthChecks" :key="index" :class="userIdClass" class="row">
			<div role="row" class="col">
				<InputCheckbox
					:type="CheckboxType.Child" :user="user"
					v-model="checkboxes.checks[index]"
					@update:model-value="onChildCheck"
				/>
			</div>
			<div class="col col-2">
				{{ check.title }}
			</div>
			<div class="col">
				{{ check.code }}
			</div>
			<div class="col">
				{{ check.dateTo }}
			</div>
			<div class="col">
				<StatusBadge :value="check.status" />
			</div>
			<div></div>
			<div></div>
			<div></div>
			<div class="col">
				<InputButton icon="more" :callback="() => console.log('More button click')" />
			</div>
		</div>
	</div>
</template>

<style scoped>
.hidden {
	position: relative;
	opacity: 0;
}
.row-head div[role=row] {
	z-index: 10;
}
.row-head, .row {
	display: grid;
	grid-template-columns: 1fr 5fr 1fr 2fr 2fr 3fr 2fr 2fr 1fr;
	grid-template-rows: subgrid;
}
.row-head .col, .row .col {
	display: flex;
    align-items: center;
}
.checks {
	overflow: clip;
}
</style>