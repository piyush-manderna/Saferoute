const ICONS = {
  police: "🚓",
  hospital: "🏥",
  metro: "🚇",
  open24: "🏪",
};

const LABELS = {
  police: "Police Station",
  hospital: "Hospital",
  metro: "Metro Station",
  open24: "24×7 Space",
};

export default function SafeZoneCard({ zone }) {
  return (
    <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition">
      <div className="text-2xl">{ICONS[zone.type] || "📍"}</div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{zone.name}</p>
        <p className="text-xs text-gray-500">
          {LABELS[zone.type] || "Safe Zone"} • {zone.distance}
        </p>
      </div>
    </div>
  );
}