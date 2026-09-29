import { NextResponse } from "next/server";
import type { ResultSetHeader } from "mysql2";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT id, title, status, created_at FROM tasks ORDER BY created_at DESC"
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Failed to fetch tasks:", error);

    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const title =
      typeof body.title === "string" ? body.title.trim() : "";

    const status =
      typeof body.status === "string" ? body.status : "todo";

    const validStatuses = ["todo", "in-progress", "done"];

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    const [result] = await pool.execute<ResultSetHeader>(
      "INSERT INTO tasks (title, status) VALUES (?, ?)",
      [title, status]
    );

    return NextResponse.json(
      {
        message: "Task created successfully",
        id: result.insertId,
        title,
        status,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create task:", error);

    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}
