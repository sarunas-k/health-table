<script setup lang="ts">
import InputCheckbox from './InputCheckbox.vue';
import InputButton from './InputButton.vue';
import StatusBadge from './StatusBadge.vue';
import { CheckboxType, HealthCheckStatus, type IRecordCheckboxes, type IUser } from '@/models/types/HealthTableTypes.mjs';
import { type PropType, type Ref, computed, ref } from 'vue';
import { useTableStore } from '@/stores/tableStore';

// Props
const props = defineProps({
	user: {
		type: Object as PropType<IUser>,
		required: true
	}
});

// Store
const store = useTableStore();
const checkboxStates: Ref<Array<IRecordCheckboxes>> = ref(store.checkboxStates);

const allChecked = computed(() => !checkboxStates.value[props.user.id].checks.includes(false));
const atLeastOneChecked = computed(() => checkboxStates.value[props.user.id].checks.includes(true));
const validChecks = computed(() => props.user.healthChecks.filter((check) => check.status === HealthCheckStatus.Active).length);
const userIdClass = computed(() => 'userid-' + props.user.id);

// If parent checkbox is checked, check all checkboxes
function onParentCheck(isChecked: boolean) {
	if (checkboxStates.value)
		checkboxStates.value[props.user.id] = {
			parent: isChecked,
			checks: [
				isChecked,
				isChecked,
				isChecked]
		}
		store.updateHeadCheckbox();
}

// 1. If one of child checkboxes is clicked, then check parent's
// checkbox, if at least one child checkbox is checked.
//
// 2. Same for main table header checkbox
function onChildCheck() {
	checkboxStates.value[props.user.id].parent = atLeastOneChecked.value;
	store.updateHeadCheckbox();
}

let isClosed = ref(true);

function toggle(event: MouseEvent) {
	const target: HTMLElement = event.target as HTMLElement;
	if (target === null)
		return;
	if (typeof target.localName !== 'undefined' && target.localName !== 'label' && target.localName !== 'input') {
		isClosed.value = !isClosed.value;
		const currentTarget = event.currentTarget as HTMLElement;
		const rows = currentTarget.nextSibling as HTMLElement;
		let height = !isClosed.value ? 0 : rows.scrollHeight;
		let iteration = rows.scrollHeight / 100;
		for (let i = 0; i < 100; i++) {
			setTimeout(() => {
				height = !isClosed.value ? height + iteration : height - iteration;
				rows.style.height = Math.floor(height) + 'px';
			}, 100);
		}
	}
}

</script>

<template>
	<div class="row-head" :class="userIdClass" @click="toggle">
		<div role="row" class="col">
			<InputCheckbox
				:type="CheckboxType.Parent" :icon="allChecked ? 'checkmark' : 'minus'"
				:user="user"
				@update:model-value="onParentCheck" v-model="checkboxStates[user.id].parent"
			/>
		</div>
		<div class="col-2 col">
			<InputButton :icon="isClosed ? 'down' : 'up'" :callback="() => console.log('Clicked on user row')" />{{
				user.firstName + ' ' + user.lastName + ' (' + validChecks + '/3)' }}
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
					v-model="checkboxStates[user.id].checks[index]"
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

.row-head,
.row {
	display: grid;
	grid-template-columns: 1fr 5fr 1fr 2fr 2fr 3fr 2fr 2fr 1fr;
	grid-template-rows: subgrid;
}

.row-head .col,
.row .col {
	display: flex;
	align-items: center;
}

.checks {
	overflow: clip;
	height: 0;
}
</style>