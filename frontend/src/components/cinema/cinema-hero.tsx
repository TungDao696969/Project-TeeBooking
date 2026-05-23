import Image from "next/image";
import { Clock, MapPin, Phone } from "lucide-react";

import { CinemaDetail } from "@/types/cinema.type";

interface Props {
  cinema: CinemaDetail;
}

export default function CinemaHero({ cinema }: Props) {
  return (
    <section className="relative">
      <div className="relative h-[420px] w-full">
        <Image
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop"
          alt={cinema.name}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#071226] via-[#071226]/70 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <div className="mx-auto max-w-[1320px] px-4 pb-10">
          <h1 className="text-5xl font-black uppercase">{cinema.name}</h1>

          <div className="mt-6 flex flex-col gap-4 text-lg">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-yellow-400" />

              <span>
                {cinema.address}, {cinema.ward}, {cinema.district},{" "}
                {cinema.province}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-yellow-400" />

              <span>{cinema.openingHours}</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-yellow-400" />

              <span>{cinema.hotline}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
