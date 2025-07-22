import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, FileText, Heart, Zap, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";

const Articles = () => {
  // ลบบทความออกหมด เหลือแค่หน้าว่าง
  const articles = [];

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
          <div className="text-center py-16">
            <FileText className="w-24 h-24 mx-auto mb-6 text-muted-foreground" />
            <h2 className="text-3xl font-bold mb-4">เนื้อหาบทความกำลังเตรียมความพร้อม</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              ทีมงานของเรากำลังรวบรวมบทความและเนื้อหาที่มีคุณภาพเพื่อเพิ่มพูนความรู้ของคุณ 
              กรุณากลับมาตรวจสอบอีกครั้งในเร็วๆ นี้
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Articles;