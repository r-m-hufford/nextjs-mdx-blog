import Link from 'next/link'
import React from 'react'
import getFormattedDate from '@/lib/getFormettedDate';

type Props = {
  post: Meta
}

export default function ListItem({ post }: Props) {
  const { id, title, date } = post;

  const formattedDate = getFormattedDate(date);
  return (
    <li className='mt-4 text-2xl dark:text-white/90'>
      <Link className='underline hover:text-black/70'
      href={`/posts/${id}`}>{title}</Link>
      <br />
      <p className='text-sm mt-1'>{formattedDate}</p>
    </li>
  )
}