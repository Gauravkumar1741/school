import React, { useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import reactToPdf from 'react-to-pdf';
import PageTitle from '../components/ui/PageTitle';
import ResultCard from '../components/results/ResultCard';
import { students, getStudentResults } from '../data/mockData';

const StudentResult: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const resultRef = useRef<HTMLDivElement>(null);
  
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
  
  const handleDownloadPDF = async () => {
    if (resultRef.current) {
      try {
        const options = {
          filename: `${student.firstName}_${student.lastName}_Results.pdf`,
          page: {
            format: 'letter',
            orientation: 'portrait',
          },
        };
        
        await reactToPdf(resultRef, options);
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Failed to generate PDF. Please try again.');
      }
    }
  };
  
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
      
      <PageTitle 
        title={`${student.firstName} ${student.lastName}'s Result`}
        subtitle={`Grade ${student.grade} | Section ${student.section} | ID: ${student.id}`}
      />
      
      <div ref={resultRef}>
        <ResultCard 
          student={student}
          subjects={studentResults}
          onDownload={handleDownloadPDF}
        />
      </div>
    </div>
  );
};

export default StudentResult;