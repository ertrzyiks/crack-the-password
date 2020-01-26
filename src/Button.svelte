<script>
export let label
export let type
export let onClick = () => {}
</script>

<button type={type} on:click={onClick}>{label}</button>

<style>
button {
	background-color: transparent;
	border: 1px solid #241d13;
	display:inline-block;
	cursor:pointer;
	color: #ffffff;
	font-size:15px;
	font-weight:bold;
	font-family: 'Permanent Marker', cursive;
	letter-spacing: 0.3em;
	padding: 9px 23px;
	text-decoration:none;
	box-shadow: 3px 3px 0 #333;
}
button:hover {
	box-shadow: 3px 3px 0 #333, inset 0px 34px 0px -15px #5e2382;
}
button:active {
	position: relative;
	top: 1px;
}
</style>
