import { prisma } from "../src/utils/prisma";

async function main() {
  const cinemas = await prisma.cinema.findMany({
    include: {
      city: true
    }
  });
  console.log("Cinemas in DB:");
  cinemas.forEach(c => {
    console.log(`- ID: ${c.id}, Name: ${c.name}, CityId: ${c.cityId}, CityName: ${c.city?.name}, CitySlug: ${c.city?.slug}, Province: ${c.province}`);
  });

  const cities = await prisma.city.findMany();
  console.log("Cities in DB:");
  cities.forEach(ct => {
    console.log(`- ID: ${ct.id}, Name: ${ct.name}, Slug: ${ct.slug}`);
  });
}

main().catch(err => {
  console.error(err);
});
