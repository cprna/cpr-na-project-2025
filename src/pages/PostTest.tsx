import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Award, ClipboardList, ArrowRight, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useSimpleAuth } from "@/hooks/useSimpleAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PostTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useSimpleAuth();
  const { toast } = useToast();

  const questions = [
    {
      question: "ภาวะหัวใจหยุดเต้น (Cardiac Arrest) หมายถึงอะไร?",
      options: [
        "ภาวะที่หัวใจเต้นเร็วผิดปกติแต่ยังหายใจได้เอง",
        "ภาวะที่ความดันโลหิตสูงขึ้นอย่างรวดเร็ว",
        "ภาวะที่หัวใจหยุดเต้นและหยุดหายใจกะทันหัน",
        "ภาวะที่มีอาการเจ็บหน้าอกรุนแรงแต่ยังมีสติ"
      ],
      correct: 2
    },
    {
      question: "หากสมองขาดออกซิเจนเป็นเวลา 10 นาที จะเกิดผลอย่างไร?",
      options: [
        "อาจเกิดภาวะสมองตายชั่วคราว",
        "อาจนำไปสู่ภาวะสมองตายถาวร",
        "ไม่มีผลกระทบใดๆ ต่อสมอง",
        "ทำให้ผู้ป่วยฟื้นตัวได้อย่างรวดเร็ว"
      ],
      correct: 1
    },
    {
      question: "ใน \"ห่วงโซ่ของการรอดชีวิต\" (Chain of survival) สำหรับผู้ป่วยหัวใจหยุดเต้นนอกโรงพยาบาล การกระทำใดมีความสำคัญควบคู่ไปกับการโทร 1669?",
      options: [
        "จัดหาอาหารและน้ำให้ผู้ป่วย",
        "นำเครื่อง AED มาด้วย",
        "จัดหาเสื้อผ้าที่อบอุ่นให้ผู้ป่วย",
        "พยุงผู้ป่วยให้นั่งขึ้น"
      ],
      correct: 1
    },
    {
      question: "หลังจากตรวจสอบ \"Danger\" (D) ในหลัก D-R-C-A-B ขั้นตอน \"R\" (Response) หมายถึงอะไร?",
      options: [
        "Rest (การพักผ่อนของผู้ป่วย)",
        "Reaction (ปฏิกิริยาของผู้ป่วยต่อยา)",
        "Respiration (การหายใจของผู้ป่วย)",
        "Response (การตอบสนองของผู้ป่วย)"
      ],
      correct: 3
    },
    {
      question: "ในหลัก D-R-C-A-B ตัว \"C\" หมายถึงอะไร และเกี่ยวข้องกับการกระทำใด?",
      options: [
        "Consciousness (ระดับความรู้สึกตัว) ซึ่งเกี่ยวข้องกับการพูดคุยกับผู้ป่วย",
        "Coughing (การไอ) ซึ่งเกี่ยวข้องกับการกระตุ้นให้ผู้ป่วยไอ",
        "Circulation (การตรวจสอบระบบไหลเวียน) ซึ่งเกี่ยวข้องกับการปั๊มหัวใจ",
        "Comfort (ความสะดวกสบาย) ซึ่งเกี่ยวข้องกับการจัดท่าทางให้ผู้ป่วยสบายขึ้น"
      ],
      correct: 2
    },
    {
      question: "พื้นผิวสำหรับการกดหน้าอก (Chest Compression) ควรมีลักษณะอย่างไร?",
      options: [
        "อ่อนนุ่มเพื่อให้ผู้ป่วยรู้สึกสบาย",
        "สามารถปรับระดับความสูงได้",
        "แข็ง",
        "ไม่สำคัญ ขึ้นอยู่กับสถานที่เกิดเหตุ"
      ],
      correct: 2
    },
    {
      question: "เหตุใดจึงต้องให้หน้าอกกระเพื่อมจนสุด (Chest recoil) ก่อนการกดหน้าอกทุกครั้ง?",
      options: [
        "เพื่อให้ผู้ป่วยหายใจได้สะดวกขึ้น",
        "เพื่อป้องกันการบาดเจ็บต่อกระดูกซี่โครง",
        "เพื่อให้หัวใจได้รับเลือดกลับเข้าสู่หัวใจได้เต็มที่และเพิ่มประสิทธิภาพการไหลเวียนโลหิต",
        "เพื่อลดความเหนื่อยล้าของผู้ช่วยเหลือ"
      ],
      correct: 2
    },
    {
      question: "ในกรณีที่สงสัยว่าผู้ป่วยมีกระดูกส่วนคอหัก ควรใช้วิธีเปิดทางเดินหายใจแบบใด?",
      options: [
        "การกดหน้าผากและเชยคาง (Head tilt chin lift)",
        "การเปิดขากรรไกร (Jaw thrust)",
        "การใช้เครื่องมือช่วยหายใจทันที",
        "ไม่จำเป็นต้องเปิดทางเดินหายใจ"
      ],
      correct: 1
    },
    {
      question: "การทำ Hand-only CPR (การกดหน้าอกอย่างเดียว) สามารถทำได้เมื่อใด?",
      options: [
        "เมื่อมีผู้ช่วยเหลือหลายคน",
        "เมื่อผู้ป่วยยังหายใจเฮือกๆ",
        "เมื่อไม่สามารถเป่าปากได้หรือไม่ต้องการเป่าปาก",
        "เมื่อทำ CPR ครบ 5 รอบแล้ว"
      ],
      correct: 2
    },
    {
      question: "ขั้นตอนที่ 2 ในการใช้เครื่อง AED คืออะไร?",
      options: [
        "กดปุ่ม Shock",
        "เปิดเครื่อง AED",
        "แปะแผ่น electrode",
        "ทำ CPR ต่อไป"
      ],
      correct: 2
    },
    {
      question: "ก่อนกดปุ่ม Shock บนเครื่อง AED ผู้ช่วยเหลือต้องประกาศเตือนว่าอย่างไรเพื่อความปลอดภัย?",
      options: [
        "\"ทุกคนเงียบ!\"",
        "\"ฉันถอย คุณถอย ทุกคนถอย\"",
        "\"เตรียมพร้อม!\"",
        "\"เครื่องพร้อมใช้งาน\""
      ],
      correct: 1
    },
    {
      question: "หลังจากทำการ Shock ด้วย AED แล้ว ควรทำอย่างไรต่อไป?",
      options: [
        "รอให้ผู้ป่วยฟื้นตัวอย่างเต็มที่",
        "หยุดทำ CPR ทันที",
        "ปั๊ม (ทำ CPR ต่อ)",
        "ถอดแผ่น electrode ออกจากตัวผู้ป่วย"
      ],
      correct: 2
    },
    {
      question: "ข้อใดเป็นเหตุผลที่ควรหยุดทำ CPR?",
      options: [
        "ผู้ป่วยมีอาการตัวเย็น",
        "หน่วยแพทย์ฉุกเฉินมาช่วยเหลือ",
        "ผู้ป่วยเริ่มมีเสียงกรน",
        "มีคนมุงดูจำนวนมาก"
      ],
      correct: 1
    },
    {
      question: "อุปกรณ์ใดต่อไปนี้จำเป็นสำหรับการทำ CPR และการเปิดทางเดินหายใจ?",
      options: [
        "ผ้าห่มไฟฟ้า",
        "เครื่องชงกาแฟ",
        "Ambubag (ถุงบีบช่วยหายใจ)",
        "โทรทัศน์"
      ],
      correct: 2
    },
    {
      question: "เครื่อง AED ทำงานโดยให้กำเนิดไฟฟ้ากระแสตรงผ่านกล้ามเนื้อหัวใจเพื่อวัตถุประสงค์ใด?",
      options: [
        "เพื่อเพิ่มอุณหภูมิในร่างกายผู้ป่วย",
        "เพื่อกระตุ้นให้กล้ามเนื้อหัวใจทำงานพร้อมกันและกลับมาเต้นเป็นปกติ",
        "เพื่อทำให้ผู้ป่วยหลับสบายขึ้น",
        "เพื่อตรวจจับความผิดปกติของสมอง"
      ],
      correct: 1
    }
  ];

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
  };

  const nextQuestion = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      await submitExamResults();
    }
  };

  const submitExamResults = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const score = calculateScore();
      
      // บันทึกผลสอบลงฐานข้อมูล
      const examData = {
        exam_type: 'post_test',
        score,
        total_questions: questions.length,
        answers: answers,
        simple_user_id: user?.id || null,
        user_id: user?.id || null // ใช้ simple_user_id เป็นหลัก
      };

      const { error } = await supabase
        .from('exam_results')
        .insert(examData);

      if (error) {
        console.error('Error saving exam results:', error);
        toast({
          title: "เกิดข้อผิดพลาด",
          description: "ไม่สามารถบันทึกผลการทดสอบได้",
          variant: "destructive",
        });
      } else {
        toast({
          title: "บันทึกผลการทดสอบเรียบร้อย",
          description: "ผลการทดสอบของคุณถูกบันทึกแล้ว",
        });
      }
    } catch (error) {
      console.error('Error submitting exam:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถบันทึกผลการทดสอบได้",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (parseInt(answers[index]) === q.correct) {
        correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();
  const percentage = (score / questions.length) * 100;

  const getGradeMessage = () => {
    if (percentage >= 90) return "ยอดเยี่ยม! คุณมีความรู้ความเข้าใจในระดับสูง";
    if (percentage >= 80) return "ดีมาก! คุณเข้าใจเนื้อหาเป็นอย่างดี";
    if (percentage >= 70) return "ดี! คุณผ่านการทดสอบ";
    return "ควรทบทวนเนื้อหาเพิ่มเติม";
  };

  if (showResults) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
          <div className="container mx-auto max-w-2xl">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-medical rounded-full flex items-center justify-center mb-4">
                  {percentage >= 70 ? (
                    <Trophy className="w-8 h-8 text-white" />
                  ) : (
                    <ClipboardList className="w-8 h-8 text-white" />
                  )}
                </div>
                <CardTitle className="text-2xl">
                  ผลการทดสอบหลังเรียน
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="text-6xl font-bold text-primary">
                  {score}/{questions.length}
                </div>
                <div className="text-xl text-muted-foreground">
                  คะแนนของคุณ: {percentage.toFixed(0)}%
                </div>
                
                <div className={`p-4 rounded-lg ${
                  percentage >= 70 ? 'bg-success/10 border border-success/20' : 'bg-warning/10 border border-warning/20'
                }`}>
                  <p className={`text-lg font-semibold ${percentage >= 70 ? 'text-success' : 'text-warning'}`}>
                    {getGradeMessage()}
                  </p>
                </div>

                {percentage >= 70 && (
                  <div className="bg-gradient-medical/10 p-6 rounded-lg border border-medical/20">
                    <Award className="w-12 h-12 mx-auto mb-4 text-medical" />
                    <h3 className="text-xl font-bold text-medical mb-2">
                      ยินดีด้วย!
                    </h3>
                    <p className="text-medical">
                      คุณผ่านการอบรมการช่วยฟื้นคืนชีพและการใช้ AED เรียบร้อยแล้ว
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="outline"
                    onClick={() => window.location.href = '/articles'}
                  >
                    อ่านบทความเพิ่มเติม
                  </Button>
                  <Button 
                    className="bg-gradient-emergency text-white"
                    onClick={() => window.location.href = '/'}
                  >
                    กลับหน้าแรก <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
        <div className="container mx-auto max-w-2xl">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold">ทดสอบความรู้หลังเรียน</h1>
              <span className="text-muted-foreground">
                {currentQuestion + 1}/{questions.length}
              </span>
            </div>
            <Progress value={(currentQuestion / questions.length) * 100} className="h-2" />
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">
                {questions[currentQuestion].question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={answers[currentQuestion] || ""}
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`q${currentQuestion}-${index}`} />
                    <Label 
                      htmlFor={`q${currentQuestion}-${index}`}
                      className="flex-1 cursor-pointer py-2"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-end pt-4">
                <Button
                  onClick={nextQuestion}
                  disabled={!answers[currentQuestion] || isSubmitting}
                  className="bg-gradient-emergency text-white"
                >
                  {isSubmitting ? 'กำลังบันทึก...' : currentQuestion === questions.length - 1 ? 'เสร็จสิ้น' : 'ถัดไป'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PostTest;
