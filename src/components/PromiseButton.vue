<template lang="pug">
button.promise-button(
  type="button",
  @click.stop="handle",
  :disabled="disabled",
  :class="{ 'promise-button--notext': !isShowText }",
)
  span(v-if="isShowText")
    slot
      span.promise-button-text
  slot(name="spinner")
    span.promise-button-spinner(
      v-show="isProcessing || forceProcessing",
      role="status",
    )
      span.promise-button-visually-hidden Loading...
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
  promise: (...args: any[]) => Promise<unknown>;
  autoHide?: boolean;
  disabled?: boolean;
  forceProcessing?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  autoHide: false,
  disabled: false,
  forceProcessing: false,
});

const isProcessing = ref(false);

const isShowText = computed(() => {
  if (isProcessing.value || props.forceProcessing) {
    return !props.autoHide;
  }

  return true;
});

/**
* main handle function
*/
const handle = () => {
  if (!isProcessing.value) {
    isProcessing.value = true;
    props.promise()
      .catch((e: Error) => { // eslint-disable-line
        isProcessing.value = false;
        throw e;
      })
      .finally(() => {
        isProcessing.value = false;
      });
  }
}

defineExpose({
  handle,
  isShowText,
});
</script>
<style lang="sass">
@import 'bootstrap/scss/functions'
@import 'bootstrap/scss/variables'
@import 'bootstrap/scss/mixins'

// @import 'bootstrap/scss/utilities/screenreaders'
@import 'bootstrap/scss/spinners'

.promise-button
  display: inline-flex
  align-items: center
  justify-content: center

.promise-button-spinner
  @extend .spinner-border
  width: 1em
  height: 1em
  border-width: .15em
  margin-left: .5em

  .promise-button--notext &
    margin-left: 0

.promise-button-visually-hidden
  @include visually-hidden()
</style>
