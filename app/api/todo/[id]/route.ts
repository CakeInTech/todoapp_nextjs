import { prisma } from "@/db";
import { NextResponse } from "next/server";

// Update
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
try {
    const payload = await request.json();
    const updated = await prisma.todo.update({
    where: { id: params.id },
    data: payload,
    });
    return NextResponse.json({
        data: updated,
        message: "Data Successfully Updated!",
        status: 200
    })
  } catch (error:any) {
    return NextResponse.json({
        error: error.message,
        status: 500
    })
  }
}

// Delete
export async function DELETE(request: Request, {params}:{params:{id: string}}) {
    try {
    await prisma.todo.delete({
         where:{id: params.id}
     })

     return NextResponse.json({
        message: "Todo Deleted Successfully!",
        status: 200
     })
    } catch (error:any) {
      return NextResponse.json({
         error: error.message,
         status: 500
      })
    }
 }
