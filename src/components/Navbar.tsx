import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Home, BookOpen, Video, FileText, BarChart3, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { href: "/", label: "หน้าแรก", icon: Home },
    { href: "/course", label: "หลักสูตร", icon: BookOpen },
    { href: "/articles", label: "บทความ", icon: FileText },
    { href: "/admin", label: "แอดมิน", icon: Settings },
  ];

  return (
    <nav className="bg-white border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-emergency rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground">CPR-NA</span>
              <span className="text-sm text-muted-foreground">Learning Center</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Button
                key={href}
                variant={location.pathname === href ? "default" : "ghost"}
                asChild
                className={cn(
                  "flex items-center space-x-2",
                  location.pathname === href && "bg-gradient-emergency text-white"
                )}
              >
                <Link to={href}>
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              </Button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              เข้าสู่ระบบ
            </Button>
            <Button size="sm" className="bg-gradient-emergency text-white">
              สมัครสมาชิก
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;