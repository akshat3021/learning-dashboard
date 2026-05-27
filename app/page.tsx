import { Suspense } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import BentoGrid from "@/components/dashboard/BentoGrid";
import { supabase } from "@/lib/supabase";
import { Course } from "@/types";
import Loading from "./loading";

async function DashboardContent() {
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

  if (error) {
    return (
      <div className="text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl p-4">
        {error}
      </div>
    );
  }

  return <BentoGrid courses={courses} />;
}

export default function Home() {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 overflow-y-auto pb-24 md:pb-8 flex flex-col">
        <div className="flex-1">
          <Suspense fallback={<Loading />}>
            <DashboardContent />
          </Suspense>
        </div>

        {/* Footer anchor — prevents the empty void at the bottom */}
        <footer className="mt-8 pt-4 border-t border-white/[0.04] flex items-center justify-between text-[10px] text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            <span>All systems operational</span>
          </div>
          <span style={{ fontFamily: "var(--font-mono), monospace" }}>LearnOS v2.1.0</span>
        </footer>
      </main>
    </div>
  );
}