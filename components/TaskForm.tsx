"use client";

import { useState } from "react";
import type { TaskStatus } from "@/types/task";

interface TaskFormProps {
  onTaskCreated: () => void;
}

export default function TaskForm({
  onTaskCreated,
}: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Task title is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          status,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      setTitle("");
      setStatus("todo");
      onTaskCreated();
    } catch (error) {
      console.error(error);
      setError("Failed to create task");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <select
        value={status}
        onChange={(event) =>
          setStatus(event.target.value as TaskStatus)
        }
      >
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Task"}
      </button>

      {error && <p>{error}</p>}
    </form>
  );
}