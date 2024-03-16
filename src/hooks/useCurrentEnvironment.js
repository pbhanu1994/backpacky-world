import { useState, useEffect } from "react";
import { ENVIRONMENTS } from "../constants/environments";

const useCurrentEnvironment = () => {
  const [currentEnvironment, setCurrentEnvironment] = useState(null);

  useEffect(() => {
    const currentEnv = Object.values(ENVIRONMENTS).find(
      (env) => env === process.env.NODE_ENV
    );
    setCurrentEnvironment(currentEnv);
  }, []);

  return currentEnvironment;
};

export default useCurrentEnvironment;
