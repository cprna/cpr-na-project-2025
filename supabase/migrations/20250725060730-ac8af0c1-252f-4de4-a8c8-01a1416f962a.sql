-- เพิ่มการบันทึกข้อมูลการทำข้อสอบใน exam_results table
-- ตรวจสอบว่าการ config ของตาราง exam_results ถูกต้องสำหรับการเก็บข้อมูลการทำข้อสอบ

-- เพิ่ม constraint สำหรับ exam_type
ALTER TABLE public.exam_results 
ADD CONSTRAINT check_exam_type 
CHECK (exam_type IN ('pre_test', 'post_test'));

-- เพิ่ม index สำหรับการค้นหาข้อมูลได้เร็วขึ้น
CREATE INDEX IF NOT EXISTS idx_exam_results_user_id_exam_type ON public.exam_results(user_id, exam_type);
CREATE INDEX IF NOT EXISTS idx_exam_results_simple_user_id_exam_type ON public.exam_results(simple_user_id, exam_type);