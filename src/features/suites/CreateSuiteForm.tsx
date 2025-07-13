/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useMemo } from "react";
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
import { useCreateEditSuite } from "./useSuites";
import { z } from "zod";
import { Loader2 } from "lucide-react";

interface CreateSuiteFormProps {
  defaultValues?: Partial<Suite>;
  isEditing?: boolean;
  onCancel?: () => void;
  onSubmit?: (data: SuiteFormValues) => void;
  onSuccess?: () => void;
  isSubmitting?: boolean;
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
  onSuccess,
  isSubmitting,
}: CreateSuiteFormProps) {
  const { createEditSuite, isPending: isSubmittingHook } = useCreateEditSuite();

  // Memoize initial form data to prevent unnecessary re-renders
  const initialFormData = useMemo(
    () => ({
      name: defaultValues.name || "",
      description: defaultValues.description || "",
      max_guests: String(defaultValues.max_guests || 1),
      regular_price: String(defaultValues.regular_price || 0),
      discount: String(defaultValues.discount || 0),
      features: { ...defaultFeatures, ...(defaultValues.features || {}) },
      images: null as FileList | null,
      existingImages: defaultValues.images || [], // Keep track of existing images
    }),
    [defaultValues]
  );

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form data when defaultValues change (for edit mode)
  React.useEffect(() => {
    setFormData({
      name: defaultValues.name || "",
      description: defaultValues.description || "",
      max_guests: String(defaultValues.max_guests || 1),
      regular_price: String(defaultValues.regular_price || 0),
      discount: String(defaultValues.discount || 0),
      features: { ...defaultFeatures, ...(defaultValues.features || {}) },
      images: null,
      existingImages: defaultValues.images || [],
    });
  }, [defaultValues.id]); // Only depend on ID to avoid infinite loops

  const handleInputChange = useCallback(
    (field: string, value: string | number | boolean | FileList | null) => {
      if (field === "images") {
        // Only allow FileList | null for images
        setFormData((prev) => ({
          ...prev,
          images: value as FileList | null,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [field]: value,
        }));
      }

      // Clear error when user starts typing
      setErrors((prev) => {
        if (prev[field]) {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        }
        return prev;
      });
    },
    []
  );

  const handleFeatureChange = useCallback(
    (featureKey: string, checked: boolean) => {
      setFormData((prev) => ({
        ...prev,
        features: {
          ...prev.features,
          [featureKey]: checked,
        },
      }));
    },
    []
  );

  const validateForm = useCallback(() => {
    try {
      // In edit mode, if no new images are selected, use existing images
      const imagesToValidate =
        isEditing && !formData.images
          ? formData.existingImages
          : formData.images;

      const validatedData = suiteSchema.parse({
        name: formData.name,
        description: formData.description,
        max_guests: formData.max_guests,
        regular_price: formData.regular_price,
        discount: formData.discount,
        features: formData.features,
        images: imagesToValidate,
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
  }, [formData, isEditing]);

  const resetForm = useCallback(() => {
    setFormData({
      name: "",
      description: "",
      max_guests: "1",
      regular_price: "0",
      discount: "0",
      features: { ...defaultFeatures },
      images: null,
      existingImages: [],
    });
    setErrors({});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validatedData = validateForm();
    if (!validatedData) return;

    try {
      // For editing, if no new images are selected, preserve existing images
      const finalData = {
        ...validatedData,
        images:
          isEditing && !formData.images
            ? formData.existingImages
            : validatedData.images,
      };

      if (onSubmit) {
        await onSubmit(finalData);
        // Call onSuccess after successful submission
        if (onSuccess) {
          onSuccess();
        }
      } else {
        await createEditSuite({
          suiteData: finalData,
          id: isEditing ? defaultValues.id : undefined,
        });
        if (!isEditing) {
          resetForm();
        }
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    if (!isEditing) {
      resetForm();
    }
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
            disabled={isSubmitting || isSubmittingHook}
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
            disabled={isSubmitting || isSubmittingHook}
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
            disabled={isSubmitting || isSubmittingHook}
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
            disabled={isSubmitting || isSubmittingHook}
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
            disabled={isSubmitting || isSubmittingHook}
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
                  disabled={isSubmitting || isSubmittingHook}
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

          {/* Show existing images in edit mode */}
          {isEditing &&
            formData.existingImages &&
            formData.existingImages.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  Current images ({formData.existingImages.length}):
                </p>
                <div className="flex flex-wrap gap-2">
                  {formData.existingImages.slice(0, 3).map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Suite image ${index + 1}`}
                        className="w-16 h-16 object-cover rounded border"
                      />
                    </div>
                  ))}
                  {formData.existingImages.length > 3 && (
                    <div className="w-16 h-16 bg-muted rounded border flex items-center justify-center text-xs">
                      +{formData.existingImages.length - 3}
                    </div>
                  )}
                </div>
              </div>
            )}

          <div className="space-y-2">
            <Input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleInputChange("images", e.target.files)}
              disabled={isSubmitting || isSubmittingHook}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
            />
            <p className="text-xs text-muted-foreground px-1">
              {isEditing
                ? "Select new images to replace existing ones (JPG, PNG, WebP)"
                : "Select multiple images for the suite gallery (JPG, PNG, WebP)"}
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
          onClick={handleCancel}
          disabled={isSubmitting || isSubmittingHook}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || isSubmittingHook}
          className="bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 text-white"
        >
          {isSubmitting || isSubmittingHook ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEditing ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>{isEditing ? "Update Suite" : "Create Suite"}</>
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}
