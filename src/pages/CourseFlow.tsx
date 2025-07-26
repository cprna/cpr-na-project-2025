import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  ClipboardList, 
  ArrowRight, 
  Play, 
  CheckCircle, 
  Video, 
  Clock, 
  Users,
  Trophy,
  BookOpen
} from "lucide-react";
import Navbar from "@/components/Navbar";
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
  const [currentStep, setCurrentStep] = useState<'preTest' | 'preTestResult' | 'learn' | 'postTest' | 'feedback' | 'complete' | 'showAnswers'>('preTest');
  const [preTestAnswers, setPreTestAnswers] = useState<Record<number, string>>({});
  const [postTestAnswers, setPostTestAnswers] = useState<Record<number, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [completedVideos, setCompletedVideos] = useState<number[]>([]);
  const [currentVideo, setCurrentVideo] = useState<number | null>(1);
  const [videoEnded, setVideoEnded] = useState(false);
  const [examResults, setExamResults] = useState<any[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([]);

  const getYouTubeId = (url: string) => {
    const m = url.match(/\/embed\/([^\?&]+)/);
    return m ? m[1] : "";
  };

  useEffect(() => {
    setVideoEnded(false); // reset เมื่อเปลี่ยนวิดีโอ
  }, [currentVideo]);

  useEffect(() => {
    if (currentStep === "complete") {
      fetchExamResults().then(data => {
        if (data) setExamResults(data);
      });
    }
  }, [currentStep]);

  const questions = [
    {
      question: "วัตถุประสงค์หลักของการช่วยฟื้นคืนชีพ (CPR) คืออะไร?",
      options: [
        "เพื่อทำให้ผู้ป่วยฟื้นคืนสติทันที",
        "เพื่อให้ออกซิเจนไปเลี้ยงสมองและอวัยวะสำคัญจนกว่าจะได้รับการรักษาที่เหมาะสม",
        "เพื่อทำให้หัวใจเต้นเร็วขึ้น",
        "เพื่อทำให้ผู้ป่วยหายใจเร็วขึ้น"
      ],
      correct: 1
    },
    {
      question: "ช่วงเวลาใดที่ถือเป็น \"นาทีทอง\" (Golden period) ในการช่วยฟื้นคืนชีพที่สามารถช่วยชีวิตผู้ป่วยได้อย่างมีประสิทธิภาพ?",
      options: [
        "4-6 นาทีแรกหลังจากหัวใจหยุดเต้น",
        "8-10 นาทีแรกหลังจากหัวใจหยุดเต้น",
        "10-15 นาทีแรกหลังจากหัวใจหยุดเต้น",
        "15-20 นาทีแรกหลังจากหัวใจหยุดเต้น"
      ],
      correct: 0
    },
    {
      question: "ตามหลัก D-R-C-A-B ในขั้นตอนการช่วยชีวิตขั้นพื้นฐาน (BLS) \"D\" ย่อมาจากอะไร?",
      options: [
        "Danger (ความปลอดภัย)",
        "Direct (ทิศทางการช่วยเหลือ)",
        "Diagnosis (การวินิจฉัย)",
        "Decision (การตัดสินใจ)"
      ],
      correct: 0
    },
    {
      question: "การกดหน้าอกที่ถูกต้องสำหรับผู้ใหญ่ควรกดที่ตำแหน่งใด?",
      options: [
        "กึ่งกลางของกระดูกหน้าอกส่วนล่าง",
        "เหนือหัวนม 2 นิ้ว",
        "ใต้หัวนม 2 นิ้ว",
        "ข้างซี่โครงซ้าย"
      ],
      correct: 0
    },
    {
      question: "ความลึกของการกดหน้าอกที่เหมาะสมสำหรับผู้ใหญ่คือ?",
      options: [
        "3-4 เซนติเมตร",
        "4-5 เซนติเมตร",
        "5-6 เซนติเมตร",
        "6-7 เซนติเมตร"
      ],
      correct: 2
    },
    {
      question: "อัตราการกดหน้าอกที่ถูกต้องคือ?",
      options: [
        "80-100 ครั้งต่อนาที",
        "100-120 ครั้งต่อนาที",
        "120-140 ครั้งต่อนาที",
        "140-160 ครั้งต่อนาที"
      ],
      correct: 1
    },
    {
      question: "อัตราส่วนการกดหน้าอก : การเป่าลมหายใจ ที่ถูกต้องสำหรับผู้ใหญ่คือ?",
      options: [
        "15:2",
        "20:2",
        "30:2",
        "40:2"
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
      question: "ข้อใดต่อไปนี้เป็นสัญญาณที่บ่งบอกว่าผู้ป่วยต้องการ CPR?",
      options: [
        "ผู้ป่วยไม่ตอบสนองและไม่หายใจปกติ",
        "ผู้ป่วยหายใจลำบาก",
        "ผู้ป่วยเจ็บหน้าอก",
        "ผู้ป่วยมีไข้สูง"
      ],
      correct: 0
    },
    {
      question: "การใช้ AED ที่ถูกต้อง ควรทำในลำดับใด?",
      options: [
        "เปิดเครื่อง → ติด Pad → วิเคราะห์จังหวะหัวใจ → Shock (หากจำเป็น)",
        "ติด Pad → เปิดเครื่อง → Shock → วิเคราะห์จังหวะหัวใจ",
        "วิเคราะห์จังหวะหัวใจ → เปิดเครื่อง → ติด Pad → Shock",
        "Shock → เปิดเครื่อง → ติด Pad → วิเคราะห์จังหวะหัวใจ"
      ],
      correct: 0
    },
    {
      question: "เมื่อใด AED จะไม่ Shock ให้ผู้ป่วย?",
      options: [
        "เมื่อไม่พบจังหวะหัวใจที่ต้อง Shock",
        "เมื่อแบตเตอรี่หมด",
        "เมื่อ Pad ไม่ติดแน่น",
        "ถูกทุกข้อ"
      ],
      correct: 3
    },
    {
      question: "ก่อนที่ AED จะ Shock ต้องให้ทุกคน?",
      options: [
        "ออกห่างจากผู้ป่วย",
        "นับ 1-10",
        "ถือมือผู้ป่วย",
        "กดหน้าอกต่อ"
      ],
      correct: 0
    },
    {
      question: "หลังจาก AED Shock แล้ว ขั้นตอนต่อไปคือ?",
      options: [
        "ตรวจชีพจรทันที",
        "รอดูการตอบสนองของผู้ป่วย",
        "กดหน้าอกทันที 30 ครั้ง แล้วเป่าลม 2 ครั้ง",
        "ปิด AED"
      ],
      correct: 2
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
      question: "การกด CPR ที่มีคุณภาพต้องมีลักษณะอย่างไร?",
      options: [
        "กดลึกพอ ปล่อยให้หน้าอกกลับคืนสู่สภาพเดิมอย่างสมบูรณ์ กดด้วยอัตราที่เหมาะสม",
        "กดแรงที่สุดเท่าที่จะทำได้",
        "กดเบาๆ เพื่อไม่ให้เกิดการบาดเจ็บ",
        "กดช้าๆ เพื่อประหยัดแรง"
      ],
      correct: 0
    }
  ];

  const videos = [
    {
      id: 1,
      title: "การช่วยชีวิตขั้นพื้นฐาน(Basic Life Support)",
      duration: "5:55",
      description: "ทำความเข้าใจเกี่ยวกับความสำคัญของ CPR และสถานการณ์ที่ต้องใช้",
      videoUrl: "https://www.youtube.com/embed/3xMfI-8c164?si=HNlOKSc2HDxLcnpy"
    },
    {
      id: 2,
      title: "การช่วยฟื้นคืนชีพขั้นพื้นฐาน(CPR) และการใช้เครื่องเออีดี(AED)",
      duration: "6:25",
      description: "วิธีการตรวจสอบความรู้สึกตัวและการหายใจของผู้ป่วย",
      videoUrl: "https://www.youtube.com/embed/hr6Ig4WUcZA?si=xnQVF00bAXQ5e1aq"
    }
  ];

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

        // Save exam result first
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

  const markVideoComplete = (videoId: number) => {
    if (!completedVideos.includes(videoId)) {
      setCompletedVideos([...completedVideos, videoId]);
    }
  };

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
  const progressPercentage = (completedVideos.length / videos.length) * 100;

  const getStepNumber = () => {
    switch (currentStep) {
      case 'preTest': return 1;
      case 'learn': return 2;
      case 'postTest': return 3;
      case 'complete': return 4;
      default: return 1;
    }
  };

  const getOverallProgress = () => {
    switch (currentStep) {
      case 'preTest': return 25;
      case 'learn': return 50;
      case 'postTest': return 75;
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
                {wrongAnswers.length > 0 ? (
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-semibold mb-2">ข้อที่ควรทบทวน</h3>
                    <div className="grid gap-2">
                      {wrongAnswers.map((qNum) => (
                        <div key={qNum} className="p-3 bg-background rounded border">
                          <div className="font-medium mb-1">ข้อ {qNum}</div>
                          <div className="text-sm text-muted-foreground">
                            {questions[qNum - 1].question}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                    <p className="text-success font-semibold text-center">
                      🎉 ยินดีด้วย! คุณตอบถูกทุกข้อ
                    </p>
                  </div>
                )}
                <div className="text-center">
                  <Button 
                    className="bg-gradient-emergency text-white"
                    onClick={() => {
                      setCurrentStep('learn');
                      setCurrentQuestion(0);
                    }}
                  >
                    เริ่มต้นการเรียนรู้
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
                <div className="text-sm text-muted-foreground">
                  ขั้นตอนที่ {getStepNumber()} จาก 3
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
                    disabled={!preTestAnswers[currentQuestion]}
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
      </>
    );
  }

  // Learning Section
  if (currentStep === 'learn') {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-background to-muted">
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-4xl mx-auto mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">หลักสูตร CPR & AED</h1>
                <div className="text-sm text-muted-foreground">
                  ขั้นตอนที่ {getStepNumber()} จาก 3
                </div>
              </div>
              <Progress 
                value={getOverallProgress()} 
                className={`h-2 mb-2 ${getOverallProgress() === 100 ? '[&>div]:bg-success' : '[&>div]:bg-destructive'}`}
              />
              <div className="text-center text-sm text-muted-foreground">
                ขั้นตอนที่ 2: เรียนรู้จากวิดีโอ
              </div>
            </div>
          </div>
          <div className="bg-gradient-hero text-white py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">
                  เรียนรู้การช่วยฟื้นคืนชีพและการใช้ AED
                </h2>
                <div className="flex items-center justify-center space-x-6 text-white/80">
                  <div className="flex items-center space-x-2">
                    <Video className="w-5 h-5" />
                    <span>{videos.length} วิดีโอ</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>รวม 10+ นาที</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>สำหรับประชาชนทั่วไป</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Video className="w-5 h-5 text-primary" />
                    <span>ความคืบหน้าการเรียนรู้</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>ดูวิดีโอแล้ว {completedVideos.length} จาก {videos.length} วิดีโอ</span>
                      <span>{progressPercentage.toFixed(0)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                  </div>
                  {progressPercentage === 100 && (
                    <div className="mt-4 p-4 bg-success/10 border border-success/20 rounded-lg">
                      <p className="text-success font-semibold mb-2">ยินดีด้วย! คุณดูวิดีโอครบทุกคลิปแล้ว</p>
                      <Button 
                        className="bg-gradient-medical text-white"
                        onClick={() => setCurrentStep('postTest')}
                      >
                        ทำแบบทดสอบหลังเรียน <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  {currentVideo ? (
                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <YouTubePlayer
                          youtubeId={getYouTubeId(videos.find(v => v.id === currentVideo)?.videoUrl ?? "")}
                          onEnded={() => setVideoEnded(true)}
                        />
                        <h3 className="text-xl font-bold mb-2">
                          {videos.find(v => v.id === currentVideo)?.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {videos.find(v => v.id === currentVideo)?.description}
                        </p>
                        <Button
                          onClick={() => markVideoComplete(currentVideo)}
                          disabled={completedVideos.includes(currentVideo) || !videoEnded}
                          className="bg-gradient-medical text-white"
                        >
                          {completedVideos.includes(currentVideo) ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              ดูแล้ว
                            </>
                          ) : (
                            videoEnded ? "ทำเครื่องหมายว่าดูแล้ว" : "กรุณาดูวิดีโอให้จบก่อน"
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="shadow-lg">
                      <CardContent className="p-12 text-center">
                        <Video className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-xl font-bold mb-2">เลือกวิดีโอที่ต้องการดู</h3>
                        <p className="text-muted-foreground">
                          เริ่มต้นการเรียนรู้โดยเลือกวิดีโอจากรายการด้านข้าง
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
                <div>
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg">รายการวิดีโอ</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="space-y-2">
                        {videos.map((video) => (
                          <div
                            key={video.id}
                            className={`p-4 border-b last:border-b-0 cursor-pointer hover:bg-muted/50 transition-colors ${
                              currentVideo === video.id ? 'bg-muted' : ''
                            }`}
                            onClick={() => setCurrentVideo(video.id)}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 mt-1">
                                {completedVideos.includes(video.id) ? (
                                  <CheckCircle className="w-5 h-5 text-success" />
                                ) : (
                                  <Play className="w-5 h-5 text-muted-foreground" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-sm leading-tight mb-1">
                                  {video.title}
                                </h4>
                                <p className="text-xs text-muted-foreground mb-1">
                                  {video.description}
                                </p>
                                <span className="text-xs text-muted-foreground">
                                  {video.duration}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

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
                <div className="text-sm text-muted-foreground">
                  ขั้นตอนที่ {getStepNumber()} จาก 3
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
                    disabled={!postTestAnswers[currentQuestion]}
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
                เสร็จสิ้นหลักสูตร CPR & AED
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
                     ยินดีด้วย! คุณผ่านหลักสูตรแล้ว
                  </h3>
                ) : (
                  <h3 className="text-xl font-semibold text-destructive mb-2">
                     ขออภัย คุณยังไม่ผ่านหลักสูตร
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
                      onClick={() => window.location.href = '/articles'}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      อ่านบทความเพิ่มเติม
                    </Button>
                    {postTestScore >= 9 && (
                      <Button 
                        variant="outline"
                        onClick={() => window.location.href = '/'}
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
