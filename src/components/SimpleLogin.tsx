import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Heart, User, Calendar, Users, Briefcase } from "lucide-react";

interface SimpleLoginProps {
  onLogin: (userData: any) => void;
  onClose: () => void;
}

const cprExperiences = [
  "เคยเรียนในโรงเรียน / มหาวิทยาลัย",
  "เคยอบรมจากหน่วยงานหรือหลักสูตร CPR",
  "เคยดูวิดีโอหรือเรียนออนไลน์",
  "เคยเห็นเหตุการณ์จริง",
  "ไม่เคยเลย"
];

const SimpleLogin = ({ onLogin, onClose }: SimpleLoginProps) => {
  const [formData, setFormData] = useState({
    full_name: "",
    age: "",
    gender: "",
    occupation: "",
    cpr_experience: [] as string[]
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleExperienceChange = (experience: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      cpr_experience: checked
        ? [...prev.cpr_experience, experience]
        : prev.cpr_experience.filter(e => e !== experience)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (
      !formData.full_name ||
      !formData.age ||
      !formData.gender ||
      !formData.occupation ||
      formData.cpr_experience.length === 0
    ) {
      toast({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        description: "โปรดใส่ชื่อ อายุ เพศ อาชีพ และเลือกประสบการณ์ CPR ของคุณ",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('profiless')
        .insert([{
          full_name: formData.full_name,
          age: parseInt(formData.age),
          gender: formData.gender,
          occupation: formData.occupation,
          cpr_experience: formData.cpr_experience // save as array
        }])
        .select()
        .single();

      if (error) throw error;

      // Store user data in localStorage
      localStorage.setItem('profiles', JSON.stringify(data));
      
      toast({
        title: "เข้าสู่ระบบสำเร็จ",
        description: `ยินดีต้อนรับ ${formData.full_name}`,
      });

      onLogin(data);
      onClose();
    } catch (error: any) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-emergency rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">เข้าสู่ระบบ</CardTitle>
          <p className="text-muted-foreground">กรอกข้อมูลเพื่อเริ่มใช้งาน</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                ชื่อ-นามสกุล
              </Label>
              <Input
                id="full_name"
                type="text"
                placeholder="กรอกชื่อ-นามสกุลของคุณ"
                value={formData.full_name}
                onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                อายุ
              </Label>
              <Input
                id="age"
                type="number"
                min="1"
                max="120"
                placeholder="อายุของคุณ"
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                เพศ
              </Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกเพศ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ชาย">ชาย</SelectItem>
                  <SelectItem value="หญิง">หญิง</SelectItem>
                  <SelectItem value="อื่นๆ">อื่นๆ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupation" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                อาชีพ
              </Label>
              <Input
                id="occupation"
                type="text"
                placeholder="อาชีพของคุณ"
                value={formData.occupation}
                onChange={(e) => setFormData(prev => ({ ...prev, occupation: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                ประสบการณ์เกี่ยวกับการทำ CPR
              </Label>
              <div className="space-y-2 ml-2">
                {cprExperiences.map((exp) => (
                  <div key={exp} className="flex items-center gap-2">
                    <Checkbox
                      id={exp}
                      checked={formData.cpr_experience.includes(exp)}
                      onCheckedChange={(checked: boolean) =>
                        handleExperienceChange(exp, checked)
                      }
                    />
                    <Label htmlFor={exp}>{exp}</Label>
                  </div>
                ))}
              </div>
              <div className="text-xs text-muted-foreground ml-2">
                (สามารถเลือกได้มากกว่า 1 ข้อ)
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                ยกเลิก
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-emergency text-white"
              >
                {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleLogin;
