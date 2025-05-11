import React from 'react';
import { useForm } from 'react-hook-form';
import { Teacher } from '../../types/Teacher';
import { useStore } from '../../store/useStore';

interface AddTeacherFormProps {
  onSuccess: () => void;
}

const AddTeacherForm: React.FC<AddTeacherFormProps> = ({ onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Teacher>();
  const addTeacher = useStore(state => state.addTeacher);
  
  const onSubmit = (data: Teacher) => {
    const newTeacher = {
      ...data,
      id: `T${Math.floor(Math.random() * 90000) + 10000}`,
      employeeId: `EMP${new Date().getFullYear()}-${Math.floor(Math.random() * 900) + 100}`,
      subjects: data.subjects || [],
      qualifications: data.qualifications || []
    };
    
    addTeacher(newTeacher);
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
          <label className="form-label" htmlFor="phone">Phone</label>
          <input
            {...register('phone', { required: 'Phone number is required' })}
            type="tel"
            id="phone"
            className="form-input"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
        
        <div>
          <label className="form-label" htmlFor="designation">Designation</label>
          <input
            {...register('designation', { required: 'Designation is required' })}
            type="text"
            id="designation"
            className="form-input"
          />
          {errors.designation && (
            <p className="text-red-500 text-sm mt-1">{errors.designation.message}</p>
          )}
        </div>
        
        <div>
          <label className="form-label" htmlFor="department">Department</label>
          <select
            {...register('department', { required: 'Department is required' })}
            id="department"
            className="form-input"
          >
            <option value="">Select Department</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="Languages">Languages</option>
            <option value="Social Studies">Social Studies</option>
            <option value="Physical Education">Physical Education</option>
          </select>
          {errors.department && (
            <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>
          )}
        </div>
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
      
      <div>
        <label className="form-label" htmlFor="joinDate">Join Date</label>
        <input
          {...register('joinDate', { required: 'Join date is required' })}
          type="date"
          id="joinDate"
          className="form-input"
        />
        {errors.joinDate && (
          <p className="text-red-500 text-sm mt-1">{errors.joinDate.message}</p>
        )}
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
          Add Teacher
        </button>
      </div>
    </form>
  );
};

export default AddTeacherForm;