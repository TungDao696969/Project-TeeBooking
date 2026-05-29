export default function SeatLegend() {
  return (
    <div className="flex flex-wrap justify-center gap-4 text-sm">
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 rounded bg-gray-300" />
        Standard
      </div>

      <div className="flex items-center gap-2">
        <div className="h-4 w-4 rounded bg-yellow-400" />
        VIP
      </div>

      <div className="flex items-center gap-2">
        <div className="h-4 w-4 rounded bg-pink-400" />
        Couple
      </div>

      <div className="flex items-center gap-2">
        <div className="h-4 w-4 rounded ring-2 ring-green-500" />
        Selected
      </div>
    </div>
  );
}
