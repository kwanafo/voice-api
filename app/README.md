
# Voice API Service

A Next.js backend API service for handling form submissions from voice.kwanafo.space and forwarding them to Make.com webhook.

## Features

- ✅ CORS configured for https://voice.kwanafo.space
- ✅ Form validation and error handling  
- ✅ Forwards data to Make.com webhook
- ✅ Production-ready with proper error responses
- ✅ TypeScript support

## API Endpoint

### POST /api/submitForm

Accepts form submissions and forwards them to the Make.com webhook.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "postcode": "NN3 5AL", 
  "serviceType": "Plumbing",
  "requestCallback": true
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Form submitted successfully",
  "data": {
    "submissionTime": "2025-09-18T14:51:15.595Z"
  }
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": "Missing required fields: fullName, postcode, serviceType"
}
```

## Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   
3. **Test the API:**
   ```bash
   curl -X POST http://localhost:3000/api/submitForm \
     -H "Content-Type: application/json" \
     -H "Origin: https://voice.kwanafo.space" \
     -d '{
       "fullName": "Test User",
       "postcode": "NN3 5AL", 
       "serviceType": "Plumbing",
       "requestCallback": true
     }'
   ```

## Production Deployment

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start production server:**
   ```bash
   npm start
   ```

3. **Environment Variables:**
   - No environment variables required
   - Make.com webhook URL is hardcoded in the API route
   - CORS origin is set to https://voice.kwanafo.space

## Frontend Integration

To integrate with your existing website form:

1. **Update form submission to use fetch API:**
   ```javascript
   const API_BASE_URL = 'YOUR_DEPLOYED_API_URL'; // Replace with your deployed URL

   async function submitForm(formData) {
     try {
       const response = await fetch(`${API_BASE_URL}/api/submitForm`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(formData)
       });

       const result = await response.json();
       return result;
     } catch (error) {
       return { success: false, error: 'Network error' };
     }
   }
   ```

2. **Handle form submission:**
   ```javascript
   document.getElementById('serviceForm').addEventListener('submit', async (e) => {
     e.preventDefault();
     
     const formData = {
       fullName: document.getElementById('fullName').value.trim(),
       postcode: document.getElementById('postcode').value.trim(),
       serviceType: document.getElementById('serviceType').value,
       requestCallback: document.getElementById('requestCallback').checked
     };
     
     const result = await submitForm(formData);
     
     if (result.success) {
       // Show success message
       alert('Form submitted successfully!');
       document.getElementById('serviceForm').reset();
     } else {
       // Show error message
       alert(`Error: ${result.error}`);
     }
   });
   ```

## Testing

Visit http://localhost:3000/integration-example.html for a complete working example with a test form.

## Deployment Options

- **Vercel:** Deploy directly from GitHub with `vercel --prod`
- **Netlify:** Connect GitHub repository for automatic deployments
- **Railway:** Deploy with `railway up` 
- **Digital Ocean App Platform:** Use the web interface or doctl CLI
- **AWS/GCP/Azure:** Use their respective Node.js hosting services

## CORS Configuration

The API is configured to accept requests from:
- `https://voice.kwanafo.space` (production)

To add additional origins, update the `ALLOWED_ORIGIN` constant in `src/app/api/submitForm/route.ts`.

## Make.com Webhook

The API forwards all form submissions to:
```
https://hook.eu2.make.com/476murtf66gthwc7rpd8e2dd449dp4zd
```

Data format sent to webhook:
```json
{
  "fullName": "John Doe",
  "postcode": "NN3 5AL",
  "serviceType": "Plumbing", 
  "requestCallback": true,
  "submissionTime": "2025-09-18T14:51:15.595Z",
  "source": "voice.kwanafo.space"
}
```

## License

MIT
