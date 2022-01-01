<script>
import {createPost} from '$lib/services'
import Error from './Error.svelte'

export let postContent =""

let createPostPromise = Promise.resolve({})
const handleCreatePost = () => {

}

</script>

<form class="form-control" on:submit|preventDefault={handleCreatePost}>
    <label for="post" class="label">
      <span class="label-text text-xl">What would you like to say?</span>
    </label> 
    <textarea id="post" bind:value={postContent} required class="textarea h-24 textarea-bordered"></textarea>
{#await createPostPromise}
    
<button disabled type="button" class="btn">Tweet that!</button>
{:then {data, error}} 
<button class="btn">Tweet that!</button>
{#if data}
<strong class="text-green-600">Successfully created post!</strong>
{/if}
<Error {error} />
    
{/await}
</form>
  