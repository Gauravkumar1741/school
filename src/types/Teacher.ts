export interface Teacher {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  subjects: string[];
  qualifications: string[];
  joinDate: string;
  address: string;
  avatar?: string;
}