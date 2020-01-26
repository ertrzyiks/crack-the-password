<script>
    import Game from './Game.svelte';
    import Button from './Button.svelte';
    import three from '../data/words_alpha_3'
    import four from '../data/words_alpha_4'
    import five from '../data/words_alpha_5'

    const words = {
        easy: three,
        normal: four,
        hard: five
    }

    let word = getRandomWord(four)
    let difficulty = null
    let lastGameStatus

    $: {
        if (difficulty) {
            word = getRandomWord(words[difficulty])
            lastGameStatus = undefined
        }
    }

    function onFinish(e) {
        lastGameStatus = e.detail.success
    }

    function tryAgain() {
        const lastDifficulty = difficulty
        difficulty = null
        difficulty = lastDifficulty
    }

    function reset() {
        difficulty = null
    }

    function getRandomWord(list) {
        return list[Math.round(Math.random() * list.length)]
    }
</script>

<main>
    <h1>
        Crack the Password!
          <span style="font-family: initial; letter-spacing: initial; text-shadow: initial;">
            <a
                class="github-button"
                href="https://github.com/ertrzyiks/crack-the-password"
                data-icon="octicon-repo-forked"
                aria-label="Fork ertrzyiks/crack-the-password on GitHub"
                style="visibility: hidden"
            >
                    Fork
            </a>
          </span>
    </h1>

    {#if difficulty}
        <Game word={word} duration={60} on:finish={onFinish} />

        {#if typeof lastGameStatus !== 'undefined'}
            <div style="margin-top: 2em">
                <Button type="button" onClick={tryAgain} label="Try Again" />
            </div>

            <div style="margin-top: 2em">
                <Button onClick={reset} label="Change difficulty" />
            </div>
        {/if}
    {:else}
        <div class="intro" style="">
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

        <p>
          Difficulty:
        </p>

        <div style="margin-top: 1em">
            <Button type="button" onClick={() => difficulty = 'easy'} label="Easy" />
        </div>

        <div style="margin-top: 1em">
            <Button type="button" onClick={() => difficulty = 'normal'} label="Normal" />
        </div>

        <div style="margin-top: 1em">
            <Button type="button" onClick={() => difficulty = 'hard'} label="Hard" />
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

	.intro {
      max-width: 18em;
      margin: 3em auto;
    }

    p {
	  text-shadow: 2px 2px 0 #333;
	  margin-bottom: 1em;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
