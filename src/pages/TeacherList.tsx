import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import PageTitle from '../components/ui/PageTitle';
import TeacherCard from '../components/teachers/TeacherCard';
import Modal from '../components/modals/Modal';
import AddTeacherForm from '../components/forms/AddTeacherForm';
import { useStore } from '../store/useStore';

const TeacherList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const teachers = useStore(state => state.teachers);
  
  // Get unique departments for filter dropdown
  const uniqueDepartments = [...new Set(teachers.map(teacher => teacher.department))].sort();
  
  // Filter teachers based on search and department filter
  const filteredTeachers = teachers.filter(teacher => {
    const fullName = `${teacher.firstName} ${teacher.lastName}`.toLowerCase();
    const searchMatch = searchTerm === '' || 
      fullName.includes(searchTerm.toLowerCase()) || 
      teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const departmentMatch = departmentFilter === '' || teacher.department === departmentFilter;
    
    return searchMatch && departmentMatch;
  });
  
  return (
    <div>
      <PageTitle 
        title="Teacher Directory" 
        subtitle="View all teachers and their information"
        action={
          <button 
            onClick={() => setIsAddModalOpen(true)} 
            className="btn btn-primary"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Teacher
          </button>
        }
      />
      
      <div className="card mb-6">
        <div className="sm:flex sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="w-full sm:w-1/2 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search teachers by name, ID or subject..."
              className="form-input pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
          
          <div className="flex items-center space-x-2">
            <select 
              value={departmentFilter} 
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="form-input"
            >
              <option value="">All Departments</option>
              {uniqueDepartments.map(department => (
                <option key={department} value={department}>{department}</option>
              ))}
            </select>
            
            <button 
              onClick={() => {
                setSearchTerm('');
                setDepartmentFilter('');
              }}
              className="btn btn-secondary"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      
      {filteredTeachers.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-lg text-slate-600">No teachers found matching your criteria.</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setDepartmentFilter('');
            }}
            className="btn btn-primary mt-4"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      )}
      
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Teacher"
      >
        <AddTeacherForm onSuccess={() => setIsAddModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default TeacherList;