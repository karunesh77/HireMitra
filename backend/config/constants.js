// User Types
const USER_TYPES = {
  WORKER: 'worker',
  EMPLOYER: 'employer'
};

// Job Status
const JOB_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
  FILLED: 'filled'
};

// Application Status
const APPLICATION_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  WITHDRAWN: 'withdrawn'
};

// Skills (for workers)
const SKILLS = [
  'plumbing',
  'electrical',
  'carpentry',
  'hvac',
  'roofing',
  'painting',
  'landscaping',
  'heavy_equipment',
  'welding',
  'driving',
  'other'
];

module.exports = {
  USER_TYPES,
  JOB_STATUS,
  APPLICATION_STATUS,
  SKILLS
};
