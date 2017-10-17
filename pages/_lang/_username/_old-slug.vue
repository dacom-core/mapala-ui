<template lang="pug">
</template>

<script>

export default {
  async fetch ({ redirect, route }) {
    console.log(route.params)
    console.log('dskfjasdkfaks1')
    return redirect(`${route.params.lang}/${route.params.username}/`)
  }
}
</script>

<style lang="stylus" scoped>
</style>
