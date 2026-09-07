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

const ACCENT = {
  police: "hover:border-blue-300 hover:shadow-blue-100",
  hospital: "hover:border-red-300 hover:shadow-red-100",
  metro: "hover:border-purple-300 hover:shadow-purple-100",
  open24: "hover:border-green-300 hover:shadow-green-100",
};

export default function SafeZoneCard({ zone }) {
  return (
    <div
      className={`flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-3 shadow-sm
        transition-all duration-200 ease-out cursor-pointer
        hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]
        active:scale-[0.98] active:translate-y-0
        ${ACCENT[zone.type] || "hover:border-gray-300"}`}
    >
      <div className="text-2xl transition-transform duration-200 group-hover:scale-110">
        {ICONS[zone.type] || "📍"}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{zone.name}</p>
        <p className="text-xs text-gray-500">
          {LABELS[zone.type] || "Safe Zone"} • {zone.distance}
        </p>
      </div>
    </div>
  );
}