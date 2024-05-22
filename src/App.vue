<script setup lang="ts">
import HealthCheckSummary from './components/HealthCheckSummary.vue';
import { type Ref, ref } from 'vue';
import type { IHealthTableLoader } from './models/types/HealthTableTypes.mjs';
import HealthTableLoader from './load';

</script>

<template>
	<main>
		<HealthCheckSummary />
	</main>
</template>

<style scoped></style>
<script lang="ts">
export const tblLoader: Ref<IHealthTableLoader|any> = ref({});
</script>
