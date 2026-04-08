// Simple email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number (basic)
const isValidPhone = (phone) => {
  const phoneRegex = /^\d{10}$/; // 10 digits
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

// Validate password strength
const isStrongPassword = (password) => {
  return password.length >= 6; // Minimum 6 characters
};

// Validate required fields
const validateRequired = (fields, obj) => {
  for (let field of fields) {
    if (!obj[field] || obj[field].trim() === '') {
      return { isValid: false, message: `${field} is required` };
    }
  }
  return { isValid: true };
};

module.exports = {
  isValidEmail,
  isValidPhone,
  isStrongPassword,
  validateRequired
};
