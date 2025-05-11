import React from 'react';
import { Student } from '../../types/Student';
import { Subject } from '../../types/Subject';
import { calculateGrade, calculatePercentage } from '../../utils/gradeUtils';

interface ResultCardProps {
  student: Student;
  subjects: Subject[];
  onDownload: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ student, subjects, onDownload }) => {
  const totalMarks = subjects.reduce((sum, subject) => sum + subject.marks, 0);
  const totalMaxMarks = subjects.reduce((sum, subject) => sum + subject.maxMarks, 0);
  const percentage = calculatePercentage(totalMarks, totalMaxMarks);
  const overallGrade = calculateGrade(percentage);
  
  const isPassing = percentage >= 40;

  return (
    <div className="card" id="result-card">
      <div className="text-center border-b border-slate-200 pb-4 mb-4">
        <h1 className="text-2xl font-bold text-slate-900">Academic Result</h1>
        <p className="text-slate-600">Academic Year 2024-2025</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{student.firstName} {student.lastName}</h2>
          <p className="text-slate-600">Student ID: {student.id}</p>
          <p className="text-slate-600">Grade: {student.grade} | Section: {student.section}</p>
        </div>
        <div className="mt-4 sm:mt-0 text-right">
          <p className="text-slate-600">Date of Birth: {student.dateOfBirth}</p>
          <p className="text-slate-600">Result Date: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-100">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                Subject
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-700 uppercase tracking-wider">
                Max Marks
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-700 uppercase tracking-wider">
                Marks Obtained
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-700 uppercase tracking-wider">
                Grade
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {subjects.map((subject) => {
              const subjectPercentage = calculatePercentage(subject.marks, subject.maxMarks);
              const subjectGrade = calculateGrade(subjectPercentage);
              const isPassing = subjectPercentage >= 40;
              
              return (
                <tr key={subject.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    {subject.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-slate-700">
                    {subject.maxMarks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-slate-700">
                    {subject.marks}
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

      <div className="mt-6 border-t border-slate-200 pt-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <p className="text-slate-700">
              <span className="font-medium">Total Marks:</span> {totalMarks} / {totalMaxMarks}
            </p>
            <p className="text-slate-700">
              <span className="font-medium">Percentage:</span> {percentage.toFixed(2)}%
            </p>
            <p className="text-slate-700">
              <span className="font-medium">Final Grade:</span>{' '}
              <span className={isPassing ? 'text-green-600' : 'text-red-600'}>
                {overallGrade}
              </span>
            </p>
            <p className="text-slate-700 mt-2">
              <span className="font-medium">Result:</span>{' '}
              <span className={`font-semibold ${isPassing ? 'text-green-600' : 'text-red-600'}`}>
                {isPassing ? 'PASS' : 'FAIL'}
              </span>
            </p>
          </div>
          <button
            onClick={onDownload}
            className="btn btn-primary mt-4 sm:mt-0"
          >
            Download Result
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;