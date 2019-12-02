<template>
  <div class='home'>
    <Form src='https://examples.form.io/example' />
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { Form } from 'vue-formio';

export default {
  components: {
    Form,
  },
};
</script>
