
import { NextRequest, NextResponse } from 'next/server';

const MAKE_WEBHOOK_URL = 'https://hook.eu2.make.com/476murtf66gthwc7rpd8e2dd449dp4zd';
const ALLOWED_ORIGIN = 'https://voice.kwanafo.space';

// Handle preflight requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

// Handle form submission
export async function POST(request: NextRequest) {
  try {
    // Set CORS headers
    const headers = {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Check origin
    const origin = request.headers.get('origin');
    if (origin && origin !== ALLOWED_ORIGIN) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized origin' },
        { status: 403, headers }
      );
    }

    // Parse request body
    let formData;
    try {
      formData = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON format' },
        { status: 400, headers }
      );
    }

    // Validate required fields
    const { fullName, postcode, serviceType, requestCallback } = formData;
    
    if (!fullName || !postcode || !serviceType) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: fullName, postcode, serviceType' },
        { status: 400, headers }
      );
    }

    // Prepare data for Make.com webhook
    const webhookData = {
      fullName: String(fullName).trim(),
      postcode: String(postcode).trim(),
      serviceType: String(serviceType).trim(),
      requestCallback: Boolean(requestCallback),
      submissionTime: new Date().toISOString(),
      source: 'voice.kwanafo.space'
    };

    // Forward to Make.com webhook
    const webhookResponse = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Voice-API/1.0'
      },
      body: JSON.stringify(webhookData),
    });

    if (!webhookResponse.ok) {
      throw new Error(`Webhook responded with status: ${webhookResponse.status}`);
    }

    // Log successful submission
    console.log('Form submission successful:', {
      fullName: webhookData.fullName,
      serviceType: webhookData.serviceType,
      submissionTime: webhookData.submissionTime
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Form submitted successfully',
        data: {
          submissionTime: webhookData.submissionTime
        }
      },
      { status: 200, headers }
    );

  } catch (error) {
    console.error('Form submission error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit forms.' },
    { 
      status: 405,
      headers: {
        'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
        'Allow': 'POST, OPTIONS'
      }
    }
  );
}
