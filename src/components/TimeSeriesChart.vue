<script setup lang="ts">
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { computed, onMounted, ref } from 'vue'
import { ITimeSeriesDataItem } from '@/api/getTimeSeries'

const props = defineProps<{
  items: Array<ITimeSeriesDataItem>,
  stockName: string,
}>()

Chart.register(
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

const chartContainer = ref(null)

const data = computed(() => {
  return {
    labels: props.items.map((item: ITimeSeriesDataItem) => item.date),
    datasets: [
      {
        label: props.stockName,
        backgroundColor: '#f87979',
        data: props.items.map((item: ITimeSeriesDataItem) => item.close),
      },
    ],
  }
})

onMounted(() => {
  new Chart(
    chartContainer.value as unknown as HTMLCanvasElement,
    {
      type: 'line',
      data: data.value,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    })
})
</script>

<template>
  <figure class="time-series-chart">
    <canvas ref="chartContainer" />
  </figure>
</template>

<style lang="scss">
.time-series-chart {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 240px;
  padding: 0;
  margin: 0;
  box-shadow: 0px -5px 5px -5px rgba(0,0,0,0.75);
  background-color: #fff;

  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>