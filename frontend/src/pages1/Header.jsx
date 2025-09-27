import React from 'react';
import { Button } from '../components/button';
import { 
  Moon, 
  Sun, 
  Shield, 
  Bell, 
  User, 
  Menu,
  BarChart3,
  AlertTriangle,
  Package,
  Brain,
  FileText
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '../components/sheet';

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
  { id: 'resources', label: 'Resources', icon: Package },
  { id: 'ai-insights', label: 'AI Insights', icon: Brain },
  { id: 'reports', label: 'Reports', icon: FileText },
];

export function Header({ isDarkMode, toggleDarkMode, currentPage, setCurrentPage }) {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8" style={{ color: 'var(--color-emergency)' }} />
          <div>
            <h1 className="font-semibold">DisasterGuard</h1>
            <p className="text-xs text-muted-foreground">Resilient Communication System</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentPage(item.id)}
                className="gap-2"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
          </Button>

          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={currentPage === item.id ? "default" : "ghost"}
                      onClick={() => setCurrentPage(item.id)}
                      className="justify-start gap-3"
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Button>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}