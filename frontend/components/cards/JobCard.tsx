import Link from 'next/link';
import Card from './Card';

interface JobCardProps {
  id: string;
  title: string;
  category: string;
  location: string;
  jobType: string;
  salary: {
    min: number;
    max: number;
  };
  description: string;
  views?: number;
  createdAt?: string;
}

export default function JobCard({
  id,
  title,
  category,
  location,
  jobType,
  salary,
  description,
  views = 0,
  createdAt
}: JobCardProps) {
  return (
    <Link href={`/dashboard/jobs/${id}`}>
      <Card hoverable>
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#001F3F] group-hover:text-[#FF7A00] transition">
              {title}
            </h3>
            <p className="text-[#4A4A4A] text-sm mt-1">
              {location} • {jobType}
            </p>
          </div>
          <span className="text-xs bg-[#FFF4E5] text-[#FF7A00] px-3 py-1 rounded-full font-medium whitespace-nowrap ml-4">
            {category}
          </span>
        </div>

        {/* Description */}
        <p className="text-[#4A4A4A] line-clamp-2 mb-4">
          {description}
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center">
          <div className="text-orange-600 font-bold">
            ₹{salary.min} - ₹{salary.max}
          </div>
          <div className="flex gap-4 text-sm text-[#4A4A4A]">
            {views > 0 && <span>👁️ {views} views</span>}
            {createdAt && <span>📅 {new Date(createdAt).toLocaleDateString()}</span>}
          </div>
        </div>
      </Card>
    </Link>
  );
}
