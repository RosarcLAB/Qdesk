import { useState } from 'react';
import { useProjects } from './hooks/useProjects';
import ProjectCard from './components/ProjectCard';
import ProjectForm from './components/ProjectForm';
import KanbanBoard from './components/KanbanBoard';

export default function App() {
  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
  } = useProjects();

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [search, setSearch] = useState('');

  const selectedProject = projects.find((p) => p.id === selectedProjectId) ?? null;

  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {selectedProject ? (
              <>
                <button
                  onClick={() => setSelectedProjectId(null)}
                  className="text-gray-400 hover:text-gray-700 transition-colors"
                  aria-label="Back to projects"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: selectedProject.color }} />
                <h1 className="text-base font-semibold text-gray-800 truncate">{selectedProject.name}</h1>
              </>
            ) : (
              <>
                <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h1 className="text-base font-semibold text-gray-800">Qdesk</h1>
              </>
            )}
          </div>

          {!selectedProject && (
            <button
              onClick={() => setShowNewProjectForm(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New project
            </button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {selectedProject ? (
          /* Kanban view */
          <div>
            {selectedProject.description && (
              <p className="text-sm text-gray-500 mb-2">{selectedProject.description}</p>
            )}
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>{selectedProject.tasks.length} task{selectedProject.tasks.length !== 1 ? 's' : ''}</span>
              <span>·</span>
              <span>{selectedProject.tasks.filter((t) => t.status === 'done').length} done</span>
            </div>
            <KanbanBoard
              project={selectedProject}
              onAddTask={addTask}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
              onMoveTask={moveTask}
            />
          </div>
        ) : (
          /* Projects list */
          <div>
            {/* Search bar */}
            {projects.length > 0 && (
              <div className="relative mb-5 max-w-xs">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" strokeWidth={2} />
                  <path d="m21 21-4.35-4.35" strokeWidth={2} strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  placeholder="Search projects…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}

            {projects.length === 0 ? (
              /* Empty state */
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-700 mb-1">No projects yet</h2>
                <p className="text-sm text-gray-400 mb-5">Create your first project to get started.</p>
                <button
                  onClick={() => setShowNewProjectForm(true)}
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Create project
                </button>
              </div>
            ) : filteredProjects.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-12">No projects match your search.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onSelect={setSelectedProjectId}
                    onUpdate={updateProject}
                    onDelete={deleteProject}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {showNewProjectForm && (
        <ProjectForm
          title="New project"
          onSubmit={(name, description, color) => {
            const p = addProject(name, description, color);
            setSelectedProjectId(p.id);
          }}
          onClose={() => setShowNewProjectForm(false)}
        />
      )}
    </div>
  );
}
