<script setup lang="ts">

import { UserStatus, HealthCheckStatus, BadgeType } from '@/models/types/HealthTableTypes.mjs';
import { computed } from 'vue';
const props = defineProps({
    badge: {
		type: String,
		required: true
	},
	value: {
		type: String,
		required: true
	}
});

</script>

<template>
	<span :class="props.value">{{ props.value }}</span>
</template>

<style scoped lang="scss">

span {
	font-size: var(--fs-badge);
	border-radius: 5px;
	padding: 0 1rem;

	&.active,
	&.valid {
		background-color: var(--color-badge-valid);
	}
	&.inactive,
	&.expired {
		background-color: var(--color-badge-expired);
	}
	&.cancelled {
		background-color: var(--color-badge-canceled);
	}
}
</style>