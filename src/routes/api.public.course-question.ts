import { createFileRoute } from "@tanstack/react-router";
import { submitCourseQuestion } from "@/lib/course-helper.server";
export const Route = createFileRoute("/api/public/course-question")({ server: { handlers: { POST: ({ request }) => submitCourseQuestion(request) } } });