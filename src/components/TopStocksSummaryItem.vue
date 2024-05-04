<script setup lang="ts">
defineProps<{ label: string, value: number | string }>()

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat().format(amount)
}
</script>

<template>
  <div class="top-stocks-summary-item">
    <div class="top-stocks-summary-item__label">
      {{ label }}
    </div>
    <div class="top-stocks-summary-item__value">
      {{ typeof value === 'number' ? `$${formatCurrency(value)}` : value.toLocaleString() }}
    </div>
  </div>
</template>

<style lang="scss">
.top-stocks-summary-item {
  display: flex;
  flex-direction: column;

  &__label {
    font-weight: bold;
  }

  &__value {
    font-size: 2rem;
  }
}
</style>