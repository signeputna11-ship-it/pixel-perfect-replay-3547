CREATE TABLE public.course_question_submissions (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), created_at timestamptz NOT NULL DEFAULT now(), course_slug text NOT NULL, email text NOT NULL, question text NOT NULL);
GRANT ALL ON public.course_question_submissions TO service_role;
ALTER TABLE public.course_question_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service inserts only" ON public.course_question_submissions FOR INSERT TO service_role WITH CHECK (true);
CREATE TABLE public.ai_helper_state (id text PRIMARY KEY, status integer NOT NULL, message text NOT NULL);
GRANT ALL ON public.ai_helper_state TO service_role;
ALTER TABLE public.ai_helper_state ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service manages AI state" ON public.ai_helper_state FOR ALL TO service_role USING (true) WITH CHECK (true);