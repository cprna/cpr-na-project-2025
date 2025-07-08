import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ClipboardList, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

const PreTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "อัตราการกดหน้าอกในการช่วยฟื้นคืนชีพขั้นพื้นฐาน (CPR) ควรเป็นเท่าไร?",
      options: [
        "80-100 ครั้งต่อนาที",
        "100-120 ครั้งต่อนาที", 
        "120-140 ครั้งต่อนาที",
        "60-80 ครั้งต่อนาที"
      ],
      correct: 1
    },
    {
      question: "ความลึกในการกดหน้าอกสำหรับผู้ใหญ่ควรเป็นเท่าไร?",
      options: [
        "3-4 เซนติเมตร",
        "4-5 เซนติเมตร",
        "5-6 เซนติเมตร",
        "6-7 เซนติเมตร"
      ],
      correct: 2
    },
    {
      question: "AED ย่อมาจากอะไร?",
      options: [
        "Automatic Emergency Defibrillator",
        "Automated External Defibrillator",
        "Advanced Emergency Device",
        "Automatic External Device"
      ],
      correct: 1
    },
    {
      question: "ขั้นตอนแรกในการช่วยเหลือผู้ป่วยหมดสติคืออะไร?",
      options: [
        "เริ่มการกดหน้าอกทันที",
        "ตรวจสอบการตอบสนองและหายใจ",
        "โทรเรียกความช่วยเหลือ",
        "หาเครื่อง AED"
      ],
      correct: 1
    },
    {
      question: "อัตราส่วนการกดหน้าอกต่อการเป่าปากเป็นเท่าไร?",
      options: [
        "15:2",
        "20:2", 
        "30:2",
        "40:2"
      ],
      correct: 2
    },
    {
      question: "เมื่อไรที่ไม่ควรใช้เครื่อง AED?",
      options: [
        "ผู้ป่วยเปียกน้ำ",
        "ผู้ป่วยมีเครื่องกระตุ้นหัวใจ",
        "ผู้ป่วยมีแผลโลหะ",
        "ถูกทุกข้อ"
      ],
      correct: 3
    },
    {
      question: "การกดหน้าอกควรใช้ส่วนไหนของมือ?",
      options: [
        "ฝ่ามือทั้งหมด",
        "ปลายนิ้วมือ",
        "ส้นฝ่ามือ",
        "ข้อมือ"
      ],
      correct: 2
    },
    {
      question: "ก่อนใช้ AED ต้องทำอะไรก่อน?",
      options: [
        "ตรวจสอบให้แน่ใจว่าไม่มีใครสัมผัสผู้ป่วย",
        "เช็ดน้ำออกจากหน้าอกผู้ป่วย",
        "ถอดเสื้อผ้าออกจากหน้าอก",
        "ถูกทุกข้อ"
      ],
      correct: 3
    },
    {
      question: "ควรเปลี่ยนผู้กดหน้าอกทุกกี่นาที?",
      options: [
        "ทุก 1 นาที",
        "ทุก 2 นาที",
        "ทุก 3 นาที",
        "ทุก 5 นาที"
      ],
      correct: 1
    },
    {
      question: "สัญญาณที่บ่งบอกว่าผู้ป่วยต้องการ CPR คืออะไร?",
      options: [
        "ไม่มีการตอบสนองและไม่หายใจปกติ",
        "หายใจลำบาก",
        "เจ็บหน้าอก",
        "มีไข้"
      ],
      correct: 0
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

export default PreTest;