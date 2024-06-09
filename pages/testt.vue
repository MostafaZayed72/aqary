<template>
  <div class="mt-20">
    <div class="mx-auto w-[50%] lg:w-[30%] px-3 py-3.5 mb-10 border-gray-200 dark:border-gray-700">
      <UInput v-model="q" placeholder="Filter stocks..." />
    </div>
    <div class=" myRow ">
      <UTable class="w-[95%] mx-auto u-table"  :columns="columns" :rows="paginatedRows">
        <template #header="{ column }">
          <span @click="setSort(column.key)" class="cursor-pointer">
            {{ column.label }}
            <span v-if="sortKey === column.key">
              {{ sortOrder === 'asc' ? '↑' : '↓' }}
            </span>
          </span>
        </template>
        <template #cell="{ column, row }">
          <span :class="{ 'text-center': column.key === 'name' }">
            {{ row[column.key] }}
          </span>
        </template>
      </UTable>
    </div>
    <hr class="mx-auto my-4 w-[95%] border-t border-gray-200 dark:border-gray-700" />
    <div class="flex justify-center items-center">
      <button @click="prevPage" :disabled="page === 1" class="mr-2 px-4 py-2 bg-gray-200 rounded">Previous</button>
      <span class="mx-2">Page {{ page }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="page >= totalPages" class="px-4 py-2 bg-gray-200 rounded">Next</button>
    </div>
    <p v-if="error" class="text-center text-red font-bold">
      Error loading stocks: {{ error }}
    </p>
    <p v-if="!items.length && !error" class="text-center font-bold">
      Loading stocks...
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

const items = ref([]);
const error = ref(null);
const q = ref("");
const page = ref(1);
const pageCount = ref(10); // عدد العناصر في كل صفحة، يمكنك تغييره حسب الرغبة
const sortKey = ref("");
const sortOrder = ref("asc"); // 'asc' or 'desc'

const fetchData = async () => {
  try {
    const response = await fetch('https://financialmodelingprep.com/api/v3/symbol/NASDAQ?apikey=lGvaDWwz5WCff8M2KPBlzTtlKrUU4YVb');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    items.value = data.slice(0, 20); // أخذ أول 20 سهم فقط
    console.log(items.value);
  } catch (err: any) {
    error.value = err.message;
    console.error('There was a problem with the fetch operation:', err);
  }
};

onMounted(() => {
  fetchData();
});

const columns = [
  {
    key: "symbol", label: "Symbol", sortable: true,
  },
  { key: "name", label: "Name",   sortable: true,
 },
  { key: "price", label: "Price",  sortable: true,
},
  { key: "changesPercentage", label: "Changes Percentage",   sortable: true,
 },
  { key: "change", label: "Change",   sortable: true,
 },
  { key: "dayLow", label: "Day Low",   sortable: true,
 },
  { key: "dayHigh", label: "Day High",   sortable: true,
 },
  { key: "yearHigh", label: "Year High",   sortable: true,
 },
  { key: "yearLow", label: "Year Low",   sortable: true,
 },
  { key: "marketCap", label: "Market Cap",   sortable: true,
 },
  { key: "priceAvg50", label: "Price Avg 50",   sortable: true,
 },
  { key: "priceAvg200", label: "Price Avg 200",   sortable: true,
 },
  { key: "exchange", label: "Exchange",   sortable: true,
 },
  { key: "volume", label: "Volume",   sortable: true,
 },
  { key: "avgVolume", label: "Avg Volume",   sortable: true,
 },
  { key: "open", label: "Open",   sortable: true,
 },
  { key: "previousClose", label: "Previous Close",   sortable: true,
 },
  { key: "eps", label: "EPS",   sortable: true,
 },
  { key: "pe", label: "PE",   sortable: true,
 },
  { key: "earningsAnnouncement", label: "Earnings Announcement",   sortable: true,
 },
  { key: "sharesOutstanding", label: "Shares Outstanding",   sortable: true,
 },
  { key: "timestamp", label: "Timestamp",   sortable: true,
 },
];

const filteredRows = computed(() => {
  let result = items.value;

  if (q.value) {
    result = result.filter((item: any) => {
      return Object.values(item).some((value) => {
        return String(value).toLowerCase().includes(q.value.toLowerCase());
      });
    });
  }

  if (sortKey.value) {
    result.sort((a, b) => {
      let compare = 0;
      if (a[sortKey.value] > b[sortKey.value]) compare = 1;
      if (a[sortKey.value] < b[sortKey.value]) compare = -1;
      return sortOrder.value === "asc" ? compare : -compare;
    });
  }

  return result;
});

const paginatedRows = computed(() => {
  const start = (page.value - 1) * pageCount.value;
  const end = start + pageCount.value;
  return filteredRows.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredRows.value.length / pageCount.value);
});

const selected = ref([]);

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++;
  }
};

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
  }
};

const setSort = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key;
    sortOrder.value = "asc";
  }
};
</script>

<style>
input[type="checkbox" i] {
  cursor: pointer;
  appearance: auto;
  box-sizing: border-box;
  margin: 3px 3px 3px 4px;
  padding: initial;
  border: initial;
}
.text-center {
  text-align: center;
}

.text-left{
  text-align: center !important;
}
.u-table th, .u-table td {
  border-right: 1px solid #ddd; /* يمكنك تغيير اللون إلى ما يناسبك */
}

.u-table th:last-child, .u-table td:last-child {
  border-right: none; /* إزالة الخط الرأسي من آخر عمود */
}

</style>
