import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, FileText, Heart, Zap, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";

const Articles = () => {
  const articles = [
    {
      id: 1,
      title: "สถิติการเสียชีวิตจากหัวใจหยุดเต้นในประเทศไทย",
      excerpt: "ข้อมูลและสถิติที่น่าตกใจเกี่ยวกับการเสียชีวิตจากหัวใจหยุดเต้นกะทันหันในประเทศไทย และความสำคัญของ CPR",
      readTime: "5 นาที",
      author: "ทีมแพทย์ฉุกเฉิน",
      category: "สถิติและข้อมูล",
      icon: AlertTriangle,
      content: `
สถิติการเสียชีวิตจากหัวใจหยุดเต้นกะทันหันในประเทศไทยนั้นน่าตกใจมาก โดยพบว่ามีผู้เสียชีวิตจากสาเหตุนี้เฉลี่ยปีละกว่า 60,000 คน หรือเกือบ 165 คนต่อวัน

**สาเหตุหลัก:**
- โรคหัวใจขาดเลือด 40%
- หัวใจเต้นผิดจังหวะ 25%
- หัวใจล้มเหลว 20%
- อื่นๆ 15%

**อัตราการรอดชีวิต:**
- โรงพยาบาล: 15-20%
- นอกโรงพยาบาล: 2-8%
- ได้รับ CPR ภายใน 4 นาที: 40-50%

**ปัจจัยที่เพิ่มโอกาสรอดชีวิต:**
1. การได้รับ CPR ทันที
2. การใช้ AED อย่างรวดเร็ว
3. การแจ้งหน่วยกู้ชีพ 1669
4. การมีผู้ที่มีความรู้ CPR ในบริเวณใกล้เคียง

สถิติเหล่านี้แสดงให้เห็นถึงความสำคัญของการที่ประชาชนต้องมีความรู้ในการช่วยฟื้นคืนชีพขั้นพื้นฐาน
      `
    },
    {
      id: 2,
      title: "เทคนิคการกดหน้าอกที่มีประสิทธิภาพ",
      excerpt: "รายละเอียดเชิงลึกเกี่ยวกับเทคนิคการกดหน้าอกที่ถูกต้อง รวมถึงข้อผิดพลาดที่พบบ่อย",
      readTime: "7 นาที",
      author: "นพ.สุรชัย วงศ์การแพทย์",
      category: "เทคนิค",
      icon: Heart,
      content: `
การกดหน้าอกที่มีประสิทธิภาพเป็นหัวใจสำคัญของการช่วยฟื้นคืนชีพ ต้องคำนึงถึงหลายปัจจัยดังนี้:

**ตำแหน่งที่ถูกต้อง:**
- กึ่งกลางหน้าอกระหว่างลูกเต้านม
- ใช้ส้นฝ่ามือข้างหนึ่งวางบนกระดูกอก
- วางมืออีกข้างซ้อนทับ โดยประสานนิ้วเข้าด้วยกัน

**เทคนิคการกด:**
- ใช้น้ำหนักตัวในการกด ไม่ใช้แรงแขน
- กดลงให้ลึก 5-6 เซนติเมตร
- ปล่อยให้หน้าอกขยายตัวกลับสู่ตำแหน่งเดิมอย่างสมบูรณ์
- อัตรา 100-120 ครั้งต่อนาที

**ข้อผิดพลาดที่พบบ่อย:**
1. กดไม่ลึกพอ (น้อยกว่า 5 ซม.)
2. กดลึกเกินไป (มากกว่า 6 ซม.)
3. ไม่ปล่อยให้หน้าอกขยายตัวสมบูรณ์
4. หยุดพักนานเกินไป
5. เปลี่ยนตำแหน่งมือบ่อยเกินไป

**เคล็ดลับสำหรับการกดที่มีประสิทธิภาพ:**
- นับเป็นจังหวะ "1 และ 2 และ 3..."
- เปลี่ยนผู้กดทุก 2 นาที
- ตรวจสอบตำแหน่งมือเป็นระยะ
      `
    },
    {
      id: 3,
      title: "ความแตกต่างของ AED ในแต่ละรุ่น",
      excerpt: "เปรียบเทียบ AED รุ่นต่างๆ ที่มีในตลาด และวิธีการใช้งานที่แตกต่างกัน",
      readTime: "10 นาที",
      author: "วิศวกรการแพทย์ สุพัฒน์",
      category: "อุปกรณ์",
      icon: Zap,
      content: `
เครื่อง AED มีหลายรุ่นในตลาด แต่ละรุ่นมีคุณสมบัติและวิธีการใช้งานที่แตกต่างกันเล็กน้อย

**ประเภทของ AED:**

1. **AED แบบกึ่งอัตโนมัติ (Semi-Automatic)**
   - ผู้ใช้ต้องกดปุ่มช็อกเอง
   - ปลอดภัยกว่าเพราะมีการควบคุมจากผู้ใช้
   - เหมาะสำหรับผู้ที่ได้รับการฝึกอบรม

2. **AED แบบอัตโนมัติเต็มรูปแบบ (Fully Automatic)**
   - เครื่องจะช็อกเองเมื่อจำเป็น
   - ง่ายต่อการใช้งานสำหรับคนทั่วไป
   - มีเสียงเตือนก่อนช็อกทุกครั้ง

**ฟีเจอร์พิเศษ:**
- การวิเคราะห์ EKG อัตโนมัติ
- คำแนะนำเสียงเป็นภาษาไทย
- หน้าจอแสดงคำแนะนำ
- การบันทึกข้อมูลการกู้ชีพ
- แบตเตอรี่ที่ใช้งานได้นาน

**แพดสำหรับเด็กและผู้ใหญ่:**
- แพดผู้ใหญ่: พลังงาน 150-200 Joules
- แพดเด็ก: พลังงาน 50-75 Joules
- ระบบปรับพลังงานอัตโนมัติในบางรุ่น

**การบำรุงรักษา:**
- ตรวจสอบแบตเตอรี่เป็นประจำ
- เช็ควันหมดอายุของแพด
- ทำความสะอาดตัวเครื่อง
- ทดสอบการทำงานตามคู่มือ
      `
    },
    {
      id: 4,
      title: "CPR สำหรับเด็กและทารก",
      excerpt: "ความแตกต่างของเทคนิค CPR ระหว่างผู้ใหญ่ เด็ก และทารก พร้อมข้อควรระวัง",
      readTime: "8 นาที", 
      author: "พยาบาลวิชาชีพ นิธิรดา",
      category: "เทคนิคพิเศษ",
      icon: Heart,
      content: `
การช่วยฟื้นคืนชีพในเด็กและทารกมีความแตกต่างจากผู้ใหญ่ในหลายประการ

**สำหรับเด็ก (อายุ 1-8 ปี):**
- ใช้มือข้างเดียวในการกดหน้าอก
- ความลึก: 1/3 ของความหนาหน้าอก (ประมาณ 4-5 ซม.)
- อัตรา: 100-120 ครั้งต่อนาที
- อัตราส่วนการกด:เป่า = 30:2 (เหมือนผู้ใหญ่)

**สำหรับทารก (อายุต่ำกว่า 1 ปี):**
- ใช้ 2 นิ้วมือ (นิ้วชี้และนิ้วกลาง)
- ตำแหน่ง: ใต้เส้นเชื่อมลูกเต้านมลงมา 1 นิ้วมือ
- ความลึก: 1/3 ของความหนาหน้าอก (ประมาณ 3-4 ซม.)
- อัตราส่วนการกด:เป่า = 30:2 หรือ 15:2 (ถ้ามี 2 คน)

**ข้อแตกต่างสำคัญ:**
1. **การเป่าลม:** ใช้แรงน้อยกว่า ปิดปากและจมูกพร้อมกัน
2. **การตรวจชีพจร:** ใช้ชีพจรที่แขนในทารก
3. **AED:** ใช้แพดเด็กหรือปรับโหมดเด็ก

**สาเหตุการหยุดหายใจในเด็ก:**
- สำลักของแปลกปลอม
- จมน้ำ
- โรคระบบทางเดิน หายใจ
- โรคหัวใจแต่กำเนิด

**ข้อควรระวังพิเศษ:**
- เด็กมีการกู้คืนได้ดีกว่าผู้ใหญ่ถ้าได้รับการช่วยเหลือทันเวลา
- ระวังการบาดเจ็บจากการกดแรงเกินไป
- ให้ความสำคัญกับการเป่าลมมากกว่าผู้ใหญ่
      `
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
                เพิ่มพูนความรู้เกี่ยวกับการช่วยฟื้นคืนชีพและการใช้ AED ด้วยบทความคุณภาพ
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {articles.map((article) => (
              <Card key={article.id} className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <article.icon className="w-5 h-5 text-primary" />
                      <Badge variant="secondary">{article.category}</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl line-clamp-2 mb-2">
                    {article.title}
                  </CardTitle>
                  <p className="text-muted-foreground line-clamp-3">
                    {article.excerpt}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg mb-4 max-h-40 overflow-y-auto">
                    <div className="text-sm text-muted-foreground whitespace-pre-line">
                      {article.content}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-medical text-white"
                    onClick={() => {
                      // เปิดบทความแบบเต็ม - ในการใช้งานจริงอาจเป็นหน้าแยก
                      const newWindow = window.open('', '_blank');
                      if (newWindow) {
                        newWindow.document.write(`
                          <html>
                            <head>
                              <title>${article.title}</title>
                              <style>
                                body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
                                h1 { color: #d32f2f; }
                                .meta { color: #666; margin-bottom: 20px; }
                                .content { white-space: pre-line; }
                              </style>
                            </head>
                            <body>
                              <h1>${article.title}</h1>
                              <div class="meta">
                                <strong>ผู้เขียน:</strong> ${article.author} | 
                                <strong>เวลาอ่าน:</strong> ${article.readTime} |
                                <strong>หมวดหมู่:</strong> ${article.category}
                              </div>
                              <div class="content">${article.content}</div>
                            </body>
                          </html>
                        `);
                      }
                    }}
                  >
                    อ่านบทความเต็ม
                  </Button>
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