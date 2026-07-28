import axios from "./axios";

export interface Slot {
  ID: number;
  date: string;
  time: string;
  available: boolean;
}

export const getSlots = async () => {
  const response = await axios.get("/slots");
  return response.data;
};

export const createSlot = async (slot: {
  date: string;
  time: string;
}) => {
  const response = await axios.post("/slots", slot);
  return response.data;
};

export const deleteSlot = async (id: number) => {
  await axios.delete(`/slots/${id}`);
};