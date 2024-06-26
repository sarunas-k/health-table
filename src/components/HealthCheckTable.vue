<script setup lang="ts">
import HealthCheckTableControls from './HealthCheckTableControls.vue';
import HealthCheck from './HealthCheck.vue';
import InputCheckbox from './InputCheckbox.vue';
import { CheckboxType } from '@/models/types/HealthTableTypes.mjs';
import InputButton from './InputButton.vue';
import { useTableStore } from '@/stores/tableStore';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
defineEmits(['table-refresh']);

const { allUsers, perPage, page, checkboxStates, isLoaded, error, isHeadChecked, allChecked } =
	storeToRefs(useTableStore());

const visibleEntries = computed(() => {
	if (page.value === 1) return allUsers.value.slice(0, perPage.value);

	return allUsers.value.slice((page.value - 1) * perPage.value, page.value * perPage.value);
});
function onHeaderCheck(value: boolean) {
	for (let i = 0; i < allUsers.value.length; i++)
		checkboxStates.value[allUsers.value[i].id] = {
			parent: value,
			checks: [value, value, value]
		};
}
</script>

<template>
	<div class="health-check-table table" :class="{ waiting: !isLoaded }">
		<div :class="{ hidden: isLoaded }">
			<h2>
				{{ error ? error : 'Loading your data...' }}
			</h2>
		</div>
		<header :class="{ waiting: !isLoaded }">
			<div role="col">
				<InputCheckbox
					class="checkbox-component"
					:type="CheckboxType.Main"
					:icon="allChecked ? 'checkmark' : 'minus'"
					v-model="isHeadChecked"
					@update:model-value="onHeaderCheck"
				/>
			</div>
			<div class="col-2" role="col">Vardas / Patikros</div>
			<div role="col">Kodas</div>
			<div role="col">Galiojimas</div>
			<div role="col">Būsena</div>
			<div role="col">Skyrius</div>
			<div role="col">Anketa</div>
			<div role="col">Pareigos</div>
			<div role="col">
				<InputButton
					class="button-component"
					icon="refresh"
					:callback="() => $emit('table-refresh')"
				/>
			</div>
		</header>
		<HealthCheck v-for="user in visibleEntries" :user="user as any" :key="user.id" />
		<HealthCheckTableControls
			:class="{ waiting: !isLoaded }"
			class="health-check-table-controls"
		/>
	</div>
</template>

<style lang="scss" scoped>
header {
	box-shadow: var(--table-shadow);
	display: grid;
	grid-template-columns: 1fr 5fr 1fr 2fr 2fr 3fr 2fr 2fr 1fr;
	grid-template-rows: subgrid;
	font-weight: var(--fw-bold);
}

.waiting::after {
	background-color: rgba(255, 255, 255, 0.5);
	position: absolute;
	content: ' ';
	width: 100%;
	height: 100%;
	pointer-events: unset;
}

.table {
	display: grid;
	grid-template-rows: auto repeat(25, auto auto);
	grid-template-columns: 1fr;
}

div[role='col'] {
	display: flex;
	align-items: center;
	border-right: 1px solid #e6e6e6;
	padding-left: 0.5rem;

	&:first-child {
		padding-left: 0.8rem;
	}

	&:last-child {
		border-right: 0;
	}
}

h2 {
	text-align: center;
	color: #9c9c9c;
}

.hidden {
	display: none;
}
</style>
