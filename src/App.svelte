<script>
    import Game from './Game.svelte';
    import Button from './Button.svelte';
    import four from '../data/words_alpha_4'

    let word = getRandomWord(four)
    let isStarted = false
    let lastGameStatus


    function onFinish(e) {
        lastGameStatus = e.detail.success
    }

    function tryAgain() {
        word = getRandomWord(four)
        lastGameStatus = undefined
    }

    function getRandomWord(list) {
        return list[Math.round(Math.random() * list.length)]
    }
</script>

<main>
    <h1>Crack the Password!</h1>

    {#if isStarted}
        <Game word={word} duration={60} on:finish={onFinish} />

        {#if typeof lastGameStatus !== 'undefined'}
            <div style="margin-top: 2em">
                <Button type="button" onClick={tryAgain} label="Try Again" />
            </div>
        {/if}
    {:else}
        <div style="max-width: 18em; margin: 0 auto;">
            <p>
                You have 60 seconds and unlimited attempts to guess the password.
            </p>

            <p>
              The password is a singular noun in English.
            </p>

            <p>
              Each matching letter will be revealed.
            </p>
        </div>

        <div style="margin-top: 2em">
            <Button type="button" onClick={() => isStarted = true} label="Start" />
        </div>
    {/if}

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
	  color: #fefefe;
	  text-shadow: 3px 3px 0 #311443;
	  font-size: 2rem;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
