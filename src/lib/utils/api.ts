import axios, { AxiosRequestConfig } from 'axios';

interface PolygonApiConfig {
  endpoint: string;
  params?: Record<string, any>;
  apiKey: string;
}

export const fetchPolygonData = async <T>({
  endpoint,
  params = {},
  apiKey,
}: PolygonApiConfig): Promise<T> => {
  const baseUrl = process.env.POLYGON_API_URL;

  const config: AxiosRequestConfig = {
    method: 'GET',
    url: `${baseUrl}/${endpoint}`,
    params: {
      ...params,
      apiKey: apiKey ?? process.env.POLYGON_API_KEY,
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

interface PolygonApiRequest {
  endpoint: string;
  params?: Record<string, any>;
  apiKey: string;
}

export const fetchPolygonListData = async <T>(
  requests: PolygonApiRequest[]
): Promise<T[]> => {
  const baseUrl = process.env.POLYGON_API_URL;

  const configs: AxiosRequestConfig[] = requests.map(
    ({ endpoint, params = {}, apiKey }) => ({
      method: 'GET',
      url: `${baseUrl}/${endpoint}`,
      params: {
        ...params,
        apiKey: apiKey ?? process.env.POLYGON_API_KEY,
        cache: 'force-cache',
      },
    })
  );

  try {
    const responses = await Promise.all(configs.map((config) => axios(config)));
    console.log(
      '🚀 ~ responses:',
      responses.map((r) => r.data)
    );
    return responses.map((response) => response.data);
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
