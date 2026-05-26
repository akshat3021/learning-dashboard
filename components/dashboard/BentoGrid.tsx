import { Course } from "@/types";
import HeroTile from "./HeroTile";
import CourseTile from "./CourseTile";
import ActivityTile from "./ActivityTile";
import StatsTile from "./StatsTile";
import { AnimatedContainer, AnimatedItem } from "./AnimatedGrid";

export default function BentoGrid({ courses }: { courses: Course[] }) {
  return (
    <AnimatedContainer>
      {/* Hero — full width on mobile/tablet, 2 cols on desktop */}
      <AnimatedItem className="col-span-1 md:col-span-2 lg:col-span-2">
        <HeroTile />
      </AnimatedItem>

      {/* Stats — full width on mobile, 1 col on desktop */}
      <AnimatedItem className="col-span-1 md:col-span-2 lg:col-span-1">
        <StatsTile />
      </AnimatedItem>

      {/* Course tiles */}
      {courses.slice(0, 3).map((course, i) => (
        <AnimatedItem key={course.id} className="col-span-1">
          <CourseTile course={course} index={i} />
        </AnimatedItem>
      ))}

      {/* Activity — full width on mobile, 2 cols on desktop */}
      <AnimatedItem className="col-span-1 md:col-span-2 lg:col-span-2">
        <ActivityTile />
      </AnimatedItem>

      {/* 4th course */}
      {courses[3] && (
        <AnimatedItem className="col-span-1">
          <CourseTile course={courses[3]} index={3} />
        </AnimatedItem>
      )}
    </AnimatedContainer>
  );
}