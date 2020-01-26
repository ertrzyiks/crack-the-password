<script>
import { createEventDispatcher } from 'svelte'
import Button from './Button.svelte'

export let desiredLength;

let userInput = ''

const dispatch = createEventDispatcher();

function onSubmit(e) {
    e.preventDefault()

    if (userInput.length !== desiredLength) {
        return
    }

    dispatch('submit', { value: userInput })
    userInput = ''
 }
</script>

<form on:submit={onSubmit}>
    <input bind:value={userInput} type="text" maxlength={desiredLength} placeholder={Array.from({length: desiredLength}, () => '*').join('')}/>
    <Button type="submit" label="Submit"/>
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
