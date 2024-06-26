'use client'
import FormattedDate from "@/components/FormattedDate";
import { useConfig } from "@/lib/config";
import Link from "next/link";
import { useEffect, useRef, useCallback } from "react";
import { truncateString } from "@/utils/text";
import gsap from "gsap";

const BlogPost = ({ post }) => {
  const BLOG = useConfig();
  const imgRef = useRef();
  const imgTl = useRef();

  useEffect(() => {
    imgTl.current = gsap.timeline({
      ease: "expo.inOut",
      duration: 1.2
    })
  }, [])

  const handleImageZoom = useCallback(() => {
    imgTl.current?.clear();
    imgTl.current?.to(imgRef.current, {
      scale: 1.4
    })
  }, [])

  const handleImageZoomOut = useCallback(() => {
    imgTl.current?.clear();
    imgTl.current?.to(imgRef.current, {
      scale: 1
    })
  }, [])



  return (
    <Link href={`${BLOG.path}/${post.slug}`}>
      <article key={post.id} className="mb-6 md:mb-8 p-4 rounded-lg overflow-hidden shadow-lg" onMouseEnter={handleImageZoom} onMouseLeave={handleImageZoomOut}>
        <div class="grid md:grid-cols-[250px,_1fr] gap-4 items-start ">
          <div className="hidden md:block rounded-lg overflow-hidden w-full h-full ">
            <img ref={imgRef} className="w-full h-full object-cover object-center " src={post?.img_cover} alt="" />
          </div>
          <div className="w-full">
            <header className="flex flex-col justify-between md:flex-row md:items-baseline">
              <h2 className="text-lg md:text-xl mb-2 cursor-pointer leading-tight font-bold bg-clip-text text-transparent bg-gradient-to-tl from-sky-400 to-fuchsia-400">
                {post.title}
              </h2>
              <time className="flex-shrink-0 text-gray-600 dark:text-gray-400">
                <FormattedDate date={post.date} />
              </time>
            </header>
            <main>
              <p className="hidden md:block leading-8 text-gray-500 dark:text-gray-300">
                {truncateString(post.summary, 150)}
              </p>
            </main>
          </div>
        </div>

      </article>
    </Link>
  );
};

export default BlogPost;
