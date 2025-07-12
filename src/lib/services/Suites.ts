import type { SuiteFormValues } from "@/interface/suites";
import supabase from "./supabase";
import { ENV } from "../constants";

export async function getSuites() {
  const { data: suites, error } = await supabase.from("suites").select("*");
  if (error) {
    console.error("Error fetching suites:", error);
    return [];
  }
  return suites;
}

export async function deleteSuite(suiteId: string) {
  const { error } = await supabase.from("suites").delete().eq("id", suiteId);
  if (error) {
    console.error("Error deleting suite:", error);
    throw error;
  }
  return true;
}

const BUCKET = "suites";

export async function createEditSuite(newSuite: SuiteFormValues, id?: string) {
  const imageFiles: (File | string)[] = Array.isArray(newSuite.images)
    ? newSuite.images
    : newSuite.images instanceof FileList
    ? Array.from(newSuite.images)
    : [];

  const isEditing = Boolean(id);

  // Use the public URL prefix for your Supabase storage bucket
  const PUBLIC_URL_PREFIX = `https://${ENV.SUPABASE_URL}/storage/v1/object/public/${BUCKET}/`;

  const existingUrls = imageFiles.filter(
    (file): file is string =>
      typeof file === "string" && file.startsWith(PUBLIC_URL_PREFIX)
  );

  const fileUploads = imageFiles.filter((f): f is File => f instanceof File);

  // 1. Upload new images
  const uploadedUrls: string[] = [];

  for (const file of fileUploads) {
    const filePath = `${crypto.randomUUID()}-${file.name.replaceAll("/", "")}`;
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(filePath, file);

    if (uploadError) {
      console.error(uploadError);
      throw new Error("Failed to upload suite image");
    }

    const { data: publicUrlData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(filePath);

    if (!publicUrlData?.publicUrl) {
      throw new Error("Failed to retrieve public image URL");
    }

    uploadedUrls.push(publicUrlData.publicUrl);
  }

  const finalImages = [...existingUrls, ...uploadedUrls];

  const suitePayload = {
    ...newSuite,
    images: finalImages,
  };

  // 2. Create or Update the suite
  let data, error;

  if (!isEditing) {
    const result = await supabase
      .from("suites")
      .insert([suitePayload])
      .select()
      .single();
    data = result.data;
    error = result.error;
  } else {
    const result = await supabase
      .from("suites")
      .update(suitePayload)
      .eq("id", id!)
      .select()
      .single();
    data = result.data;
    error = result.error;
  }

  if (error) {
    console.error(error);
    throw new Error("Failed to create/update suite");
  }

  return data;
}
