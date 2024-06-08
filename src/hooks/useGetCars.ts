import useCarsStore from "../store/CarsStore";
import { useState } from "react";

export default function useGetCars() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const { cars, setCars } = useCarsStore();

  const getCars = async () => {
    try {
      const response = await fetch(
        "https://exam-server-7c41747804bf.herokuapp.com/carsList"
      );
      const data = await response.json();
      setCars(data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  return { cars, isLoading, error, getCars };
}
