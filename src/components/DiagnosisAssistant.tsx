import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Stethoscope, 
  Brain, 
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Activity,
  Languages,
  Send
} from "lucide-react";

const DiagnosisAssistant = () => {
  const [symptoms, setSymptoms] = useState("");
  const [language, setLanguage] = useState("en");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
    { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
    { code: "te", name: "తెలుగు", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা", flag: "🇧🇩" }
  ];

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        primaryDiagnosis: {
          condition: "Viral Upper Respiratory Infection",
          confidence: 85,
          severity: "mild"
        },
        differentialDiagnoses: [
          { condition: "Common Cold", confidence: 78 },
          { condition: "Allergic Rhinitis", confidence: 65 },
          { condition: "Sinusitis", confidence: 45 }
        ],
        recommendations: [
          "Rest and adequate hydration",
          "Paracetamol for fever/pain relief",
          "Steam inhalation 2-3 times daily",
          "Monitor symptoms for 48-72 hours"
        ],
        referral: false,
        urgency: "low",
        followUp: "If symptoms worsen or persist beyond 7 days"
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-primary text-primary-foreground shadow-primary">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-3 rounded-lg">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AI Medical Diagnosis Assistant</h1>
              <p className="text-primary-foreground/90">
                Multilingual symptom analysis with evidence-based recommendations
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary" />
              <span>Patient Information</span>
            </CardTitle>
            <CardDescription>Enter patient details and symptoms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Language Selector */}
            <div>
              <Label className="text-sm font-medium mb-2 flex items-center space-x-2">
                <Languages className="h-4 w-4" />
                <span>Preferred Language</span>
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={language === lang.code ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLanguage(lang.code)}
                    className="justify-start"
                  >
                    <span className="mr-2">{lang.flag}</span>
                    <span className="text-xs">{lang.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input id="age" placeholder="e.g., 35" />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Input id="gender" placeholder="Male/Female/Other" />
              </div>
            </div>

            {/* Symptoms */}
            <div>
              <Label htmlFor="symptoms" className="text-sm font-medium mb-2 flex items-center space-x-2">
                <Stethoscope className="h-4 w-4" />
                <span>Symptoms Description</span>
              </Label>
              <Textarea
                id="symptoms"
                placeholder="Describe symptoms in detail... (e.g., fever for 2 days, headache, runny nose)"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="min-h-[120px]"
              />
            </div>

            <Button 
              onClick={handleAnalyze} 
              disabled={!symptoms.trim() || isAnalyzing}
              className="w-full"
              variant="primary"
            >
              {isAnalyzing ? (
                <>
                  <Activity className="h-4 w-4 animate-spin mr-2" />
                  Analyzing Symptoms...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Start AI Analysis
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Guidelines */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-health-good" />
              <span>Usage Guidelines</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-health-good rounded-full mt-2"></div>
                <p>Provide detailed symptom descriptions including duration, severity, and triggers</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-health-good rounded-full mt-2"></div>
                <p>Include relevant medical history, allergies, and current medications</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-health-good rounded-full mt-2"></div>
                <p>AI suggestions are assistive tools, not replacements for clinical judgment</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <p>Always follow up with specialist referrals when recommended</p>
              </div>
            </div>
            
            <div className="bg-health-excellent/10 p-3 rounded-lg border border-health-excellent/20">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="h-4 w-4 text-health-good" />
                <span className="font-medium text-health-good">AI Model Status</span>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>✓ Trained on 500K+ medical cases</p>
                <p>✓ 94% diagnostic accuracy</p>
                <p>✓ Supports 5 Indian languages</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Results */}
      {analysisResult && (
        <Card className="shadow-card animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-primary" />
              <span>AI Analysis Results</span>
            </CardTitle>
            <CardDescription>Evidence-based diagnosis and treatment recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Primary Diagnosis */}
            <div className="bg-gradient-card p-4 rounded-lg border border-border/50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">Primary Diagnosis</h3>
                <Badge variant={analysisResult.urgency === 'high' ? 'destructive' : analysisResult.urgency === 'medium' ? 'destructive' : 'secondary'}>
                  {analysisResult.confidence}% Confidence
                </Badge>
              </div>
              <p className="text-foreground font-medium">{analysisResult.primaryDiagnosis.condition}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Severity: <span className="capitalize">{analysisResult.primaryDiagnosis.severity}</span>
              </p>
            </div>

            {/* Differential Diagnoses */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-accent" />
                <span>Differential Diagnoses</span>
              </h3>
              <div className="space-y-2">
                {analysisResult.differentialDiagnoses.map((diagnosis, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">{diagnosis.condition}</span>
                    <Badge variant="outline">{diagnosis.confidence}%</Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-health-good" />
                <span>Treatment Recommendations</span>
              </h3>
              <div className="space-y-2">
                {analysisResult.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-2 p-3 bg-health-good/10 rounded-lg border border-health-good/20">
                    <div className="w-2 h-2 bg-health-good rounded-full mt-2"></div>
                    <span className="text-sm">{recommendation}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Follow-up */}
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-medium">Follow-up Instructions</span>
              </div>
              <p className="text-sm">{analysisResult.followUp}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="secondary" className="flex-1">
                Save to Health Records
              </Button>
              <Button variant="outline" className="flex-1">
                Generate Report
              </Button>
              <Button variant="medical" className="flex-1">
                Start New Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DiagnosisAssistant;