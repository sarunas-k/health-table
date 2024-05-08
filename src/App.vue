<script setup lang="ts">
import HealthCheckSummary from './components/HealthCheckSummary.vue';
import HealthTableLoader from './load';
import type { IUserStore } from './models/types/HealthTableTypes.mjs';
import { useTableStore } from './stores/tableStore';

// Initialize users data and load to store
new HealthTableLoader(useTableStore() as IUserStore | any).load('./health-db/db.csv');

</script>

<template>
	<main>
		<HealthCheckSummary />
	</main>
</template>

<style scoped></style>