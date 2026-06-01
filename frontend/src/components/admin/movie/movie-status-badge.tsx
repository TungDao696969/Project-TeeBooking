import { Badge } from "@/components/ui/badge";

interface Props {
  status: string;
}

export default function MovieStatusBadge({ status }: Props) {
  switch (status) {
    case "now_showing":
      return <Badge className="bg-green-600">Now Showing</Badge>;

    case "coming_soon":
      return <Badge className="bg-yellow-500">Coming Soon</Badge>;

    default:
      return <Badge variant="destructive">Ended</Badge>;
  }
}
