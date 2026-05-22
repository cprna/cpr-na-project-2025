import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type FeedbackFormProps = {
  onComplete: () => void;
};

const FeedbackForm = ({ onComplete }: FeedbackFormProps) => {
  // 5 Likert questions (1-5)
  const questionList = [
    { key: "q1", text: "ความชัดเจนของเนื้อหา" },
    { key: "q2", text: "ความสะดวกในการใช้งาน" },
    { key: "q3", text: "ประสบการณ์การเรียนรู้" },
    { key: "q4", text: "ความเหมาะสมและความน่าสนใจของเนื้อหาในสไลด์" },
    { key: "q5", text: "ความพึงพอใจโดยรวมลักษณะของแบบทดสอบ" },
  ] as const;

  type AnswerKey = typeof questionList[number]["key"];

  const [answers, setAnswers] = useState<Record<AnswerKey, string>>({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // เรียงจาก 5 → 1 ให้ค่ามากอยู่ฝั่งซ้าย
  const likertOptions = [
    { value: "5", label: "พึงพอใจมากที่สุด" },
    { value: "4", label: "พึงพอใจมาก" },
    { value: "3", label: "พึงพอใจปานกลาง" },
    { value: "2", label: "พึงพอใจน้อย" },
    { value: "1", label: "พึงพอใจน้อยที่สุด" },
  ];

  const handleSubmit = async () => {
    // Validate all five questions answered
    const allAnswered = Object.values(answers).every((v) => v !== "");
    if (!allAnswered) {
      toast({
        title: "กรุณาตอบทุกข้อ",
        description: "กรุณาตอบทุกข้อในแบบประเมินความพึงพอใจ",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    const profileUser = JSON.parse(localStorage.getItem("profile_user") || "null");
    if (!profileUser?.id) {
      toast({
        title: "ข้อผิดพลาด",
        description: "ไม่พบข้อมูลผู้ใช้",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    const profileId = profileUser.id;
    
    try {
      // Map to DB columns
      // - satisfaction: คะแนนโดยรวม (q5) ยังเก็บไว้เพื่อความเข้ากันได้เดิม
      // - usability: คะแนนความสะดวกในการใช้งาน (q2) ยังเก็บไว้เดิม
      // - q1..q5: เก็บคะแนนทั้ง 5 ข้อเป็นตัวเลข
      // - answers (jsonb): เก็บวัตถุคำตอบทั้งหมด + หมายเหตุ
      const payload = {
        user_id: profileId,
        satisfaction: answers.q5, // string "1"-"5" (เดิม)
        usability: answers.q2,    // string "1"-"5" (เดิม)
        q1: Number(answers.q1),
        q2: Number(answers.q2),
        q3: Number(answers.q3),
        q4: Number(answers.q4),
        q5: Number(answers.q5),
        answers: { ...answers, note: comment || undefined },
        comment: JSON.stringify({ answers, note: comment || undefined }),
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("feedbacks").insert([payload]);

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      toast({
        title: "ส่งแบบสอบถามสำเร็จ",
        description: "ขอบคุณสำหรับความคิดเห็นของคุณ"
      });

      onComplete();
    } catch (error: any) {
      console.error("Error submitting feedback:", error);
      let errorMessage = "เกิดข้อผิดพลาดในการบันทึกแบบสอบถาม กรุณาลองใหม่อีกครั้ง";
      
      if (error?.message?.includes("foreign key")) {
        errorMessage = "ข้อมูลผู้ใช้ไม่ตรงกับระบบ กรุณาเข้าสู่ระบบใหม่";
      } else if (error?.message?.includes("row-level security")) {
        errorMessage = "ไม่มีสิทธิ์ในการบันทึกข้อมูล กรุณาติดต่อผู้ดูแลระบบ";
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "เกิดข้อผิดพลาด",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">แบบสอบถามความพึงพอใจ</CardTitle>
        <CardDescription className="text-center space-y-1">
          <p className="text-xs text-muted-foreground">
            ระดับคะแนน: 1 = พึงพอใจน้อยที่สุด · 2 = พึงพอใจน้อย · 3 = พึงพอใจปานกลาง · 4 = พึงพอใจมาก · 5 = พึงพอใจมากที่สุด
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Likert questions */}
        <div className="space-y-6">
          {questionList.map((q, idx) => (
            <div key={q.key} className="space-y-3 pt-4 first:pt-0 border-t first:border-t-0">
              <Label className="text-base font-medium">
                {idx + 1}. {q.text}
              </Label>
              <RadioGroup
                className="grid grid-cols-2 sm:grid-cols-5 gap-2"
                value={answers[q.key]}
                onValueChange={(value) => setAnswers((prev) => ({ ...prev, [q.key]: value }))}
              >
                {likertOptions.map((opt) => (
                  <div key={`${q.key}-${opt.value}`} className="relative">
                    <RadioGroupItem id={`${q.key}-${opt.value}`} value={opt.value} className="sr-only peer" />
                    <Label
                      htmlFor={`${q.key}-${opt.value}`}
                      className="block cursor-pointer select-none rounded-md border bg-background p-2 text-center text-xs sm:text-sm transition-colors hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                      aria-label={opt.label}
                      title={opt.label}
                    >
                      <span className="block text-base sm:text-lg font-semibold">{opt.value}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            ความคิดเห็นเพิ่มเติม (ไม่บังคับ)
          </Label>
          <Textarea
            placeholder="แสดงความคิดเห็นของคุณที่นี่..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <Button 
          className="w-full"
          onClick={handleSubmit}
          disabled={isSubmitting || !Object.values(answers).every((v) => v !== "")}
        >
          <Send className="w-4 h-4 mr-2" />
          {isSubmitting ? "กำลังบันทึก..." : "ส่งแบบสอบถาม"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
