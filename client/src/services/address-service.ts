import type { IAddress } from "@/commons/types";

export const getMyAddresses = async (): Promise<IAddress[]> => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:8080/addresses", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) return [];
  return await response.json();
};

export const saveAddress = async (
  address: IAddress
): Promise<IAddress | null> => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:8080/addresses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(address),
  });
  if (!response.ok) return null;
  return await response.json();
};
