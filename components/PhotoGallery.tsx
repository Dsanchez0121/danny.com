import Image from "next/image";

type Photo = {
  src: string;
  alt: string;
  caption?: string;
  location?: string;
};

export default function PhotoGallery({ photos = [] }: { photos?: Photo[] }) {
  if (!photos || photos.length === 0) return null;
  return (
    <div className="my-12">
      <div className="masonry">
        {photos.map((photo, i) => (
          <figure
            key={i}
            className="masonry-item group overflow-hidden rounded-[18px] bg-stone-100"
          >
            <div className="relative overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={800}
                height={1000}
                className="w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              {photo.location && (
                <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur">
                  📍 {photo.location}
                </span>
              )}
            </div>
            {(photo.caption || photo.alt) && (
              <figcaption className="px-4 py-3">
                <p className="font-serif text-[15px] leading-snug text-stone-700">
                  {photo.caption || photo.alt}
                </p>
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}

export function InlinePhoto({
  src,
  alt,
  caption,
  wide = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  wide?: boolean;
}) {
  return (
    <figure className={`my-10 ${wide ? "-mx-6 sm:-mx-12 lg:-mx-20" : ""}`}>
      <div className="overflow-hidden rounded-[20px] bg-stone-100">
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1000}
          className="w-full object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center font-mono text-[12px] uppercase tracking-wide text-stone-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
