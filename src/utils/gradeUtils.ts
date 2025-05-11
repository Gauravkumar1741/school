export const calculatePercentage = (marks: number, maxMarks: number): number => {
  if (maxMarks === 0) return 0;
  return (marks / maxMarks) * 100;
};

export const calculateGrade = (percentage: number): string => {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C+';
  if (percentage >= 40) return 'C';
  if (percentage >= 33) return 'D';
  return 'F';
};

export const getGradeColor = (grade: string): string => {
  switch (grade) {
    case 'A+':
      return 'text-purple-600';
    case 'A':
      return 'text-blue-600';
    case 'B+':
      return 'text-green-600';
    case 'B':
      return 'text-green-600';
    case 'C+':
      return 'text-yellow-600';
    case 'C':
      return 'text-yellow-600';
    case 'D':
      return 'text-orange-600';
    case 'F':
      return 'text-red-600';
    default:
      return 'text-slate-600';
  }
};