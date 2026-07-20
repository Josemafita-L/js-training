import { ChangeEvent } from "react";
import type { WebsiteFormData } from "../../types/website";

interface NotesSectionProps {
  formData: WebsiteFormData;
  onChange: (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

export default function NotesSection({
  formData,
  onChange,
}: NotesSectionProps) {
  return (
    <div className="mt-8">
      <label className="mb-2 block font-medium">
        Additional Notes
      </label>

      <textarea
        name="notes"
        rows={5}
        value={formData.notes}
        onChange={onChange}
        placeholder="Tell us more about your project..."
        className="w-full rounded-lg border border-gray-300 p-3"
      />
    </div>
  );
}