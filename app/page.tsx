import Sidebar from "@/components/sidebar/Sidebar";
import BentoGrid from "@/components/dashboard/BentoGrid";
import { supabase } from "@/lib/supabase";
import { Course } from "@/types";

export default async function Home() {
  let courses: Course[] = [];
  let error = null;

  try {
    const { data, error: dbError } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });
    if (dbError) throw dbError;
    courses = data || [];
  } catch (err) {
    error = "Failed to load courses.";
    console.error(err);
  }

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 overflow-y-auto pb-24 md:pb-8">
        {error ? (
          <div className="text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl p-4">
            {error}
          </div>
        ) : (
          <BentoGrid courses={courses} />
        )}
      </main>
    </div>
  );
}