import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavigationProvider } from './context/NavigationContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import StudentList from './pages/StudentList';
import StudentDetail from './pages/StudentDetail';
import TeacherList from './pages/TeacherList';
import MarkEntry from './pages/MarkEntry';
import StudentResult from './pages/StudentResult';

function App() {
  return (
    <Router>
      <NavigationProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/:id" element={<StudentDetail />} />
            <Route path="/teachers" element={<TeacherList />} />
            <Route path="/marks" element={<MarkEntry />} />
            <Route path="/results/:id" element={<StudentResult />} />
          </Routes>
        </Layout>
      </NavigationProvider>
    </Router>
  );
}

export default App;