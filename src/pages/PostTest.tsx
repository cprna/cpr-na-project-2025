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
      question: "หลังจากเรียนแล้ว อัตราการกดหน้าอกที่ถูกต้องคือเท่าไร?",
      options: [
        "80-100 ครั้งต่อนาที",
        "100-120 ครั้งต่อนาที", 
        "120-140 ครั้งต่อนาที",
        "60-80 ครั้งต่อนาที"
      ],
      correct: 1
    },
    {
      question: "ตำแหน่งที่ถูกต้องในการวางมือเมื่อกดหน้าอกคือ?",
      options: [
        "กึ่งกลางหน้าอกระหว่างลูกเต้านม",
        "ใต้ลูกเต้านมซ้าย",
        "เหนือลูกเต้านมขวา",
        "ด้านข้างของหน้าอก"
      ],
      correct: 0
    },
    {
      question: "เมื่อใช้ AED แล้ว ขั้นตอนถัดไปคืออะไร?",
      options: [
        "รอดูผลการช็อก",
        "เริ่ม CPR ทันที",
        "ตรวจชีพจรอีกครั้ง",
        "ปิดเครื่อง AED"
      ],
      correct: 1
    },
    {
      question: "ในผู้ใหญ่ ควรให้ลมหายใจกี่ครั้งหลังการกดหน้าอก 30 ครั้ง?",
      options: [
        "1 ครั้ง",
        "2 ครั้ง",
        "3 ครั้ง",
        "4 ครั้ง"
      ],
      correct: 1
    },
    {
      question: "สิ่งที่ต้องทำก่อนการใช้ AED คือ?",
      options: [
        "ตรวจสอบการหายใจ",
        "แจ้งทุกคนให้ไม่สัมผัสผู้ป่วย",
        "เช็ดหน้าอกให้แห้ง",
        "ข้อ 2 และ 3 ถูกต้อง"
      ],
      correct: 3
    },
    {
      question: "การกดหน้าอกควรใช้แรงจากส่วนไหนของร่างกาย?",
      options: [
        "แขนและไหล่",
        "หลังและแขน",
        "น้ำหนักตัวและไหล่",
        "ข้อมือและนิ้วมือ"
      ],
      correct: 2
    },
    {
      question: "สัญญาณที่บ่งบอกว่า CPR มีประสิทธิภาพคือ?",
      options: [
        "หน้าอกยุบลงได้ 5-6 ซม.",
        "ผู้ป่วยเริ่มกลับมารู้สึกตัว",
        "การกดแต่ละครั้งทำให้หน้าอกกลับสู่ตำแหน่งเดิม",
        "ทุกข้อถูกต้อง"
      ],
      correct: 3
    },
    {
      question: "ผู้ป่วยที่ไม่ควรใช้ AED คือ?",
      options: [
        "เด็กอายุต่ำกว่า 8 ปี",
        "ผู้ป่วยที่เปียกน้ำ",
        "ผู้ป่วยที่มีโลหะในร่างกาย",
        "ข้อ 1 และ 2 ถูกต้อง"
      ],
      correct: 3
    },
    {
      question: "ควรทำ CPR ต่อเนื่องจนกว่า?",
      options: [
        "ผู้ป่วยฟื้นคืนสติ",
        "หน่วยกู้ชีพมาถึง",
        "ผู้ทำ CPR เหนื่อยล้า",
        "ข้อ 1 และ 2 ถูกต้อง"
      ],
      correct: 3
    },
    {
      question: "หลังจากเรียนแล้ว สิ่งสำคัญที่สุดในการช่วยฟื้นคืนชีพคือ?",
      options: [
        "ความรวดเร็วในการตัดสินใจ",
        "การทำ CPR อย่างต่อเนื่อง",
        "การใช้ AED อย่างถูกต้อง",
        "ทุกข้อสำคัญเท่ากัน"
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