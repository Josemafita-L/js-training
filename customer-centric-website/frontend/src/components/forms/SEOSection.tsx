import { ChangeEvent } from "react";
import type { WebsiteFormData } from "../../types/website";

interface SEOSectionProps {
  formData: WebsiteFormData;
  onChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void;
}

export default function SEOSection({
  formData,
  onChange,
}: SEOSectionProps) {
  return (
    <div className="mt-8">
      <label className="mb-4 block font-medium">
        SEO Requirement
      </label>

      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="seo"
            value="Basic"
            checked={formData.seo === "Basic"}
            onChange={onChange}
          />

          Basic
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="seo"
            value="Advanced"
            checked={formData.seo === "Advanced"}
            onChange={onChange}
          />

          Advanced
        </label>
      </div>
    </div>
  );
}