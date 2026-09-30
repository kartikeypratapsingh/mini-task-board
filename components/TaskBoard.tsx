"use client";
import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";
import { useEffect, useState } from "react";
import type { Task, TaskStatus } from "@/types/task";

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchTasks() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/tasks");

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data: Task[] = await response.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function updateTaskStatus(
    id: number,
    status: TaskStatus
  ) {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id ? { ...task, status } : task
        )
      );
    } catch (error) {
      console.error(error);
      setError("Failed to update task");
    }
  }

  async function deleteTask(id: number) {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      );
    } catch (error) {
      console.error(error);
      setError("Failed to delete task");
    }
  }

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>Mini Task Board</h1>
      <TaskForm onTaskCreated={fetchTasks} />

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
       <div>
  {tasks.map((task) => (
    <TaskItem
      key={task.id}
      task={task}
      onStatusChange={updateTaskStatus}
      onDelete={deleteTask}
    />
  ))}
</div>
      )}
    </main>
  );
}