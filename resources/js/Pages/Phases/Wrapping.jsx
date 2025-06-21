import React, { useState, useContext } from 'react';
import { ProjectContext } from '@/contexts/ProjectContext';
import ProjectLayout from '@/Layouts/ProjectLayout';
import {
  DocumentTextIcon,
  FolderIcon,
  ArrowUpTrayIcon,
  LightBulbIcon,
  MagnifyingGlassIcon,
  LinkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  CalendarDaysIcon,
  TagIcon,
  UserIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';

const ProjectDocumentationCenter = ({ pendingTasks, finishedTasks }) => {
  const { currentProject } = useContext(ProjectContext) || { currentProject: null };
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const pendingTasksArray = Array.isArray(pendingTasks) ? pendingTasks : Object.values(pendingTasks || {});

  // Dummy data for demonstration if no project is available
  const project = currentProject || {
    id: 'proj-123',
    name: 'Product Group Developer',
    description: 'Centralize and organize all project documentation for easy reference.',
    status: 'Closed',
    startDate: '2024-01-15',
    endDate: '2025-06-20',
    closureDate: '2025-06-20',
  };

  // Dummy document data
  const documents = [
    {
      id: 1,
      name: 'Project Charter V1.0',
      category: 'Planning',
      type: 'PDF',
      date: '2024-01-10',
      author: 'kaouthar',
      filePath: '/docs/project_charter_v1.0.pdf',
    },
    {
      id: 2,
      name: 'Weekly Meeting Minutes #15',
      category: 'Execution',
      type: 'DOCX',
      date: '2025-05-28',
      author: 'kaouthar',
      filePath: '/docs/meeting_minutes_15.docx',
    },
    {
      id: 3,
      name: 'Frontend Technical Specifications',
      category: 'Deliverables',
      type: 'PDF',
      date: '2025-03-10',
      author: 'Amira Hane',
      filePath: '/docs/frontend_specs.pdf',
    },
    {
      id: 4,
      name: 'Project Closure Report',
      category: 'Closure',
      type: 'PDF',
      date: '2025-06-20',
      author: 'kaouthar',
      filePath: '/docs/closure_report.pdf',
    },
    {
      id: 5,
      name: 'Lessons Learned Report',
      category: 'Closure',
      type: 'PDF',
      date: '2025-06-20',
      author: 'kaouthar',
      filePath: '/docs/lessons_learned.pdf',
    },
    {
      id: 6,
      name: 'Vendor X Contract',
      category: 'Reference',
      type: 'PDF',
      date: '2024-02-01',
      author: 'Legal Team',
      filePath: '/docs/vendor_x_contract.pdf',
    },
    {
      id: 7,
      name: 'Frontend GitHub Repository',
      category: 'Deliverables',
      type: 'Link',
      date: '2025-06-15',
      author: 'Enrico McGlynn',
      link: 'https://github.com/your-org/frontend-repo',
    },
  ];

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const SectionCard = ({ title, children }) => (
    <div className="relative group transition-all duration-300 overflow-hidden rounded-3xl bg-gradient-to-br from-black/80 to-blue-950/80 border border-blue-500/30 shadow-2xl shadow-blue-500/10 p-1">
      <div className="h-full bg-black/90 backdrop-blur-lg rounded-2xl p-6 text-white min-h-full">
        <h3 className="text-xl font-semibold mb-4 text-blue-400 flex items-center">
          {title}
        </h3>
        {children}
      </div>
    </div>
  );

  const DocumentItem = ({ doc }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0">
      <div className="flex items-center flex-grow">
        {doc.type === 'Link' ? (
          <LinkIcon className="w-5 h-5 text-blue-400 mr-3" />
        ) : (
          <DocumentTextIcon className="w-5 h-5 text-blue-400 mr-3" />
        )}
        <div>
          <p className="text-white font-medium">{doc.name}</p>
          <p className="text-gray-400 text-sm">{doc.category} - {doc.author} - {doc.date}</p>
        </div>
      </div>
      {doc.type === 'Link' ? (
        <a
          href={doc.link}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Link
        </a>
      ) : (
        <a
          href={doc.filePath}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Download
        </a>
      )}
    </div>
  );

  return (
    <ProjectLayout project={project} pendingTasks={pendingTasksArray} finishedTasks={finishedTasks}>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-blue-400 bg-clip-text text-transparent mb-6 relative z-10">Wrapping</h1>

        <div className="flex justify-center mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
              activeTab === 'overview'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <BookOpenIcon className="w-5 h-5" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
              activeTab === 'documents'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <FolderIcon className="w-5 h-5" />
            Documents
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
              activeTab === 'upload'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <ArrowUpTrayIcon className="w-5 h-5" />
            Upload
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SectionCard title="Project Information">
              <p className="text-gray-300 mb-2"><span className="font-bold">Project Name:</span> {project.name}</p>
              <p className="text-gray-300 mb-2"><span className="font-bold">Description:</span> {project.description}</p>
              <p className="text-gray-300 mb-2"><span className="font-bold">Status:</span> <span className="text-yellow-400">{project.status}</span></p>
              <p className="text-gray-300 mb-2"><span className="font-bold">Start Date:</span> {project.startDate}</p>
              <p className="text-gray-300 mb-2"><span className="font-bold">Planned End:</span> {project.endDate}</p>
              {project.closureDate && <p className="text-gray-300"><span className="font-bold">Closed on:</span> {project.closureDate}</p>}
            </SectionCard>
            <SectionCard title="Documentation Center Objectives">
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Centralize all project documents.</li>
                <li>Organize documentation logically.</li>
                <li>Facilitate quick access to information.</li>
                <li>Ensure proper archiving for future reference.</li>
                <li>Capitalize on knowledge for future projects.</li>
              </ul>
            </SectionCard>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="grid grid-cols-1 gap-6">
            <SectionCard title="Explore Documents">
              <div className="mb-4 flex items-center bg-gray-800 rounded-lg border border-gray-700">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 ml-3" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  className="w-full p-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {filteredDocuments.length > 0 ? (
                <div className="space-y-4">
                  {['Planning', 'Execution', 'Deliverables', 'Closure', 'Reference'].map(category => {
                    const categoryDocs = filteredDocuments.filter(doc => doc.category === category);
                    return categoryDocs.length > 0 && (
                      <div key={category} className="mb-6">
                        <h4 className="text-lg font-semibold text-blue-400 mb-3 flex items-center">
                          <FolderIcon className="w-5 h-5 mr-2" /> {category}
                        </h4>
                        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                          {categoryDocs.map(doc => (
                            <DocumentItem key={doc.id} doc={doc} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center p-8 bg-gray-800 rounded-lg border border-gray-700">
                  <ExclamationCircleIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-400">No documents found for your search.</p>
                </div>
              )}
            </SectionCard>
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="grid grid-cols-1 gap-6">
            <SectionCard title="Upload New Document">
              <p className="text-gray-300 mb-4">Add new documents to your documentation center.</p>
              <div className="space-y-4">
                <div>
                  <label htmlFor="docName" className="block text-blue-400 text-sm font-bold mb-2">Document Name</label>
                  <input type="text" id="docName" className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-700" placeholder="Document name" />
                </div>
                <div>
                  <label htmlFor="docCategory" className="block text-blue-400 text-sm font-bold mb-2">Category</label>
                  <select id="docCategory" className="shadow border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-700">
                    <option value="">Select a category</option>
                    <option value="Planning">Planning</option>
                    <option value="Execution">Execution</option>
                    <option value="Deliverables">Deliverables</option>
                    <option value="Closure">Closure</option>
                    <option value="Reference">Reference</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="docFile" className="block text-blue-400 text-sm font-bold mb-2">File</label>
                  <input type="file" id="docFile" className="block w-full text-white
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-600 file:text-white
                    hover:file:bg-blue-700"
                  />
                </div>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <ArrowUpTrayIcon className="w-5 h-5" />
                  Upload
                </button>
              </div>
            </SectionCard>
          </div>
        )}
      </div>
    </ProjectLayout>
  );
};

export default ProjectDocumentationCenter;