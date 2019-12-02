<template>
  <div class='home'>
    <v-card>
      <v-container>
        <FormBuilder v-bind:form='form' />
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { FormBuilder } from 'vue-formio';

export default {
  components: {
    FormBuilder,
  },
  data: () => {
    return {
      form: {},
    };
  },
};
</script>
