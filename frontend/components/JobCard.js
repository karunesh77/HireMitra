'use client';

import Link from 'next/link';

export default function JobCard({ job }) {
  const getPaymentTypeLabel = (type) => {
    return {
      'hourly': '$/hr',
      'fixed': 'Fixed',
      'daily': '$/day'
    }[type] || type;
  };

  return (
    <div className="card hover-lift hover-scale group">
      {/* Header */}
      <div className="flex justify-between items-start mb-4 gap-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {job.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
            🏢 {job.postedBy?.companyName || job.postedBy?.name}
          </p>
        </div>
        {job.isUrgent && (
          <span className="badge badge-danger animate-pulse">
            ⚡ URGENT
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-relaxed">
        {job.description}
      </p>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-gray-600 text-xs">Location</p>
          <p className="font-semibold text-gray-900">📍 {job.location?.city}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-gray-600 text-xs">Salary</p>
          <p className="font-semibold text-green-600">
            💰 ${job.salary}/{getPaymentTypeLabel(job.paymentType)}
          </p>
        </div>
      </div>

      {job.distance && (
        <div className="bg-blue-50 rounded-lg p-2 mb-4 text-sm text-blue-900 font-medium">
          📏 {job.distance} from your location
        </div>
      )}

      {/* Skills */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-gray-600 mb-2">Required Skills</p>
        <div className="flex flex-wrap gap-2">
          {job.requiredSkills?.slice(0, 2).map((skill) => (
            <span key={skill} className="badge badge-primary text-xs">
              {skill.replace('_', ' ')}
            </span>
          ))}
          {job.requiredSkills?.length > 2 && (
            <span className="badge badge-gray text-xs">
              +{job.requiredSkills.length - 2} more
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          📅 {new Date(job.createdAt).toLocaleDateString()}
        </p>
        <Link href={`/jobs/${job._id}`} className="btn-primary btn-small">
          View Details →
        </Link>
      </div>
    </div>
  );
}
