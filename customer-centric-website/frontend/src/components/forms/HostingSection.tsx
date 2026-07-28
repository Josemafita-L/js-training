import { ChangeEvent } from "react";
import type { WebsiteFormData } from "../../types/website";

interface HostingSectionProps {
  formData: WebsiteFormData;
  onChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void;
}

export default function HostingSection({
  formData,
  onChange,
}: HostingSectionProps) {
  return (
    <div className="mt-8">
      <label className="mb-4 block font-medium">
        Need Hosting?
      </label>

      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="hosting"
            value="Yes"
            checked={formData.hosting === "Yes"}
            onChange={onChange}
          />

          Yes
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="hosting"
            value="No"
            checked={formData.hosting === "No"}
            onChange={onChange}
          />

          No
        </label>
      </div>
    </div>
  );
}