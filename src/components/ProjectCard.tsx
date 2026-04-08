import { useState } from 'react';
import type { Project } from '../types';
import ProjectForm from './ProjectForm';

interface ProjectCardProps {
  project: Project;
  onSelect: (id: string) => void;
  onUpdate: (id: string, name: string, description: string, color: string) => void;
  onDelete: (id: string) => void;
}

export default function ProjectCard({ project, onSelect, onUpdate, onDelete }: ProjectCardProps) {
  const [editing, setEditing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const totalTasks = project.tasks.length;
  const doneTasks = project.tasks.filter((t) => t.status === 'done').length;
  const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <>
      <div
        className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group relative overflow-hidden"
        onClick={() => onSelect(project.id)}
      >
        {/* Color bar */}
        <div className="h-2 w-full" style={{ backgroundColor: project.color }} />

        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-800 text-base leading-tight break-words flex-1">
              {project.name}
            </h3>
            <div className="relative flex-shrink-0" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="text-gray-300 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Project options"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="5" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="12" cy="19" r="1.5" />
                </svg>
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-6 z-10 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px]">
                  <button
                    onClick={() => { setEditing(true); setMenuOpen(false); }}
                    className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete "${project.name}"? This cannot be undone.`)) {
                        onDelete(project.id);
                      }
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-sm text-red-500 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {project.description && (
            <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">{project.description}</p>
          )}

          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
              <span>{doneTasks}/{totalTasks} tasks</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%`, backgroundColor: project.color }}
              />
            </div>
          </div>
        </div>
      </div>

      {editing && (
        <ProjectForm
          title="Edit project"
          initialName={project.name}
          initialDescription={project.description}
          initialColor={project.color}
          onSubmit={(name, description, color) => onUpdate(project.id, name, description, color)}
          onClose={() => setEditing(false)}
        />
      )}
    </>
  );
}
