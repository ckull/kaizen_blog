'use client'
import BlogPost from '@/components/BlogPost'
import Container from '@/components/Container'
import Pagination from '@/components/Pagination'
import useTextLinesReveal from '@/hooks/useTextSplit'
import { useConfig } from '@/lib/config'
import { getAllPosts } from '@/lib/notion'
import { clientConfig } from '@/lib/server/config'
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
gsap.registerPlugin(useGSAP);

export async function getStaticProps() {
  const posts = await getAllPosts({ includePages: false })
  const postsToShow = posts.slice(0, clientConfig.postsPerPage)
  const totalPosts = posts.length
  const showNext = totalPosts > clientConfig.postsPerPage
  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      showNext
    },
    revalidate: 1
  }
}



export default function Blog({ postsToShow, page, showNext }) {
  const { title, description } = useConfig()
  const { revealLines } = useTextLinesReveal()
  const animRef = useRef(null)

  useEffect(() => {
    revealLines()
  }, [])

  return (
    <Container title={title} description={description}>
      <div className='h-[calc(100vh-330px)] w-full flex flex-col justify-center items-center text-3xl font-semibold text-gray-600'>
        <h1 ref={animRef} className='anim'>{`Hello I'm Chris! Welcome to the Kaizen, the place where I share through my researches and experiences as a Full-Stack Developer.`}
        </h1>
        <div className='flex gap-4 mt-4'>
          <span className='inline-block'><Image src={'/images/unicorn.webp'} width={56} height={56} alt="unicorn" /></span>
          <span className='inline-block'><Image src={'/images/turtle.webp'} width={56} height={56} alt="turtle" /></span>
          <span className='inline-block'><Image src={'/images/gem.webp'} width={56} height={56} alt="gem" /></span>
          <span className='inline-block'><Image src={'/images/seal.webp'} width={56} height={56} alt="seal" /></span>
          <span className='inline-block'><Image src={'/images/otter.webp'} width={56} height={56} alt="otter" /></span>
          <span className='inline-block'><Image src={'/images/horse.webp'} width={56} height={56} alt="horse" /></span>

        </div>
      </div>
      {postsToShow.map(post => (
        <BlogPost key={post.id} post={post} />
      ))}
      {showNext && <Pagination page={page} showNext={showNext} />}
    </Container>
  )
}
