export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  location: string;
  status: 'Active' | 'Inactive';
  avatar?: string;
}

export interface PersonalInfoForm {
  firstName: string;
  lastName: string;
  newPassword: string;
  confirmedNewPassword: string;
}

export interface SecurityForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface SettingsForm {
  language: string;
  timeZone: string;
  emailNotifications: boolean;
  inAppNotifications: boolean;
  pushNotifications: boolean;
}

export interface DropdownOption {
  label: string;
  value: string;
}