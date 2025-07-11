import supabase from "./supabase";

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
