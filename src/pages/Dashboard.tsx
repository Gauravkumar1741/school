import React from 'react';
import { Link } from 'react-router-dom';
import { Users, GraduationCap, UserCheck, ClipboardList, Calendar, Bell, BookOpen, Award } from 'lucide-react';
import PageTitle from '../components/ui/PageTitle';
import StatCard from '../components/ui/StatCard';
import { students, teachers } from '../data/mockData';

const Dashboard: React.FC = () => {
  const activeStudents = students.filter(student => student.status === 'Active').length;
  
  return (
    <div>
      {/* Hero Section */}
      <div className="relative -mt-6 -mx-6 sm:-mx-8 lg:-mx-8 mb-8">
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 h-[300px] relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-full flex items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Springdale Public School</h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Empowering students with knowledge, character, and the skills to succeed in a rapidly evolving world.
              </p>
            </div>
          </div>
        </div>
        
        {/* Quick Access Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center">
                <div className="bg-primary-100 p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-slate-900">Academic Calendar</h3>
                  <p className="text-sm text-slate-600">View important dates and events</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center">
                <div className="bg-accent-100 p-3 rounded-full">
                  <Award className="h-6 w-6 text-accent-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-slate-900">Student Results</h3>
                  <p className="text-sm text-slate-600">Check your academic performance</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center">
                <div className="bg-amber-100 p-3 rounded-full">
                  <Bell className="h-6 w-6 text-amber-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-slate-900">Announcements</h3>
                  <p className="text-sm text-slate-600">Stay updated with latest news</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Students" 
          value={students.length} 
          icon={Users}
          change={{ value: '5%', isPositive: true }}
          color="primary"
        />
        <StatCard 
          title="Active Students" 
          value={activeStudents} 
          icon={UserCheck}
          color="success"
        />
        <StatCard 
          title="Teachers" 
          value={teachers.length} 
          icon={GraduationCap}
          change={{ value: '2', isPositive: true }}
          color="accent"
        />
        <StatCard 
          title="Subjects" 
          value={6} 
          icon={ClipboardList}
          color="warning"
        />
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Announcements Section */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900">Recent Announcements</h2>
              <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">View All</button>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
                <div className="flex-shrink-0">
                  <Calendar className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-900">Annual Sports Day</h3>
                  <p className="text-slate-600 text-sm mt-1">The annual sports day will be held on July 15th. All students are requested to register for events by July 1st.</p>
                  <p className="text-slate-400 text-xs mt-2">Posted on: June 15, 2024</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
                <div className="flex-shrink-0">
                  <BookOpen className="h-5 w-5 text-accent-600" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-900">Final Exam Schedule</h3>
                  <p className="text-slate-600 text-sm mt-1">The final examination schedule for the academic year 2024-2025 has been published. Please check the academic calendar.</p>
                  <p className="text-slate-400 text-xs mt-2">Posted on: June 10, 2024</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
                <div className="flex-shrink-0">
                  <Users className="h-5 w-5 text-warning-600" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-900">Parent-Teacher Meeting</h3>
                  <p className="text-slate-600 text-sm mt-1">Parent-teacher meetings will be conducted on June 25th. Parents are requested to schedule appointments.</p>
                  <p className="text-slate-400 text-xs mt-2">Posted on: June 5, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Upcoming Events Section */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900">Upcoming Events</h2>
              <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">View Calendar</button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-16 text-center">
                  <div className="bg-primary-100 text-primary-700 rounded-lg p-2">
                    <div className="text-xl font-bold">25</div>
                    <div className="text-xs">JUN</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900">Parent-Teacher Meeting</h3>
                  <p className="text-slate-600 text-sm">9:00 AM - 3:00 PM</p>
                  <p className="text-slate-500 text-xs">School Auditorium</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-16 text-center">
                  <div className="bg-accent-100 text-accent-700 rounded-lg p-2">
                    <div className="text-xl font-bold">10</div>
                    <div className="text-xs">JUL</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900">Science Exhibition</h3>
                  <p className="text-slate-600 text-sm">10:00 AM - 4:00 PM</p>
                  <p className="text-slate-500 text-xs">School Science Block</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-16 text-center">
                  <div className="bg-warning-100 text-warning-700 rounded-lg p-2">
                    <div className="text-xl font-bold">15</div>
                    <div className="text-xs">JUL</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900">Annual Sports Day</h3>
                  <p className="text-slate-600 text-sm">8:00 AM - 5:00 PM</p>
                  <p className="text-slate-500 text-xs">School Sports Ground</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;