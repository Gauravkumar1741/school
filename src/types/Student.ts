export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  grade: number;
  section: string;
  contactNumber: string;
  email: string;
  address: string;
  guardian: {
    name: string;
    relation: string;
    contact: string;
    email: string;
  };
  status: 'Active' | 'Inactive';
  avatar?: string;
  admissionDate: string;
  bloodGroup?: string;
}