<script setup lang="ts">
import { onMounted } from 'vue';
import HealthCheckSummary from './components/HealthCheckSummary.vue';
import Loader from './load'
import { useTableStore } from './stores/tableStore';

</script>

<template>
	<main>
		<HealthCheckSummary />
	</main>
</template>

<style scoped></style>