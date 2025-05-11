import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Calendar, BookOpen, Phone, Trash2 } from 'lucide-react';
import { Student } from '../../types/Student';
import { useStore } from '../../store/useStore';
import Modal from '../modals/Modal';

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const removeStudent = useStore(state => state.removeStudent);

  const handleDelete = () => {
    removeStudent(student.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="card hover:border-primary-200 hover:border transition-all duration-200">
        <div className="flex flex-col sm:flex-row items-center sm:items-start">
          <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center mb-4 sm:mb-0 sm:mr-4">
            {student.avatar ? (
              <img
                src={student.avatar}
                alt={`${student.firstName} ${student.lastName}`}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <User className="h-10 w-10 text-primary-600" />
            )}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-lg font-semibold text-slate-900">
              {student.firstName} {student.lastName}
            </h3>
            <p className="text-sm text-slate-500">ID: {student.id}</p>
            <div className="mt-2">
              <span className={`badge ${student.status === 'Active' ? 'badge-success' : 'badge-neutral'}`}>
                {student.status}
              </span>
              <span className="badge badge-primary ml-2">
                Grade {student.grade}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center text-sm text-slate-600">
            <Calendar className="h-4 w-4 text-slate-400 mr-1" />
            <span>DOB: {student.dateOfBirth}</span>
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <BookOpen className="h-4 w-4 text-slate-400 mr-1" />
            <span>Section: {student.section}</span>
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <Phone className="h-4 w-4 text-slate-400 mr-1" />
            <span>{student.contactNumber}</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between pt-3 border-t border-slate-100">
          <div className="flex space-x-2">
            <Link 
              to={`/students/${student.id}`}
              className="btn btn-sm btn-secondary"
            >
              View Details
            </Link>
            <Link 
              to={`/results/${student.id}`}
              className="btn btn-sm btn-primary"
            >
              View Results
            </Link>
          </div>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="btn btn-sm btn-error flex items-center"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Remove
          </button>
        </div>
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Remove Student"
      >
        <div className="space-y-4">
          <p className="text-slate-700">
            Are you sure you want to remove {student.firstName} {student.lastName}? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-error"
            >
              Remove Student
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default StudentCard;