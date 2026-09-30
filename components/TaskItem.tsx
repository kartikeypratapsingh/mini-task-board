"use client";

import type { Task, TaskStatus } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onStatusChange: (id: number, status: TaskStatus) => void;
  onDelete: (id: number) => void;
}

export default function TaskItem({
  task,
  onStatusChange,
  onDelete,
}: TaskItemProps) {
  return (
    <div>
      <h2>{task.title}</h2>

      <p>Status: {task.status}</p>

      <select
        value={task.status}
        onChange={(event) =>
          onStatusChange(
            task.id,
            event.target.value as TaskStatus
          )
        }
      >
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <button onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </div>
  );
}