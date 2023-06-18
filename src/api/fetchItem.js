import React, { useEffect, useState } from 'react';


export function usePost(id) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData(url) {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await fetch(url);
        const json = await response.json();

        setData(json);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }, [id]);

  return {
    data,
    isLoading,
    isError
  };
}