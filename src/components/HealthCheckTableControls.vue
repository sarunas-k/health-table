<script setup lang="ts">
import { useTableStore } from '@/stores/tableStore';
import InputButton from './InputButton.vue'
import { computed } from 'vue';

const store = useTableStore();
const pages = computed(() => Math.ceil(store.allUsers.length / store.perPage));

</script>

<template>
	<div class="health-check-table-controls">
		<div class="left-column">
			<div class="totals">
				<strong>Total: </strong>{{ store.allUsers.length }}
			</div>
			<div class="pages">
				<strong>Page {{ store.page }} / {{ pages }}</strong>
				<InputButton icon="previous" :callback="() => store.page > 1 ? store.page-- : null" />
				<InputButton icon="next" :callback="() => store.page < pages ? store.page++ : null" />
			</div>
			<div class="jump-to">
				<strong>Jump to:</strong>
				<input type="text" class="page-number-input" />
				<InputButton icon="corner" :callback="() => console.log('Jump to')" />
			</div>
		</div>
		<div class="right-column">
			<div class="page-entries-control">
				<span><strong>Show:</strong></span>
				<button class="page-entries-btn active">
					25
				</button>
				<button class="page-entries-btn">
					50
				</button>
				<button class="page-entries-btn">
					100
				</button>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
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

	.totals {
		padding-right: 1rem;
	}

	.left-column,
	.right-column {
		flex-grow: 1;
		padding: 0.5rem 0.8rem;
		border-top: 1px solid #e6e6e6;
	}

	.left-column {
		display: flex;
		align-items: center;
	}

	.right-column {
		text-align: right;

		.page-entries-control {
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
</style>