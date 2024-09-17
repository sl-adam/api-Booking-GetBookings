import { test, expect, request, APIRequestContext } from '@playwright/test';

// Define a variable for the auth token with the correct type
let authToken: string = '';

test.describe('Booking API Tests', () => {

  // Step 1: Authenticate and get the token before all tests
  test.beforeAll(async ({ request }) => {
    const apiContext: APIRequestContext = await request.newContext();
    
    const response = await apiContext.post('https://restful-booker.herokuapp.com/auth', {
      data: {
        username: 'admin',
        password: 'password123',
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(response.ok()).toBeTruthy(); // Ensure the POST request was successful
    const responseBody = await response.json();
    
    // Store the auth token
    authToken = responseBody.token;
    console.log(`Auth token: ${authToken}`);
  });

  // Step 2: Make a GET request to the booking endpoint
  test('Verify GET /booking returns valid response', async ({ request }) => {
    const apiContext: APIRequestContext = await request.newContext();

    const response = await apiContext.get('https://restful-booker.herokuapp.com/booking', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`, // Include the token in the headers if necessary
      },
    });
    
    expect(response.ok()).toBeTruthy(); // Check if the response status is 200 OK

    const responseBody: { bookingid: number }[] = await response.json();
    console.log(responseBody); // Optional: log the response for debugging
    
    // Verify that the response is an array and contains booking IDs
    expect(Array.isArray(responseBody)).toBeTruthy(); // The response should be an array
    expect(responseBody.length).toBeGreaterThan(0); // Ensure the array is not empty
    
    // Check the structure of the first booking
    expect(responseBody[0]).toHaveProperty('bookingid'); // Each object should have a 'bookingid' property
  });
});
