import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Award, ClipboardList, ArrowRight, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";

const PostTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "ลำดับขั้นตอน D-R-C-A-B ที่ถูกต้องคือ?",
      options: [
        "Danger, Response, Circulation, Airway, Breathing",
        "Danger, Response, Airway, Circulation, Breathing", 
        "Response, Danger, Circulation, Airway, Breathing",
        "Danger, Circulation, Response, Airway, Breathing"
      ],
      correct: 0
    },
    {
      question: "เมื่อผู้ป่วยไม่มีชีพจรและไม่หายใจ หลังจากโทร 1669 แล้วควรทำอะไรทันที?",
      options: [
        "รอหน่วยกู้ชีพมาถึง",
        "เริ่มกดหน้าอก (Chest Compression) ทันที",
        "หาเครื่อง AED ก่อน",
        "ให้การช่วยหายใจก่อน"
      ],
      correct: 1
    },
    {
      question: "ขั้นตอนการใช้ AED ที่ถูกต้องคือ?",
      options: [
        "เปิด - แปะ - ปุ่ม - ปั๊ม",
        "แปะ - เปิด - ปุ่ม - ปั๊ม",
        "เปิด - ปุ่ม - แปะ - ปั๊ม",
        "ปั๊ม - เปิด - แปะ - ปุ่ม"
      ],
      correct: 0
    },
    {
      question: "การกดหน้าอกที่มีประสิทธิภาพต้องให้หน้าอกยุบลงกี่เซนติเมตร?",
      options: [
        "3-4 เซนติเมตร",
        "4-5 เซนติเมตร",
        "5-6 เซนติเมตร",
        "6-8 เซนติเมตร"
      ],
      correct: 2
    },
    {
      question: "เมื่อใช้ AED ก่อนกดปุ่ม Shock ต้องทำอะไร?",
      options: [
        "บอกทุกคนว่า 'ฉันถอย คุณถอย ทุกคนถอย'",
        "ตรวจสอบว่าไม่มีใครสัมผัสผู้ป่วย",
        "หยุด CPR ชั่วคราว",
        "ถูกทุกข้อ"
      ],
      correct: 3
    },
    {
      question: "หลังจาก Shock ด้วย AED แล้ว ควรทำอะไรทันที?",
      options: [
        "ตรวจสอบชีพจร",
        "รอดูผลการช็อก",
        "เริ่มปั๊มหัวใจต่อทันที",
        "ปิดเครื่อง AED"
      ],
      correct: 2
    },
    {
      question: "การทำ CPR ควรทำครบกี่รอบแล้วประเมินซ้ำ?",
      options: [
        "3 รอบ",
        "5 รอบ",
        "7 รอบ",
        "10 รอบ"
      ],
      correct: 1
    },
    {
      question: "สาเหตุที่ควรหยุดการทำ CPR ไม่รวมข้อใด?",
      options: [
        "ผู้ป่วยมีชีพจรและกลับมาหายใจ",
        "หน่วยแพทย์ฉุกเฉินมาถึง",
        "ทำ CPR นานเกิน 30 นาที",
        "ผู้ป่วยยังไม่ฟื้นหลังจาก 5 นาที"
      ],
      correct: 3
    },
    {
      question: "วิธีการเปิดทางเดินหายใจที่ใช้ในผู้ป่วยสงสัยกระดูกคอหักคือ?",
      options: [
        "Head tilt chin lift",
        "Jaw thrust",
        "ใส่ Oral airway",
        "ใส่ Nasal airway"
      ],
      correct: 1
    },
    {
      question: "ในกรณีที่ไม่สามารถช่วยหายใจได้ ควรทำอย่างไร?",
      options: [
        "หยุดการช่วยเหลือ",
        "ทำ Hand-only CPR (กดหน้าอกอย่างเดียว)",
        "รอหน่วยกู้ชีพ",
        "พยายามช่วยหายใจต่อไป"
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

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
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
                      🎉 ยินดีด้วย!
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
                  disabled={!answers[currentQuestion]}
                  className="bg-gradient-emergency text-white"
                >
                  {currentQuestion === questions.length - 1 ? 'เสร็จสิ้น' : 'ถัดไป'}
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