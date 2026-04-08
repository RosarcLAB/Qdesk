import { useState } from 'react';
import type { Project, Status, Task } from '../types';
import type { Priority } from '../types';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';

const COLUMNS: { status: Status; label: string; color: string }[] = [
  { status: 'todo', label: 'To Do', color: 'bg-gray-100' },
  { status: 'in-progress', label: 'In Progress', color: 'bg-blue-50' },
  { status: 'done', label: 'Done', color: 'bg-green-50' },
];

interface KanbanBoardProps {
  project: Project;
  onAddTask: (
    projectId: string,
    title: string,
    description: string,
    priority: Priority,
    dueDate: string | null
  ) => void;
  onUpdateTask: (
    projectId: string,
    taskId: string,
    updates: Partial<Pick<Task, 'title' | 'description' | 'priority' | 'status' | 'dueDate'>>
  ) => void;
  onDeleteTask: (projectId: string, taskId: string) => void;
  onMoveTask: (projectId: string, taskId: string, status: Status) => void;
}

export default function KanbanBoard({
  project,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onMoveTask,
}: KanbanBoardProps) {
  const [addingTo, setAddingTo] = useState<Status | null>(null);

  const tasksByStatus = (status: Status) =>
    project.tasks.filter((t) => t.status === status);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {COLUMNS.map(({ status, label, color }) => (
        <div key={status} className={`rounded-2xl p-3 flex flex-col gap-2 ${color}`}>
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-gray-700">{label}</span>
              <span className="text-xs bg-white/80 text-gray-500 rounded-full px-2 py-0.5 font-medium">
                {tasksByStatus(status).length}
              </span>
            </div>
            <button
              onClick={() => setAddingTo(status)}
              className="text-gray-400 hover:text-indigo-600 transition-colors"
              aria-label={`Add task to ${label}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-2 min-h-[60px]">
            {tasksByStatus(status).map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                projectId={project.id}
                onUpdate={onUpdateTask}
                onDelete={onDeleteTask}
                onMove={onMoveTask}
              />
            ))}
          </div>

          <button
            onClick={() => setAddingTo(status)}
            className="mt-1 flex items-center gap-1 text-xs text-gray-400 hover:text-indigo-600 hover:bg-white/60 rounded-lg px-2 py-1.5 transition-all w-full"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add task
          </button>
        </div>
      ))}

      {addingTo && (
        <TaskForm
          title={`New task — ${COLUMNS.find((c) => c.status === addingTo)?.label}`}
          onSubmit={(title, description, priority, dueDate) => {
            onAddTask(project.id, title, description, priority, dueDate);
          }}
          onClose={() => setAddingTo(null)}
        />
      )}
    </div>
  );
}
