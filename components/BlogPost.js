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
        <div class="flex gap-4 items-start ">
          <div className="hidden md:block rounded-lg overflow-hidden max-w-48 h-full">
            <img ref={imgRef} className="w-full h-full object-cover" src={post?.img_cover} alt="" />
          </div>
          <div>
            <header className="flex flex-col justify-between md:flex-row md:items-baseline">
              <h2 className="text-lg md:text-xl font-medium mb-2 cursor-pointer text-black dark:text-gray-100">
                {post.title}
              </h2>
              <time className="flex-shrink-0 text-gray-600 dark:text-gray-400">
                <FormattedDate date={post.date} />
              </time>
            </header>
            <main>
              <p className="hidden md:block leading-8 text-gray-700 dark:text-gray-300">
                {truncateString(post.summary, 180)}
              </p>
            </main>
          </div>
        </div>

      </article>
    </Link>
  );
};

export default BlogPost;
