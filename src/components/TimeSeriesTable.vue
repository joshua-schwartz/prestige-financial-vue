<script setup lang="ts">
defineProps<{ items: Array<{
  date: string,
  open: string | number,
  high: string | number,
  low: string | number,
  close: string | number,
  volume: string | number,
}>, }>()
</script>

<template>
  <table class="time-series-table">
    <thead>
      <tr>
        <th>Date</th>
        <th>Open</th>
        <th>High</th>
        <th>Low</th>
        <th>Close</th>
        <th>Volume</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.date">
        <td>{{ item.date }}</td>
        <td>{{ item.open }}</td>
        <td>{{ item.high }}</td>
        <td>{{ item.low }}</td>
        <td>{{ item.close }}</td>
        <td>{{ item.volume }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss">
.time-series-table {
    th, td {
        padding: 2px 40px 2px 0;
    }
}
</style>