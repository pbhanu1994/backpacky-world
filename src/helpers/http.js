import axios from "axios";

// If we have BaseUrl, uncomment below and add BaseUrl
// const API_BASE_URL = "https://api.example.com"; // Replace this with your API base URL
// const client = axios.create({ baseURL: API_BASE_URL });

const client = axios.create();

// Add the 'Content-Type' header to all requests
client.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

// Function to set the Authorization header with the access token
export const setAuthorizationHeader = (token = null) => {
  if (token) {
    client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete client.defaults.headers.common["Authorization"];
  }
};

// Function to make a GET request
export const get = async (url, params = {}) => {
  try {
    const response = await client.get(url, { params });
    return response.data;
  } catch (error) {
    throw new Error(`GET request to ${url} failed: ${error.message}`);
  }
};

// Function to make a POST request
export const post = async (url, data) => {
  try {
    const response = await client.post(url, data);
    return response.data;
  } catch (error) {
    throw new Error(`POST request to ${url} failed: ${error.message}`);
  }
};

// Function to make a PUT request
export const put = async (url, data) => {
  try {
    const response = await client.put(url, data);
    return response.data;
  } catch (error) {
    throw new Error(`PUT request to ${url} failed: ${error.message}`);
  }
};

// Function to make a PATCH request
export const patch = async (url, data) => {
  try {
    const response = await client.patch(url, data);
    return response.data;
  } catch (error) {
    throw new Error(`PATCH request to ${url} failed: ${error.message}`);
  }
};

// Function to make a DELETE request
export const del = async (url) => {
  try {
    const response = await client.delete(url);
    return response.data;
  } catch (error) {
    throw new Error(`DELETE request to ${url} failed: ${error.message}`);
  }
};
