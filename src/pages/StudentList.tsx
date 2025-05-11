import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter } from 'lucide-react';
import PageTitle from '../components/ui/PageTitle';
import StudentCard from '../components/students/StudentCard';
import Modal from '../components/modals/Modal';
import AddStudentForm from '../components/forms/AddStudentForm';
import { useStore } from '../store/useStore';

const StudentList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState<number | ''>('');
  const [sectionFilter, setSectionFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const students = useStore(state => state.students);
  
  // Get unique grades and sections for filter dropdowns
  const uniqueGrades = [...new Set(students.map(student => student.grade))].sort((a, b) => a - b);
  const uniqueSections = [...new Set(students.map(student => student.section))].sort();
  
  // Filter students based on search and filters
  const filteredStudents = students.filter(student => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    const searchMatch = searchTerm === '' || 
      fullName.includes(searchTerm.toLowerCase()) || 
      student.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const gradeMatch = gradeFilter === '' || student.grade === gradeFilter;
    const sectionMatch = sectionFilter === '' || student.section === sectionFilter;
    const statusMatch = statusFilter === '' || student.status === statusFilter;
    
    return searchMatch && gradeMatch && sectionMatch && statusMatch;
  });
  
  const resetFilters = () => {
    setSearchTerm('');
    setGradeFilter('');
    setSectionFilter('');
    setStatusFilter('');
  };
  
  return (
    <div>
      <PageTitle 
        title="Student Directory" 
        subtitle="View and manage all students"
        action={
          <button 
            onClick={() => setIsAddModalOpen(true)} 
            className="btn btn-primary"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Student
          </button>
        }
      />
      
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/3 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search students..."
              className="form-input pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
          
          <div className="flex items-center space-x-2 flex-1">
            <Filter className="h-4 w-4 text-slate-500" />
            <span className="text-sm text-slate-700">Filters:</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4 w-full md:w-auto">
            <select 
              value={gradeFilter.toString()} 
              onChange={(e) => setGradeFilter(e.target.value === '' ? '' : parseInt(e.target.value))}
              className="form-input"
            >
              <option value="">All Grades</option>
              {uniqueGrades.map(grade => (
                <option key={grade} value={grade}>Grade {grade}</option>
              ))}
            </select>
            
            <select 
              value={sectionFilter} 
              onChange={(e) => setSectionFilter(e.target.value)}
              className="form-input"
            >
              <option value="">All Sections</option>
              {uniqueSections.map(section => (
                <option key={section} value={section}>Section {section}</option>
              ))}
            </select>
            
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-input"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          
          <button 
            onClick={resetFilters}
            className="btn btn-secondary w-full md:w-auto"
          >
            Reset
          </button>
        </div>
      </div>
      
      {filteredStudents.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-lg text-slate-600">No students found matching your criteria.</p>
          <button 
            onClick={resetFilters}
            className="btn btn-primary mt-4"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      )}
      
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Student"
      >
        <AddStudentForm onSuccess={() => setIsAddModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default StudentList;