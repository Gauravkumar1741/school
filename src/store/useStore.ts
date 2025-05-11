import { create } from 'zustand';
import { Student } from '../types/Student';
import { Teacher } from '../types/Teacher';
import { Subject } from '../types/Subject';
import { students as initialStudents, teachers as initialTeachers, subjects as initialSubjects } from '../data/mockData';

interface Store {
  students: Student[];
  teachers: Teacher[];
  subjects: Subject[];
  addStudent: (student: Student) => void;
  removeStudent: (id: string) => void;
  addTeacher: (teacher: Teacher) => void;
  removeTeacher: (id: string) => void;
  updateStudentMarks: (studentId: string, updatedSubjects: Subject[]) => void;
}

export const useStore = create<Store>((set) => ({
  students: initialStudents,
  teachers: initialTeachers,
  subjects: initialSubjects,
  
  addStudent: (student) => set((state) => ({
    students: [...state.students, student]
  })),
  
  removeStudent: (id) => set((state) => ({
    students: state.students.filter(student => student.id !== id)
  })),
  
  addTeacher: (teacher) => set((state) => ({
    teachers: [...state.teachers, teacher]
  })),
  
  removeTeacher: (id) => set((state) => ({
    teachers: state.teachers.filter(teacher => teacher.id !== id)
  })),
  
  updateStudentMarks: (studentId, updatedSubjects) => set((state) => ({
    subjects: state.subjects.map(subject => {
      const updatedSubject = updatedSubjects.find(s => s.id === subject.id);
      return updatedSubject || subject;
    })
  }))
}));