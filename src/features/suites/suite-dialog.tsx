import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";
import CreateSuiteForm from "./CreateSuiteForm";
import { useState } from "react";
import type { Suite, SuiteFormValues } from "@/interface/suites";
import React from "react";
import { useCreateEditSuite } from "./useSuites";

export function CreateSuiteDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { createEditSuite, isPending } = useCreateEditSuite();

  const handleSubmit = async (data: SuiteFormValues) => {
    await createEditSuite({ suiteData: data });
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add new suite
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Suite</DialogTitle>
          <DialogDescription>
            Add a new suite to your property. Fill in the details below to get
            started.
          </DialogDescription>
        </DialogHeader>
        <CreateSuiteForm
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          isSubmitting={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}

export function EditSuiteDialog({
  suite,
  onSubmit,
  isLoading,
  open: controlledOpen,
  setOpen: setControlledOpen,
}: {
  suite: Suite;
  onSubmit: (data: SuiteFormValues) => void;
  isLoading?: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen =
    controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const setIsOpen =
    setControlledOpen !== undefined ? setControlledOpen : setUncontrolledOpen;

  // Memoize defaultValues to prevent unnecessary re-renders
  const defaultValues = React.useMemo(
    () => ({
      id: suite.id,
      name: suite.name,
      description: suite.description,
      max_guests: suite.max_guests,
      regular_price: suite.regular_price,
      discount: suite.discount,
      features: suite.features,
      images: suite.images, // Preserve existing images
    }),
    [
      suite.id,
      suite.name,
      suite.description,
      suite.max_guests,
      suite.regular_price,
      suite.discount,
      suite.features,
      suite.images,
    ]
  );

  const handleCancel = () => setIsOpen(false);

  const handleSubmit = (data: SuiteFormValues) => {
    onSubmit(data);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="font-normal">
          <Edit className="mr-2 h-4 w-4 font-normal" />
          Edit suite
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Suite</DialogTitle>
          <DialogDescription>
            Update the suite details below. Changes will be saved when you click
            "Update Suite".
          </DialogDescription>
        </DialogHeader>
        <CreateSuiteForm
          defaultValues={defaultValues}
          isEditing={true}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          isSubmitting={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
