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
  id, name, title, location, profileImage, bio,
  skills = [], hourlyRate, rating, totalReviews = 0
}: WorkerCardProps) {
  return (
    <Link href={`/dashboard/workers/${id}`}>
      <Card hoverable className="flex flex-col h-full group">
        {/* Profile Section */}
        <div className="flex items-center gap-3.5 mb-4">
          {profileImage ? (
            <img src={profileImage} alt={name} className="w-14 h-14 rounded-xl object-cover border-2 border-[#FF7A00]/20 group-hover:border-[#FF7A00] transition-colors" />
          ) : (
            <div className="w-14 h-14 rounded-xl border-2 border-[#E5E7EB] flex items-center justify-center text-xl bg-gradient-to-br from-[#FFF4E5] to-[#FFE8CC] group-hover:border-[#FF7A00]/30 transition-colors">
              👤
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-[#001F3F] group-hover:text-[#FF7A00] transition-colors truncate">{name}</h3>
            {title && <p className="text-sm text-[#6B7280] truncate">{title}</p>}
            <p className="text-xs text-[#9CA3AF] flex items-center gap-1 mt-0.5">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {location}
            </p>
          </div>
        </div>

        {/* Rating & Rate */}
        <div className="flex items-center justify-between mb-3">
          {rating !== undefined && (
            <span className="text-sm text-[#6B7280] flex items-center gap-1">
              <span className="text-amber-400">&#9733;</span> {rating.toFixed(1)} <span className="text-[#9CA3AF]">({totalReviews})</span>
            </span>
          )}
          {hourlyRate && <span className="text-[#FF7A00] font-bold text-sm">&#8377;{hourlyRate}/hr</span>}
        </div>

        {/* Bio */}
        {bio && <p className="text-sm text-[#6B7280] mb-3 line-clamp-2 leading-relaxed">{bio}</p>}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {skills.slice(0, 3).map((skill, idx) => (
              <span key={idx} className="px-2 py-0.5 bg-[#FFF4E5] text-[#FF7A00] text-xs rounded-lg font-medium">{skill}</span>
            ))}
            {skills.length > 3 && <span className="px-2 py-0.5 bg-gray-100 text-[#6B7280] text-xs rounded-lg">+{skills.length - 3}</span>}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-3 border-t border-[#F3F4F6]">
          <button className="flex-1 px-3 py-2 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF9A40] hover:from-[#E66A00] hover:to-[#FF7A00] text-white font-medium transition-all text-sm shadow-sm">
            View Profile
          </button>
          <button className="flex-1 px-3 py-2 rounded-xl bg-[#FFF4E5] text-[#FF7A00] hover:bg-[#FFE8CC] font-medium transition-all text-sm">
            Message
          </button>
        </div>
      </Card>
    </Link>
  );
}
