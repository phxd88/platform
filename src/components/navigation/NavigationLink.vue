<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
    <router-link
      v-if="displayLink"
      :to="{name: routeName}"
      active-class="active"
      class="navigation__item"
      exact
    >
      <span v-if="text && text.length > 30" v-b-tooltip.hover :title="text">{{ text|middle-truncate(30) }}</span>
      <span v-else>{{ text }}</span>
    </router-link>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    routeName: {
      type: String,
      default: ''
    },
    displayLink: {
      type: Boolean,
      default: false
    }
  }
}
</script>
