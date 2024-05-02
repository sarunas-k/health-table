<script setup lang="ts">
import HealthCheck from './HealthCheck.vue';
import InputCheckbox from './InputCheckbox.vue';
import InputButton from './InputButton.vue';
import User from '../models/User';

const usersEntries = [
    `{
      "status": "0",
      "first-name": "Vytautas",
      "last-name": "Urbonas",
      "job-title": "Direktorius",
      "department": "Logistika",
      "health-checks": [
        {
          "code": "0000",
          "issue-date": "2022-02-09T13:13:09.218Z",
          "status": "1"
        },
        {
          "code": "0001",
          "issue-date": "2023-03-22T13:06:31.972Z",
          "status": "1"
        },
        {
          "code": "0002",
          "issue-date": "2022-12-21T01:26:58.674Z",
          "status": "0"
        }
      ]
    }`,
    `{
      "status": "0",
      "first-name": "Vytautas",
      "last-name": "Urbonas",
      "job-title": "Direktorius",
      "department": "Logistika",
      "health-checks": [
        {
          "code": "0000",
          "issue-date": "2022-02-09T13:13:09.218Z",
          "status": "1"
        },
        {
          "code": "0001",
          "issue-date": "2023-03-22T13:06:31.972Z",
          "status": "1"
        },
        {
          "code": "0002",
          "issue-date": "2022-12-21T01:26:58.674Z",
          "status": "0"
        }
      ]
    }`,
    `{
      "status": "0",
      "first-name": "Vytautas",
      "last-name": "Urbonas",
      "job-title": "Direktorius",
      "department": "Logistika",
      "health-checks": [
        {
          "code": "0000",
          "issue-date": "2022-02-09T13:13:09.218Z",
          "status": "1"
        },
        {
          "code": "0001",
          "issue-date": "2023-03-22T13:06:31.972Z",
          "status": "1"
        },
        {
          "code": "0002",
          "issue-date": "2022-12-21T01:26:58.674Z",
          "status": "0"
        }
      ]
    }`,
  `{
      "status": "0",
      "first-name": "Vytautas",
      "last-name": "Urbonas",
      "job-title": "Direktorius",
      "department": "Logistika",
      "health-checks": [
        {
          "code": "0000",
          "issue-date": "2022-02-09T13:13:09.218Z",
          "status": "1"
        },
        {
          "code": "0001",
          "issue-date": "2023-03-22T13:06:31.972Z",
          "status": "1"
        },
        {
          "code": "0002",
          "issue-date": "2022-12-21T01:26:58.674Z",
          "status": "0"
        }
      ]
    }`];
</script>

<template>
	<table class="health-check-table">
		<thead>
			<th role="col">
				<InputCheckbox />
			</th>
			<th class="col-2" role="col">
				Full name / Health check
			</th>
			<th role="col">
				Code
			</th>
			<th role="col">
				Expiration
			</th>
			<th role="col">
				Status
			</th>
			<th role="col">
				Department
			</th>
			<th role="col">
				User status
			</th>
			<th role="col">
				Job title
			</th>
			<th role="col">
				<InputButton icon="refresh" :callback="() => console.log('Refresh clicked')" />
			</th>
		</thead>
		<tbody>
			<HealthCheck v-for="(user, index) in usersEntries" :user="new User(user)" :key="index" />
		</tbody>
	</table>
</template>

<style>
thead {
    box-shadow: var(--table-shadow);
}
</style>