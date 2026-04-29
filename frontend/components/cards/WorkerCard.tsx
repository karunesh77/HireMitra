import Link from 'next/link';
import Card from './Card';

interface WorkerCardProps {
  id: string;
  name: string;
  title?: string;
  location: string;
  profileImage?: string;
  bio?: string;
  skills?: string[];
  hourlyRate?: number;
  rating?: number;
  totalReviews?: number;
}

export default function WorkerCard({
  id,
  name,
  title,
  location,
  profileImage,
  bio,
  skills = [],
  hourlyRate,
  rating,
  totalReviews = 0
}: WorkerCardProps) {
  return (
    <Link href={`/dashboard/workers/${id}`}>
      <Card hoverable className="flex flex-col h-full">
        {/* Profile Section */}
        <div className="flex items-center gap-4 mb-4">
          {profileImage ? (
            <img
              src={profileImage}
              alt={name}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#FF7A00]"
            />
          ) : (
            <div className="w-16 h-16 rounded-full border-2 border-[#E5E7EB] flex items-center justify-center text-2xl bg-[#FFF4E5]">
              👤
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#001F3F]">{name}</h3>
            {title && <p className="text-sm text-[#4A4A4A]">{title}</p>}
            <p className="text-sm text-[#4A4A4A]">{location}</p>
          </div>
        </div>

        {/* Rating */}
        {rating !== undefined && (
          <div className="mb-4">
            <p className="text-sm text-[#4A4A4A]">
              ⭐ {rating.toFixed(1)} <span className="text-[#4A4A4A]">({totalReviews} reviews)</span>
            </p>
          </div>
        )}

        {/* Bio */}
        {bio && (
          <p className="text-sm text-[#4A4A4A] mb-4 line-clamp-2">
            {bio}
          </p>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-[#FFF4E5] text-[#FF7A00] text-xs rounded-full font-medium"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-[#4A4A4A] text-xs rounded-full">
                  +{skills.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Hourly Rate */}
        {hourlyRate && (
          <p className="text-orange-600 font-bold mb-4">
            ₹{hourlyRate}/hour
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <button className="flex-1 px-4 py-2 rounded-lg bg-[#FF7A00] hover:bg-[#E66A00] text-white font-medium transition text-center text-sm">
            View Profile
          </button>
          <button className="flex-1 px-4 py-2 rounded-lg bg-[#FFF4E5] text-[#FF7A00] hover:bg-orange-200 font-medium transition text-center text-sm">
            Message
          </button>
        </div>
      </Card>
    </Link>
  );
}
