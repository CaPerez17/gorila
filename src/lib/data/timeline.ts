import type { TimelineEvent } from "@/types";
import timelineData from "../../../data/timeline.json";

const timeline = timelineData as TimelineEvent[];

export function getAllTimelineEvents(): TimelineEvent[] {
  return timeline.sort((a, b) => a.year.localeCompare(b.year));
}
