import { useState } from "react";

export interface ApiResProps {
  error?: string,
  message?: string,
  data: any,
}

export const checkError = (apiResponse : ApiResProps) => {
  const [error, setError] = useState<string | null>(null)
  const [data , setData] = useState<string | null>(null)

  if (apiResponse.error) {
    setError(apiResponse.error)
  }

  if (apiResponse.data) {
    setData(apiResponse.data)
  }

  return {error, data}
}
