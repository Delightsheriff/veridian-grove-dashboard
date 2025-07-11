"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DialogFooter } from "@/components/ui/dialog";
import {
  suiteSchema,
  type Suite,
  type SuiteFormValues,
} from "@/interface/suites";
import z from "zod"; // Import zod for validation

interface CreateSuiteFormProps {
  defaultValues?: Partial<Suite>;
  isEditing?: boolean;
  onCancel?: () => void;
  onSubmit: (data: SuiteFormValues) => void;
}

const featuresList = [
  { key: "wifi", label: "Wi-Fi" },
  { key: "airConditioning", label: "Air Conditioning" },
  { key: "tv", label: "TV" },
  { key: "petFriendly", label: "Pet-Friendly" },
  { key: "freeBreakfast", label: "Free Breakfast" },
  { key: "privateBalcony", label: "Private Balcony" },
  { key: "jacuzzi", label: "Jacuzzi" },
  { key: "oceanView", label: "Ocean View" },
  { key: "butlerService", label: "24/7 Butler Service" },
  { key: "roomService", label: "Room Service" },
  { key: "miniBar", label: "Mini Bar" },
  { key: "inRoomSafe", label: "In-room Safe" },
  { key: "smartLighting", label: "Smart Lighting" },
  { key: "soundProofing", label: "Sound Proofing" },
  { key: "heatedFloors", label: "Heated Floors" },
];

const defaultFeatures = featuresList.reduce((acc, feature) => {
  acc[feature.key] = false;
  return acc;
}, {} as Record<string, boolean>);

export default function CreateSuiteForm({
  defaultValues = {},
  isEditing = false,
  onCancel,
  onSubmit,
}: CreateSuiteFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    max_guests: "1",
    regular_price: "0",
    discount: "0",
    features: defaultFeatures,
    images: null as FileList | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form data when defaultValues change (for editing)
  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      setFormData({
        name: defaultValues.name || "",
        description: defaultValues.description || "",
        max_guests: String(defaultValues.max_guests || 1),
        regular_price: String(defaultValues.regular_price || 0),
        discount: String(defaultValues.discount || 0),
        features: {
          ...defaultFeatures,
          ...defaultValues.features,
        },
        images: null,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        max_guests: "1",
        regular_price: "0",
        discount: "0",
        features: defaultFeatures,
        images: null,
      });
    }
  }, [defaultValues]);

  const handleInputChange = (
    field: string,
    value: string | number | boolean | FileList | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleFeatureChange = (featureKey: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [featureKey]: checked,
      },
    }));
  };

  const validateForm = () => {
    try {
      const validatedData = suiteSchema.parse({
        name: formData.name,
        description: formData.description,
        max_guests: formData.max_guests,
        regular_price: formData.regular_price,
        discount: formData.discount,
        features: formData.features,
        images: formData.images,
      });
      setErrors({});
      return validatedData;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err: z.ZodIssue) => {
          const path = err.path.join(".");
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validatedData = validateForm();
    if (validatedData) {
      try {
        await onSubmit(validatedData);
        // Reset form after submit if not editing
        if (!isEditing) {
          setFormData({
            name: "",
            description: "",
            max_guests: "1",
            regular_price: "0",
            discount: "0",
            features: defaultFeatures,
            images: null,
          });
        }
      } catch (error) {
        console.error("Form submission error:", error);
      }
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {/* Suite Name */}
        <div className="col-span-2 space-y-2">
          <Label htmlFor="name">Suite Name</Label>
          <Input
            id="name"
            placeholder="e.g., The Royal Penthouse"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        {/* Description */}
        <div className="col-span-2 space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            rows={3}
            placeholder="Brief description of the suite..."
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        {/* Max Guests */}
        <div className="space-y-2">
          <Label htmlFor="max_guests">Max Guests</Label>
          <Input
            id="max_guests"
            type="number"
            min="1"
            value={formData.max_guests}
            onChange={(e) => handleInputChange("max_guests", e.target.value)}
          />
          {errors.max_guests && (
            <p className="text-sm text-red-500">{errors.max_guests}</p>
          )}
        </div>

        {/* Regular Price */}
        <div className="space-y-2">
          <Label htmlFor="regular_price">Regular Price ($)</Label>
          <Input
            id="regular_price"
            type="number"
            step="0.01"
            min="0"
            value={formData.regular_price}
            onChange={(e) => handleInputChange("regular_price", e.target.value)}
          />
          {errors.regular_price && (
            <p className="text-sm text-red-500">{errors.regular_price}</p>
          )}
        </div>

        {/* Discount */}
        <div className="col-span-2 space-y-2">
          <Label htmlFor="discount">Discount ($)</Label>
          <Input
            id="discount"
            type="number"
            step="0.01"
            min="0"
            value={formData.discount}
            onChange={(e) => handleInputChange("discount", e.target.value)}
          />
          {errors.discount && (
            <p className="text-sm text-red-500">{errors.discount}</p>
          )}
        </div>

        {/* Features */}
        <fieldset className="col-span-2 space-y-4 rounded-lg border p-4">
          <legend className="px-2 text-sm font-medium">Suite Features</legend>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {featuresList.map((feature) => (
              <div key={feature.key} className="flex items-center gap-2">
                <Switch
                  id={feature.key}
                  checked={formData.features[feature.key] || false}
                  onCheckedChange={(checked) =>
                    handleFeatureChange(feature.key, checked)
                  }
                />
                <Label
                  htmlFor={feature.key}
                  className="text-sm font-normal cursor-pointer"
                >
                  {feature.label}
                </Label>
              </div>
            ))}
          </div>
          {errors.features && (
            <p className="text-sm text-red-500">
              Please check your feature selections
            </p>
          )}
        </fieldset>

        {/* Images */}
        <div className="col-span-2 space-y-3 p-4 border rounded-lg bg-muted/20">
          <Label htmlFor="images" className="text-sm font-medium">
            Suite Images
          </Label>
          <div className="space-y-2">
            <Input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleInputChange("images", e.target.files)}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
            />
            <p className="text-xs text-muted-foreground px-1">
              Select multiple images for the suite gallery (JPG, PNG, WebP)
            </p>
          </div>
          {errors.images && (
            <p className="text-sm text-red-500 px-1">{errors.images}</p>
          )}
        </div>
      </div>

      {/* Form Actions */}
      <DialogFooter>
        <Button
          variant="outline"
          type="button"
          onClick={() => {
            if (onCancel) onCancel();
            // Reset form if not editing
            if (!isEditing) {
              setFormData({
                name: "",
                description: "",
                max_guests: "1",
                regular_price: "0",
                discount: "0",
                features: defaultFeatures,
                images: null,
              });
            }
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 text-white"
        >
          {isSubmitting
            ? isEditing
              ? "Updating..."
              : "Creating..."
            : isEditing
            ? "Update Suite"
            : "Create Suite"}
        </Button>
      </DialogFooter>
    </form>
  );
}
