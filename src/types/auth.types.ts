export type UserRole = 'student' | 'admin';

export interface StudentProfile {
  uid: string;
  studentId: string;
  fullName: string;
  mobileNumber: string;
  email: string;
  course: string;
  batch: string;
  profilePhotoUrl: string;
  registrationDate: Date | string;
  role: 'student';
  isActive: boolean;
  totalExams: number;
  completedExams: number;
  averagePercentage: number;
}

export interface AdminProfile {
  uid: string;
  fullName: string;
  email: string;
  role: 'admin';
  securityPinEnabled: boolean;
}
