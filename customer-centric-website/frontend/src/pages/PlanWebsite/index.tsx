
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { submitWebsiteRequest } from "../../api/website";

import Button from "../../components/common/Button";
import Container from "../../components/common/Container";
import SectionTitle from "../../components/common/SectionTitle";

import PersonalInfo from "../../components/forms/PersonalInfo";
import ProjectDetails from "../../components/forms/ProjectDetails";
import FeaturesSection from "../../components/forms/FeaturesSection";
import HostingSection from "../../components/forms/HostingSection";
import SEOSection from "../../components/forms/SEOSection";
import NotesSection from "../../components/forms/NotesSection";

import type { WebsiteFormData } from "../../types/website";

const initialState: WebsiteFormData = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  pages: "",
  features: [],
  hosting: "",
  seo: "",
  notes: "",
};

const availableFeatures = [
  "Booking System",
  "Contact Form",
  "WhatsApp",
  "Blog",
  "E-Commerce",
  "Chat Support",
  "Automated Emails",
];

export default function PlanWebsite() {
  const [formData, setFormData] = useState(initialState);

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (name in errors) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    setFormData((previous) => ({
      ...previous,
      features: checked
        ? [...previous.features, feature]
        : previous.features.filter((item) => item !== feature),
    }));
  };

  const validateForm = () => {
    const newErrors = {
      fullName: "",
      email: "",
      phone: "",
    };

    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required";
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors.");
      return;
    }

    setLoading(true);

    try {
      await submitWebsiteRequest(formData);

      toast.success("Requirements submitted successfully!");

      setFormData(initialState);

      setErrors({
        fullName: "",
        email: "",
        phone: "",
      });
    }catch (error: any) {
  console.log(error.response?.data);
  toast.error(error.response?.data?.error || "Something went wrong.");
}finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 py-20">
      <Container>
        <SectionTitle>Plan My Website</SectionTitle>

        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-gray-600">
          Tell us about your project. We'll review your requirements and contact you shortly.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-lg"
        >
          <PersonalInfo
            formData={formData}
            errors={errors}
            onChange={handleChange}
          />

          <ProjectDetails
            formData={formData}
            onChange={handleChange}
          />

          <FeaturesSection
            features={availableFeatures}
            selectedFeatures={formData.features}
            onFeatureChange={handleFeatureChange}
          />

          <HostingSection
            formData={formData}
            onChange={handleChange}
          />

          <SEOSection
            formData={formData}
            onChange={handleChange}
          />

          <NotesSection
            formData={formData}
            onChange={handleChange}
          />

          <Button
            type="submit"
            className="mt-8 w-full"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Requirements"}
          </Button>
        </form>
      </Container>
    </section>
  );
}
