import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, FileText, Zap, AlertTriangle, BookOpen, Activity, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Article = {
  id: string;
  title: string;
  type: 'article' | 'poster';
  category: string;
  content: React.ReactNode;
  imageUrl?: string;
};

// Article content components
const BasicsContent = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          การช่วยฟื้นคืนชีพ (CPR) คืออะไร?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          การช่วยฟื้นคืนชีพ (Cardio-Pulmonary Resuscitation: CPR) เป็นการปฏิบัติเพื่อช่วยชีวิตผู้ที่หัวใจหยุดเต้นและหยุดหายใจกะทันหัน โดยมีวัตถุประสงค์เพื่อฟื้นคืนการหายใจและการไหลเวียนโลหิตให้กลับคืนสู่สภาพเดิม และป้องกันไม่ให้เนื้อเยื่อต่างๆ ได้รับอันตรายจากการขาดออกซิเจนอย่างถาวร
        </p>
        <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
          <h4 className="font-semibold text-primary mb-2">วัตถุประสงค์หลักของ CPR:</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>• เพื่อให้ผู้ป่วยได้รับออกซิเจนเพียงพอต่อเนื้อเยื่อ</li>
            <li>• ป้องกันภาวะสมองขาดเลือด</li>
            <li>• คงไว้ซึ่งการไหลเวียนโลหิต</li>
            <li>• เพื่อให้ผู้ป่วยกลับสู่ภาวะปกติ</li>
          </ul>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-destructive" />
          ภาวะหัวใจหยุดเต้น (Cardiac Arrest)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          ภาวะหัวใจหยุดเต้น (Cardiac Arrest) คือภาวะที่หัวใจหยุดเต้นและหยุดหายใจ โดยส่วนใหญ่จะพบคลื่นไฟฟ้าหัวใจแบบ Pulseless Ventricular tachycardia (pVT) หรือ Ventricular fibrillation (VF)
        </p>
        
        <div className="bg-destructive/5 p-4 rounded-lg border border-destructive/20">
          <h4 className="font-semibold text-destructive mb-2">ผลที่ตามมา:</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>• ไม่มีการไหลเวียนเลือด → Global ischemia (เนื้อเยื่อทั่วร่างกายขาดเลือด)</li>
            <li>• ไม่มีการลำเลียงออกซิเจน → Direct Cell damage และ edema</li>
            <li>• ขาด ATP และการทำงานของอวัยวะผิดปกติ โดยเฉพาะสมอง</li>
          </ul>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-6 h-6 text-warning" />
          ช่วงเวลาทอง (Golden Period)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground mb-4">
          สมองเป็นอวัยวะที่ทนต่อการขาดออกซิเจนได้น้อยที่สุด ดังนั้น ช่วงเวลา 4-8 นาทีแรก จึงถือเป็น "นาทีทอง" ในการช่วยชีวิตผู้ป่วย
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-warning/10 p-4 rounded-lg border border-warning/20">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <span className="font-semibold">4 นาทีแรก</span>
            </div>
            <p className="text-sm text-muted-foreground">ภาวะสมองตายชั่วคราว - ยังสามารถฟื้นคืนได้</p>
          </div>
          <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <span className="font-semibold">10 นาที</span>
            </div>
            <p className="text-sm text-muted-foreground">ภาวะสมองตายถาวร</p>
          </div>
        </div>
        
        <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 mt-4">
          <p className="font-semibold text-primary">
            ⚡ ควรเริ่มทำ CPR ทันทีที่ประเมินได้ว่าผู้ป่วยมีหัวใจหยุดเต้นและหยุดหายใจ
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
);

const DRCABContent = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Activity className="w-6 h-6 text-primary" />
        ขั้นตอนการช่วยชีวิตขั้นพื้นฐาน (Basic Life Support: BLS)
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      <p className="text-muted-foreground mb-4">
        ขั้นตอนการช่วยชีวิตขั้นพื้นฐานสำหรับผู้ใหญ่ ใช้หลัก D-R-C-A-B
      </p>
      
      <div className="space-y-6">
        <div className="border-l-4 border-destructive pl-4">
          <h3 className="text-xl font-bold mb-2 text-destructive">D - Danger (ตรวจสอบอันตราย)</h3>
          <p className="text-muted-foreground">
            ตรวจสอบอันตรายที่อาจจะเกิดขึ้นกับทั้งผู้ช่วยเหลือและผู้ป่วย เพื่อให้แน่ใจว่ามีความปลอดภัยสำหรับผู้ช่วยเหลือ (Scene safety)
          </p>
        </div>
        
        <div className="border-l-4 border-warning pl-4">
          <h3 className="text-xl font-bold mb-2 text-warning">R - Response (ตรวจสอบการตอบสนอง)</h3>
          <div className="space-y-2">
            <p className="text-muted-foreground">ตรวจสอบระดับการรู้สึกตัวของผู้ป่วย</p>
            <ul className="text-muted-foreground space-y-1 ml-4">
              <li>• หากผู้ป่วยไม่รู้สึกตัว ให้ใช้สองมือเขย่าที่ไหล่พร้อมปลุกเรียก "คุณๆๆ..."</li>
              <li>• เรียกให้คนช่วย (Sent for help) พร้อมโทร 1669</li>
              <li>• และนำเครื่อง AED (Automated External Defibrillator) มาด้วย</li>
            </ul>
          </div>
        </div>
        
        <div className="border-l-4 border-primary pl-4">
          <h3 className="text-xl font-bold mb-2 text-primary">C - Circulation (การตรวจสอบระบบไหลเวียนและการปั๊มหัวใจ)</h3>
          <div className="space-y-3">
            <p className="text-muted-foreground">ผู้ช่วยเหลือควรนั่งคุกเข่าระหว่างอกและไหล่ของผู้ป่วย</p>
            <p className="text-muted-foreground">จับชีพจรที่คอ (Carotid artery) พร้อมดูการหายใจ เป็นเวลา 5-10 วินาที</p>
            <p className="text-muted-foreground">หากไม่มีชีพจรและไม่หายใจ (หรือหายใจเฮือก) ให้เริ่มปั๊มหัวใจด้วยการกดหน้าอกทันที</p>
          </div>
        </div>
        
        <div className="border-l-4 border-blue-500 pl-4">
          <h3 className="text-xl font-bold mb-2" style={{color: "rgb(59 130 246)"}}>A - Airway (การเปิดทางเดินหายใจ)</h3>
          <div className="space-y-2">
            <p className="text-muted-foreground">
              ใช้วิธีการกดหน้าผากและเชยคาง (Head tilt chin lift) ซึ่งเป็นวิธีที่แนะนำ
            </p>
            <p className="text-muted-foreground">
              หากสงสัยว่ากระดูกส่วนคอหัก อาจใช้วิธีการเปิดขากรรไกร (Jaw thrust)
            </p>
          </div>
        </div>
        
        <div className="border-l-4 border-green-500 pl-4">
          <h3 className="text-xl font-bold mb-2" style={{color: "rgb(34 197 94)"}}>B - Breathing (การช่วยหายใจ)</h3>
          <div className="space-y-2">
            <p className="text-muted-foreground">
              ในขณะที่ยังคงเปิดทางเดินหายใจ ให้ช่วยหายใจโดยการเป่าลม (บีบจมูก เป่าปาก) หรือบีบ Ambu Bag จนหน้าอกผู้ป่วยยกขึ้น ใช้เวลาประมาณ 1 วินาที
            </p>
            <p className="text-muted-foreground">
              รอให้หน้าอกผู้ป่วยยุบลง แล้วเป่าปากอีก 1 ครั้ง (รวมช่วยหายใจ 2 ครั้ง)
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-primary/10 to-medical/10 p-6 rounded-lg border border-primary/20">
        <h4 className="text-lg font-bold text-primary mb-3">สรุปขั้นตอนปฏิบัติ:</h4>
        <ul className="space-y-2 text-muted-foreground">
          <li>• <strong>อัตราส่วน:</strong> การกดหน้าอก 30 ครั้ง : การช่วยหายใจ 2 ครั้ง (30:2)</li>
          <li>• <strong>ความลึก:</strong> กดแรงและเร็วให้หน้าอกยุบ 5-6 เซนติเมตร</li>
          <li>• <strong>อัตราเร็ว:</strong> 100-120 ครั้งต่อนาที</li>
          <li>• <strong>การประเมิน:</strong> ทำ CPR ครบ 5 รอบ แล้วประเมินซ้ำโดยจับชีพจรที่คอ</li>
          <li>• <strong>การหยุด:</strong> หากมีชีพจรให้หยุด CPR / หากไม่มีชีพจรให้ทำ CPR ต่อ</li>
          <li>• <strong>ทางเลือก:</strong> สามารถทำ Hand-only CPR (กดหน้าอกอย่างเดียว) ได้</li>
        </ul>
      </div>
      
      <div className="bg-warning/10 p-4 rounded-lg border border-warning/20">
        <h4 className="font-semibold text-warning mb-2">เมื่อไหร่จึงจะหยุด CPR:</h4>
        <ul className="space-y-1 text-muted-foreground">
          <li>• ผู้ป่วยมีชีพจรและกลับมาหายใจได้เอง</li>
          <li>• ผู้ช่วยเหลือทำ CPR ต่อไม่ไหว</li>
          <li>• หน่วยแพทย์ฉุกเฉินมาช่วยเหลือ</li>
          <li>• ทำ CPR นานเกิน 30 นาที</li>
          <li>• แพทย์ลงความเห็นว่าให้ยุติการช่วยฟื้นคืนชีพ</li>
        </ul>
      </div>
    </CardContent>
  </Card>
);

const AEDContent = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Zap className="w-6 h-6 text-primary" />
        เครื่องกระตุกหัวใจไฟฟ้าชนิดอัตโนมัติ (AED)
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
        <h4 className="font-semibold text-primary mb-2">ความหมายและวัตถุประสงค์:</h4>
        <p className="text-muted-foreground">
          AED คือเครื่องมือที่ใช้แก้ไขภาวะหัวใจเต้นผิดปกติ ทำงานโดยการให้กำเนิดไฟฟ้ากระแสตรงและผ่านกระแสไฟฟ้าในปริมาณที่ควบคุมจากขั้วไฟฟ้า (Paddle) เข้าไปในกล้ามเนื้อหัวใจ ซึ่งจะทำให้เกิดการหดตัวพร้อมกัน ตามด้วยระยะดื้อ สิ่งนี้เปิดโอกาสให้ตัวควบคุมจังหวะและระบบสื่อนำปกติของหัวใจกลับมาทำงานแทนที่ ทำให้หัวใจกลับมาเต้นเป็นปกติ
        </p>
      </div>

      <div className="bg-medical/5 p-4 rounded-lg border border-medical/20">
        <h4 className="font-semibold text-medical mb-2">บทบาทของ AED ในการช่วยฟื้นคืนชีพ:</h4>
        <p className="text-muted-foreground">
          เมื่อผู้ป่วยหมดสติและสงสัยภาวะหัวใจหยุดเต้น ผู้ช่วยเหลือควรโทร 1669 และนำเครื่อง AED มาด้วย AED เป็นส่วนหนึ่งของ "ห่วงโซ่ของการรอดชีวิต" (Chain of survival) โดยเฉพาะอย่างยิ่งสำหรับภาวะหัวใจหยุดเต้นนอกโรงพยาบาล
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">ขั้นตอนการใช้เครื่อง AED: เปิด - แปะ - ปุ่ม - ปั๊ม</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <h3 className="font-semibold mb-2">1. เปิด</h3>
              <p className="text-muted-foreground">เปิดเครื่อง AED และฟังคำแนะนำจากเครื่อง</p>
            </div>
            
            <div className="p-4 border rounded-lg bg-gradient-to-br from-medical/5 to-medical/10 border-medical/20">
              <h3 className="font-semibold mb-2">2. แปะ</h3>
              <p className="text-muted-foreground">ติดแผ่นนำไฟฟ้าตามตำแหน่งที่กำหนด</p>
            </div>
            
            <div className="p-4 border rounded-lg bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
              <h3 className="font-semibold mb-2">3. ปุ่ม</h3>
              <p className="text-muted-foreground">กดปุ่มช็อกเมื่อเครื่องแนะนำ</p>
            </div>
            
            <div className="p-4 border rounded-lg bg-gradient-to-br from-emergency/5 to-emergency/10 border-emergency/20">
              <h3 className="font-semibold mb-2">4. ปั๊ม</h3>
              <p className="text-muted-foreground">ทำ CPR ต่อทันทีหลังการช็อก</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
        <h4 className="font-semibold text-destructive mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          ข้อสำคัญด้านความปลอดภัย:
        </h4>
        <ul className="space-y-1 text-muted-foreground">
          <li>• ก่อนที่จะกดปุ่ม Shock จะต้องประกาศเตือนว่า "ฉันถอย คุณถอย ทุกคนถอย"</li>
          <li>• เพื่อให้ทุกคนที่อยู่รอบข้างถอยห่างจากตัวผู้ป่วยเพื่อความปลอดภัย</li>
          <li>• ตรวจสอบให้แน่ใจว่าไม่มีใครสัมผัสผู้ป่วยก่อนกด Shock</li>
        </ul>
      </div>
    </CardContent>
  </Card>
);

const Articles = () => {
  const articles: Article[] = [
    {
      id: "pdf-docs",
      title: "คู่มือการช่วยฟื้นคืนชีพพื้นฐานและการใช้เครื่องเออีดี",
      type: "article",
      category: "เอกสาร",
      content: (
        <div className="space-y-4">
          <div className="h-[70vh]">
            <iframe
              src={encodeURI("/คู่มือ การช่วยฟื้นคืนชีพพื้นฐานและการใช้เครื่องเออีดี 2.pdf#page=1")}
              className="w-full h-full rounded"
              title="เอกสารประกอบ CPR & AED"
            />
          </div>
          <div className="flex justify-end">
            <a
              href={encodeURI("/คู่มือ การช่วยฟื้นคืนชีพพื้นฐานและการใช้เครื่องเออีดี 2.pdf")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              เปิดในแท็บใหม่
            </a>
          </div>
        </div>
      ),
    },
    {
      id: "video-cpr-aed",
      title: "การทำ CPR และการใช้ AED - วิดีโอสอน",
      type: "article",
      category: "วิดีโอ",
      content: (
        <div className="space-y-4">
          <div className="aspect-video rounded-lg overflow-hidden bg-black">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/PZyUSFmUQhM?si=1Z8P8IA3rbjV8tIX"
              title="CPR & AED"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <p className="text-muted-foreground">
            วิดีโอสอนขั้นตอนการทำ CPR และการใช้เครื่อง AED พร้อมคำอธิบายทีละขั้นตอน
          </p>
        </div>
      ),
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        {/* Hero Section */}
        <div className="bg-gradient-medical text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <FileText className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-4">
                บทความและความรู้เพิ่มเติม
              </h1>
              <p className="text-xl text-white/90">
                เพิ่มพูนความรู้เกี่ยวกับการช่วยฟื้นคืนชีพและการใช้ AED
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Card key={article.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="bg-primary/5">
                      {article.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {article.type === 'poster' && 'imageUrl' in article ? (
                    // For posters, show image preview
                    <div className="relative overflow-hidden rounded-md" style={{ maxHeight: '200px' }}>
                      <img 
                        src={article.imageUrl} 
                        alt={article.title}
                        className="object-contain w-full h-[200px] transition-transform group-hover:scale-105"
                      />
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="absolute bottom-2 left-1/2 -translate-x-1/2">
                            ดูโปสเตอร์
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>{article.title}</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4">
                            <img 
                              src={article.imageUrl} 
                              alt={article.title}
                              className="w-full h-auto"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ) : (
                    // For articles, show preview and link to content
                    <>
                      <p className="text-muted-foreground mb-4">
                        คลิกเพื่ออ่านเนื้อหาเพิ่มเติมเกี่ยวกับ{article.title}
                      </p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full">
                            อ่านเพิ่มเติม
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{article.title}</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4">
                            {article.content}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Articles;
