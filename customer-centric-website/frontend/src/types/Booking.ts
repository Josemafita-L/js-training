export interface BookingFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  budget: string;
  date: string;
  time: string;
  notes: string;

  slotId?: number;
}