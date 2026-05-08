import Card from './Card';

type ApplicationStatus = 'pending' | 'accepted' | 'rejected';

interface ApplicationCardProps {
  id: string;
  jobTitle: string;
  companyName?: string;
  location: string;
  salary: { min: number; max: number };
  status: ApplicationStatus;
  appliedAt: string;
  message?: string;
  onClick?: () => void;
}

export default function ApplicationCard({
  id, jobTitle, companyName, location, salary, status, appliedAt, message, onClick
}: ApplicationCardProps) {
  const statusConfig = {
    accepted: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500', label: 'Accepted' },
    rejected: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', dot: 'bg-red-500', label: 'Rejected' },
    pending: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500', label: 'Pending' },
  };

  const s = statusConfig[status] || statusConfig.pending;

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <Card hoverable onClick={onClick} className="group">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-[#001F3F] group-hover:text-[#FF7A00] transition-colors line-clamp-1">{jobTitle}</h3>
          <p className="text-sm text-[#6B7280] mt-1">
            {companyName && <><span className="font-medium text-[#4A4A4A]">{companyName}</span> &middot; </>}
            {location}
          </p>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${s.bg} ${s.text} ${s.border} ml-3 flex-shrink-0`}>
          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}></span>
          {s.label}
        </span>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-[#F3F4F6]">
        <span className="text-[#FF7A00] font-bold">&#8377;{salary.min.toLocaleString()} - &#8377;{salary.max.toLocaleString()}</span>
        <span className="text-xs text-[#9CA3AF]">Applied {timeAgo(appliedAt)}</span>
      </div>

      {message && (
        <div className="mt-3 p-3 bg-[#FAFAFA] rounded-xl">
          <p className="text-xs text-[#6B7280] line-clamp-2">
            <span className="font-semibold text-[#4A4A4A]">Your note:</span> {message}
          </p>
        </div>
      )}
    </Card>
  );
}
