// src/services/npmRegistry.ts
import axios from 'axios';

const API_BASE_URL = 'https://registry.npmjs.org';

export const searchPackages = async (query: string, page: number, size: number = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/-/v1/search`, {
      params: {
        text: query,
        size,
        from: (page - 1) * size, // Calculate the starting index for pagination
      },
    });
    return {
      objects: response.data.objects,
      total: response.data.total,
    };
  } catch (error) {
    console.error('Error searching packages:', error);
    throw error;
  }
};

export const getPackageDetails = async (packageName: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${packageName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching package details:', error);
    throw error;
  }
};