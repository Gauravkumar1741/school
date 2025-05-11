import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Phone, Mail, Home, Calendar, BookOpen, Clock, Droplet } from 'lucide-react';
import PageTitle from '../components/ui/PageTitle';
import { students, getStudentResults } from '../data/mockData';
import { calculateGrade, calculatePercentage } from '../utils/gradeUtils';

const StudentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const student = students.find(s => s.id === id);
  
  if (!student) {
    return (
      <div className="card text-center py-12">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Student Not Found</h2>
        <p className="text-slate-600 mb-6">The student you are looking for doesn't exist or has been removed.</p>
        <Link to="/students" className="btn btn-primary">
          Return to Student List
        </Link>
      </div>
    );
  }
  
  const studentResults = getStudentResults(student.id);
  const totalMarks = studentResults.reduce((sum, subject) => sum + subject.marks, 0);
  const totalMaxMarks = studentResults.reduce((sum, subject) => sum + subject.maxMarks, 0);
  const percentage = calculatePercentage(totalMarks, totalMaxMarks);
  const grade = calculateGrade(percentage);
  
  return (
    <div>
      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-primary-600 hover:text-primary-800"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </button>
      </div>
      
      <div className="card mb-6">
        <div className="md:flex md:items-center">
          <div className="flex justify-center md:justify-start md:flex-shrink-0 md:mr-6">
            <div className="h-24 w-24 md:h-32 md:w-32 rounded-full bg-primary-100 flex items-center justify-center">
              {student.avatar ? (
                <img 
                  src={student.avatar}
                  alt={`${student.firstName} ${student.lastName}`}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <User className="h-12 w-12 md:h-16 md:w-16 text-primary-600" />
              )}
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              {student.firstName} {student.lastName}
            </h1>
            <p className="text-slate-600">Student ID: {student.id}</p>
            <div className="mt-2 mb-4">
              <span className={`badge ${student.status === 'Active' ? 'badge-success' : 'badge-neutral'}`}>
                {student.status}
              </span>
              <span className="badge badge-primary ml-2">
                Grade {student.grade}
              </span>
              <span className="badge badge-neutral ml-2">
                Section {student.section}
              </span>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4">
              <Link to={`/results/${student.id}`} className="btn btn-primary">
                View Results
              </Link>
              <button className="btn btn-secondary">
                Edit Details
              </button>
              <button className="btn btn-accent">
                Contact Guardian
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-primary-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500">Date of Birth</p>
                  <p className="text-slate-900">{student.dateOfBirth}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-primary-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500">Contact Number</p>
                  <p className="text-slate-900">{student.contactNumber}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-primary-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500">Email Address</p>
                  <p className="text-slate-900">{student.email}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Home className="h-5 w-5 text-primary-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500">Address</p>
                  <p className="text-slate-900">{student.address}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-primary-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500">Admission Date</p>
                  <p className="text-slate-900">{student.admissionDate}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Droplet className="h-5 w-5 text-primary-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500">Blood Group</p>
                  <p className="text-slate-900">{student.bloodGroup || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Guardian Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <User className="h-5 w-5 text-accent-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500">Guardian Name</p>
                  <p className="text-slate-900">{student.guardian.name}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-5 w-5 text-accent-500 mr-2 mt-0.5 flex items-center justify-center">
                  <span className="text-sm font-semibold">R</span>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Relation</p>
                  <p className="text-slate-900">{student.guardian.relation}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-accent-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500">Contact Number</p>
                  <p className="text-slate-900">{student.guardian.contact}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-accent-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500">Email Address</p>
                  <p className="text-slate-900">{student.guardian.email}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Academic Information</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Subject
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Teacher
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Marks
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Grade
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {studentResults.map((subject) => {
                    const subjectPercentage = calculatePercentage(subject.marks, subject.maxMarks);
                    const subjectGrade = calculateGrade(subjectPercentage);
                    const isPassing = subjectPercentage >= 40;
                    
                    return (
                      <tr key={subject.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                          {subject.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-slate-700">
                          {subject.teacher}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-slate-700">
                          {subject.marks} / {subject.maxMarks}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                          <span className={`inline-block w-8 h-8 rounded-full flex items-center justify-center ${
                            isPassing ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {subjectGrade}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-700">
                    <span className="font-medium">Total Marks:</span> {totalMarks} / {totalMaxMarks}
                  </p>
                  <p className="text-slate-700">
                    <span className="font-medium">Percentage:</span> {percentage.toFixed(2)}%
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">
                    <span className={percentage >= 40 ? 'text-green-600' : 'text-red-600'}>
                      {grade}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">Overall Grade</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="card mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Attendance Summary</h2>
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-700">Present Days</span>
              <span className="text-slate-900 font-semibold">85</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-700">Absent Days</span>
              <span className="text-slate-900 font-semibold">5</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-700">Leave Days</span>
              <span className="text-slate-900 font-semibold">3</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-700">Total Working Days</span>
              <span className="text-slate-900 font-semibold">93</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-200">
              <span className="text-slate-700 font-medium">Attendance Rate</span>
              <span className="text-green-600 font-bold">91.4%</span>
            </div>
          </div>
          
          <div className="card mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Fee Information</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Tuition Fee</span>
                <span className="text-slate-900 font-semibold">$2,500</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Library Fee</span>
                <span className="text-slate-900 font-semibold">$200</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Sports Fee</span>
                <span className="text-slate-900 font-semibold">$150</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Computer Lab Fee</span>
                <span className="text-slate-900 font-semibold">$300</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="text-slate-700 font-medium">Total</span>
                <span className="text-slate-900 font-bold">$3,150</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700 font-medium">Status</span>
                <span className="badge badge-success">Paid</span>
              </div>
              <div className="pt-2">
                <button className="btn btn-secondary w-full">View Payment History</button>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Activities & Clubs</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="h-2 w-2 bg-primary-500 rounded-full mr-2"></span>
                <span className="text-slate-700">Science Club</span>
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-accent-500 rounded-full mr-2"></span>
                <span className="text-slate-700">Basketball Team</span>
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-amber-500 rounded-full mr-2"></span>
                <span className="text-slate-700">Debate Club</span>
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-emerald-500 rounded-full mr-2"></span>
                <span className="text-slate-700">Photography Club</span>
              </li>
            </ul>
            <button className="btn btn-secondary w-full mt-4">Manage Activities</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;