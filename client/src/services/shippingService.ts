import axios from "axios";

export const calculateShipping = async (zipCode: string, token: string) => {
  const response = await axios.post(
    "http://localhost:8080/shipping/calculate",
    { zipCode },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.shippingCost;
};