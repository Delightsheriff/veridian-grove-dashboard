import supabase from "./supabase";

export async function getSuites() {
  const { data: suites, error } = await supabase.from("suites").select("*");
  if (error) {
    console.error("Error fetching suites:", error);
    return [];
  }
  return suites;
}
