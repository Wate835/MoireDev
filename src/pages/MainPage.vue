<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <div class="content__header">
          <h1 class="content__title">Каталог</h1>
          <span class="content__info"> Количество товаров: {{ total }} </span>
        </div>
        <div class="content__count">
          <fieldset class="form__block__count">
            <span class="form__legend form__legend__count">Количество товаров на странице</span>
            <label class="form__label form__label--select form__label__count">
              <select class="form__select" name="category" v-model="productsPerPage">
                <option value="6">6</option>
                <option value="12">12</option>
                <option value="18">18</option>
              </select>
            </label>
          </fieldset>

        </div>
      </div>
    </div>

    <div class="content__catalog">
      <products-filter :filters="filters" @change-filters="setFilters"></products-filter>

      <section class="catalog">
        <div class="loader-wrapper" v-if="isLoading">
          <base-loader></base-loader>
        </div>
        <h2 v-else-if="isLoadingFailed">
          Возникла ошибка при загрузке товаров. Попробуйте позже.
        </h2>
        <h2 v-else-if="!products.length">
          Нет товаров по вашему запросу. Попробуйте поискать что-нибудь другое!
        </h2>
        <products-list :products="products" v-else></products-list>

        <base-pagination :page="page" :perPage="productsPerPage" :total="total" @change-page="setPage"
          v-if="products.length"></base-pagination>
      </section>
    </div>
  </main>
</template>

<script>
import ProductsFilter from '@/components/ProductsFilter.vue'
import ProductsList from '@/components/ProductsList.vue'
import BasePagination from '@/components/BasePagination.vue'

export default {
  components: { ProductsFilter, ProductsList, BasePagination },
  data() {
    return {
      page: 1,
      productsPerPage: 12,
      filters: {
        filterPriceFrom: 0,
        filterPriceTo: 0,
        filterCategoryId: 0,
        filterColorId: [],
        filterMaterialId: [],
        filterSeasonId: [],
      },
    }
  },
  computed: {
    productsData() {
      return this.$store.state.productsData
    },
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => {
          return {
            ...product,
            images: product.colors
              .flatMap((color) => color.gallery || [])
              .filter((img) => img !== null),
          }
        })
        : []
    },
    total() {
      return this.productsData ? this.productsData.pagination.total : 0
    },
    isLoading() {
      return this.$store.state.isLoading
    },
    isLoadingFailed() {
      return this.$store.state.isLoadingFailed
    },
  },
  methods: {
    loadProducts() {
      this.$store.dispatch('loadProducts', {
        page: this.page,
        limit: this.productsPerPage,
        minPrice: this.filters.filterPriceFrom,
        maxPrice: this.filters.filterPriceTo,
        categoryId: this.filters.filterCategoryId,
        materialIds: this.filters.filterMaterialId,
        seasonIds: this.filters.filterSeasonId,
        colorIds: this.filters.filterColorId,
      })
    },
    setFilters(filters) {
      this.filters = filters
    },
    setPage(page) {
      this.page = page
    },
  },
  watch: {
    filters() {
      this.page = 1
      this.loadProducts()
    },
    page() {
      this.loadProducts()
    },
    $route() {
      this.loadProducts()
    },
    productsPerPage() {
      this.loadProducts()
    }
  },
  created() {
    this.filters.filterCategoryId = this.$route.query.categoryId || 0
    this.loadProducts()
  },
}
</script>
