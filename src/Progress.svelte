<script>
export let value
export let total
</script>

<div class="wrapper">
  <div class="bar" style="width: {100 - Math.ceil(value / total * 100)}%;"/>
</div>

<style>
    .wrapper {
      max-width: 20rem;
      margin: 0 auto;
      height: 10px;
      background: rgb(255,177,0);
      background: linear-gradient(90deg, rgba(255,177,0,1) 0%, rgba(255,177,0,1) 75%, rgba(255,29,0,1) 100%);
      width: 100%;
      box-shadow: 3px 3px 0 #333;
      position: relative;
    }
    .bar {
      height: 10px;
      background-color: #b6a4c1;
      transition: width 1000ms;
      position: absolute;
      right: 0;
    }
</style>
