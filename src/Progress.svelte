<script>
export let value
export let total
</script>

<div class="wrapper">
  <div class="bar" style="width: {Math.ceil(value / total * 100)}%;"/>
</div>

<style>
    .wrapper {
      height: 10px;
      background-color: #fefefe;
      width: 100%;
    }
    .bar {
      height: 10px;
      background-color: #ffb100;
      transition: width 1000ms;
    }
</style>
