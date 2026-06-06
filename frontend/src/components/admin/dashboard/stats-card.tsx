import { Card, CardContent } from "@/components/ui/card";

interface Props {
  title: string;
  value: string | number;
}

export default function StatsCard({ title, value }: Props) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="space-y-2">
          <p className="text-sm text-zinc-500">{title}</p>

          <h2 className="text-3xl font-bold">{value}</h2>
        </div>
      </CardContent>
    </Card>
  );
}
