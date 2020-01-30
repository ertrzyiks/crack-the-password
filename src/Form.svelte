<script>
import { createEventDispatcher } from 'svelte'
import Button from './Button.svelte'

export let desiredLength;
export let dictionary;

let userInput = ''
let error = null

const dispatch = createEventDispatcher();

function onSubmit(e) {
    e.preventDefault()

    if (userInput.length !== desiredLength) {
        return
    }

    const value = userInput.toLowerCase()
    if (dictionary.hasWord(value)) {
        dispatch('submit', { value })
        userInput = ''
        error = null
    } else {
        error = 'Provide a valid English word.'
    }
 }
</script>

<form on:submit={onSubmit}>
    <div>
        <input
            bind:value={userInput}
            type="text"
            maxlength={desiredLength}
            autofocus
            placeholder={Array.from({length: desiredLength}, () => '*').join('')}
        />
        <Button type="submit">Submit</Button>
    </div>

    <div>{error || ''}</div>
</form>

<style>
input {
    background-color: #fefefe;
	border: 1px solid #241d13;
	display:inline-block;
	cursor:pointer;
	color: #333;
	font-size:15px;
	font-weight:bold;
	font-family: 'Permanent Marker', cursive;
	letter-spacing: 0.3em;
	padding: 9px 23px;
	text-decoration:none;
	box-shadow: 3px 3px 0 #333;
    outline: none;
}
</style>
