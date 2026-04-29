import Card from './Card';

type ApplicationStatus = 'pending' | 'accepted' | 'rejected';

interface ApplicationCardProps {
  id: string;
  jobTitle: string;
  companyName?: string;
  location: string;
  salary: {
    min: number;
    max: number;
  };
  status: ApplicationStatus;
  appliedAt: string;
  message?: string;
  onClick?: () => void;
}

export default function ApplicationCard({
  id,
  jobTitle,
  companyName,
  location,
  salary,
  status,
  appliedAt,
  message,
  onClick
}: ApplicationCardProps) {
  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-[#4A4A4A] border-[#E5E7EB]';
    }
  };

  const getStatusLabel = (status: ApplicationStatus) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Card hoverable onClick={onClick}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-[#001F3F] mb-2">{jobTitle}</h3>
          <p className="text-[#4A4A4A] mb-2">
            {companyName && (
              <>
                <span className="font-medium">{companyName}</span>
                {' • '}
              </>
            )}
            {location}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(status)}`}>
          {getStatusLabel(status)}
        </span>
      </div>

      {/* Salary & Date */}
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-[#E5E7EB]">
        <div className="text-orange-600 font-bold">
          ₹{salary.min} - ₹{salary.max}
        </div>
        <p className="text-sm text-[#4A4A4A]">
          Applied on {new Date(appliedAt).toLocaleDateString()}
        </p>
      </div>

      {/* Message */}
      {message && (
        <div className="p-3 bg-[#FFF4E5] rounded-lg border border-[#E5E7EB]">
          <p className="text-sm text-[#4A4A4A]">
            <span className="font-medium">Your Message:</span> {message}
          </p>
        </div>
      )}
    </Card>
  );
}
