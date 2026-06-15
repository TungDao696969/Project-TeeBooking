import { prisma } from "../src/utils/prisma";

async function main() {
  // Ensure cities exist
  let namDinhCity = await prisma.city.findUnique({
    where: { slug: "nam-dinh" }
  });
  if (!namDinhCity) {
    namDinhCity = await prisma.city.create({
      data: {
        name: "Nam Định",
        slug: "nam-dinh",
        isActive: true
      }
    });
    console.log("Created Nam Định City:", namDinhCity.id);
  }

  let haNoiCity = await prisma.city.findUnique({
    where: { slug: "ha-noi" }
  });
  if (!haNoiCity) {
    haNoiCity = await prisma.city.create({
      data: {
        name: "Hà Nội",
        slug: "ha-noi",
        isActive: true
      }
    });
    console.log("Created Hà Nội City:", haNoiCity.id);
  }

  // Update Cinestar Nam Định
  const namDinhCinema = await prisma.cinema.findFirst({
    where: { name: { contains: "Nam Định" } }
  });
  if (namDinhCinema) {
    await prisma.cinema.update({
      where: { id: namDinhCinema.id },
      data: {
        cityId: namDinhCity.id,
        province: "Nam Định"
      }
    });
    console.log("Updated Cinestar Nam Định city relation to Nam Định.");
  }

  // Update Cinestar Láng
  const langCinema = await prisma.cinema.findFirst({
    where: { name: { contains: "Láng" } }
  });
  if (langCinema) {
    await prisma.cinema.update({
      where: { id: langCinema.id },
      data: {
        cityId: haNoiCity.id,
        province: "Hà Nội"
      }
    });
    console.log("Updated Cinestar Láng city relation to Hà Nội.");
  }
  
  console.log("Done database updates!");
}

main().catch(err => {
  console.error(err);
});
