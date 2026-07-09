import axios from 'axios';

// Create an Axios instance with a default base URL
const API = axios.create({
  baseURL: 'http://localhost:5000', // Your Express server URL
});

// Function to fetch images from Pexels
export const fetchImages = async (title) => {
  console.log('111111:', title); // Log the title

  try {
    const response = await API.get('/api/pexels/search', {
      params: {
        query: title,
        per_page: 4,
      },
      headers: {
        // You might not need Authorization here if it's handled by the backend
      },
    });
    return response.data.photos.map(photo => photo.src.original);
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};
