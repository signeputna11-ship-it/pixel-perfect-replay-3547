import { createFileRoute } from "@tanstack/react-router";
import { answerCourseQuestion } from "@/lib/course-helper.server";
export const Route = createFileRoute("/api/public/course-helper")({ server: { handlers: { POST: ({ request }) => answerCourseQuestion(request) } } });