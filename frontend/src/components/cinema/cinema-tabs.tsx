// "use client";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// import CinemaInfo from "./cinema-info";
// import CinemaRooms from "./cinema-rooms";

// import { CinemaDetail } from "@/types/cinema.type";

// interface Props {
//   cinema: CinemaDetail;
// }

// export default function CinemaTabs({ cinema }: Props) {
//   return (
//     <Tabs defaultValue="rooms">
//       <TabsList className="bg-[#111c3d] border border-white/10">
//         <TabsTrigger value="rooms">Danh sách phòng chiếu</TabsTrigger>

//         <TabsTrigger value="info">Thông tin rạp</TabsTrigger>
//       </TabsList>

//       <TabsContent value="rooms" className="mt-8">
//         <CinemaRooms rooms={cinema.rooms} />
//       </TabsContent>

//       <TabsContent value="info" className="mt-8">
//         <CinemaInfo cinema={cinema} />
//       </TabsContent>
//     </Tabs>
//   );
// }
