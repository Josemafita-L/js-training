import { ChangeEvent } from "react";
import type { WebsiteFormData } from "../../types/website";

interface ProjectDetailsProps {
  formData: WebsiteFormData;
  onChange: (
    event: ChangeEvent<HTMLSelectElement>
  ) => void;
}

export default function ProjectDetails({
  formData,
  onChange,
}: ProjectDetailsProps) {
  return (
    <div className="mt-8">
      <label className="mb-2 block font-medium">
        Number of Pages
      </label>

      <select
  name="pages"
  value={formData.pages}
  onChange={onChange}
  className="w-full rounded-lg border border-gray-300 p-3"
>
  <option value="">Select</option>

  <option value="5">1 - 5 Pages</option>

  <option value="10">6 - 10 Pages</option>

  <option value="15">More than 10 Pages</option>
</select>
    </div>
  );
}