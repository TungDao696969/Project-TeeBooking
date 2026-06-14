import Image from "next/image";
import { MapPin } from "lucide-react";

import { CinemaDetail } from "@/types/cinema.type";

interface Props {
  cinema: CinemaDetail;
}

export default function CinemaHero({ cinema }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-6">
      <div className="relative overflow-hidden rounded-2xl border border-[#31236d] bg-gradient-to-r from-[#4c229f] to-[#120a3a] flex flex-col md:flex-row h-auto md:h-[260px]">
        {/* Left Side: Cinema Image (with diagonal slant on desktop) */}
        <div className="relative h-[200px] md:h-full w-full md:w-[350px] shrink-0 overflow-hidden md:[clip-path:polygon(0_0,100%_0,88%_100%,0_100%)]">
          <Image
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop"
            alt={cinema.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side: Cinema Name and Address */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
          <h1 className="text-2xl md:text-4xl font-extrabold uppercase text-white tracking-wide drop-shadow-md">
            {cinema.name}
          </h1>

          <div className="mt-4 flex items-start gap-3 text-sm md:text-base text-white/95">
            <MapPin className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              {cinema.address}, {cinema.ward}, {cinema.district},{" "}
              {cinema.province}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
