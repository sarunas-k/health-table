<script setup lang="ts">

const props = defineProps({
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
	color: var(--color-badge-text);
	font-weight: var(--fw-bold);
	border-radius: 0.5rem;
	padding: 0 0.8rem;

	&.active,
	&.aktyvi,
	&.galioja,
	&.valid {
		background-color: var(--color-badge-valid);
	}
	&.inactive,
	&.baigėsi,
	&.neaktyvi,
	&.expired {
		background-color: var(--color-badge-expired);
	}
	&.negalioja,
	&.cancelled {
		background-color: var(--color-badge-canceled);
	}
}
</style>