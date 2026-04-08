'use client';

export default function StatCard({ title, value, icon, color = 'blue', trend }) {
  const getColorClass = () => {
    switch (color) {
      case 'blue':
        return 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200';
      case 'green':
        return 'bg-gradient-to-br from-green-50 to-green-100 border-green-200';
      case 'purple':
        return 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200';
      case 'orange':
        return 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200';
      case 'red':
        return 'bg-gradient-to-br from-red-50 to-red-100 border-red-200';
      default:
        return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200';
    }
  };

  const getTextColorClass = () => {
    switch (color) {
      case 'blue':
        return 'text-blue-600';
      case 'green':
        return 'text-green-600';
      case 'purple':
        return 'text-purple-600';
      case 'orange':
        return 'text-orange-600';
      case 'red':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className={`card ${getColorClass()} border-2 hover-lift`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-700 font-semibold text-sm">{title}</h3>
        <span className="text-3xl">{icon}</span>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className={`text-3xl font-bold ${getTextColorClass()}`}>{value}</p>
          {trend && (
            <p className={`text-xs mt-2 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
