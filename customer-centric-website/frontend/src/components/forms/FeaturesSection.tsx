interface FeaturesSectionProps {
  features: string[];
  selectedFeatures: string[];
  onFeatureChange: (
    feature: string,
    checked: boolean
  ) => void;
}

export default function FeaturesSection({
  features,
  selectedFeatures,
  onFeatureChange,
}: FeaturesSectionProps) {
  return (
    <div className="mt-8">
      <label className="mb-4 block font-medium">
        Required Features
      </label>

      <div className="grid gap-3 md:grid-cols-2">
        {features.map((feature) => (
          <label
            key={feature}
            className="flex items-center gap-2"
          >
            <input
              type="checkbox"
              checked={selectedFeatures.includes(
                feature
              )}
              onChange={(event) =>
                onFeatureChange(
                  feature,
                  event.target.checked
                )
              }
            />

            {feature}
          </label>
        ))}
      </div>
    </div>
  );
}