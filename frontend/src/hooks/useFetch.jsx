import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

/**
 * Custom hook for handling API requests with loading, error states and caching
 * @param {string} url - API endpoint
 * @param {Object} options - Fetch options
 * @param {boolean} options.skipOnMount - Skip fetching on component mount
 * @param {boolean} options.cache - Enable caching of results
 * @param {Array} dependencies - Dependencies for refetching data
 * @returns {Object} data, loading, error, refetch
 */
const useFetch = (url, options = {}, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!options.skipOnMount);
  const [error, setError] = useState(null);
  const [controller, setController] = useState(null);

  // Cache for storing fetched data
  const cacheKey = options.cache ? url : null;
  
  // Function to fetch data
  const fetchData = useCallback(async (fetchOptions = {}) => {
    // Cancel previous request if it exists
    if (controller) {
      controller.abort();
    }
    
    // Create new AbortController for this request
    const newController = new AbortController();
    setController(newController);
    
    setLoading(true);
    setError(null);
    
    try {
      // Check cache first if caching is enabled
      if (cacheKey && sessionStorage.getItem(cacheKey)) {
        try {
          const cachedData = JSON.parse(sessionStorage.getItem(cacheKey));
          setData(cachedData);
          setLoading(false);
          return cachedData;
        } catch (err) {
          // If there's an error parsing cached data, proceed with fetch
          console.warn('Error parsing cached data:', err);
          sessionStorage.removeItem(cacheKey);
        }
      }
      
      // Make API request
      const response = await api.request({
        url,
        ...options,
        ...fetchOptions,
        signal: newController.signal
      });
      
      setData(response.data);
      
      // Cache the response if caching is enabled
      if (cacheKey) {
        sessionStorage.setItem(cacheKey, JSON.stringify(response.data));
      }
      
      return response.data;
    } catch (err) {
      // Don't set error state if request was aborted
      if (err.name !== 'AbortError') {
        setError(err.response?.data || err.message || 'Something went wrong');
        console.error(`Error fetching from ${url}:`, err);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, cacheKey, controller, ...dependencies]);

  // Initial fetch on mount if not skipped
  useEffect(() => {
    if (!options.skipOnMount) {
      fetchData();
    }
    
    // Cleanup function to abort fetch on unmount
    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, [fetchData, options.skipOnMount]);

  // Function to manually refetch data
  const refetch = useCallback((fetchOptions = {}) => {
    return fetchData(fetchOptions);
  }, [fetchData]);

  // Function to update cached data
  const updateCache = useCallback((updateFn) => {
    if (!cacheKey) return;
    
    setData(prevData => {
      const newData = updateFn(prevData);
      sessionStorage.setItem(cacheKey, JSON.stringify(newData));
      return newData;
    });
  }, [cacheKey]);

  // Function to clear cache
  const clearCache = useCallback(() => {
    if (!cacheKey) return;
    sessionStorage.removeItem(cacheKey);
  }, [cacheKey]);

  return {
    data,
    loading,
    error,
    refetch,
    updateCache,
    clearCache
  };
};

export default useFetch;