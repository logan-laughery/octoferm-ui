<template>
  <md-card class="error-card">
    <md-card-content>
      <div class="md-title">Errors</div>
      <hr/>
      <md-list class="md-double-line">
        <md-list-item v-for="error in paginatedData"
          :key="error.timestamp">
          <div class="md-list-text-container">
            <span>{{error.timestamp}}</span>
            <span>{{error.message}}</span>
          </div>

          <md-divider></md-divider>
        </md-list-item>
      </md-list>
      <md-button v-on:click="prevPage" :disabled="pageNumber <= 0">
        Previous
      </md-button>
      <span class="md-body-1 page-count">Page {{ pageNumber + 1 }} of {{ pageCount + 1}}</span>
      <md-button v-on:click="nextPage" :disabled="pageNumber >= pageCount">
        Next
      </md-button>
    </md-card-content>
  </md-card>
</template>

<script>
import errorService from '../../services/errors';

export default {
  name: 'error-card',
  data: () => ({
    errors: [],
    size: 5,
    pageNumber: 0,
  }),
  props: ['deviceId'],
  computed: {
    pageCount() {
      const l = this.errors.length;
      const s = this.size;

      return Math.floor(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size;
      const end = start + this.size;

      return this.errors
        .sort((a, b) => b.rawTimestamp - a.rawTimestamp)
        .slice(start, end);
    },
  },
  methods: {
    addError(error) {
      this.errors.push({
        rawTimestamp: error.timestamp,
        timestamp: new Date(error.timestamp * 1000).toLocaleString(),
        message: error.message,
      });
    },
    nextPage() {
      this.pageNumber = this.pageNumber + 1;
    },
    prevPage() {
      this.pageNumber = this.pageNumber - 1;
    },
  },
  mounted() {
    errorService.getErrors(this.deviceId, this.addError);
  },
};
</script>

<style>

.error-card {
  max-width: calc(100vw - 32px);
  width: 100%;
  height: fit-content;
}

.error-card .md-list-item-container {
  padding-left: 0px;
}

.page-count {
  min-height: 36px;
  display: inline-block;
  margin: 6px 0px;
  line-height: 36px;
}
</style>
