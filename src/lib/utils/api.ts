import axios, { AxiosRequestConfig } from 'axios';

interface PolygonApiConfig {
  endpoint: string;
  params?: Record<string, any>;
  apiKey: string;
}

// Use template typing for return type
export const fetchPolygonData = async <T>({
  endpoint,
  params = {},
  apiKey,
}: PolygonApiConfig): Promise<T> => {
  const baseUrl = 'https://api.polygon.io';

  const config: AxiosRequestConfig = {
    method: 'GET',
    url: `${baseUrl}/${endpoint}`,
    params: {
      ...params,
      apiKey,
      cache: 'force-cache',
    },
  };

  try {
    const response = await axios(config);
    console.log('🚀 ~ response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      throw new Error(
        `API request failed: ${error.response?.data?.message || error.message}`
      );
    } else {
      console.error('Unexpected error:', error);
      throw new Error('Unexpected error occurred');
    }
  }
};
