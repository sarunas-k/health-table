<script setup lang="ts">
import { useTableStore } from '@/stores/tableStore';
import InputButton from './InputButton.vue'
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { tblLoader } from '@/App.vue';
import { type IHealthTableLoader } from '@/models/types/HealthTableTypes.mjs';

const { perPage, page, length, fetchedRows } = storeToRefs(useTableStore());
const pages = computed(() => length.value > perPage.value ? Math.ceil(length.value / perPage.value) : 1);
const jumpToInput = ref('');
function setPage() {
	const pageFromInput = parseInt(jumpToInput.value);
	if (Number.isInteger(pageFromInput) && pageFromInput >= 1 && pageFromInput <= pages.value) {
		const needsToShow = pageFromInput * perPage.value;
		if (fetchedRows.value < needsToShow)
			fetchEmpty(needsToShow);
		page.value = pageFromInput;
	}
	else
		jumpToInput.value = '';
}

function onClickShow(val: number) {
	if (val === 50 && length.value <= 25)
		return;
	if (val === 100 && length.value <= 50)
		return;
	perPage.value = val;
	page.value = 1;
	if (fetchedRows.value < val)
		fetchEmpty(val);
}

async function fetchEmpty(needsToShow: number) {
	if (needsToShow)
	try {
		await (tblLoader.value as IHealthTableLoader).load(fetchedRows.value, needsToShow - fetchedRows.value);
	} catch(error) {
		console.log('Error fetching rows:', error);
	}
}

function previousPage() {
	if (page.value > 1)
		page.value--;
}

function nextPage() {
	if (page.value < pages.value) {
		const needsToShow = (page.value + 1) * perPage.value;
		if (fetchedRows.value < needsToShow)
			fetchEmpty(needsToShow);

		page.value ++;
	}
}

</script>

<template>
	<div>
		<div class="controls-box">
			<div class="totals">
				<strong>Eilučių: </strong>{{ length }}
			</div>
			<div class="pages">
				<strong>Puslapis {{ page }} / {{ pages }}</strong>
				<InputButton
					class="button-component" icon="previous"
					:class="{ 'inactive': page < 2 }"
					:callback="() => previousPage()"
				/>
				<InputButton
					class="button-component" icon="next"
					:class="{ 'inactive': page === pages }"
					:callback="() => nextPage()"
				/>
			</div>
			<div class="jump-to">
				<strong>Eiti prie:</strong>
				<input type="text" v-model="jumpToInput" class="page-number-input" />
				<InputButton
					class="button-component" icon="corner"
					:callback="() => setPage()"
					:class="{ 'inactive': pages === 1 }"
				/>
			</div>
			<div class="page-entries-control">
				<span><strong>Rodoma:</strong></span>
				<button class="page-entries-btn" :class="{ 'active': perPage === 25 }" @click="onClickShow(25)">
					25
				</button>
				<button
					class="page-entries-btn" :class="{ 'active': perPage === 50, 'inactive': length <= 25 }"
					@click="onClickShow(50)"
				>
					50
				</button>
				<button
					class="page-entries-btn" :class="{ 'active': perPage === 100, 'inactive': length <= 50 }"
					@click="onClickShow(100)"
				>
					100
				</button>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.inactive {
	opacity: 0.5;
	pointer-events: none;
}

.health-check-table-controls {
	position: sticky;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 110;
	background-color: white;
	display: flex;
	font-size: 0.8rem;
	padding-top: 1rem;

	.controls-box {
		flex-grow: 1;
		padding: 0.5rem 0.8rem;
		border-top: 1px solid #e6e6e6;
		display: flex;
		align-items: center;

		.totals {
			padding-right: 1rem;
		}

		.page-entries-control {
			flex-grow: 1;
			text-align: right;

			span {
				margin-right: 0.5rem;
			}

			.page-entries-btn {
				width: 40px;
				height: 40px;
				border: 0;
				background: none;

				&.active {
					background-color: var(--color-primary-green);
					font-weight: var(--fw-bold);
					border-radius: 5px;
				}
			}
		}

		.pages {
			flex-grow: 1;
			text-align: center;
			border-right: 1px solid #e6e6e6;
			border-left: 1px solid #e6e6e6;

			strong {
				margin-right: 2rem;
			}
		}

		.jump-to {
			border-right: 1px solid #e6e6e6;
			padding: 0 1rem;

			strong {
				margin-right: 0.5rem;
			}

			input {
				width: 3rem;
				line-height: 2;
			}
		}
	}
}
</style>