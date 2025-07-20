import { useState } from "react";
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
  Clock
} from "lucide-react";
import Navbar from "@/components/Navbar";

const Admin = () => {
  // Sample data - in real app this would come from database
  const [userData] = useState([
    {
      id: 1,
      name: "นางสาวสุดา ใจดี",
      email: "suda@example.com",
      preTestScore: 6,
      postTestScore: 9,
      completedVideos: 6,
      totalVideos: 6,
      completedDate: "2024-01-15",
      timeSpent: "45 นาที"
    },
    {
      id: 2,
      name: "นายสมชาย รักเรียน",
      email: "somchai@example.com",
      preTestScore: 4,
      postTestScore: 8,
      completedVideos: 6,
      totalVideos: 6,
      completedDate: "2024-01-14",
      timeSpent: "52 นาที"
    },
    {
      id: 3,
      name: "นางสาววิภา ศึกษาดี",
      email: "wipha@example.com",
      preTestScore: 7,
      postTestScore: 10,
      completedVideos: 5,
      totalVideos: 6,
      completedDate: "-",
      timeSpent: "38 นาที"
    },
    {
      id: 4,
      name: "นายประเสริฐ เก่งมาก",
      email: "prasert@example.com",
      preTestScore: 5,
      postTestScore: 8,
      completedVideos: 6,
      totalVideos: 6,
      completedDate: "2024-01-13",
      timeSpent: "47 นาที"
    },
    {
      id: 5,
      name: "นางสาวมาลี สุขใจ",
      email: "malee@example.com",
      preTestScore: 3,
      postTestScore: 7,
      completedVideos: 4,
      totalVideos: 6,
      completedDate: "-",
      timeSpent: "25 นาที"
    }
  ]);

  const getStatusBadge = (user: any) => {
    if (user.completedVideos === user.totalVideos && user.postTestScore > 0) {
      return <Badge className="bg-success text-white">เสร็จสิ้น</Badge>;
    } else if (user.completedVideos > 0) {
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
    const totalUsers = userData.length;
    const completedUsers = userData.filter(u => u.completedVideos === u.totalVideos && u.postTestScore > 0).length;
    const avgPreScore = userData.reduce((sum, u) => sum + u.preTestScore, 0) / totalUsers;
    const avgPostScore = userData.reduce((sum, u) => sum + u.postTestScore, 0) / totalUsers;

    return { totalUsers, completedUsers, avgPreScore, avgPostScore };
  };

  const stats = calculateStats();

  const exportData = () => {
    // In real app, this would export to CSV/Excel
    const csvContent = [
      ['ชื่อ', 'อีเมล', 'คะแนนก่อนเรียน', 'คะแนนหลังเรียน', 'วิดีโอที่ดูแล้ว', 'สถานะ', 'วันที่เสร็จสิ้น', 'เวลาที่ใช้'],
      ...userData.map(u => [
        u.name,
        u.email,
        `${u.preTestScore}/10`,
        `${u.postTestScore}/10`,
        `${u.completedVideos}/${u.totalVideos}`,
        u.completedVideos === u.totalVideos && u.postTestScore > 0 ? 'เสร็จสิ้น' : 'ยังไม่เสร็จ',
        u.completedDate,
        u.timeSpent
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `cpr-course-data-${new Date().toISOString().split('T')[0]}.csv`);
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
                <div className="text-2xl font-bold">{stats.avgPreScore.toFixed(1)}/10</div>
                <p className="text-xs text-muted-foreground">
                  {(stats.avgPreScore * 10).toFixed(0)}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">คะแนนเฉลี่ยหลังเรียน</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.avgPostScore.toFixed(1)}/10</div>
                <p className="text-xs text-muted-foreground">
                  {(stats.avgPostScore * 10).toFixed(0)}%
                </p>
              </CardContent>
            </Card>
          </div>

          {/* User Data Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>ข้อมูลผู้เรียน</CardTitle>
                <Button onClick={exportData} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  ส่งออกข้อมูล
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ชื่อ-นามสกุล</TableHead>
                      <TableHead>อีเมล</TableHead>
                      <TableHead className="text-center">คะแนนก่อนเรียน</TableHead>
                      <TableHead className="text-center">คะแนนหลังเรียน</TableHead>
                      <TableHead className="text-center">ความคืบหน้า</TableHead>
                      <TableHead className="text-center">สถานะ</TableHead>
                      <TableHead className="text-center">วันที่เสร็จสิ้น</TableHead>
                      <TableHead className="text-center">เวลาที่ใช้</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userData.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell className={`text-center ${getScoreColor(user.preTestScore, 10)}`}>
                          {user.preTestScore}/10
                        </TableCell>
                        <TableCell className={`text-center ${getScoreColor(user.postTestScore, 10)}`}>
                          {user.postTestScore > 0 ? `${user.postTestScore}/10` : '-'}
                        </TableCell>
                        <TableCell className="text-center">
                          {user.completedVideos}/{user.totalVideos} วิดีโอ
                        </TableCell>
                        <TableCell className="text-center">
                          {getStatusBadge(user)}
                        </TableCell>
                        <TableCell className="text-center">
                          {user.completedDate !== '-' ? (
                            <div className="flex items-center justify-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {user.completedDate}
                            </div>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {user.timeSpent}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Note about database integration */}
          <Card className="mt-6">
            <CardContent className="p-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">📝 หมายเหตุสำหรับแอดมิน</h3>
                <p className="text-blue-800 text-sm">
                  ข้อมูลที่แสดงในตารางนี้เป็นข้อมูลตัวอย่าง เพื่อให้ระบบเก็บข้อมูลจริงจากผู้ใช้งาน 
                  จำเป็นต้องเชื่อมต่อกับฐานข้อมูล Supabase ก่อน โดยคลิกปุ่ม Supabase ที่มุมขวาบนของหน้าจอ
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
