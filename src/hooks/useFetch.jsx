import React, { useState } from "react"

const useFetch=(fetchFn)=> {
  const [data, setData]=useState();
  const [isLoading, setIsLoading]=useState(false);
  const [isError, setIsError]=useState(false);
  const [error, setError]=useState();
  const [count, setCounter]=useState(0);


  const trigger=()=>setCounter((prevCount)=>prevCount+1)
  React.useEffect(()=>{
    (async ()=>{
      try{
        const response=  await (fetchFn && fetchFn());
        setData(response)
      } catch(error){
        setError(error);
        setIsError(true);
        console.log(error);
      } finally{
        setIsLoading(false);
      }
    })();
  }, [count])
  
  return {data, isLoading, isError, error, trigger}
}

export default useFetch;