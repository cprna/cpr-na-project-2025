import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  ClipboardList, 
  ArrowRight, 
  CheckCircle, 
  Trophy,
  BookOpen
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import FeedbackForm from "@/components/Feedback";

// ===== YouTubePlayer component =====
const YouTubePlayer = ({ youtubeId, onEnded }: { youtubeId: string, onEnded: () => void }) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const ytPlayer = useRef<any>(null);

  useEffect(() => {
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
    function createPlayer() {
      ytPlayer.current = new (window as any).YT.Player(playerRef.current, {
        height: "100%",
        width: "100%",
        videoId: youtubeId,
        events: {
          onStateChange: (event: any) => {
            if (event.data === (window as any).YT.PlayerState.ENDED && onEnded) {
              onEnded();
            }
          }
        }
      });
    }
    if ((window as any).YT && (window as any).YT.Player) {
      createPlayer();
    } else {
      (window as any).onYouTubeIframeAPIReady = createPlayer;
    }
    return () => {
      if (ytPlayer.current && ytPlayer.current.destroy) ytPlayer.current.destroy();
    };
  }, [youtubeId, onEnded]);
  return <div ref={playerRef} className="aspect-video bg-black rounded-lg mb-4 overflow-hidden" />;
};

// ====== ฟังก์ชันบันทึกผลสอบลง supabase ======
async function saveExamResult({
  examType,
  answers,
  questions,
}: {
  examType: "pre_test" | "post_test";
  answers: Record<number, string>;
  questions: any[];
}) {
  const profileUser = JSON.parse(localStorage.getItem("profile_user") || "null");
  if (!profileUser) {
    alert("ไม่พบข้อมูลผู้ใช้ profile_user ใน localStorage");
    return false;
  }

  const score = questions.reduce(
    (acc, q, idx) => acc + (parseInt(answers[idx]) === q.correct ? 1 : 0),
    0
  );

  const { error } = await supabase.from("exam_results").insert([
    {
      user_id: profileUser.user_id || profileUser.id,
      exam_type: examType,
      score,
      total_questions: questions.length,
      answers: JSON.stringify(answers),
      created_at: new Date().toISOString(),
    },
  ]);
  if (error) {
    alert("เกิดข้อผิดพลาดในการบันทึกผลสอบ: " + error.message);
    console.error("Save exam error:", error);
    return false;
  }
  return true;
}

// ====== ฟังก์ชันดึงผลสอบย้อนหลัง ======
async function fetchExamResults() {
  const profileUser = JSON.parse(localStorage.getItem("profile_user") || "null");
  if (!profileUser) return null;
  const { data, error } = await supabase
    .from("exam_results")
    .select("*")
    .eq("user_id", profileUser.user_id || profileUser.id)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Fetch exam results error:", error);
    return null;
  }
  return data;
}

const CourseFlow = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'preTest' | 'preTestResult' | 'introDocs' | 'postTest' | 'feedback' | 'complete' | 'showAnswers'>('preTest');
  const [preTestAnswers, setPreTestAnswers] = useState<Record<number, string>>({});
  const [postTestAnswers, setPostTestAnswers] = useState<Record<number, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  const [examResults, setExamResults] = useState<any[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [showPreTestIntro, setShowPreTestIntro] = useState<boolean>(true);
  const [showPostTestIntro, setShowPostTestIntro] = useState<boolean>(false);
  const [showDoc, setShowDoc] = useState<{ href: string; title: string } | null>(null);

  const getYouTubeId = (url: string) => {
    const m = url.match(/\/embed\/([^\?&]+)/);
    return m ? m[1] : "";
  };

  useEffect(() => {
    if (currentStep === "complete") {
      fetchExamResults().then(data => {
        if (data) setExamResults(data);
      });
    }
  }, [currentStep]);

  // Reset and show intro when entering test steps
  useEffect(() => {
    if (currentStep === 'preTest') {
      setShowPreTestIntro(true);
      setIsTimerRunning(false);
      setTimeLeft(15 * 60);
      setCurrentQuestion(0);
    } else if (currentStep === 'postTest') {
      setShowPostTestIntro(true);
      setIsTimerRunning(false);
      setTimeLeft(15 * 60);
      setCurrentQuestion(0);
    } else {
      setIsTimerRunning(false);
    }
  }, [currentStep]);

  // Countdown ticking
  useEffect(() => {
    if (!isTimerRunning) return;
    const id = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [isTimerRunning]);

  // Auto-submit when time runs out
  useEffect(() => {
    if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      autoSubmitCurrentTest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const startPreTest = () => {
    setShowPreTestIntro(false);
    setIsTimerRunning(true);
  };

  const startPostTest = () => {
    setShowPostTestIntro(false);
    setIsTimerRunning(true);
    setCurrentQuestion(0);
  };

  const autoSubmitCurrentTest = async () => {
    if (currentStep === 'preTest') {
      const score = calculateScore(preTestAnswers);
      const wrongOnes = questions.reduce((acc, q, idx) => {
        if (parseInt(preTestAnswers[idx]) !== q.correct) acc.push(idx + 1);
        return acc;
      }, [] as number[]);
      const ok = await saveExamResult({ examType: 'pre_test', answers: preTestAnswers, questions });
      if (ok) {
        setWrongAnswers(wrongOnes);
        setCurrentStep('preTestResult');
      }
    } else if (currentStep === 'postTest') {
      const ok = await saveExamResult({ examType: 'post_test', answers: postTestAnswers, questions });
      if (ok) setCurrentStep('feedback');
    }
  };

  const questions = [
    {
      question: "ข้อใดเป็นสาเหตุที่อาจทำให้หัวใจหยุดเต้น?",
      options: [
        "การจมน้ำ",
        "การออกกำลังกาย",
        "การนอนหลับ",
        "การดื่มน้ำมาก"
      ],
      correct: 0
    },
    {
      question: "ข้อใดคือขั้นตอนแรกในการช่วยฟื้นคืนชีพขั้นพื้นฐาน (CPR)?",
      options: [
        "ปั๊มหัวใจ",
        "เปิดทางเดินหายใจ",
        "ประเมินความปลอดภัยของสถานที่",
        "ใช้เครื่อง AED ทันที"
      ],
      correct: 2
    },
    {
      question: "เมื่อพบผู้หมดสติ ให้ประเมินการตอบสนองด้วยวิธีใด?",
      options: [
        "เขย่าตัวแรง ๆ",
        "จับชีพจร",
        "ตบไหล่และเรียก",
        "ยกขาผู้ป่วยขึ้น"
      ],
      correct: 2
    },
    {
      question: "การตรวจชีพจรในผู้ใหญ่ควรใช้เวลานานที่สุดกี่วินาที?",
      options: [
        "ไม่เกิน 5 วินาที",
        "ไม่เกิน 10 วินาที",
        "15 วินาที",
        "20 วินาที"
      ],
      correct: 1
    },
    {
      question: "การเปิดทางเดินหายใจทำได้โดยวิธีใด?",
      options: [
        "หงายหน้าและดึงหู",
        "กดหน้าผากและเชยคาง (Head Tilt-Chin Lift)",
        "อ้าปากแล้วปิดจมูก",
        "ใช้มือเปิดปาก"
      ],
      correct: 1
    },
    {
      question: "ในการช่วยหายใจแบบเป่าจากปากสู่ปาก แต่ละครั้งควรใช้เวลานานกี่วินาทีในการเป่าลมเข้าไป?",
      options: [
        "1 วินาที",
        "2 วินาที",
        "3 วินาที",
        "5 วินาที"
      ],
      correct: 0
    },
    {
      question: "เมื่อทำการช่วยหายใจด้วยวิธีปากต่อปาก ควรทำสิ่งใดก่อนเป่าลมเข้าไปในปากผู้ป่วย?",
      options: [
        "ปิดปากผู้ป่วย",
        "ปิดจมูกผู้ป่วย",
        "กดหน้าอกก่อน",
        "ตรวจชีพจรก่อน"
      ],
      correct: 1
    },
    {
      question: "ตำแหน่งที่ถูกต้องของการกดหน้าอกคือบริเวณใด?",
      options: [
        "ปลายลิ้นปี่",
        "กลางกระดูกหน้าอก ระหว่างราวนม",
        "เหนือกระดูกไหปลาร้า",
        "ใต้สะดือ"
      ],
      correct: 1
    },
    {
      question: "ลักษณะการวางมือในการกดหน้าอกที่ถูกต้องคือข้อใด?",
      options: [
        "วางปลายนิ้วกดเบา ๆ",
        "วางฝ่ามือข้างหนึ่งซ้อนบนหลังมืออีกข้างหนึ่ง",
        "วางส้นมือซ้อนกัน เหยียดแขนตรง ศอกงอเล็กน้อย",
        "วางส้นมือซ้อนกัน แขนเหยียดตรง ศอกไม่งอ"
      ],
      correct: 3
    },
    {
      question: "ความลึกในการกดหน้าอกที่ถูกต้องสำหรับผู้ใหญ่คือเท่าใด?",
      options: [
        "2-3 ซม.",
        "3-4 ซม.",
        "4-5 ซม.",
        "5-6 ซม."
      ],
      correct: 3
    },
    {
      question: "อัตราการกดหน้าอกที่เหมาะสมในการทำ CPR คือข้อใด?",
      options: [
        "60-80 ครั้ง/นาที",
        "80-100 ครั้ง/นาที",
        "100-120 ครั้ง/นาที",
        "120-150 ครั้ง/นาที"
      ],
      correct: 2
    },
    {
      question: "จังหวะการทำ CPR ที่ถูกต้องเป็นอย่างไร?",
      options: [
        "ปั๊ม 10 ครั้ง เป่า 1 ครั้ง",
        "ปั๊ม 30 ครั้ง เป่า 2 ครั้ง",
        "ปั๊ม 15 ครั้ง เป่า 1 ครั้ง",
        "ปั๊ม 50 ครั้ง เป่า 5 ครั้ง"
      ],
      correct: 1
    },
    {
      question: "ข้อใดคือหน้าที่ของเครื่อง AED?",
      options: [
        "วัดชีพจร",
        "ตรวจคลื่นไฟฟ้าหัวใจและให้ช็อกไฟฟ้า",
        "ตรวจการหายใจ",
        "วัดอุณหภูมิร่างกาย"
      ],
      correct: 1
    },
    {
      question: "ขั้นตอนที่ถูกต้องเมื่อใช้เครื่อง AED คือข้อใด?",
      options: [
        "แปะแผ่นแล้วช็อกทันที",
        "เปิดเครื่องก่อนแล้วฟังคำสั่ง",
        "กดปุ่มช็อกโดยไม่รอเครื่องวิเคราะห์",
        "เป่าปากก่อนทุกครั้ง"
      ],
      correct: 1
    },
    {
      question: "หลังการช็อกด้วย AED ควรทำอะไรต่อทันที?",
      options: [
        "ตรวจชีพจรอีกครั้ง",
        "เริ่มทำ CPR ต่อทันที 2 นาที",
        "ปิดเครื่อง AED",
        "เคลื่อนย้ายผู้ป่วยทันที"
      ],
      correct: 1
    }
  ];

  // หมายเหตุ: ขั้นเรียนจากวิดีโอหลักถูกย้ายไปหน้า "บทความ" แล้ว

  const handlePreTestAnswer = (value: string) => {
    setPreTestAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
  };

  const handlePostTestAnswer = (value: string) => {
    setPostTestAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
  };

  const nextQuestion = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      if (currentStep === 'preTest') {
        const score = calculateScore(preTestAnswers);
        const wrongOnes = questions.reduce((acc, q, idx) => {
          if (parseInt(preTestAnswers[idx]) !== q.correct) {
            acc.push(idx + 1);
          }
          return acc;
        }, [] as number[]);
  // Stop timer and save exam result
  setIsTimerRunning(false);
        const ok = await saveExamResult({
          examType: "pre_test",
          answers: preTestAnswers,
          questions,
        });

        if (ok) {
          setWrongAnswers(wrongOnes);
          setCurrentStep('preTestResult');
        }
      } else if (currentStep === 'postTest') {
        setIsTimerRunning(false);
        const ok = await saveExamResult({
          examType: "post_test",
          answers: postTestAnswers,
          questions,
        });
        if (ok) {
          setCurrentStep('feedback');
        }
      }
    }
  };

  // ไม่มีขั้นเรียนวิดีโอใน flow นี้แล้ว

  const calculateScore = (answers: Record<number, string>) => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (parseInt(answers[index]) === q.correct) {
        correct++;
      }
    });
    return correct;
  };

  const preTestScore = calculateScore(preTestAnswers);
  const postTestScore = calculateScore(postTestAnswers);

  const getStepNumber = () => {
    switch (currentStep) {
      case 'preTest': return 1;
      case 'introDocs': return 2;
      case 'postTest': return 3;
      case 'feedback': return 4;
      case 'complete': return 5;
      default: return 1;
    }
  };

  const getOverallProgress = () => {
    switch (currentStep) {
      case 'preTest': return 20;
      case 'introDocs': return 40;
      case 'postTest': return 60;
      case 'feedback': return 80;
      case 'complete': return 100;
      default: return 0;
    }
  };

  // Pre-test Result Section
  if (currentStep === 'preTestResult') {
    const score = calculateScore(preTestAnswers);
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">ผลการทดสอบก่อนเรียน</CardTitle>
                <div className="text-4xl font-bold text-primary my-4">
                  {score}/{questions.length}
                  <div className="text-base font-normal text-muted-foreground mt-1">
                    คิดเป็น {((score / questions.length) * 100).toFixed(0)}%
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center text-muted-foreground">
                  คะแนนแบบทดสอบก่อนเรียนของคุณคือ {score} จาก {questions.length} ข้อ
                </div>
                <div className="text-center">
                  <Button 
                    className="bg-gradient-emergency text-white"
                    onClick={() => {
                      setCurrentStep('introDocs');
                      setCurrentQuestion(0);
                    }}
                  >
                    ไปยังคลิปแนะนำและเอกสารประกอบ
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }
  // Intro video + documents Section
  if (currentStep === 'introDocs') {
    const introVideoUrl = "https://www.youtube.com/embed/2fJOBXbiwPY?si=nP2iO7gsgQPcEG4A";
    const introVideoId = getYouTubeId(introVideoUrl);
    const documents = [
      {
        title: "เอกสารประกอบ CPR & AED",
        href: "/สไลด์เรียน cpr.pdf#page=1",
        description: "สรุปขั้นตอนหลักและหลักการสำคัญ (ไฟล์ PDF)",
      }
    ];
  return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
          <div className="container mx-auto max-w-5xl">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">หลักสูตร CPR & AED</h1>
                <div className="text-sm text-muted-foreground">ขั้นตอนที่ {getStepNumber()} จาก 5</div>
              </div>
              <Progress 
                value={getOverallProgress()} 
                className={`h-2 mb-2 ${getOverallProgress() === 100 ? '[&>div]:bg-success' : '[&>div]:bg-destructive'}`}
              />
              <div className="text-center text-sm text-muted-foreground">
                วิดีโอการเรียนรู้ที่มีเสียงประกอบ + เอกสารประกอบการเรียน
              </div>
            </div>
            <Card className="shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="text-lg">วิดีโอการเรียนรู้ที่มีเสียงประกอบ</CardTitle>
              </CardHeader>
              <CardContent>
                <YouTubePlayer youtubeId={introVideoId} onEnded={() => {}} />
                <p className="text-sm text-muted-foreground">เปิดดูคลิปนี้ แล้วเลื่อนลงเพื่อเปิดเอกสารอ่านควบคู่กัน</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">เอกสารประกอบการเรียน</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {documents.map((doc, idx) => (
                    <button
                      key={idx}
                      onClick={() => setShowDoc({ href: doc.href, title: doc.title })}
                      className="text-left w-full border rounded-lg p-4 hover:bg-muted/40 transition focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <div className="font-semibold mb-1">{doc.title}</div>
                      <div className="text-sm text-muted-foreground">{doc.description}</div>
                      <div className="mt-2 text-xs text-primary">คลิกเพื่อแสดงเอกสารแบบ Overlay</div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-end pt-6">
                  <Button className="bg-gradient-medical text-white" onClick={() => setCurrentStep('postTest')}>
                    ทำแบบทดสอบหลังเรียน
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Overlay Document Viewer */}
        <Dialog open={!!showDoc} onOpenChange={(o) => { if (!o) setShowDoc(null); }}>
          <DialogContent className="max-w-5xl w-full">
            <DialogHeader>
              <DialogTitle>{showDoc?.title}</DialogTitle>
            </DialogHeader>
            {showDoc && (
              showDoc.href.toLowerCase().includes('.pdf') ? (
                <iframe src={encodeURI(showDoc.href)} className="w-full h-[70vh] rounded" title={showDoc.title} />
              ) : (
                <img src={encodeURI(showDoc.href)} alt={showDoc.title} className="w-full max-h-[70vh] object-contain rounded" />
              )
            )}
            <div className="flex justify-end pt-2">
              {showDoc && (
                <a href={encodeURI(showDoc.href)} target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline">
                  เปิดในแท็บใหม่
                </a>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Pre-test Section
  if (currentStep === 'preTest') {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">หลักสูตร CPR & AED</h1>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-muted-foreground">
                    ขั้นตอนที่ {getStepNumber()} จาก 5
                  </div>
                  <div className={`text-sm font-semibold px-3 py-1 rounded border ${timeLeft <= 60 ? 'text-destructive border-destructive' : 'text-primary border-primary'}`}>
                    เวลา: {formatTime(timeLeft)}
                  </div>
                </div>
              </div>
              <Progress 
                value={getOverallProgress()} 
                className={`h-2 mb-2 ${getOverallProgress() === 100 ? '[&>div]:bg-success' : '[&>div]:bg-destructive'}`}
              />
              <div className="text-center text-sm text-muted-foreground">
                ขั้นตอนที่ 1: ทดสอบความรู้ก่อนเรียน
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">ทดสอบความรู้ก่อนเรียน</h2>
                <span className="text-muted-foreground">
                  {currentQuestion + 1}/{questions.length}
                </span>
              </div>
              <Progress value={(currentQuestion / questions.length) * 100} className="h-2" />
            </div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-primary" />
                  {questions[currentQuestion].question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isTimerRunning && (
                  <div className="p-4 border rounded bg-muted/20 text-sm">
                    เริ่มทำข้อสอบเมื่อพร้อม จะมีเวลาทั้งหมด 15 นาที ระบบจะบันทึกคำตอบที่ทำไว้และส่งอัตโนมัติเมื่อหมดเวลา
                  </div>
                )}
                <RadioGroup
                  value={preTestAnswers[currentQuestion] || ""}
                  onValueChange={handlePreTestAnswer}
                  className="space-y-3"
                >
                  {questions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={index.toString()} id={`pre-${currentQuestion}-${index}`} />
                      <Label 
                        htmlFor={`pre-${currentQuestion}-${index}`}
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
                    disabled={!preTestAnswers[currentQuestion] || !isTimerRunning}
                    className="bg-gradient-emergency text-white"
                  >
                    {currentQuestion === questions.length - 1 ? 'เริ่มเรียน' : 'ถัดไป'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Intro Dialog for Pre-test */}
        <Dialog open={showPreTestIntro} onOpenChange={setShowPreTestIntro}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>เริ่มทำแบบทดสอบก่อนเรียน</DialogTitle>
              <DialogDescription>
                เวลาทั้งหมด 15 นาที กรุณาตอบทุกข้อให้ครบ ระบบจะส่งคำตอบอัตโนมัติเมื่อหมดเวลา คุณสามารถเริ่มทำเมื่อพร้อม
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowPreTestIntro(false)}>ปิด</Button>
              <Button className="bg-gradient-emergency text-white" onClick={startPreTest}>เริ่มทำข้อสอบ</Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // ย้ายขั้นเรียนวิดีโอไปหน้า Articles แล้ว

  // Post-test Section
  if (currentStep === 'postTest') {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">หลักสูตร CPR & AED</h1>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-muted-foreground">
                    ขั้นตอนที่ {getStepNumber()} จาก 5
                  </div>
                  <div className={`text-sm font-semibold px-3 py-1 rounded border ${timeLeft <= 60 ? 'text-destructive border-destructive' : 'text-primary border-primary'}`}>
                    เวลา: {formatTime(timeLeft)}
                  </div>
                </div>
              </div>
              <Progress 
                value={getOverallProgress()} 
                className={`h-2 mb-2 ${getOverallProgress() === 100 ? '[&>div]:bg-success' : '[&>div]:bg-destructive'}`}
              />
              <div className="text-center text-sm text-muted-foreground">
                ขั้นตอนที่ 3: ทดสอบความรู้หลังเรียน
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">ทดสอบความรู้หลังเรียน</h2>
                <span className="text-muted-foreground">
                  {currentQuestion + 1}/{questions.length}
                </span>
              </div>
              <Progress value={(currentQuestion / questions.length) * 100} className="h-2" />
            </div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-primary" />
                  {questions[currentQuestion].question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={postTestAnswers[currentQuestion] || ""}
                  onValueChange={handlePostTestAnswer}
                  className="space-y-3"
                >
                  {questions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={index.toString()} id={`post-${currentQuestion}-${index}`} />
                      <Label 
                        htmlFor={`post-${currentQuestion}-${index}`}
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
                    disabled={!postTestAnswers[currentQuestion] || !isTimerRunning}
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

        {/* Intro Dialog for Post-test */}
        <Dialog open={showPostTestIntro} onOpenChange={setShowPostTestIntro}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>เริ่มทำแบบทดสอบหลังเรียน</DialogTitle>
              <DialogDescription>
                เวลาทั้งหมด 15 นาที กรุณาตอบทุกข้อให้ครบ ระบบจะส่งคำตอบอัตโนมัติเมื่อหมดเวลา คุณสามารถเริ่มทำเมื่อพร้อม
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowPostTestIntro(false)}>ปิด</Button>
              <Button className="bg-gradient-emergency text-white" onClick={startPostTest}>เริ่มทำข้อสอบ</Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Show Answers Section
  if (currentStep === 'showAnswers') {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center justify-center gap-2 mb-4">
                  <ClipboardList className="w-6 h-6 text-primary" />
                  เฉลยแบบทดสอบ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {questions.map((q, idx) => (
                  <div key={idx} className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-semibold mb-4">
                      {idx + 1}. {q.question}
                    </h3>
                    <div className="grid gap-2">
                      {q.options.map((option, optIdx) => (
                        <div 
                          key={optIdx} 
                          className={`p-3 rounded border ${
                            optIdx === q.correct 
                              ? 'bg-success/10 border-success text-success'
                              : 'bg-background'
                          }`}
                        >
                          {optIdx === q.correct && (
                            <CheckCircle className="w-4 h-4 inline-block mr-2 text-success" />
                          )}
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex justify-center pt-4">
                  <Button 
                    className="bg-gradient-medical text-white"
                    onClick={() => setCurrentStep('complete')}
                  >
                    กลับไปหน้าสรุป
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  // Feedback Section
  if (currentStep === 'feedback') {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">หลักสูตร CPR & AED</h1>
              </div>
              <Progress 
                value={90}
                className={`h-2 mb-2 ${getOverallProgress() === 100 ? '[&>div]:bg-success' : '[&>div]:bg-destructive'}`}
              />
              <div className="text-center text-sm text-muted-foreground">
                แบบสอบถามความพึงพอใจ
              </div>
            </div>
            <FeedbackForm onComplete={() => setCurrentStep('complete')} />
          </div>
        </div>
      </>
    );
  }

  // Complete Section
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl flex items-center justify-center gap-2 mb-4">
                <Trophy className="w-8 h-8 text-primary" />
                เสร็จสิ้นหลักสูตรการช่วยฟื้นคืนชีพขั้นพื้นฐานและการใช้เครื่องกระตุกไฟฟ้าหัวใจอัตโนมัติ (AED) สำหรับประชาชน
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-muted/30 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">คะแนนก่อนเรียน</h3>
                  <div className="text-4xl font-bold text-primary mb-2">
                    {preTestScore}/{questions.length}
                  </div>
                  <div className="text-muted-foreground">
                    {((preTestScore / questions.length) * 100).toFixed(0)}%
                  </div>
                </div>
                <div className="p-6 bg-muted/30 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">คะแนนหลังเรียน</h3>
                  <div className="text-4xl font-bold text-success mb-2">
                    {postTestScore}/{questions.length}
                  </div>
                  <div className="text-muted-foreground">
                    {((postTestScore / questions.length) * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-3">ประวัติการทำข้อสอบของคุณ</h3>
                {examResults.length === 0 ? (
                  <p className="text-muted-foreground">ไม่พบข้อมูลผลสอบในระบบ</p>
                ) : (
                  <div className="space-y-2">
                    {examResults.map((result, idx) => (
                      <div key={result.id || idx} className="p-3 rounded bg-muted/10 border">
                        <div className="flex flex-wrap gap-4 justify-between items-center">
                          <span>ประเภท: <b>{result.exam_type === "pre_test" ? "ก่อนเรียน" : "หลังเรียน"}</b></span>
                          <span>คะแนน: <b>{result.score} / {result.total_questions}</b></span>
                          <span>วันที่: <b>{(new Date(result.created_at)).toLocaleString("th-TH")}</b></span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className={`p-6 ${postTestScore >= 9 ? 'bg-success/10 border-success/20' : 'bg-destructive/10 border-destructive/20'} border rounded-lg`}>
                {postTestScore >= 9 ? (
                  <h3 className="text-xl font-semibold text-success mb-2">
                    ยินดีด้วยค่ะ คุณผ่านหลักสูตรแล้ว
                  </h3>
                ) : (
                  <h3 className="text-xl font-semibold text-destructive mb-2">
                     ขออภัยค่ะ คุณยังไม่ผ่านหลักสูตร
                  </h3>
                )}
                <p className="text-muted-foreground mb-2">
                  {postTestScore >= 9 
                    ? "คุณได้เรียนรู้ทักษะการช่วยฟื้นคืนชีพและการใช้เครื่อง AED เรียบร้อยแล้ว"
                    : "คุณควรทบทวนเนื้อหาและลองทำแบบทดสอบใหม่อีกครั้ง เพื่อให้มั่นใจว่าคุณมีความเข้าใจที่ถูกต้อง"
                  }
                </p>
                <p className="text-muted-foreground mb-4">
                  ขอขอบคุณที่ให้ความร่วมมือในการเรียนรู้หลักสูตร CPR & AED
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <>
                    <Button 
                      className="bg-gradient-medical text-white"
                      onClick={() => setCurrentStep('showAnswers')}
                    >
                      <ClipboardList className="w-4 h-4 mr-2" />
                      ดูเฉลย
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => navigate('/articles')}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      อ่านบทความเพิ่มเติม
                    </Button>
                    {postTestScore >= 9 && (
                      <Button 
                        variant="outline"
                        onClick={() => navigate('/')}
                      >
                        กลับหน้าแรก
                      </Button>
                    )}
                  </>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CourseFlow;
