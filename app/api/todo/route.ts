import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const todos = await prisma.todo.findMany();

    return NextResponse.json({
      data: todos,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const created = await prisma.todo.create({
      data: {
        ...payload,
      },
    });
    return NextResponse.json({
      data: created,
      message: "Todo created successfully",
      status: 201,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
