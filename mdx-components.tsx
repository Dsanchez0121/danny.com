import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import PhotoGallery, { InlinePhoto } from "@/components/PhotoGallery";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    PhotoGallery,
    InlinePhoto,
    img: (props) => {
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      return (
        <span className="my-8 block overflow-hidden rounded-[20px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img {...props} className="w-full" alt={props.alt || ""} />
        </span>
      );
    },
    h2: (props) => (
      <h2 className="mt-12 font-serif text-[28px] font-semibold tracking-tight" {...props} />
    ),
    h3: (props) => (
      <h3 className="mt-8 text-[20px] font-semibold" {...props} />
    ),
    p: (props) => (
      <p className="leading-[1.85] text-stone-700" {...props} />
    ),
    blockquote: (props) => (
      <blockquote
        className="my-8 border-l-2 border-orange-500 pl-6 font-serif text-xl italic text-stone-600"
        {...props}
      />
    ),
    a: (props) => (
      <a className="underline decoration-orange-300 underline-offset-4 hover:decoration-orange-600" {...props} />
    ),
    ...components,
  };
}
