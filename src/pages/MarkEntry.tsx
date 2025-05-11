import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import PageTitle from '../components/ui/PageTitle';
import MarkEntryForm from '../components/marks/MarkEntryForm';
import { students, subjects } from '../data/mockData';
import { Subject } from '../types/Subject';

const MarkEntry: React.FC = () => {
  const [savedResults, setSavedResults] = useState<Record<string, Subject[]>>({});
  
  const handleSaveMarks = (studentId: string, updatedSubjects: Subject[]) => {
    // In a real application, this would be an API call to save the marks
    setSavedResults(prev => ({
      ...prev,
      [studentId]: updatedSubjects
    }));
    
    // Show success notification
    const student = students.find(s => s.id === studentId);
    if (student) {
      // This is just for demonstration. In a real app, you would use a proper toast/notification library
      alert(`Marks for ${student.firstName} ${student.lastName} saved successfully!`);
    }
  };
  
  return (
    <div>
      <PageTitle 
        title="Mark Entry" 
        subtitle="Enter and manage student marks"
      />
      
      <div className="grid grid-cols-1 gap-6">
        <MarkEntryForm 
          students={students} 
          subjects={subjects}
          onSave={handleSaveMarks}
        />
        
        {Object.keys(savedResults).length > 0 && (
          <div className="card">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Recently Saved Results</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Student
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Total Marks
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Percentage
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {Object.entries(savedResults).map(([studentId, results]) => {
                    const student = students.find(s => s.id === studentId);
                    if (!student) return null;
                    
                    const totalMarks = results.reduce((sum, subject) => sum + subject.marks, 0);
                    const totalMaxMarks = results.reduce((sum, subject) => sum + subject.maxMarks, 0);
                    const percentage = (totalMarks / totalMaxMarks) * 100;
                    
                    return (
                      <tr key={studentId}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                          {student.firstName} {student.lastName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                          {student.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-slate-700">
                          {totalMarks} / {totalMaxMarks}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-slate-700">
                          {percentage.toFixed(2)}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                          <button 
                            className="text-primary-600 hover:text-primary-900"
                            onClick={() => {
                              // Navigate to student result in a real application
                              window.location.href = `/results/${studentId}`;
                            }}
                          >
                            View Result
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkEntry;