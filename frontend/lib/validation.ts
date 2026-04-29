/**
 * Email validation
 */
export const validateEmail = (email: string): { valid: boolean; error?: string } => {
  if (!email) {
    return { valid: false, error: 'Email required / Email आवश्यक है' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email / Invalid email' };
  }

  return { valid: true };
};

/**
 * Password validation
 */
export const validatePassword = (password: string): { valid: boolean; error?: string } => {
  if (!password) {
    return { valid: false, error: 'Password required / Password आवश्यक है' };
  }

  if (password.length < 6) {
    return { valid: false, error: 'Min 6 characters / कम से कम 6 वर्ण' };
  }

  return { valid: true };
};

/**
 * Confirm password validation
 */
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): { valid: boolean; error?: string } => {
  if (!confirmPassword) {
    return { valid: false, error: 'Confirm password / Confirm करें' };
  }

  if (password !== confirmPassword) {
    return { valid: false, error: 'Passwords don\'t match / Match नहीं होता' };
  }

  return { valid: true };
};

/**
 * Name validation
 */
export const validateName = (name: string, fieldName: string = 'Name'): { valid: boolean; error?: string } => {
  if (!name) {
    return { valid: false, error: `${fieldName} required / ${fieldName} आवश्यक है` };
  }

  if (name.length < 2) {
    return { valid: false, error: `${fieldName} too short / ${fieldName} बहुत छोटा` };
  }

  return { valid: true };
};

/**
 * Phone validation
 */
export const validatePhone = (phone: string): { valid: boolean; error?: string } => {
  if (!phone) {
    return { valid: false, error: 'Phone required / Phone आवश्यक है' };
  }

  // Basic phone validation - just check for digits
  const phoneDigits = phone.replace(/\D/g, '');
  if (phoneDigits.length < 10) {
    return { valid: false, error: 'Invalid phone / Invalid phone' };
  }

  return { valid: true };
};

/**
 * URL validation
 */
export const validateURL = (url: string): { valid: boolean; error?: string } => {
  if (!url) {
    return { valid: true }; // Optional field
  }

  try {
    new URL(url);
    return { valid: true };
  } catch {
    return { valid: false, error: 'Invalid URL / Invalid URL' };
  }
};

/**
 * Company name validation
 */
export const validateCompanyName = (name: string): { valid: boolean; error?: string } => {
  if (!name) {
    return { valid: false, error: 'Company name required / Company name आवश्यक है' };
  }

  if (name.length < 2) {
    return { valid: false, error: 'Company name too short / Company name बहुत छोटा' };
  }

  return { valid: true };
};

/**
 * Checkbox validation (terms, etc)
 */
export const validateCheckbox = (
  isChecked: boolean,
  fieldName: string = 'Terms'
): { valid: boolean; error?: string } => {
  if (!isChecked) {
    return { valid: false, error: `Please accept ${fieldName} / ${fieldName} स्वीकार करें` };
  }

  return { valid: true };
};

/**
 * Validate all registration fields
 */
export interface RegistrationErrors {
  [key: string]: string;
}

export const validateWorkerRegistration = (formData: {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  termsAccepted?: boolean;
}): { valid: boolean; errors: RegistrationErrors } => {
  const errors: RegistrationErrors = {};

  // Combine firstName and lastName for full name validation
  const fullName = `${formData.firstName || ''} ${formData.lastName || ''}`.trim();

  if (!fullName || fullName.length < 2) {
    errors.firstName = 'Full name required (min 2 chars) / पूरा नाम आवश्यक है';
  }

  const emailVal = validateEmail(formData.email || '');
  if (!emailVal.valid) {
    errors.email = emailVal.error || 'Invalid email';
  }

  const phoneVal = validatePhone(formData.phone || '');
  if (!phoneVal.valid) {
    errors.phone = phoneVal.error || 'Invalid phone';
  }

  const passwordVal = validatePassword(formData.password || '');
  if (!passwordVal.valid) {
    errors.password = passwordVal.error || 'Invalid password';
  }

  const confirmPasswordVal = validateConfirmPassword(
    formData.password || '',
    formData.confirmPassword || ''
  );
  if (!confirmPasswordVal.valid) {
    errors.confirmPassword = confirmPasswordVal.error || 'Passwords don\'t match';
  }

  const termsVal = validateCheckbox(formData.termsAccepted || false, 'Terms and Conditions');
  if (!termsVal.valid) {
    errors.termsAccepted = termsVal.error || 'Accept terms';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateEmployerRegistration = (formData: {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  website?: string;
  password?: string;
  confirmPassword?: string;
  authorizationAccepted?: boolean;
}): { valid: boolean; errors: RegistrationErrors } => {
  const errors: RegistrationErrors = {};

  if (!formData.firstName) {
    errors.firstName = 'First name required / First name आवश्यक है';
  }

  if (!formData.lastName) {
    errors.lastName = 'Last name required / Last name आवश्यक है';
  }

  const emailVal = validateEmail(formData.email || '');
  if (!emailVal.valid) {
    errors.email = emailVal.error || 'Invalid email';
  }

  const phoneVal = validatePhone(formData.phone || '');
  if (!phoneVal.valid) {
    errors.phone = phoneVal.error || 'Invalid phone';
  }

  const companyVal = validateCompanyName(formData.companyName || '');
  if (!companyVal.valid) {
    errors.companyName = companyVal.error || 'Invalid company name';
  }

  if (formData.website) {
    const urlVal = validateURL(formData.website);
    if (!urlVal.valid) {
      errors.website = urlVal.error || 'Invalid URL';
    }
  }

  const passwordVal = validatePassword(formData.password || '');
  if (!passwordVal.valid) {
    errors.password = passwordVal.error || 'Invalid password';
  }

  const confirmPasswordVal = validateConfirmPassword(
    formData.password || '',
    formData.confirmPassword || ''
  );
  if (!confirmPasswordVal.valid) {
    errors.confirmPassword = confirmPasswordVal.error || 'Passwords don\'t match';
  }

  const authVal = validateCheckbox(
    formData.authorizationAccepted || false,
    'Authorization'
  );
  if (!authVal.valid) {
    errors.authorizationAccepted = authVal.error || 'Accept authorization';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};
