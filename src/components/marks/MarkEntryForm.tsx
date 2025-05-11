import React, { useState } from 'react';
import { Student } from '../../types/Student';
import { Subject } from '../../types/Subject';
import { calculateGrade } from '../../utils/gradeUtils';

interface MarkEntryFormProps {
  students: Student[];
  subjects: Subject[];
  onSave: (studentId: string, updatedSubjects: Subject[]) => void;
}

const MarkEntryForm: React.FC<MarkEntryFormProps> = ({ students, subjects, onSave }) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [marks, setMarks] = useState<Record<string, number>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleStudentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStudentId(e.target.value);
    setMarks({});
    setErrors({});
  };

  const handleMarkChange = (subjectId: string, value: string) => {
    const markValue = parseInt(value, 10);
    const subject = subjects.find(s => s.id === subjectId);
    
    if (!subject) return;
    
    let error = '';
    if (isNaN(markValue)) {
      error = 'Please enter a valid number';
    } else if (markValue < 0) {
      error = 'Marks cannot be negative';
    } else if (markValue > subject.maxMarks) {
      error = `Marks cannot exceed ${subject.maxMarks}`;
    }

    setMarks(prev => ({
      ...prev,
      [subjectId]: isNaN(markValue) ? 0 : markValue
    }));

    setErrors(prev => ({
      ...prev,
      [subjectId]: error
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if student is selected
    if (!selectedStudentId) {
      alert('Please select a student');
      return;
    }
    
    // Check if all subjects have marks
    const hasAllMarks = subjects.every(subject => marks[subject.id] !== undefined);
    if (!hasAllMarks) {
      alert('Please enter marks for all subjects');
      return;
    }
    
    // Check for errors
    if (Object.values(errors).some(error => error !== '')) {
      alert('Please correct the errors before submitting');
      return;
    }
    
    // Update subjects with marks
    const updatedSubjects = subjects.map(subject => ({
      ...subject,
      marks: marks[subject.id] || 0
    }));
    
    onSave(selectedStudentId, updatedSubjects);
    
    // Reset form
    setSelectedStudentId('');
    setMarks({});
    setErrors({});
  };

  const selectedStudent = students.find(s => s.id === selectedStudentId);

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Enter Student Marks</h2>
      
      <div className="mb-6">
        <label htmlFor="student" className="form-label">Select Student</label>
        <select
          id="student"
          value={selectedStudentId}
          onChange={handleStudentChange}
          className="form-input"
        >
          <option value="">-- Select Student --</option>
          {students.map(student => (
            <option key={student.id} value={student.id}>
              {student.firstName} {student.lastName} - Grade {student.grade} {student.section}
            </option>
          ))}
        </select>
      </div>
      
      {selectedStudent && (
        <form onSubmit={handleSubmit}>
          <div className="bg-slate-50 p-4 rounded-md mb-6">
            <h3 className="font-medium text-slate-900">
              Student: {selectedStudent.firstName} {selectedStudent.lastName}
            </h3>
            <p className="text-sm text-slate-600">Grade: {selectedStudent.grade} | Section: {selectedStudent.section} | ID: {selectedStudent.id}</p>
          </div>
          
          <div className="space-y-4">
            {subjects.map(subject => {
              const mark = marks[subject.id] !== undefined ? marks[subject.id] : '';
              const percentage = mark !== '' ? (mark / subject.maxMarks) * 100 : 0;
              const grade = mark !== '' ? calculateGrade(percentage) : '-';
              
              return (
                <div key={subject.id} className="border rounded-md p-4">
                  <div className="md:flex md:items-center md:justify-between">
                    <div className="mb-2 md:mb-0">
                      <label htmlFor={`mark-${subject.id}`} className="font-medium text-slate-900">
                        {subject.name}
                      </label>
                      <p className="text-sm text-slate-500">Max Marks: {subject.maxMarks}</p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-20">
                        <input
                          type="number"
                          id={`mark-${subject.id}`}
                          min="0"
                          max={subject.maxMarks}
                          value={mark.toString()}
                          onChange={(e) => handleMarkChange(subject.id, e.target.value)}
                          className={`form-input ${errors[subject.id] ? 'border-red-500' : ''}`}
                        />
                        {errors[subject.id] && (
                          <p className="text-xs text-red-500 mt-1">{errors[subject.id]}</p>
                        )}
                      </div>
                      
                      {mark !== '' && (
                        <div className="text-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            percentage >= 40 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {grade}
                          </div>
                          <p className="text-xs text-slate-500 mt-1">{percentage.toFixed(0)}%</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="btn btn-secondary mr-3"
              onClick={() => {
                setSelectedStudentId('');
                setMarks({});
                setErrors({});
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Save Marks
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MarkEntryForm;