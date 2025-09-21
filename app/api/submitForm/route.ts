import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Define schema validation with Zod
const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  postcode: z.string().min(2, "Postcode is required"),
  serviceType: z.string().min(1, "Service type is required"),
});

export async function POST(req: NextRequest) {
  const timestamp = new Date().toISOString();

  try {
    const body = await req.json();
    const result = formSchema.safeParse(body);

    // ❌ Bad data → 400
    if (!result.success) {
      return NextResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid input",
            details: result.error.issues.map((e) => ({
              field: e.path.join("."),
              message: e.message,
            })),
          },
        },
        { status: 400 }
      );
    }

    const data = result.data;

    // ✅ Success → 200
    return NextResponse.json(
      { success: true, received: data },
      { status: 200 }
    );

  } catch (err: any) {
    // ⚠️ Internal error → 500
    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_ERROR",
          message: err.message || "Unexpected server error",
        },
      },
      { status: 500 }
    );
  }
}