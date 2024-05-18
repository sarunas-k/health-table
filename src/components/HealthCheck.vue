<script setup lang="ts">
import InputCheckbox from './InputCheckbox.vue';
import InputButton from './InputButton.vue';
import StatusBadge from './StatusBadge.vue';
import { CheckboxType, HealthCheckStatus, type IUser } from '@/models/types/HealthTableTypes.mjs';
import { type PropType, computed, ref } from 'vue';
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

const allChecked = computed(() => !store.checkboxStates[props.user.id].checks.includes(false));
const atLeastOneChecked = computed(() => store.checkboxStates[props.user.id].checks.includes(true));
const validChecks = computed(() => props.user.healthChecks.filter((check) => check.status === HealthCheckStatus.Active).length);
const userIdClass = computed(() => 'userid-' + props.user.id);

// If parent checkbox is checked, check all checkboxes
function onParentCheck(isChecked: boolean) {
	if (store.checkboxStates)
		store.checkboxStates[props.user.id] = {
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
	store.checkboxStates[props.user.id].parent = atLeastOneChecked.value;
	store.updateHeadCheckbox();
}

let isClosed = ref(true);

function toggle(event: MouseEvent) {
	const target: HTMLElement = event.target as HTMLElement;
	if (target === null)
		return;
	if (typeof target.localName !== 'undefined' && target.tagName !== 'label' && target.tagName !== 'input' && target.className !== 'more')
		isClosed.value = !isClosed.value;
}

</script>

<template>
	<div class="row-head" :class="userIdClass" @click="toggle">
		<div role="row" class="col">
			<InputCheckbox
				class="checkbox-component"
				:type="CheckboxType.Parent" :icon="allChecked ? 'checkmark' : 'minus'"
				:user="user"
				@update:model-value="onParentCheck" v-model="store.checkboxStates[user.id].parent"
			/>
		</div>
		<div class="col-2 col">
			<InputButton class="button-component" :icon="isClosed ? 'down' : 'up'" />{{
				user.firstName + ' ' + user.lastName + ' (' + validChecks + '/3)' }}
		</div>
		<div></div>
		<div></div>
		<div></div>
		<div class="col">
			{{ user.department }}
		</div>
		<div class="col">
			<StatusBadge class="status-badge" :value="user.status" />
		</div>
		<div class="col">
			{{ user.jobTitle }}
		</div>
		<div class="col">
			<InputButton class="button-component more" icon="more" />
		</div>
	</div>
	<div class="checks" :class="[userIdClass, { opened: !isClosed }]">
		<div v-for="(check, index) in user.healthChecks" :key="index" :class="userIdClass" class="row">
			<div role="row" class="col">
				<InputCheckbox
					class="checkbox-component"
					:type="CheckboxType.Child"
					v-model="store.checkboxStates[user.id].checks[index]"
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
				<StatusBadge class="status-badge" :value="check.status" />
			</div>
			<div></div>
			<div></div>
			<div></div>
			<div class="col">
				<InputButton class="button-component more" icon="more" />
			</div>
		</div>
	</div>
</template>

<style scoped>
.opened {
	height: 133px !important;
}
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
	transition: height 0.3s ease-in;
}
</style>