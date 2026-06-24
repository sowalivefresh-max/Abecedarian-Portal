/**
 * api.js
 * Centralized API client for communicating with the Google Apps Script Backend.
 */

// REPLACE THIS WITH YOUR GOOGLE APPS SCRIPT WEB APP DEPLOYMENT URL
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzrXGEyWa2vaegguF7i1iAP2Isymjf0t-3rkHswyF4T6eVkP47YTFPzx9xKje9FhzMOWg/exec";

/**
 * Calls a backend function.
 * @param {string} action - The name of the function in Code.gs
 * @param {Array} args - An array of arguments to pass to the function
 * @returns {Promise<any>}
 */
async function runBackendAction(action, args = []) {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({ action: action, args: args }),
      headers: {
        "Content-Type": "text/plain;charset=utf-8" // Important: text/plain prevents CORS preflight issues with Apps Script
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
