import supabase from './superbase';

export function getUser() {
	return supabase.auth.user();
}

export async function signIn({ email }) {
	const { error } = await supabase.auth.signIn({ email });
	return { data: !error, error };
}

export async function signOut() {
	const { error } = await supabase.auth.signOut();
	return { data: !error, error };
}

export async function createPost({ content, user }) {
	const { data, error } = await supabase.from('posts').insert({ content, user });
	return { data, error };
}
export async function createLike({ post, user }) {
	const { data, error } = await supabase.from('likes').insert({ post, user });
	return { data, error };
}
export async function createComment({ post, user, content }) {
	const { data, error } = await supabase.from('comments').insert({ post, user, content });
	return { data, error };
}

export async function getPosts() {
	let { data, error } = await supabase
		.from('posts')
		.select('*')
		.order('created_at', { ascending: false })
		.limit(5);
	if (error) return { data, error };

	data = await Promise.all(
		data.map(async (post) => {
			const [{ count: likes }, { data: comments }, { publicURL }] = await Promise.all([
				await supabase
					.from('likes')
					.select('id', { count: 'estimated', head: true })
					.eq('post', post.id),
				await supabase.from('comments').select('*').eq('post', post.id),
				post.image
					? await supabase.storage
							.from('images')
							.getPublicUrl(post.image.split('/').slice(1).join('/'))
					: Promise.resolve({})
			]);
			// ERROR HANDLE!!!
			return {
				...post,
				likes,
				comments,
				publicURL
			};
		})
	);
	return { data, error };
}
