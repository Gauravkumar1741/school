import React from 'react';
import { useForm } from 'react-hook-form';
import { Student } from '../../types/Student';
import { useStore } from '../../store/useStore';

interface AddStudentFormProps {
  onSuccess: () => void;
}

const AddStudentForm: React.FC<AddStudentFormProps> = ({ onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Student>();
  const addStudent = useStore(state => state.addStudent);
  
  const onSubmit = (data: Student) => {
    const newStudent = {
      ...data,
      id: `S${Math.floor(Math.random() * 90000) + 10000}`,
      status: 'Active' as const,
      guardian: {
        name: data.guardian?.name || '',
        relation: data.guardian?.relation || '',
        contact: data.guardian?.contact || '',
        email: data.guardian?.email || '',
      }
    };
    
    addStudent(newStudent);
    onSuccess();
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label" htmlFor="firstName">First Name</label>
          <input
            {...register('firstName', { required: 'First name is required' })}
            type="text"
            id="firstName"
            className="form-input"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
          )}
        </div>
        
        <div>
          <label className="form-label" htmlFor="lastName">Last Name</label>
          <input
            {...register('lastName', { required: 'Last name is required' })}
            type="text"
            id="lastName"
            className="form-input"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
          )}
        </div>
        
        <div>
          <label className="form-label" htmlFor="dateOfBirth">Date of Birth</label>
          <input
            {...register('dateOfBirth', { required: 'Date of birth is required' })}
            type="date"
            id="dateOfBirth"
            className="form-input"
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>
          )}
        </div>
        
        <div>
          <label className="form-label" htmlFor="grade">Grade</label>
          <select
            {...register('grade', { required: 'Grade is required' })}
            id="grade"
            className="form-input"
          >
            <option value="">Select Grade</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
          {errors.grade && (
            <p className="text-red-500 text-sm mt-1">{errors.grade.message}</p>
          )}
        </div>
        
        <div>
          <label className="form-label" htmlFor="section">Section</label>
          <select
            {...register('section', { required: 'Section is required' })}
            id="section"
            className="form-input"
          >
            <option value="">Select Section</option>
            {['A', 'B', 'C', 'D'].map(section => (
              <option key={section} value={section}>{section}</option>
            ))}
          </select>
          {errors.section && (
            <p className="text-red-500 text-sm mt-1">{errors.section.message}</p>
          )}
        </div>
        
        <div>
          <label className="form-label" htmlFor="contactNumber">Contact Number</label>
          <input
            {...register('contactNumber', { required: 'Contact number is required' })}
            type="tel"
            id="contactNumber"
            className="form-input"
          />
          {errors.contactNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.contactNumber.message}</p>
          )}
        </div>
      </div>
      
      <div>
        <label className="form-label" htmlFor="email">Email</label>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          type="email"
          id="email"
          className="form-input"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      
      <div>
        <label className="form-label" htmlFor="address">Address</label>
        <textarea
          {...register('address', { required: 'Address is required' })}
          id="address"
          rows={3}
          className="form-input"
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>
      
      <div className="border-t border-slate-200 pt-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Guardian Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label" htmlFor="guardianName">Guardian Name</label>
            <input
              {...register('guardian.name', { required: 'Guardian name is required' })}
              type="text"
              id="guardianName"
              className="form-input"
            />
          </div>
          
          <div>
            <label className="form-label" htmlFor="guardianRelation">Relation</label>
            <input
              {...register('guardian.relation', { required: 'Relation is required' })}
              type="text"
              id="guardianRelation"
              className="form-input"
            />
          </div>
          
          <div>
            <label className="form-label" htmlFor="guardianContact">Contact</label>
            <input
              {...register('guardian.contact', { required: 'Guardian contact is required' })}
              type="tel"
              id="guardianContact"
              className="form-input"
            />
          </div>
          
          <div>
            <label className="form-label" htmlFor="guardianEmail">Email</label>
            <input
              {...register('guardian.email', {
                required: 'Guardian email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              type="email"
              id="guardianEmail"
              className="form-input"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => onSuccess()}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Add Student
        </button>
      </div>
    </form>
  );
};

export default AddStudentForm;