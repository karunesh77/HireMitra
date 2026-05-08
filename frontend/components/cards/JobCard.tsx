import Link from 'next/link';
import Card from './Card';

interface JobCardProps {
  id: string;
  title: string;
  category: string;
  location: string;
  jobType: string;
  salary: { min: number; max: number };
  description: string;
  views?: number;
  createdAt?: string;
}

export default function JobCard({ id, title, category, location, jobType, salary, description, views = 0, createdAt }: JobCardProps) {
  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    if (days < 30) return `${Math.floor(days / 7)}w ago`;
    return `${Math.floor(days / 30)}mo ago`;
  };

  return (
    <Link href={`/dashboard/worker/jobs/${id}`}>
      <Card hoverable className="group">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-[#001F3F] group-hover:text-[#FF7A00] transition-colors line-clamp-1">
              {title}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-[#6B7280]">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {location}
              </span>
              <span className="text-[#E5E7EB]">|</span>
              <span>{jobType}</span>
            </div>
          </div>
          <span className="text-xs bg-[#FFF4E5] text-[#FF7A00] px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap ml-3 flex-shrink-0">
            {category}
          </span>
        </div>

        {/* Description */}
        <p className="text-[#6B7280] text-sm line-clamp-2 mb-4 leading-relaxed">{description}</p>

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-[#F3F4F6]">
          <div className="text-[#FF7A00] font-bold text-base">
            ₹{salary.min.toLocaleString()} - ₹{salary.max.toLocaleString()}
          </div>
          <div className="flex items-center gap-3 text-xs text-[#9CA3AF]">
            {views > 0 && <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>{views}</span>}
            {createdAt && <span>{timeAgo(createdAt)}</span>}
          </div>
        </div>
      </Card>
    </Link>
  );
}
