import { useState } from 'react';
import type { Task, Status, Priority } from '../types';
import TaskForm from './TaskForm';

const PRIORITY_COLORS: Record<Priority, string> = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
};

const PRIORITY_LABEL: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

function isOverdue(dueDate: string | null): boolean {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date(new Date().toDateString());
}

interface TaskCardProps {
  task: Task;
  projectId: string;
  onUpdate: (
    projectId: string,
    taskId: string,
    updates: Partial<Pick<Task, 'title' | 'description' | 'priority' | 'status' | 'dueDate'>>
  ) => void;
  onDelete: (projectId: string, taskId: string) => void;
  onMove: (projectId: string, taskId: string, status: Status) => void;
}

const NEXT_STATUS: Record<Status, Status | null> = {
  todo: 'in-progress',
  'in-progress': 'done',
  done: null,
};

const PREV_STATUS: Record<Status, Status | null> = {
  todo: null,
  'in-progress': 'todo',
  done: 'in-progress',
};

export default function TaskCard({ task, projectId, onUpdate, onDelete, onMove }: TaskCardProps) {
  const [editing, setEditing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const overdue = isOverdue(task.dueDate) && task.status !== 'done';

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm hover:shadow-md transition-shadow group">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-gray-800 leading-snug flex-1 break-words">
            {task.title}
          </p>
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="text-gray-300 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Task options"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="5" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="12" cy="19" r="1.5" />
              </svg>
            </button>
            {menuOpen && (
              <div
                className="absolute right-0 top-6 z-10 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px]"
                onBlur={() => setMenuOpen(false)}
              >
                <button
                  onClick={() => { setEditing(true); setMenuOpen(false); }}
                  className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Edit
                </button>
                {PREV_STATUS[task.status] && (
                  <button
                    onClick={() => { onMove(projectId, task.id, PREV_STATUS[task.status]!); setMenuOpen(false); }}
                    className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    ← Move back
                  </button>
                )}
                {NEXT_STATUS[task.status] && (
                  <button
                    onClick={() => { onMove(projectId, task.id, NEXT_STATUS[task.status]!); setMenuOpen(false); }}
                    className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Move forward →
                  </button>
                )}
                <button
                  onClick={() => { onDelete(projectId, task.id); setMenuOpen(false); }}
                  className="w-full text-left px-3 py-1.5 text-sm text-red-500 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {task.description && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{task.description}</p>
        )}

        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${PRIORITY_COLORS[task.priority]}`}>
            {PRIORITY_LABEL[task.priority]}
          </span>
          {task.dueDate && (
            <span className={`text-xs flex items-center gap-1 ${overdue ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth={2} />
                <line x1="16" y1="2" x2="16" y2="6" strokeWidth={2} />
                <line x1="8" y1="2" x2="8" y2="6" strokeWidth={2} />
                <line x1="3" y1="10" x2="21" y2="10" strokeWidth={2} />
              </svg>
              {task.dueDate}
              {overdue && ' ⚠'}
            </span>
          )}
        </div>
      </div>

      {editing && (
        <TaskForm
          title="Edit task"
          initialTask={task}
          onSubmit={(title, description, priority, dueDate) =>
            onUpdate(projectId, task.id, { title, description, priority, dueDate })
          }
          onClose={() => setEditing(false)}
        />
      )}
    </>
  );
}
