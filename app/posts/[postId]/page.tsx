import getFormattedDate from '@/lib/getFormettedDate';
import { getPostsMeta, getPostByName } from '@/lib/posts'
import { notFound } from 'next/navigation';
import Link from 'next/link';
import React from 'react'
import 'highlight.js/styles/github-dark.css'

export const revalidate = 86400

type Props = {
  params: {
    postId: string;
  }
}

export async function generateStaticParams() {
  const posts = await getPostsMeta(); // this will be deduped and cached from another place

  if (!posts) return [];

  return posts.map((post) => ({
    postId: post.id
  }));
}

export async function generateMetadata({ params: { postId }}: Props) {
  const post = await getPostByName(`${postId}.mdx`); // this will be deduped and cached from another place

  
  if (!post) {
    return {
      title: 'post not found'
    }
  }
  return {
    title: post?.meta.title
  }

}

/**
 * this is a dynamic route it is going to take params from an fetch
 * @param param0 
 * @returns 
 */
export default async function Post({ params: { postId }}: Props) {
  
  const post = await getPostByName(`${postId}`); // this will be deduped and cached from another place
  
  if (!post) {
    return notFound();
  }

  const { meta, content } = post;

  const pubDate = getFormattedDate(meta.date);

  const tags = meta.tags.map((tag, i) => (
    <Link key={i} href={`/tags/${tag}`}>{tag}</Link>
  ))

    return (
      <>
        <h2 className="text-3xl mt-4 mb-0">{meta.title}</h2>
        <p className="mt-0 text-sm">
          {pubDate}
        </p>
        <article>
          {content}
        </article>
        <section>
          <h3>Related:</h3>
          <div className="flex flex-row gap-4">
            {tags}
          </div>
        </section>
        <p className="mb-10">
          <Link href="/">← Back to home</Link>
        </p>
      </>
    )
}
