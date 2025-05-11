import React, { useState } from 'react';
import { User, Mail, Phone, BookOpen, Trash2 } from 'lucide-react';
import { Teacher } from '../../types/Teacher';
import { useStore } from '../../store/useStore';
import Modal from '../modals/Modal';

interface TeacherCardProps {
  teacher: Teacher;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const removeTeacher = useStore(state => state.removeTeacher);

  const handleDelete = () => {
    removeTeacher(teacher.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="card hover:border-primary-200 hover:border transition-all duration-200">
        <div className="flex flex-col sm:flex-row items-center sm:items-start">
          <div className="h-20 w-20 rounded-full bg-accent-100 flex items-center justify-center mb-4 sm:mb-0 sm:mr-4">
            {teacher.avatar ? (
              <img
                src={teacher.avatar}
                alt={`${teacher.firstName} ${teacher.lastName}`}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <User className="h-10 w-10 text-accent-600" />
            )}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-lg font-semibold text-slate-900">
              {teacher.firstName} {teacher.lastName}
            </h3>
            <p className="text-sm text-slate-500">{teacher.designation}</p>
            <div className="mt-2">
              <span className="badge badge-accent">
                {teacher.department}
              </span>
              <span className="badge badge-neutral ml-2">
                {teacher.employeeId}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center text-sm text-slate-600">
            <Mail className="h-4 w-4 text-slate-400 mr-1" />
            <span>{teacher.email}</span>
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <Phone className="h-4 w-4 text-slate-400 mr-1" />
            <span>{teacher.phone}</span>
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <BookOpen className="h-4 w-4 text-slate-400 mr-1" />
            <span>Subjects: {teacher.subjects.join(', ')}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between">
          <button className="btn btn-sm btn-accent">
            Contact Teacher
          </button>
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
        title="Remove Teacher"
      >
        <div className="space-y-4">
          <p className="text-slate-700">
            Are you sure you want to remove {teacher.firstName} {teacher.lastName}? This action cannot be undone.
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
              Remove Teacher
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TeacherCard;