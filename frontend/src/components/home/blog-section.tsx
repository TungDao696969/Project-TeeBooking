import Image from "next/image";
import { Blog } from "@/types/home.type";
import { getImageUrl } from "@/lib/image";

interface Props {
  blogs: Blog[];
}

export default function BlogSection({ blogs }: Props) {
  return (
    <section className="py-10">
      {/* Title */}
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-extrabold uppercase italic text-white md:text-4xl">
          Dịch Vụ Giải Trí Khác
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-white/70 md:text-base">
          Cinestar không chỉ chiếu phim – chúng tôi còn mang đến nhiều mô hình
          giải trí đặc sắc khác, giúp bạn tận hưởng từng giây phút bên ngoài màn
          ảnh rộng.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {blogs.map((blog: Blog) => (
          <div
            key={blog.id}
            className="group relative overflow-hidden rounded-2xl cursor-pointer"
          >
            {/* Image */}
            <Image
              src={encodeURI(getImageUrl((blog.thumbnailUrl ?? "").trim()))}
              alt={blog.title}
              width={400}
              height={300}
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Dark overlay on hover */}
            <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/30" />

            {/* Title overlay — bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
              <p className="text-sm font-bold uppercase text-white line-clamp-2 md:text-base">
                {blog.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
