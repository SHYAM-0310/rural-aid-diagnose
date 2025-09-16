import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Stethoscope, 
  FileText, 
  MessageSquare, 
  CreditCard,
  TrendingUp,
  Users,
  Clock,
  AlertCircle,
  Activity,
  Heart
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Active Patients",
      value: "1,247",
      change: "+12%",
      icon: Users,
      color: "text-health-good"
    },
    {
      title: "Diagnoses Today",
      value: "89",
      change: "+5%",
      icon: Stethoscope,
      color: "text-primary"
    },
    {
      title: "Pending Records",
      value: "23",
      change: "-8%",
      icon: FileText,
      color: "text-accent"
    },
    {
      title: "Insurance Claims",
      value: "156",
      change: "+23%",
      icon: CreditCard,
      color: "text-secondary"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      title: "AI Diagnosis Completed",
      patient: "Rajesh Kumar",
      time: "2 mins ago",
      status: "completed",
      urgency: "low"
    },
    {
      id: 2,
      title: "Health Record Updated",
      patient: "Priya Sharma",
      time: "15 mins ago",
      status: "updated",
      urgency: "medium"
    },
    {
      id: 3,
      title: "Specialist Referral Required",
      patient: "Amit Singh",
      time: "1 hour ago",
      status: "urgent",
      urgency: "high"
    }
  ];

  const quickActions = [
    {
      title: "Start AI Diagnosis",
      description: "Analyze symptoms and get treatment recommendations",
      icon: Stethoscope,
      variant: "primary" as const,
      bgGradient: "bg-gradient-primary"
    },
    {
      title: "Upload Health Record",
      description: "Add prescription, lab report, or medical document",
      icon: FileText,
      variant: "secondary" as const,
      bgGradient: "bg-gradient-secondary"
    },
    {
      title: "Chat with AI Assistant",
      description: "Get instant medical translations and consultations",
      icon: MessageSquare,
      variant: "outline" as const,
      bgGradient: "bg-gradient-card"
    },
    {
      title: "Track Insurance Claim",
      description: "Monitor claim status and upload required documents",
      icon: CreditCard,
      variant: "outline" as const,
      bgGradient: "bg-gradient-card"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="bg-gradient-hero text-primary-foreground rounded-xl p-6 shadow-primary">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome to RuralAI Health Assistant</h1>
            <p className="text-primary-foreground/90">
              Empowering rural healthcare with AI-powered diagnosis and multilingual support
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm opacity-90">Available</div>
            </div>
            <Activity className="h-8 w-8 animate-pulse-soft" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gradient-card shadow-card hover:shadow-primary transition-all duration-300 animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className={`text-sm ${stat.color} flex items-center space-x-1`}>
                    <TrendingUp className="h-3 w-3" />
                    <span>{stat.change}</span>
                  </p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Card key={index} className={`${action.bgGradient} border-0 shadow-card hover:shadow-primary transition-all duration-300 animate-fade-in cursor-pointer group`}>
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <div className="mx-auto w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">{action.title}</h3>
                <p className="text-sm text-white/80">{action.description}</p>
              </div>
              <Button variant={action.variant} size="sm" className="w-full">
                Get Started
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Recent Activities</span>
            </CardTitle>
            <CardDescription>Latest patient interactions and system updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.urgency === 'high' ? 'bg-destructive' :
                    activity.urgency === 'medium' ? 'bg-accent' : 'bg-health-good'
                  } animate-pulse-soft`}></div>
                  <div>
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-muted-foreground text-xs">Patient: {activity.patient}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={activity.urgency === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                    {activity.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Health Insights */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-secondary" />
              <span>Health Insights</span>
            </CardTitle>
            <CardDescription>AI-powered analytics and recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gradient-secondary/10 p-4 rounded-lg border border-secondary/20">
              <div className="flex items-start space-x-3">
                <div className="bg-secondary p-2 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-secondary-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-secondary">Diagnosis Accuracy</h4>
                  <p className="text-sm text-muted-foreground">AI model showing 94% accuracy this week</p>
                  <p className="text-xs text-secondary mt-1">↑ 2% improvement</p>
                </div>
              </div>
            </div>
            
            <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
              <div className="flex items-start space-x-3">
                <div className="bg-accent p-2 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-accent">Alert</h4>
                  <p className="text-sm text-muted-foreground">3 patients require specialist follow-up</p>
                  <p className="text-xs text-accent mt-1">Action needed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;