<script context="module">
    export async function load({url, fetch, session, context }) {
        const {data, error} = await getPosts()
        return {
            props: {
                posts: data,
                error
            }
        }
    }
</script>

<script>
import CreatePost from "$lib/CreatePost.svelte";
import Post from "$lib/Post.svelte";
import Error from "$lib/Error.svelte";
import { signOut, getUser } from "$lib/services";
import { goto } from "$app/navigation";
import {browser} from '$app/env';

export let posts, error

const user = getUser() 
if (browser && !user) goto('/login')

async function handleSignout() {
    await signOut()
    goto('/login')
}

</script>

<header class="flex justify-between">
    <h1 text-2xl>Welcome to Twitter</h1>
    <button on:click={handleSignout} class="btn">Logout</button>
</header>

<CreatePost />

<Error {error} />

{#each posts || [] as post}
<Post {...post} />
{:else}
    No posts found!

{/each}