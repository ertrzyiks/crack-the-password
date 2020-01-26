<script>
    import Letter from './Letter.svelte'
    import Progress from './Progress.svelte'
    import Button from './Button.svelte'
    import Form from './Form.svelte'
    import { createEventDispatcher, onMount } from 'svelte'

    import { onInterval } from './utils'

	export let word;
	export let duration;

    const dispatch = createEventDispatcher();

    let start = new Date().getTime()
    let now = new Date().getTime()

	let matches = []
    let interval
    let status = 'active'

    $: letters = word.split('')
    $: until = start + duration * 1000
    $: timeLeft = Math.round((until - now) / 1000)
    $: if (word) {
        status = 'active'
        matches = []
        start = new Date().getTime()
        clearInterval(interval)
        interval = onInterval(() => now = new Date().getTime(), 500)
    }

    $: if (timeLeft <= 0) {
        if (status === 'active') {
            status = 'fail'
            letters.forEach((letter, index) => markAsGuessed(index))
            clearInterval(interval)

            dispatch('finish', {
                success: false
            })
        }
    }

    function onSubmit(e) {
      processUserInput(e.detail.value).forEach(index => markAsGuessed(index))
    }

     function processUserInput(value) {
        return letters
            .map((letter, index) => value[index] === letter)
            .reduce((currentMatches, matches, index) => {
                if (matches) {
                    return [...currentMatches, index]
                }

                return currentMatches
            },[])
     }

     function markAsGuessed(index) {
        if (!isGuessed(index)) {
            matches = [...matches, index];
        }

        if (status === 'active' && matches.length === letters.length) {
          status = 'win'

          clearInterval(interval)

          dispatch('finish', {
            success: true
          })
        }
     }

     function isGuessed(index) {
        return matches.includes(index)
     }
</script>

<div>
    <div style="margin-top: 3rem;">
        <Progress value={duration - timeLeft} total={duration} />
    </div>

    <div class="letters">
        {#each letters as letter, i}
            <Letter value={letter} uncovered={matches.includes(i)}/>
        {/each}
    </div>

    {#if status === 'active'}
        <div style="margin-top: 0em;">
            <Form desiredLength={word.length} on:submit={onSubmit} />
        </div>

        <div style="margin-top: 4rem;">
            <Button secondary onClick={() => dispatch('giveup')} label="Give up" />
        </div>
    {:else if status === 'win'}
        <div>
            You won!
        </div>

        <div style="margin-top: 1em;">
            Still no idea what does it mean? <a href="https://www.dictionary.com/browse/{encodeURIComponent(word)}" target="_blank">
              Look it up in the dictionary.
            </a>
        </div>
    {:else}
        <div style="margin-bottom: 1em;">
            Time's up!
        </div>
        <div>
            Don't know the word?
            <a href="https://www.dictionary.com/browse/{encodeURIComponent(word)}" target="_blank">
                Look it up in the dictionary.
            </a>
        </div>
    {/if}
</div>

<style>
.letters {
  display: flex;
  justify-content: center;
  padding-bottom: 1.5rem;
  padding-top: 3.5rem;
}
a {
  color: #ffb100;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
