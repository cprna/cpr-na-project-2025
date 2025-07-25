import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ClipboardList, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useSimpleAuth } from "@/hooks/useSimpleAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PreTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useSimpleAuth();
  const { toast } = useToast();

  const questions = [
    {
      question: "วัตถุประสงค์หลักของการช่วยฟื้นคืนชีพ (CPR) คืออะไร?",
      options: [
        "เพื่อให้ผู้ป่วยได้รับสารอาหารเพียงพอ",
        "เพื่อป้องกันการติดเชื้อในร่างกาย",
        "เพื่อฟื้นคืนการหายใจและการไหลเวียนโลหิต และป้องกันเนื้อเยื่อขาดออกซิเจน",
        "เพื่อทำให้ผู้ป่วยรู้สึกตัวและสามารถเดินได้ทันที"
      ],
      correct: 2
    },
    {
      question: "ช่วงเวลาใดที่ถือเป็น \"นาทีทอง\" (Golden period) ในการช่วยชีวิตผู้ป่วยที่หัวใจหยุดเต้น?",
      options: [
        "ภายใน 1 นาที",
        "ช่วง 4-8 นาที",
        "ช่วง 10-15 นาที",
        "มากกว่า 20 นาที"
      ],
      correct: 1
    },
    {
      question: "ตามหลัก D-R-C-A-B ในขั้นตอนการช่วยชีวิตขั้นพื้นฐาน (BLS) \"D\" ย่อมาจากอะไร?",
      options: [
        "Defibrillation (การกระตุกหัวใจด้วยไฟฟ้า)",
        "Danger (อันตรายที่อาจเกิดขึ้น)",
        "Diagnosis (การวินิจฉัย)",
        "Drugs (ยา)"
      ],
      correct: 1
    },
    {
      question: "เมื่อประเมินการตอบสนองของผู้ป่วย (R: Response) และพบว่าผู้ป่วยไม่รู้สึกตัว ควรทำอย่างไรต่อไป?",
      options: [
        "รีบเริ่มกดหน้าอกทันที",
        "เขย่าไหล่พร้อมปลุกเรียก \"คุณๆๆ...\" และเรียกให้คนช่วยพร้อมโทร 1669 และนำเครื่อง AED มาด้วย",
        "ตรวจสอบการหายใจเป็นอันดับแรก",
        "เคลื่อนย้ายผู้ป่วยไปยังที่ปลอดภัย"
      ],
      correct: 1
    },
    {
      question: "ในการตรวจสอบระบบไหลเวียน (C: Circulation) ควรจับชีพจรที่ใด และนานเท่าใด?",
      options: [
        "ชีพจรข้อมือ (Radial artery) เป็นเวลา 15 วินาที",
        "ชีพจรเท้า (Dorsalis pedis artery) เป็นเวลา 30 วินาที",
        "ชีพจรคอ (Carotid artery) พร้อมดูการหายใจ เป็นเวลา 5-10 วินาที",
        "ชีพจรขาหนีบ (Femoral artery) เป็นเวลา 10-15 วินาที"
      ],
      correct: 2
    },
    {
      question: "ตำแหน่งที่ถูกต้องในการวางส้นมือเพื่อกดหน้าอก (Chest Compression) คือบริเวณใด?",
      options: [
        "บริเวณซี่โครงที่ 3 ด้านซ้าย",
        "บริเวณครึ่งบนของกระดูก sternum",
        "ตรงกลางหน้าอก บริเวณครึ่งล่างของกระดูก sternum",
        "บริเวณใต้ลิ้นปี่"
      ],
      correct: 2
    },
    {
      question: "ความลึกที่เหมาะสมในการกดหน้าอกสำหรับผู้ใหญ่คือเท่าใด?",
      options: [
        "2-3 เซนติเมตร",
        "5-6 เซนติเมตร (2-2.4 นิ้ว)",
        "8-10 เซนติเมตร",
        "ไม่เกิน 1 นิ้ว"
      ],
      correct: 1
    },
    {
      question: "อัตราการกดหน้าอกที่เหมาะสมสำหรับผู้ใหญ่คือเท่าใด?",
      options: [
        "60-80 ครั้งต่อนาที",
        "100-120 ครั้งต่อนาที",
        "130-150 ครั้งต่อนาที",
        "ไม่เกิน 90 ครั้งต่อนาที"
      ],
      correct: 1
    },
    {
      question: "วิธีการเปิดทางเดินหายใจ (A: Airway) ที่แนะนำในผู้ป่วยทั่วไปคือวิธีใด?",
      options: [
        "การเปิดขากรรไกร (Jaw thrust)",
        "การดึงลิ้นออก (Tongue pull)",
        "การกดหน้าผากและเชยคาง (Head tilt chin lift)",
        "การใช้เครื่องมือดูดเสมหะ"
      ],
      correct: 2
    },
    {
      question: "ในการช่วยหายใจ (B: Breathing) ควรเป่าลมกี่ครั้ง และใช้เวลาประมาณเท่าไรต่อครั้ง?",
      options: [
        "เป่าลม 1 ครั้ง ใช้เวลา 2 วินาที",
        "เป่าลม 2 ครั้ง ใช้เวลาประมาณ 1 วินาทีต่อครั้ง",
        "เป่าลม 3 ครั้ง ใช้เวลา 0.5 วินาทีต่อครั้ง",
        "เป่าลมต่อเนื่องจนกว่าหน้าอกจะยกขึ้น"
      ],
      correct: 1
    },
    {
      question: "อัตราส่วนที่ถูกต้องของการกดหน้าอกต่อการช่วยหายใจในการทำ CPR สำหรับผู้ใหญ่คือเท่าใด?",
      options: [
        "15:2",
        "30:2",
        "5:1",
        "ไม่จำกัดอัตราส่วน ขึ้นอยู่กับความเหมาะสม"
      ],
      correct: 1
    },
    {
      question: "หลังจากทำ CPR ครบ 5 รอบ ควรประเมินซ้ำโดยการทำอะไร?",
      options: [
        "โทรแจ้ง 1669 อีกครั้ง",
        "จับชีพจรที่คอ (Carotid artery)",
        "ให้ผู้ป่วยดื่มน้ำ",
        "เคลื่อนย้ายผู้ป่วยไปยังโรงพยาบาลทันที"
      ],
      correct: 1
    },
    {
      question: "AED ย่อมาจากอะไร?",
      options: [
        "Automated Emergency Device",
        "Automatic External Defibrillator",
        "Advanced Emergency Defibrillator",
        "Assisted Electrical Device"
      ],
      correct: 1
    },
    {
      question: "เมื่อเครื่อง AED มาถึง สิ่งแรกที่ควรทำคืออะไร?",
      options: [
        "แปะแผ่น electrode ทันที",
        "กดปุ่ม Shock ทันที",
        "เปิดเครื่อง AED",
        "ทำ CPR ต่อไปโดยไม่สนใจ AED"
      ],
      correct: 2
    },
    {
      question: "ข้อใดไม่ใช่เหตุผลในการหยุดทำ CPR?",
      options: [
        "ผู้ป่วยมีชีพจรและกลับมาหายใจได้เอง",
        "ผู้ช่วยเหลือทำ CPR ต่อไม่ไหว",
        "ทำ CPR นานเกิน 30 นาที",
        "ผู้ป่วยเริ่มมีอาการชักกระตุก"
      ],
      correct: 3
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
        exam_type: 'pre_test',
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

  if (showResults) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
          <div className="container mx-auto max-w-2xl">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl flex items-center justify-center gap-2">
                  <ClipboardList className="w-6 h-6 text-primary" />
                  ผลการทดสอบก่อนเรียน
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="text-6xl font-bold text-primary">
                  {score}/{questions.length}
                </div>
                <div className="text-xl text-muted-foreground">
                  คะแนนของคุณ: {percentage.toFixed(0)}%
                </div>
                <div className={`text-lg font-semibold ${percentage >= 70 ? 'text-success' : 'text-warning'}`}>
                  {percentage >= 70 ? 'ผ่านการทดสอบ' : 'ควรศึกษาเพิ่มเติม'}
                </div>
                <Button 
                  className="bg-gradient-medical text-white" 
                  size="lg"
                  onClick={() => window.location.href = '/learn'}
                >
                  เริ่มเรียนรู้ <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
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
              <h1 className="text-2xl font-bold">ทดสอบความรู้ก่อนเรียน</h1>
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

export default PreTest;