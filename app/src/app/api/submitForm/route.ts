import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 👉 Forward data to your Make.com webhook (replace with your actual webhook URL)
    // await fetch("https://hook.make.com/your-webhook-id", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });

    return NextResponse.json({ status: "ok", received: data });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: (error as Error).message },
      { status: 500 }
    );
  }
}