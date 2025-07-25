import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Home, BookOpen, FileText, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useSimpleAuth } from "@/hooks/useSimpleAuth";
import SimpleLogin from "./SimpleLogin";

const Navbar = () => {
  const location = useLocation();
  const { user, login, logout, isAuthenticated } = useSimpleAuth();
  const [showLogin, setShowLogin] = useState(false);

  const navItems = [
    { href: "/", label: "หน้าแรก", icon: Home },
    { href: "/course", label: "หลักสูตร", icon: BookOpen },
    { href: "/articles", label: "บทความ", icon: FileText },
  ];

  return (
    <nav className="bg-white border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-emergency rounded-lg flex items-center justify-center">
              <img
                src="/logo.svg"
                className="h-10 w-10 object-contain"
              />
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
            {isAuthenticated ? (
              <>
                <span className="text-sm font-medium text-foreground">
                  สวัสดี, {user?.full_name}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={logout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  ออกจากระบบ
                </Button>
              </>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowLogin(true)}
              >
                เข้าสู่ระบบ
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {showLogin && (
        <SimpleLogin 
          onLogin={login}
          onClose={() => setShowLogin(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
