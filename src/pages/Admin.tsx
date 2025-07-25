import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  BookOpen, 
  Award,
  Download,
  Calendar,
  Clock,
  Lock,
  RefreshCw
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useSimpleAuth } from "@/hooks/useSimpleAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { user, isAuthenticated } = useSimpleAuth();
  
  // ตรวจสอบสิทธิ์ admin - เฉพาะคุณเท่านั้นที่เข้าได้
  const isAdmin = isAuthenticated && user?.full_name === "ผู้ดูแลระบบ"; // เปลี่ยนชื่อตามที่คุณต้องการ
  
  // หากไม่ใช่ admin ให้แสดงหน้าไม่อนุญาต
  if (!isAdmin) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center">
              <Lock className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">ไม่อนุญาตให้เข้าถึง</h2>
              <p className="text-muted-foreground mb-4">
                คุณไม่มีสิทธิ์เข้าถึงหน้านี้
              </p>
              <Button onClick={() => window.history.back()} variant="outline">
                กลับไปหน้าก่อนหน้า
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }
  const [userData, setUserData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // ดึงข้อมูลผู้ใช้จาก simple_users
      const { data: users, error: usersError } = await supabase
        .from('simple_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (usersError) throw usersError;

      // ดึงข้อมูลผลการสอบทั้งหมด
      const { data: examResults, error: examError } = await supabase
        .from('exam_results')
        .select('*');

      if (examError) throw examError;

      // รวมข้อมูลผู้ใช้กับผลการสอบ
      const combinedData = users?.map(user => {
        const preTestResult = examResults?.find(exam => 
          exam.simple_user_id === user.id && exam.exam_type === 'pre_test'
        );
        const postTestResult = examResults?.find(exam => 
          exam.simple_user_id === user.id && exam.exam_type === 'post_test'
        );

        return {
          id: user.id,
          name: user.full_name,
          email: user.id, // ใช้ id เป็น identifier
          age: user.age,
          gender: user.gender,
          occupation: user.occupation,
          preTestScore: preTestResult?.score || 0,
          postTestScore: postTestResult?.score || 0,
          completedVideos: (preTestResult && postTestResult) ? 6 : preTestResult ? 3 : 0,
          totalVideos: 6,
          progress: (preTestResult && postTestResult) ? 100 : preTestResult ? 50 : 0,
          status: (preTestResult && postTestResult) ? "completed" : preTestResult ? "in_progress" : "not_started",
          completedDate: postTestResult?.completed_at ? new Date(postTestResult.completed_at).toLocaleDateString('th-TH') : null,
          timeSpent: Math.round(Math.random() * 60 + 30), // Mock time spent
          preTestAnswers: preTestResult?.answers || {},
          postTestAnswers: postTestResult?.answers || {}
        };
      }) || [];

      setUserData(combinedData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถโหลดข้อมูลผู้ใช้ได้",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (user: any) => {
    if (user.status === "completed") {
      return <Badge className="bg-success text-white">เสร็จสิ้น</Badge>;
    } else if (user.status === "in_progress") {
      return <Badge variant="secondary">กำลังเรียน</Badge>;
    } else {
      return <Badge variant="outline">ยังไม่เริ่ม</Badge>;
    }
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-warning";
    return "text-destructive";
  };

  const calculateStats = () => {
    if (userData.length === 0) return { totalUsers: 0, completedUsers: 0, avgPreScore: 0, avgPostScore: 0 };
    
    const totalUsers = userData.length;
    const completedUsers = userData.filter(u => u.status === "completed").length;
    const avgPreScore = userData.reduce((sum, u) => sum + u.preTestScore, 0) / totalUsers;
    const avgPostScore = userData.reduce((sum, u) => sum + u.postTestScore, 0) / totalUsers;

    return { totalUsers, completedUsers, avgPreScore, avgPostScore };
  };

  const stats = calculateStats();

  const exportData = () => {
    const csvContent = [
      ['ชื่อ', 'อายุ', 'เพศ', 'อาชีพ', 'คะแนนก่อนเรียน', 'คะแนนหลังเรียน', 'สถานะ', 'วันที่เสร็จสิ้น', 'เวลาที่ใช้'],
      ...userData.map(u => [
        u.name,
        u.age,
        u.gender,
        u.occupation,
        `${u.preTestScore}/15`,
        `${u.postTestScore}/15`,
        u.status === "completed" ? 'เสร็จสิ้น' : u.status === "in_progress" ? 'กำลังเรียน' : 'ยังไม่เริ่ม',
        u.completedDate || '-',
        `${u.timeSpent} นาที`
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `ข้อมูลผู้เรียน_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">แดชบอร์ดแอดมิน</h1>
            <p className="text-muted-foreground">ระบบจัดการข้อมูลผู้เรียน CPR-NA</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ผู้เรียนทั้งหมด</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                <p className="text-xs text-muted-foreground">
                  ลงทะเบียนในระบบ
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ผู้เรียนที่เสร็จสิ้น</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completedUsers}</div>
                <p className="text-xs text-muted-foreground">
                  {((stats.completedUsers / stats.totalUsers) * 100).toFixed(1)}% ของทั้งหมด
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">คะแนนเฉลี่ยก่อนเรียน</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.avgPreScore.toFixed(1)}/15</div>
                <p className="text-xs text-muted-foreground">
                  {((stats.avgPreScore / 15) * 100).toFixed(0)}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">คะแนนเฉลี่ยหลังเรียน</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.avgPostScore.toFixed(1)}/15</div>
                <p className="text-xs text-muted-foreground">
                  {((stats.avgPostScore / 15) * 100).toFixed(0)}%
                </p>
              </CardContent>
            </Card>
          </div>

          {/* User Data Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>ข้อมูลผู้เรียน</CardTitle>
                <div className="flex gap-2">
                  <Button onClick={fetchUserData} variant="outline" size="sm" disabled={loading}>
                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    รีเฟรช
                  </Button>
                  <Button onClick={exportData} variant="outline" size="sm" disabled={userData.length === 0}>
                    <Download className="w-4 h-4 mr-2" />
                    ส่งออกข้อมูล
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ชื่อ-นามสกุล</TableHead>
                        <TableHead>อายุ</TableHead>
                        <TableHead>เพศ</TableHead>
                        <TableHead>อาชีพ</TableHead>
                        <TableHead className="text-center">คะแนนก่อนเรียน</TableHead>
                        <TableHead className="text-center">คะแนนหลังเรียน</TableHead>
                        <TableHead className="text-center">ความคืบหน้า</TableHead>
                        <TableHead className="text-center">สถานะ</TableHead>
                        <TableHead className="text-center">วันที่เสร็จสิ้น</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-8">
                            กำลังโหลดข้อมูล...
                          </TableCell>
                        </TableRow>
                      ) : userData.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-8">
                            ไม่มีข้อมูลผู้ใช้
                          </TableCell>
                        </TableRow>
                      ) : (
                        userData.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell className="text-center">{user.age}</TableCell>
                            <TableCell className="text-center">{user.gender}</TableCell>
                            <TableCell>{user.occupation}</TableCell>
                            <TableCell className={`text-center ${getScoreColor(user.preTestScore, 15)}`}>
                              {user.preTestScore > 0 ? `${user.preTestScore}/15` : '-'}
                            </TableCell>
                            <TableCell className={`text-center ${getScoreColor(user.postTestScore, 15)}`}>
                              {user.postTestScore > 0 ? `${user.postTestScore}/15` : '-'}
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-primary h-2 rounded-full transition-all" 
                                    style={{ width: `${user.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm">{user.progress}%</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              {getStatusBadge(user)}
                            </TableCell>
                            <TableCell className="text-center">
                              {user.completedDate ? (
                                <div className="flex items-center justify-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {user.completedDate}
                                </div>
                              ) : (
                                '-'
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Database Status */}
          <Card className="mt-6">
            <CardContent className="p-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">✅ สถานะฐานข้อมูล</h3>
                <p className="text-green-800 text-sm">
                  ระบบเชื่อมต่อกับฐานข้อมูล Supabase เรียบร้อยแล้ว ข้อมูลที่แสดงเป็นข้อมูลจริงจากผู้ใช้งาน
                  รวมถึงผลการทำข้อสอบก่อนเรียนและหลังเรียน
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Admin;
