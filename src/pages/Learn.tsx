import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Play, CheckCircle, Video, ArrowRight, Clock, Users } from "lucide-react";
import Navbar from "@/components/Navbar";

const Learn = () => {
  const [completedVideos, setCompletedVideos] = useState<number[]>([]);
  const [currentVideo, setCurrentVideo] = useState<number | null>(null);

  const videos = [
    {
      id: 1,
      title: "บทนำ: ความสำคัญของการช่วยฟื้นคืนชีพ",
      duration: "5:30",
      description: "ทำความเข้าใจเกี่ยวกับความสำคัญของ CPR และสถานการณ์ที่ต้องใช้",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // ตัวอย่าง URL
    },
    {
      id: 2,
      title: "การตรวจสอบการตอบสนองและการหายใจ",
      duration: "7:45",
      description: "วิธีการตรวจสอบความรู้สึกตัวและการหายใจของผู้ป่วย",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 3,
      title: "เทคนิคการกดหน้าอกที่ถูกต้อง",
      duration: "10:20",
      description: "ท่าทาง จังหวะ และความลึกในการกดหน้าอกที่มีประสิทธิภาพ",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 4,
      title: "การเป่าปากให้ลมหายใจ",
      duration: "6:15",
      description: "วิธีการเป่าปากให้ลมหายใจอย่างถูกต้องและปลอดภัย",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 5,
      title: "การใช้เครื่อง AED",
      duration: "12:30",
      description: "ขั้นตอนการใช้เครื่อง AED ตั้งแต่เปิดเครื่องจนถึงการช็อก",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 6,
      title: "การประสานงานระหว่าง CPR และ AED",
      duration: "8:45",
      description: "การทำงานร่วมกันระหว่าง CPR และการใช้เครื่อง AED",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ];

  const markVideoComplete = (videoId: number) => {
    if (!completedVideos.includes(videoId)) {
      setCompletedVideos([...completedVideos, videoId]);
    }
  };

  const progressPercentage = (completedVideos.length / videos.length) * 100;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        {/* Hero Section */}
        <div className="bg-gradient-hero text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">
                เรียนรู้การช่วยฟื้นคืนชีพและการใช้ AED
              </h1>
              <p className="text-xl text-white/90 mb-6">
                เรียนรู้ทักษะที่จำเป็นในการช่วยชีวิตผู้อื่นผ่านวิดีโอการสอนที่ครบถ้วน
              </p>
              <div className="flex items-center justify-center space-x-6 text-white/80">
                <div className="flex items-center space-x-2">
                  <Video className="w-5 h-5" />
                  <span>{videos.length} วิดีโอ</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>รวม 50+ นาที</span>
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
          {/* Progress Section */}
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
                    <p className="text-success font-semibold">🎉 ยินดีด้วย! คุณดูวิดีโอครบทุกตอนแล้ว</p>
                    <Button 
                      className="mt-2 bg-gradient-medical text-white"
                      onClick={() => window.location.href = '/post-test'}
                    >
                      ทำแบบทดสอบหลังเรียน <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Video Content */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Video Player */}
              <div className="lg:col-span-2">
                {currentVideo ? (
                  <Card className="shadow-lg">
                    <CardContent className="p-6">
                      <div className="aspect-video bg-black rounded-lg mb-4 overflow-hidden">
                        <iframe
                          src={videos.find(v => v.id === currentVideo)?.videoUrl}
                          className="w-full h-full"
                          allowFullScreen
                          title="Learning Video"
                        />
                      </div>
                      <h2 className="text-xl font-bold mb-2">
                        {videos.find(v => v.id === currentVideo)?.title}
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        {videos.find(v => v.id === currentVideo)?.description}
                      </p>
                      <Button
                        onClick={() => markVideoComplete(currentVideo)}
                        disabled={completedVideos.includes(currentVideo)}
                        className="bg-gradient-medical text-white"
                      >
                        {completedVideos.includes(currentVideo) ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            ดูแล้ว
                          </>
                        ) : (
                          'ทำเครื่องหมายว่าดูแล้ว'
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="shadow-lg">
                    <CardContent className="p-12 text-center">
                      <Video className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h2 className="text-xl font-bold mb-2">เลือกวิดีโอที่ต้องการดู</h2>
                      <p className="text-muted-foreground">
                        เริ่มต้นการเรียนรู้โดยเลือกวิดีโอจากรายการด้านข้าง
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Video Playlist */}
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
                              <h3 className="font-semibold text-sm leading-tight mb-1">
                                {video.title}
                              </h3>
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
};

export default Learn;