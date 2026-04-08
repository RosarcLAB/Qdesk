import { useState, useCallback } from 'react';
import type { Project, Task, Status, Priority } from '../types';
import { loadProjects, saveProjects, generateId } from '../utils/storage';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(() => loadProjects());

  const persist = useCallback((updated: Project[]) => {
    setProjects(updated);
    saveProjects(updated);
  }, []);

  const addProject = useCallback(
    (name: string, description: string, color: string) => {
      const project: Project = {
        id: generateId(),
        name,
        description,
        color,
        tasks: [],
        createdAt: new Date().toISOString(),
      };
      persist([...projects, project]);
      return project;
    },
    [projects, persist]
  );

  const updateProject = useCallback(
    (id: string, name: string, description: string, color: string) => {
      persist(projects.map((p) => (p.id === id ? { ...p, name, description, color } : p)));
    },
    [projects, persist]
  );

  const deleteProject = useCallback(
    (id: string) => {
      persist(projects.filter((p) => p.id !== id));
    },
    [projects, persist]
  );

  const addTask = useCallback(
    (
      projectId: string,
      title: string,
      description: string,
      priority: Priority,
      dueDate: string | null
    ) => {
      const task: Task = {
        id: generateId(),
        title,
        description,
        priority,
        status: 'todo',
        dueDate,
        createdAt: new Date().toISOString(),
      };
      persist(
        projects.map((p) =>
          p.id === projectId ? { ...p, tasks: [...p.tasks, task] } : p
        )
      );
      return task;
    },
    [projects, persist]
  );

  const updateTask = useCallback(
    (
      projectId: string,
      taskId: string,
      updates: Partial<Pick<Task, 'title' | 'description' | 'priority' | 'status' | 'dueDate'>>
    ) => {
      persist(
        projects.map((p) =>
          p.id === projectId
            ? {
                ...p,
                tasks: p.tasks.map((t) =>
                  t.id === taskId ? { ...t, ...updates } : t
                ),
              }
            : p
        )
      );
    },
    [projects, persist]
  );

  const deleteTask = useCallback(
    (projectId: string, taskId: string) => {
      persist(
        projects.map((p) =>
          p.id === projectId
            ? { ...p, tasks: p.tasks.filter((t) => t.id !== taskId) }
            : p
        )
      );
    },
    [projects, persist]
  );

  const moveTask = useCallback(
    (projectId: string, taskId: string, status: Status) => {
      updateTask(projectId, taskId, { status });
    },
    [updateTask]
  );

  return {
    projects,
    addProject,
    updateProject,
    deleteProject,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
  };
}
