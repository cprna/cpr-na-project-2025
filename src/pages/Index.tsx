import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Video, 
  ClipboardList, 
  FileText, 
  ArrowRight, 
  Users, 
  Clock,
  Award,
  CheckCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/IMG_0843.jpeg";
import { useState } from "react";
import { useSimpleAuth } from "@/hooks/useSimpleAuth";
import SimpleLogin from "@/components/SimpleLogin";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useSimpleAuth();
  const [showLogin, setShowLogin] = useState(false);

  const handleStartLearning = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowLogin(true);
    } else {
      navigate("/course");
    }
  };
  const features = [
    {
      icon: ClipboardList,
      title: "ทดสอบก่อนเรียน",
      color: "text-emergency",
      href: "/pre-test"
    },
    {
      icon: Video,
      title: "เนื้อหาการเรียนรู้",
      color: "text-medical",
      href: "/learn"
    },
    {
      icon: FileText,
      title: "บทความความรู้",
      color: "text-primary",
      href: "/articles"
    },
    {
      icon: ClipboardList,
      title: "ทดสอบหลังเรียน",
      color: "text-warning",
      href: "/post-test"
    }
  ];

  const stats = [
    {
      icon: Users,
      number: "60,000+",
      label: "ผู้เสียชีวิตต่อปี",
      description: "จากหัวใจหยุดเต้นในไทย"
    },
    {
      icon: Clock,
      number: "4 นาที",
      label: "เวลาทอง",
      description: "สำหรับการช่วยฟื้นคืนชีพ"
    },
    {
      icon: Award,
      number: "40-50%",
      label: "อัตราการรอดชีวิต",
      description: "เมื่อได้รับ CPR ทันเวลา"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
          <div className="absolute inset-0 bg-black opacity-25"></div>
          </div>
          <div className="relative container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <Badge className="mb-8 md:mb-6 bg-white/20 text-white border-white/30">
                วิจัยและนวัตกรรมทางการพยาบาล
              </Badge>
              <h4 className="text-3xl md:text-4xl font-bold mb-8 md:mb-6 leading-relaxed md:leading-normal">
                เรียนรู้การช่วยฟื้นคืนชีพขั้นพื้นฐานและการใช้งานเครื่องกระตุกไฟฟ้าหัวใจอัตโนมัติ (AED) สำหรับประชาชน
              </h4>
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={handleStartLearning}
                >
                  เริ่มต้นเรียนรู้ <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white text-black">
                  <Link to="/articles">
                    ดูบทความ
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">ขั้นตอนการเรียนรู้</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                เรียนรู้อย่างเป็นระบบผ่าน 4 ขั้นตอน
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {features.map((feature, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <feature.icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <div className="flex items-center justify-center mb-2">
                      <span className="w-8 h-8 bg-gradient-emergency text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        {index + 1}
                      </span>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-6">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>


        {/* Statistics Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">ทำไมต้องเรียนรู้ CPR?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                ข้อมูลสถิติที่แสดงถึงความสำคัญของการมีทักษะ CPR
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center shadow-lg border-0">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 bg-gradient-emergency rounded-full flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                    <div className="text-lg font-semibold mb-2">{stat.label}</div>
                    <div className="text-muted-foreground text-sm">{stat.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Objectives Section */}
        <section className="py-16 bg-gradient-to-r from-medical/5 to-emergency/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">วัตถุประสงค์ของหลักสูตร</h2>
                <p className="text-xl text-muted-foreground">
                  หลักสูตรนี้ออกแบบมาเพื่อให้ประชาชนทั่วไปสามารถ
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-l-4 border-l-medical shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <CheckCircle className="w-6 h-6 text-medical mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold mb-2">เรียนรู้ทักษะ CPR พื้นฐาน</h3>
                        <p className="text-muted-foreground">
                           เพื่อให้สามารถเรียนรู้การกดหน้าอกและเป่าปากได้อย่างถูกต้อง
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-emergency shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <CheckCircle className="w-6 h-6 text-emergency mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold mb-2">เข้าใจการใช้เครื่อง AED</h3>
                        <p className="text-muted-foreground">
                           สามารถเข้าใจและการใช้เครื่อง AED ได้อย่างถูกวิธีและปลอดภัยในสถานการณ์จริง
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-warning shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <CheckCircle className="w-6 h-6 text-warning mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold mb-2">เสริมสร้างทักษะการตัดสินใจในภาวะฉุกเฉิน</h3>
                        <p className="text-muted-foreground">
                          เรียนรู้แนวทางการประเมินสถานการณ์และตัดสินใจช่วยเหลือเบื้องต้นได้อย่างรวดเร็วและเหมาะสม
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-primary shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <CheckCircle className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold mb-2">เพิ่มความมั่นใจในการช่วยเหลือผู้อื่น</h3>
                        <p className="text-muted-foreground">
                          สร้างทัศนคติที่ดีและความกล้าในการช่วยเหลือผู้ที่มีภาวะหัวใจหยุดเต้น
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-hero text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <Heart className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-6">คุณพร้อมจะยื่นมือช่วยชีวิตใครสักคนหรือยัง ? </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                มาเรียนรู้ตั้งแต่วันนี้ คุณอาจกลายเป็นสิ่งสำคัญที่สุดในวินาทีชีวิตของใครบางคน
                หรือแม้แต่คนที่คุณรัก
              </p>
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90"
                onClick={handleStartLearning}
              >
                เริ่มต้นเรียนรู้ <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </div>
      
      {showLogin && (
        <SimpleLogin 
          onLogin={(user) => {
            login(user);
            setShowLogin(false);
            navigate("/course");
          }}
          onClose={() => setShowLogin(false)}
        />
      )}
    </>
  );
};

export default Index;
