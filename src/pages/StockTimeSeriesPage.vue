
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getTimeSeries, ITimeSeriesDataItem } from '@/api/getTimeSeries'
import TimeSeriesChart from '@/components/TimeSeriesChart.vue'
import TimeSeriesTable from '@/components/TimeSeriesTable.vue'

const router = useRouter()

const props = defineProps<{
  stockName: string,
}>()

const items = ref<ITimeSeriesDataItem[] | null>(null)
const loading = ref(true)

const selectedStock = computed({
  get() {
    return typeof props.stockName === 'string' ? props.stockName : ''
  },
  set(stockName: string) {
    router.push({ name: 'StockTimeSeries', params: { stockName } })
  },
})

watch(() => props.stockName, async (newVal: string) => {
  loading.value = true
  items.value = null
  items.value = await getTimeSeries(newVal)
  loading.value = false // prevents flicker of error message while loading data
}, {
  immediate: true,
})
</script>

<template>
  <section class="time-series-container">
    <template v-if="!!items" :key="props.stockName">
      <div class="time-series-header">
        <div class="time-series-title">
          <img src="https://financialmodelingprep.com/image-stock/MSFT.png" width="24" height="24" alt="msft-logo">
          <h1>{{ selectedStock }} Historical Prices</h1>
        </div>
        <!-- I assume you have a select component in your library that would be styled. Native selects are notoriously finicky so I'm not going to waste time styling this one. -->
        <select v-model="selectedStock" name="stock-nav">
          <option value="MSFT">
            MSFT
          </option>
          <option value="AAPL">
            AAPL
          </option>
        </select>
      </div>
      <TimeSeriesTable :items="items" />
      <TimeSeriesChart :stock-name="props.stockName" :items="items" />
    </template>
    <div v-if="!loading && !items" class="error-message">
      No data available for "<b>{{ props.stockName }}</b>"
    </div>
  </section>
</template>

<style type="scss" scoped>
.time-series-container {
  width: 75vw;
  /* offset for chart footer */
  padding-bottom: 240px;
  margin: auto;
}

.time-series-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.time-series-title {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  img {
    margin-right: 16px;
  }

  h1 {
    font-size: 24px;
  }
}

.error-message {
  display: block;
  width: 300px;
  margin: auto;
  text-align: center;
  font-size: 14px;
  padding: 12px 24px;
  border: 1px solid rgb(206, 94, 94);
  border-radius: 8px;
  color: red;
  letter-spacing: 0.2px;
}
</style>