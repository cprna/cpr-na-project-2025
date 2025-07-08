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
            </TabsContent>

            <TabsContent value="drcab" className="space-y-6">
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
                        
                        <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                          <h4 className="font-semibold text-primary mb-2">การกดหน้าอก (Chest Compression):</h4>
                          <ul className="space-y-1 text-muted-foreground">
                            <li>• <strong>พื้น:</strong> ต้องแข็ง</li>
                            <li>• <strong>ตำแหน่ง:</strong> วางส้นมือตรงกลางหน้าอก บริเวณครึ่งล่างของกระดูก sternum</li>
                            <li>• <strong>ท่า:</strong> เหยียดแขนตรง โน้มตัวตั้งฉากกับหน้าอก</li>
                            <li>• <strong>แรงกด:</strong> กดแรงและเร็ว ให้หน้าอกยุบ 5-6 เซนติเมตร (2-2.4 นิ้ว)</li>
                            <li>• <strong>อัตราการกด:</strong> 100-120 ครั้งต่อนาที</li>
                            <li>• <strong>Chest recoil:</strong> ให้หน้าอกกระเพื่อมจนสุดก่อนการกดหน้าอกทุกครั้ง และอย่าให้มือลอยจากกระดูกหน้าอก</li>
                          </ul>
                        </div>
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
            </TabsContent>

            <TabsContent value="aed" className="space-y-6">
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
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">1</div>
                            <h4 className="font-semibold text-primary">เปิด</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">เปิดเครื่อง AED และฟังคำแนะนำจากเครื่อง</p>
                        </div>
                        
                        <div className="p-4 border rounded-lg bg-gradient-to-br from-medical/5 to-medical/10 border-medical/20">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-medical text-white rounded-full flex items-center justify-center font-bold">2</div>
                            <h4 className="font-semibold text-medical">แปะ</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">แปะแผ่น electrode บนตัวผู้ป่วย เมื่อแปะแล้วให้หยุด CPR ชั่วคราว</p>
                        </div>
                        
                        <div className="p-4 border rounded-lg bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-warning text-white rounded-full flex items-center justify-center font-bold">3</div>
                            <h4 className="font-semibold text-warning">ปุ่ม</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">กดปุ่ม Shock เมื่อเครื่อง AED สั่ง ก่อนกดต้องบอก "ฉันถอย คุณถอย ทุกคนถอย"</p>
                        </div>
                        
                        <div className="p-4 border rounded-lg bg-gradient-to-br from-emergency/5 to-emergency/10 border-emergency/20">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-emergency text-white rounded-full flex items-center justify-center font-bold">4</div>
                            <h4 className="font-semibold text-emergency">ปั๊ม</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">ทำ CPR ต่อทันทีหลังจากทำการ Shock ด้วย AED แล้ว</p>
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
            </TabsContent>

            <TabsContent value="equipment" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-6 h-6 text-primary" />
                    อุปกรณ์ที่จำเป็นสำหรับการทำ CPR และการเปิดทางเดินหายใจ
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    การช่วยฟื้นคืนชีพ (CPR) และการช่วยชีวิตขั้นพื้นฐาน (BLS) จำเป็นต้องมีอุปกรณ์ที่เหมาะสมเพื่อเพิ่มประสิทธิภาพในการช่วยชีวิตและป้องกันความเสียหายต่อเนื้อเยื่อจากการขาดออกซิเจน
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg text-primary">อุปกรณ์ทางเดินหายใจและใส่ท่อ</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• <strong>หน้ากาก</strong> (Face Mask)</li>
                          <li>• <strong>Nasal airway</strong> - ท่อช่วยหายใจทางจมูก</li>
                          <li>• <strong>Oral airway</strong> - ท่อช่วยหายใจทางปาก</li>
                          <li>• <strong>Endotracheal tube</strong> - ท่อช่วยหายใจ
                            <ul className="ml-4 mt-1 space-y-1 text-sm">
                              <li>- ขนาด 7.0-7.5 มม. สำหรับผู้หญิง</li>
                              <li>- ขนาด 8.0-8.5 มม. สำหรับผู้ชาย</li>
                              <li>- ต้องตรวจเช็คว่า cuff ไม่รั่ว</li>
                            </ul>
                          </li>
                          <li>• <strong>Stylet</strong> - ใช้ในกรณีที่ใส่ท่อช่วยหายใจยาก</li>
                          <li>• <strong>Laryngoscope</strong> - ต้องตรวจเช็คว่าไฟสว่างเพียงพอ</li>
                          <li>• <strong>กระบอกฉีดยา</strong> สำหรับฉีดลมเข้าใน cuff</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg text-medical">อุปกรณ์ให้ออกซิเจน</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• <strong>ถังออกซิเจน</strong></li>
                          <li>• <strong>สายออกซิเจน</strong></li>
                          <li>• <strong>หัวออกซิเจน</strong></li>
                          <li>• <strong>Ambu Bag</strong> - ถุงลมช่วยหายใจ</li>
                          <li>• <strong>Mass/Mask</strong> - หน้ากากออกซิเจน</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg text-emergency">อุปกรณ์รองรับและเครื่องมือพิเศษ</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• <strong>อุปกรณ์รองหลัง/กระดาน</strong> สำหรับทำ CPR 
                            <span className="text-sm block mt-1">(เพื่อให้พื้นผิวแข็งแรงสำหรับการกดหน้าอก)</span>
                          </li>
                          <li>• <strong>เครื่อง AED</strong> (Automated External Defibrillator)</li>
                          <li>• <strong>Defibrillation</strong> - เครื่องกระตุกหัวใจ</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg text-warning">ยานพาหนะและอุปกรณ์เสริม</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• <strong>รถ Emergency</strong> - รถฉุกเฉิน</li>
                          <li>• <strong>รถ/อุปกรณ์ดูดเสมหะ</strong></li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                    <h4 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      ความสำคัญของ AED
                    </h4>
                    <div className="space-y-3 text-muted-foreground">
                      <p>
                        <strong>เครื่องกระตุกหัวใจไฟฟ้าชนิดอัตโนมัติ (AED)</strong> เป็นส่วนสำคัญของการช่วยฟื้นคืนชีพขั้นพื้นฐาน โดยเฉพาะอย่างยิ่งในกรณีที่หัวใจหยุดเต้นนอกโรงพยาบาล
                      </p>
                      <ul className="space-y-1 ml-4">
                        <li>• เป็นหนึ่งในอุปกรณ์ที่จำเป็นต้องจัดเตรียมไว้สำหรับการทำ CPR</li>
                        <li>• ควรนำมาใช้ร่วมกับการโทร 1669 เมื่อพบผู้ป่วยไม่รู้สึกตัว</li>
                        <li>• เป็นส่วนหนึ่งของ "ห่วงโซ่ของการรอดชีวิต" (Chain of survival)</li>
                        <li>• นักศึกษาควรสามารถปฏิบัติการใช้ AED ได้ถูกต้องกับหุ่นจำลอง</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-medical/5 to-emergency/5 p-4 rounded-lg border border-medical/20">
                    <p className="text-center font-semibold text-medical">
                      🏥 อุปกรณ์เหล่านี้มีความสำคัญอย่างยิ่งในการช่วยให้การทำ CPR มีประสิทธิภาพและเพิ่มโอกาสรอดชีวิตของผู้ป่วย
                    </p>
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