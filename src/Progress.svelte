<script>
export let value
export let total
</script>

<div class="wrapper">
  <div class="bar" style="width: {Math.ceil(value / total * 100)}%;"/>
</div>

<style>
    .wrapper {
      max-width: 20rem;
      margin: 0 auto;
      height: 10px;
      background-color: #fefefe;
      width: 100%;
      box-shadow: 3px 3px 0 #333;
    }
    .bar {
      height: 10px;
      background-color: #ffb100;
      transition: width 1000ms;
    }
</style>
