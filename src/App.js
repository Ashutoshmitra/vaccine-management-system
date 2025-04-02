// App.js - Main component file
import React, { useState } from 'react';
import { BellIcon, CalendarIcon, ShieldIcon, ChartBarIcon, UserIcon, SettingsIcon } from 'lucide-react';

// Mock data for the application
const MOCK_PATIENTS = [
  { 
    id: 1, 
    name: "Emma Johnson", 
    age: "2 years", 
    nextVaccine: "MMR", 
    dueDate: "April 15, 2025",
    riskLevel: "Low",
    vaccines: [
      { name: "Hepatitis B", date: "Jan 10, 2023", status: "Completed" },
      { name: "Rotavirus", date: "Mar 15, 2023", status: "Completed" },
      { name: "DTaP", date: "Mar 15, 2023", status: "Completed" },
      { name: "Hib", date: "Mar 15, 2023", status: "Completed" },
      { name: "PCV13", date: "Mar 15, 2023", status: "Completed" },
      { name: "IPV", date: "Mar 15, 2023", status: "Completed" },
      { name: "Influenza", date: "Oct 20, 2024", status: "Completed" },
      { name: "MMR", date: "April 15, 2025", status: "Scheduled" },
    ] 
  },
  { 
    id: 2, 
    name: "Noah Williams", 
    age: "6 months", 
    nextVaccine: "DTaP", 
    dueDate: "April 10, 2025",
    riskLevel: "Medium",
    vaccines: [
      { name: "Hepatitis B", date: "Oct 05, 2024", status: "Completed" },
      { name: "Rotavirus", date: "Dec 12, 2024", status: "Completed" },
      { name: "DTaP", date: "April 10, 2025", status: "Scheduled" },
    ] 
  },
  { 
    id: 3, 
    name: "Olivia Smith", 
    age: "4 years", 
    nextVaccine: "DTaP", 
    dueDate: "April 20, 2025",
    riskLevel: "High",
    vaccines: [
      { name: "Hepatitis B", date: "Jan 05, 2021", status: "Completed" },
      { name: "Rotavirus", date: "Mar 10, 2021", status: "Completed" },
      { name: "DTaP", date: "April 20, 2025", status: "Overdue" },
      { name: "Varicella", date: "June 15, 2025", status: "Scheduled" },
    ] 
  },
  { 
    id: 4, 
    name: "Liam Davis", 
    age: "1 year", 
    nextVaccine: "Hepatitis A", 
    dueDate: "May 05, 2025",
    riskLevel: "Low",
    vaccines: [
      { name: "Hepatitis B", date: "April 05, 2024", status: "Completed" },
      { name: "Rotavirus", date: "June 10, 2024", status: "Completed" },
      { name: "DTaP", date: "June 10, 2024", status: "Completed" },
      { name: "Hib", date: "June 10, 2024", status: "Completed" },
      { name: "Hepatitis A", date: "May 05, 2025", status: "Scheduled" },
    ] 
  },
];

const MOCK_REMINDERS = [
  { id: 1, patient: "Emma Johnson", vaccine: "MMR", dueDate: "April 15, 2025", status: "Sent", channel: "SMS" },
  { id: 2, patient: "Noah Williams", vaccine: "DTaP", dueDate: "April 10, 2025", status: "Scheduled", channel: "WhatsApp" },
  { id: 3, patient: "Olivia Smith", vaccine: "DTaP", dueDate: "April 20, 2025", status: "Failed", channel: "Email" },
  { id: 4, patient: "Liam Davis", vaccine: "Hepatitis A", dueDate: "May 05, 2025", status: "Scheduled", channel: "SMS" },
];

const MOCK_RISK_ALERTS = [
  { id: 1, region: "Downtown", disease: "Measles", riskLevel: "High", affectedPatients: 3, dateReported: "March 30, 2025" },
  { id: 2, region: "North District", disease: "Pertussis", riskLevel: "Medium", affectedPatients: 2, dateReported: "March 28, 2025" },
  { id: 3, region: "East County", disease: "Influenza", riskLevel: "Medium", affectedPatients: 12, dateReported: "March 25, 2025" },
];

// Main Dashboard Component
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setActiveTab('patientDetails');
  };

  const handleBackToPatients = () => {
    setSelectedPatient(null);
    setActiveTab('patients');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-16 md:w-64 bg-indigo-800 text-white">
        <div className="p-4 font-bold text-xl hidden md:block">VaxTrack Pro</div>
        <div className="p-2 md:hidden text-center">
          <ShieldIcon size={24} />
        </div>
        <nav className="mt-8">
          <SidebarItem 
            icon={<ChartBarIcon size={20} />} 
            text="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <SidebarItem 
            icon={<UserIcon size={20} />} 
            text="Patients" 
            active={activeTab === 'patients' || activeTab === 'patientDetails'} 
            onClick={() => setActiveTab('patients')} 
          />
          <SidebarItem 
            icon={<BellIcon size={20} />} 
            text="Reminders" 
            active={activeTab === 'reminders'} 
            onClick={() => setActiveTab('reminders')} 
          />
          <SidebarItem 
            icon={<CalendarIcon size={20} />} 
            text="Schedule" 
            active={activeTab === 'schedule'} 
            onClick={() => setActiveTab('schedule')} 
          />
          <SidebarItem 
            icon={<SettingsIcon size={20} />} 
            text="Settings" 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
          />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'patients' && 'Patients'}
              {activeTab === 'patientDetails' && 'Patient Details'}
              {activeTab === 'reminders' && 'Reminders'}
              {activeTab === 'schedule' && 'Vaccination Schedule'}
              {activeTab === 'settings' && 'Settings'}
            </h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
                <BellIcon size={20} />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                  <span className="font-medium">DR</span>
                </div>
                <span className="hidden md:inline text-sm font-medium">Dr. Marcial</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {activeTab === 'dashboard' && <DashboardContent patients={MOCK_PATIENTS} riskAlerts={MOCK_RISK_ALERTS} />}
          {activeTab === 'patients' && <PatientsContent patients={MOCK_PATIENTS} onPatientClick={handlePatientClick} />}
          {activeTab === 'patientDetails' && selectedPatient && (
            <PatientDetails patient={selectedPatient} onBack={handleBackToPatients} />
          )}
          {activeTab === 'reminders' && <RemindersContent reminders={MOCK_REMINDERS} />}
          {activeTab === 'schedule' && <ScheduleContent patients={MOCK_PATIENTS} />}
          {activeTab === 'settings' && <SettingsContent />}
        </main>
      </div>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ icon, text, active, onClick }) => {
  return (
    <div 
      className={`flex items-center py-3 px-4 cursor-pointer ${active ? 'bg-indigo-900' : 'hover:bg-indigo-700'}`}
      onClick={onClick}
    >
      <div className="mr-3">{icon}</div>
      <span className="hidden md:inline">{text}</span>
    </div>
  );
};

// Dashboard Content Component
const DashboardContent = ({ patients, riskAlerts }) => {
  // Calculate statistics
  const upcomingVaccinations = patients.filter(p => 
    p.vaccines.some(v => v.status === 'Scheduled' && new Date(v.date) <= new Date(Date.now() + 14 * 24 * 60 * 60 * 1000))
  ).length;
  
  const overdueVaccinations = patients.filter(p => 
    p.vaccines.some(v => v.status === 'Overdue')
  ).length;

  const highRiskPatients = patients.filter(p => p.riskLevel === 'High').length;

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Patients" value={patients.length} color="bg-blue-500" />
        <StatCard title="Upcoming Vaccinations" value={upcomingVaccinations} color="bg-green-500" />
        <StatCard title="Overdue Vaccinations" value={overdueVaccinations} color="bg-red-500" />
        <StatCard title="High Risk Patients" value={highRiskPatients} color="bg-yellow-500" />
      </div>

      {/* Two columns layout for wider screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Vaccinations */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Upcoming Vaccinations</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vaccine</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {patients.slice(0, 3).map((patient) => (
                  <tr key={patient.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                      <div className="text-sm text-gray-500">{patient.age}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{patient.nextVaccine}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{patient.dueDate}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Risk Alerts */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Regional Risk Alerts</h2>
          <div className="space-y-4">
            {riskAlerts.map((alert) => (
              <div key={alert.id} className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded-r-lg">
                <div className="flex justify-between">
                  <div className="font-medium">{alert.disease} Outbreak - {alert.region}</div>
                  <div className={`px-2 py-1 rounded text-xs font-semibold ${
                    alert.riskLevel === 'High' ? 'bg-red-100 text-red-800' : 
                    alert.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-green-100 text-green-800'
                  }`}>
                    {alert.riskLevel} Risk
                  </div>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {alert.affectedPatients} affected patients in your clinic
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Reported on {alert.dateReported}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance Rate Chart - This would be a real chart in a full implementation */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Vaccination Compliance Rate</h2>
        <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
          <div className="text-center text-gray-500">
            <p>Compliance rate visualization would appear here</p>
            <p className="text-sm mt-2">Historical data showing vaccination compliance trends</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Patients Content Component
const PatientsContent = ({ patients, onPatientClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');

  // Filter patients based on search term and risk level
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'all' || patient.riskLevel.toLowerCase() === riskFilter.toLowerCase();
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Filter Controls */}
      <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div className="relative">
          <input
            type="text"
            placeholder="Search patients..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <div className="flex space-x-2">
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
          >
            <option value="all">All Risk Levels</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Add Patient
          </button>
        </div>
      </div>

      {/* Patients Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Vaccine</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.map((patient) => (
              <tr 
                key={patient.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onPatientClick(patient)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{patient.age}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{patient.nextVaccine}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{patient.dueDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    patient.riskLevel === 'High' ? 'bg-red-100 text-red-800' : 
                    patient.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-green-100 text-green-800'
                  }`}>
                    {patient.riskLevel}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                  <button className="text-indigo-600 hover:text-indigo-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">{filteredPatients.length}</span> patients
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

// Patient Details Component
const PatientDetails = ({ patient, onBack }) => {
  const [activeSection, setActiveSection] = useState('history');

  return (
    <div>
      {/* Back Button */}
      <button 
        className="flex items-center text-indigo-600 mb-4 hover:underline"
        onClick={onBack}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Patients
      </button>

      {/* Patient Info Card */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
              <p className="text-gray-600 mt-1">{patient.age}</p>
            </div>
            <div className="mt-3 md:mt-0">
              <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                patient.riskLevel === 'High' ? 'bg-red-100 text-red-800' : 
                patient.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-green-100 text-green-800'
              }`}>
                {patient.riskLevel} Risk
              </span>
              <button className="ml-3 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Send Reminder
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-t border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeSection === 'history'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveSection('history')}
            >
              Vaccine History
            </button>
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeSection === 'upcoming'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveSection('upcoming')}
            >
              Upcoming Vaccines
            </button>
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeSection === 'communication'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveSection('communication')}
            >
              Communication History
            </button>
          </nav>
        </div>
      </div>

      {/* Dynamic Content Based on Active Section */}
      <div className="bg-white rounded-lg shadow p-6">
        {activeSection === 'history' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Vaccine History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vaccine</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {patient.vaccines.map((vaccine, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{vaccine.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{vaccine.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          vaccine.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          vaccine.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {vaccine.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === 'upcoming' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Upcoming Vaccines</h3>
            <div className="space-y-4">
              {patient.vaccines
                .filter(v => v.status === 'Scheduled')
                .map((vaccine, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{vaccine.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">Scheduled for {vaccine.date}</p>
                      </div>
                      <div className="mt-3 md:mt-0 space-x-2">
                        <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-50">
                          Reschedule
                        </button>
                        <button className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700">
                          Mark as Completed
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              {patient.vaccines.filter(v => v.status === 'Scheduled').length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No upcoming vaccinations scheduled.
                </div>
              )}
            </div>
          </div>
        )}

          {activeSection === 'communication' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Communication History</h3>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="text-sm font-medium text-gray-900">SMS Reminder Sent</div>
                    <div className="text-sm text-gray-500 mt-1">
                      Reminder sent about upcoming {patient.nextVaccine} vaccination on {patient.dueDate}.
                    </div>
                    <div className="text-xs text-gray-400 mt-2">March 20, 2025 at 10:23 AM</div>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="text-sm font-medium text-gray-900">Appointment Confirmed</div>
                    <div className="text-sm text-gray-500 mt-1">
                      Parent confirmed the appointment for {patient.dueDate}.
                    </div>
                    <div className="text-xs text-gray-400 mt-2">March 21, 2025 at 2:15 PM</div>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-yellow-100 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="text-sm font-medium text-gray-900">Regional Alert Notification</div>
                    <div className="text-sm text-gray-500 mt-1">
                      Alert sent about increased {patient.nextVaccine} risk in the area.
                    </div>
                    <div className="text-xs text-gray-400 mt-2">March 25, 2025 at 9:05 AM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Reminders Content Component
const RemindersContent = ({ reminders }) => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter reminders based on active tab
  const filteredReminders = reminders.filter(reminder => {
    if (activeTab === 'all') return true;
    if (activeTab === 'sent') return reminder.status === 'Sent';
    if (activeTab === 'scheduled') return reminder.status === 'Scheduled';
    if (activeTab === 'failed') return reminder.status === 'Failed';
    return true;
  });

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'all'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All Reminders
          </button>
          <button
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'sent'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('sent')}
          >
            Sent
          </button>
          <button
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'scheduled'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('scheduled')}
          >
            Scheduled
          </button>
          <button
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'failed'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('failed')}
          >
            Failed
          </button>
        </nav>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div className="text-sm text-gray-600">
          {filteredReminders.length} reminders
        </div>
        <div className="flex space-x-2">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Schedule New Reminder
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Bulk Schedule
          </button>
        </div>
      </div>

      {/* Reminders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vaccine</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReminders.map((reminder) => (
              <tr key={reminder.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{reminder.patient}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{reminder.vaccine}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{reminder.dueDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    reminder.status === 'Sent' ? 'bg-green-100 text-green-800' : 
                    reminder.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {reminder.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{reminder.channel}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                  <button className="text-indigo-600 hover:text-indigo-900">Resend</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredReminders.length === 0 && (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No reminders found</h3>
          <p className="mt-1 text-sm text-gray-500">
            There are no reminders matching your current filter.
          </p>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create new reminder
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Schedule Content Component
const ScheduleContent = ({ patients }) => {
  // Get today's date and format it for display
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Mock schedule data
  const scheduleData = [
    { time: '9:00 AM', patient: 'Emma Johnson', vaccine: 'MMR', status: 'Confirmed' },
    { time: '10:00 AM', patient: 'Noah Williams', vaccine: 'DTaP', status: 'Pending' },
    { time: '11:30 AM', patient: 'Olivia Smith', vaccine: 'DTaP', status: 'Confirmed' },
    { time: '2:00 PM', patient: 'Liam Davis', vaccine: 'Hepatitis A', status: 'Confirmed' },
    { time: '3:30 PM', patient: 'Charlotte Brown', vaccine: 'Influenza', status: 'Cancelled' },
  ];

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Vaccination Schedule</h2>
          <p className="text-sm text-gray-500 mt-1">{formattedDate}</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Previous Day
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Today
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Next Day
          </button>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {/* Time slots column */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-medium text-gray-900 mb-4">Time</h3>
          <div className="space-y-6 mt-6">
            {scheduleData.map((slot, index) => (
              <div key={index} className="h-24 flex items-center">
                <span className="text-sm font-medium text-gray-500">{slot.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Appointment columns for each day of the week */}
        {Array.from({ length: 6 }, (_, i) => {
          const dayDate = new Date(today);
          dayDate.setDate(today.getDate() + i);
          const isToday = i === 0;
          
          return (
            <div 
              key={i} 
              className={`bg-white rounded-lg shadow p-4 ${isToday ? 'ring-2 ring-indigo-500' : ''}`}
            >
              <h3 className="font-medium text-gray-900">
                {dayDate.toLocaleDateString('en-US', { weekday: 'short' })}
              </h3>
              <p className="text-xs text-gray-500">
                {dayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
              
              <div className="space-y-6 mt-4">
                {scheduleData.map((slot, index) => {
                  // Only show appointments on the current day (today)
                  if (i === 0) {
                    return (
                      <div key={index} className="h-24 p-2 border rounded-lg bg-gray-50">
                        <div className="text-xs font-medium text-gray-900 truncate">{slot.patient}</div>
                        <div className="text-xs text-gray-500 truncate">{slot.vaccine}</div>
                        <span className={`mt-1 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          slot.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                          slot.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {slot.status}
                        </span>
                      </div>
                    );
                  } else {
                    // Empty slots for other days
                    return (
                      <div 
                        key={index} 
                        className="h-24 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer flex items-center justify-center"
                      >
                        <span className="text-xs text-gray-400">+ Add</span>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Settings Content Component
const SettingsContent = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      {/* Settings Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button className="py-4 px-6 text-center border-b-2 border-indigo-500 font-medium text-sm text-indigo-600">
            General
          </button>
          <button className="py-4 px-6 text-center border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
            Notifications
          </button>
          <button className="py-4 px-6 text-center border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
            Templates
          </button>
          <button className="py-4 px-6 text-center border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
            Integrations
          </button>
          <button className="py-4 px-6 text-center border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
            Team
          </button>
        </nav>
      </div>

      {/* Settings Form */}
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6">General Settings</h2>
        
        <div className="space-y-8">
          {/* Clinic Information */}
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-4">Clinic Information</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Clinic Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  defaultValue="Pediatric Wellness Center"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  defaultValue="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  defaultValue="info@pediatricwellness.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  defaultValue="www.pediatricwellness.com"
                />
              </div>
            </div>
          </div>

          {/* Default Reminder Settings */}
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-4">Default Reminder Settings</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Reminder (days before appointment)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  defaultValue="7"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Second Reminder (days before appointment)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  defaultValue="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Communication Channel
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  defaultValue="sms"
                >
                  <option value="sms">SMS</option>
                  <option value="email">Email</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="phone">Phone Call</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Follow-up for Missed Appointments (days after)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  defaultValue="1"
                />
              </div>
            </div>
          </div>

          {/* Risk Alert Settings */}
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-4">Risk Alert Settings</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="enableRiskAlerts"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    defaultChecked
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="enableRiskAlerts" className="font-medium text-gray-700">
                    Enable Automated Risk Alerts
                  </label>
                  <p className="text-gray-500">
                    System will automatically notify parents when there's an outbreak in their region
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="enableHighRisk"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    defaultChecked
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="enableHighRisk" className="font-medium text-gray-700">
                    Prioritize High-Risk Patients
                  </label>
                  <p className="text-gray-500">
                    Send additional reminders to patients with high-risk status
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Source for Outbreak Information
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  defaultValue="cdc"
                >
                  <option value="cdc">CDC API</option>
                  <option value="who">WHO Database</option>
                  <option value="local">Local Health Department</option>
                  <option value="custom">Custom Source</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            className="bg-white mr-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="button"
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Statistics Card Component
const StatCard = ({ title, value, color }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`${color} rounded-full p-3 text-white`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div className="ml-4">
          <h2 className="text-gray-600 text-sm font-medium">{title}</h2>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

// Export the main component
export default Dashboard;