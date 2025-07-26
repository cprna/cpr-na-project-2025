import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Smile, Meh, Frown, MessageCircle, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type FeedbackFormProps = {
  onComplete: () => void;
};

const FeedbackForm = ({ onComplete }: FeedbackFormProps) => {
  const [satisfaction, setSatisfaction] = useState<"พอใจมาก" | "พอใจ" | "ไม่พอใจ" | null>(null);
  const [usability, setUsability] = useState<"ง่าย" | "ปานกลาง" | "ยาก" | null>(null);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!satisfaction || !usability) {
      alert("กรุณาเลือกระดับความพึงพอใจและความง่ายในการใช้งาน");
      return;
    }

    setIsSubmitting(true);
    
    const profileUser = JSON.parse(localStorage.getItem("profile_user") || "null");
    if (!profileUser?.id && !profileUser?.user_id) {
      alert("ไม่พบข้อมูลผู้ใช้");
      setIsSubmitting(false);
      return;
    }

    const userId = profileUser.user_id || profileUser.id;
    
    try {
      // Verify if the user exists in the profiles table and get their profile id
      const { data: userProfile, error: userCheckError } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (userCheckError || !userProfile) {
        alert("ไม่พบข้อมูลผู้ใช้ในระบบ กรุณาลงทะเบียนก่อนทำแบบประเมิน");
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase.from("feedbacks").insert([
        {
          user_id: userProfile.id,
          satisfaction,
          usability,
          comment: comment || null,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      onComplete();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกแบบสอบถาม กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">แบบสอบถามความพึงพอใจ</CardTitle>
        <CardDescription className="text-center">
          กรุณาให้ความคิดเห็นเพื่อช่วยเราพัฒนาบทเรียนให้ดียิ่งขึ้น
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>ระดับความพึงพอใจต่อเนื้อหาบทเรียน</Label>
          <RadioGroup
            className="grid grid-cols-3 gap-4"
            value={satisfaction || ""}
            onValueChange={(value) => setSatisfaction(value as typeof satisfaction)}
          >
            <Label
              className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent cursor-pointer
                ${satisfaction === "พอใจมาก" ? "border-primary" : "border-muted"}
              `}
            >
              <RadioGroupItem value="พอใจมาก" className="sr-only" />
              <Smile className="w-6 h-6 mb-2 text-success" />
              <span className="text-sm font-medium">พอใจมาก</span>
            </Label>
            <Label
              className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent cursor-pointer
                ${satisfaction === "พอใจ" ? "border-primary" : "border-muted"}
              `}
            >
              <RadioGroupItem value="พอใจ" className="sr-only" />
              <Meh className="w-6 h-6 mb-2 text-warning" />
              <span className="text-sm font-medium">พอใจ</span>
            </Label>
            <Label
              className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent cursor-pointer
                ${satisfaction === "ไม่พอใจ" ? "border-primary" : "border-muted"}
              `}
            >
              <RadioGroupItem value="ไม่พอใจ" className="sr-only" />
              <Frown className="w-6 h-6 mb-2 text-destructive" />
              <span className="text-sm font-medium">ไม่พอใจ</span>
            </Label>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>ความง่ายในการใช้งานเว็บไซต์</Label>
          <RadioGroup
            className="grid grid-cols-3 gap-4"
            value={usability || ""}
            onValueChange={(value) => setUsability(value as typeof usability)}
          >
            <Label
              className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent cursor-pointer
                ${usability === "ง่าย" ? "border-primary" : "border-muted"}
              `}
            >
              <RadioGroupItem value="ง่าย" className="sr-only" />
              <Smile className="w-6 h-6 mb-2 text-success" />
              <span className="text-sm font-medium">ง่าย</span>
            </Label>
            <Label
              className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent cursor-pointer
                ${usability === "ปานกลาง" ? "border-primary" : "border-muted"}
              `}
            >
              <RadioGroupItem value="ปานกลาง" className="sr-only" />
              <Meh className="w-6 h-6 mb-2 text-warning" />
              <span className="text-sm font-medium">ปานกลาง</span>
            </Label>
            <Label
              className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent cursor-pointer
                ${usability === "ยาก" ? "border-primary" : "border-muted"}
              `}
            >
              <RadioGroupItem value="ยาก" className="sr-only" />
              <Frown className="w-6 h-6 mb-2 text-destructive" />
              <span className="text-sm font-medium">ยาก</span>
            </Label>
          </RadioGroup>
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
          disabled={isSubmitting || !satisfaction || !usability}
        >
          <Send className="w-4 h-4 mr-2" />
          {isSubmitting ? "กำลังบันทึก..." : "ส่งแบบสอบถาม"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
