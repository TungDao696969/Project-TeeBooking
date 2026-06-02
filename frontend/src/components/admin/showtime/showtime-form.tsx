// "use client";

// import { useForm } from "react-hook-form";

// import { zodResolver } from "@hookform/resolvers/zod";

// import {
//   ShowtimeFormData,
//   showtimeSchema,
// } from "@/schemas/admin/showtime.schema";

// import { Button } from "@/components/ui/button";

// import { Input } from "@/components/ui/input";

// interface Props {
//   defaultValues?: Partial<ShowtimeFormData>;
//   onSubmit: (data: ShowtimeFormData) => void;
// }

// export default function ShowtimeForm({ defaultValues, onSubmit }: Props) {
//   const form = useForm<ShowtimeFormData>({
//     resolver: zodResolver(showtimeSchema),
//     defaultValues,
//   });

//   return (
//     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//       <Input placeholder="Movie ID" {...form.register("movieId")} />

//       <Input placeholder="Room ID" {...form.register("roomId")} />

//       <Input type="date" {...form.register("showDate")} />

//       <Input type="datetime-local" {...form.register("startTime")} />

//       <Input type="datetime-local" {...form.register("endTime")} />

//       <Input type="number" {...form.register("basePrice")} />

//       <Input placeholder="Format" {...form.register("format")} />

//       <Input placeholder="Language" {...form.register("language")} />

//       <Input placeholder="Subtitle" {...form.register("subtitle")} />

//       <Button type="submit">Save Showtime</Button>
//     </form>
//   );
// }
