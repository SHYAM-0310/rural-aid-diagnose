import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Stethoscope, 
  FileText, 
  MessageSquare, 
  CreditCard, 
  Menu,
  X,
  Heart,
  Activity
} from "lucide-react";

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { icon: Activity, label: "Dashboard", view: "dashboard" },
    { icon: Stethoscope, label: "AI Diagnosis", view: "diagnosis" },
    { icon: FileText, label: "Health Records", view: "records" },
    { icon: MessageSquare, label: "Chat Assistant", view: "chat" },
    { icon: CreditCard, label: "Insurance", view: "insurance" },
  ];

  return (
    <nav className="bg-card shadow-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-primary p-2 rounded-lg shadow-primary">
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">RuralAI Health</h1>
              <p className="text-xs text-muted-foreground">Healthcare Assistant</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Button 
                key={item.label} 
                variant={currentView === item.view ? "default" : "ghost"} 
                className="flex items-center space-x-2"
                onClick={() => onViewChange(item.view)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Button 
                  key={item.label} 
                  variant={currentView === item.view ? "default" : "ghost"} 
                  className="justify-start space-x-2"
                  onClick={() => {
                    onViewChange(item.view);
                    setIsMenuOpen(false);
                  }}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;