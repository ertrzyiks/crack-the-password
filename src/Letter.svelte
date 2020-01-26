<script>
    export let value;
    export let uncovered;

    $: displayValue = uncovered ? value : ''
</script>

<div>
  {displayValue}
</div>

<style>
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
    background-color: #fefefe;
    font-size: 1.3rem;
    width: 1.6em;
    height: 1.6em;
    display: inline-block;
    box-shadow: 4px 4px 0 #311443;

  }
  div:not(:last-child) {
    margin-right: 1em;
  }

</style>
