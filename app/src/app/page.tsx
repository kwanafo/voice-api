
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Voice API Service
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Backend API service for handling form submissions from voice.kwanafo.space
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">API Endpoint</h2>
            <div className="space-y-3">
              <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                POST /api/submitForm
              </div>
              <p className="text-gray-600">
                Accepts form submissions and forwards them to the Make.com webhook
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">CORS Configuration</h2>
            <div className="space-y-3">
              <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                https://voice.kwanafo.space
              </div>
              <p className="text-gray-600">
                Configured to allow requests from the Voice website
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Request Format</h2>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>{`{
  "fullName": "John Doe",
  "postcode": "NN3 5AL",
  "serviceType": "Plumbing",
  "requestCallback": true
}`}</pre>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Response Format</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-green-600 mb-2">Success Response</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <pre>{`{
  "success": true,
  "message": "Form submitted successfully",
  "data": {
    "submissionTime": "2025-09-18T14:51:15.595Z"
  }
}`}</pre>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-red-600 mb-2">Error Response</h3>
              <div className="bg-gray-900 text-red-400 p-4 rounded-lg font-mono text-sm">
                <pre>{`{
  "success": false,
  "error": "Missing required fields"
}`}</pre>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <Link 
            href="/integration-example.html"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View Integration Example
          </Link>
          <p className="text-gray-600">
            Complete working example with JavaScript code for integration
          </p>
        </div>

        <div className="mt-12 bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Deployment Note</h3>
          <p className="text-yellow-700">
            This API service needs to be deployed to a server accessible by your website. 
            Update the API URL in your frontend code after deployment.
          </p>
        </div>
      </div>
    </main>
  );
}
