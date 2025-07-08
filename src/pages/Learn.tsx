import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Phone, AlertTriangle, Clock, Zap, CheckCircle, ArrowRight, BookOpen, Target, Activity } from "lucide-react";
import Navbar from "@/components/Navbar";

const Learn = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <div className="bg-gradient-medical text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <Heart className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">การช่วยฟื้นคืนชีพขั้นพื้นฐาน</h1>
            <p className="text-xl mb-6 opacity-90">เรียนรู้ทักษะที่สำคัญที่สุดในการช่วยชีวิต</p>
            <div className="flex items-center justify-center gap-4 text-lg">
              <Phone className="w-6 h-6" />
              <span>ฉุกเฉิน: โทร 1669 (โทรฟรีแต่อย่าโทรเล่น)</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="basics" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basics">ความรู้พื้นฐาน</TabsTrigger>
              <TabsTrigger value="drcab">ขั้นตอน D-R-C-A-B</TabsTrigger>
              <TabsTrigger value="aed">การใช้ AED</TabsTrigger>
              <TabsTrigger value="equipment">อุปกรณ์</TabsTrigger>
            </TabsList>

            <TabsContent value="basics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-primary" />
                    การช่วยฟื้นคืนชีพ (CPR) คืออะไร?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    การช่วยฟื้นคืนชีพ (Cardio-Pulmonary Resuscitation: CPR) เป็นการปฏิบัติเพื่อช่วยชีวิตผู้ที่หัวใจหยุดเต้นและหยุดหายใจกะทันหัน
                  </p>
                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                    <h4 className="font-semibold text-primary mb-2">จุดประสงค์หลัก:</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• ให้มีการหายใจและการไหลเวียนโลหิตกลับคืนสู่สภาพเดิม</li>
                      <li>• ป้องกันเนื้อเยื่อได้รับอันตรายจากการขาดออกซิเจนอย่างถาวร</li>
                      <li>• คงไว้ซึ่งการไหลเวียนโลหิต</li>
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
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-warning/10 p-4 rounded-lg border border-warning/20">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-warning" />
                        <span className="font-semibold">4 นาทีแรก</span>
                      </div>
                      <p className="text-sm text-muted-foreground">ตายชั่วคราว - ยังสามารถฟื้นคืนได้</p>
                    </div>
                    <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                        <span className="font-semibold">10 นาที</span>
                      </div>
                      <p className="text-sm text-muted-foreground">สมองตายถาวร</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="drcab" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-6 h-6 text-primary" />
                    ขั้นตอน D-R-C-A-B
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="border-l-4 border-destructive pl-4">
                      <h3 className="text-xl font-bold mb-2">D - Danger (ตรวจสอบอันตราย)</h3>
                      <p className="text-muted-foreground">ตรวจสอบให้แน่ใจว่าสถานที่ปลอดภัยสำหรับผู้ช่วยเหลือและผู้ป่วย</p>
                    </div>
                    <div className="border-l-4 border-warning pl-4">
                      <h3 className="text-xl font-bold mb-2">R - Response (ตรวจสอบการตอบสนอง)</h3>
                      <p className="text-muted-foreground">เขย่าไหล่และเรียกเสียงดัง "คุณๆๆ..." หากไม่รู้สึกตัวให้โทร 1669</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="text-xl font-bold mb-2">C - Circulation (ระบบไหลเวียน)</h3>
                      <p className="text-muted-foreground">ตรวจชีพจรที่คอ 5-10 วินาที หากไม่มีชีพจรให้กดหน้าอกทันที</p>
                      <div className="mt-2 text-sm">
                        <p>• ความลึก: 5-6 ซม. • อัตรา: 100-120 ครั้ง/นาที • อัตราส่วน: 30:2</p>
                      </div>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h3 className="text-xl font-bold mb-2">A - Airway (ทางเดินหายใจ)</h3>
                      <p className="text-muted-foreground">Head tilt chin lift (การกดหน้าผากและเชยคาง)</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h3 className="text-xl font-bold mb-2">B - Breathing (การหายใจ)</h3>
                      <p className="text-muted-foreground">ช่วยหายใจ 2 ครั้ง โดยเป่าลม 1 วินาที/ครั้ง</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="aed" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-6 h-6 text-primary" />
                    ขั้นตอนการใช้ AED: เปิด - แปะ - ปุ่ม - ปั๊ม
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded">
                      <h4 className="font-semibold mb-2">1. เปิด</h4>
                      <p className="text-sm text-muted-foreground">เปิดเครื่อง AED และฟังคำแนะนำ</p>
                    </div>
                    <div className="p-4 border rounded">
                      <h4 className="font-semibold mb-2">2. แปะ</h4>
                      <p className="text-sm text-muted-foreground">แปะแผ่น electrode หยุด CPR ชั่วคราว</p>
                    </div>
                    <div className="p-4 border rounded">
                      <h4 className="font-semibold mb-2">3. ปุ่ม</h4>
                      <p className="text-sm text-muted-foreground">กดปุ่ม Shock เมื่อเครื่องสั่ง บอก "ทุกคนถอย"</p>
                    </div>
                    <div className="p-4 border rounded">
                      <h4 className="font-semibold mb-2">4. ปั๊ม</h4>
                      <p className="text-sm text-muted-foreground">ปั๊มหัวใจต่อทันทีหลัง Shock</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="equipment" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>อุปกรณ์ที่จำเป็น</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">ทางเดินหายใจ:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• หน้ากาก</li>
                        <li>• Nasal/Oral airway</li>
                        <li>• Endotracheal tube</li>
                        <li>• Laryngoscope</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">ออกซิเจน:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• ถังออกซิเจน</li>
                        <li>• สายออกซิเจน</li>
                        <li>• Ambu Bag</li>
                        <li>• Mask</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">อื่นๆ:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• กระดานรองหลัง</li>
                        <li>• เครื่อง AED</li>
                        <li>• รถ Emergency</li>
                        <li>• อุปกรณ์ดูดเสมหะ</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/pretest'}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              ทดสอบก่อนเรียน
            </Button>
            <Button 
              onClick={() => window.location.href = '/posttest'}
              className="bg-gradient-medical text-white flex items-center gap-2"
            >
              ทดสอบหลังเรียน
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Learn;