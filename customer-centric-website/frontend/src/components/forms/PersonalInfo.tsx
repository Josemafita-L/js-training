import { ChangeEvent } from "react";
import type { WebsiteFormData } from "../../types/website";

interface PersonalInfoProps {
  formData: WebsiteFormData;
  errors: {
    fullName: string;
    email: string;
    phone: string;
  };
  onChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

export default function PersonalInfo({
  formData,
  errors,
  onChange,
}: PersonalInfoProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Full Name */}
      <div>
        <label className="mb-2 block font-medium">
          Full Name
        </label>

        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={onChange}
          placeholder="Enter your full name"
          className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
        />

        {errors.fullName && (
          <p className="mt-1 text-sm text-red-500">
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Company Name */}
      <div>
        <label className="mb-2 block font-medium">
          Company Name
        </label>

        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={onChange}
          placeholder="Enter your company name"
          className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Email */}
      <div>
        <label className="mb-2 block font-medium">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="Enter your email"
          className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="mb-2 block font-medium">
          Phone Number
        </label>

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          placeholder="Enter your phone number"
          className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
        />

        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">
            {errors.phone}
          </p>
        )}
      </div>
    </div>
  );
}