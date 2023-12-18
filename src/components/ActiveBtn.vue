<template>
  <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
    <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
    <label class="btn btn-outline-secondary" for="btnradio1" @click="emitActive('all')">全部</label>

    <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
    <label class="btn btn-outline-secondary" for="btnradio2" @click="emitActive('active')">執行</label>

    <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
    <label class="btn btn-outline-secondary" for="btnradio3" @click="emitActive('completed')">完成</label>
  </div>
</template>

<script>
export default {
  setup (props, { emit }) {
    function emitActive (active) {
      emit('chooseActive', active)
    }

    return {
      emitActive
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
