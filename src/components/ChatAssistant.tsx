import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageCircle, 
  Mic, 
  MicOff,
  Send, 
  Languages,
  Volume2,
  VolumeX,
  Download,
  User,
  Stethoscope,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'patient' | 'doctor' | 'system';
  timestamp: Date;
  language: string;
  translation?: string;
  isVoice?: boolean;
}

interface Consultation {
  id: string;
  patientName: string;
  doctorName: string;
  startTime: Date;
  status: 'active' | 'completed' | 'scheduled';
  language: string;
  summary?: string;
}

const ChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'नमस्ते! मैं डॉ. शर्मा हूं। आप कैसा महसूस कर रहे हैं?',
      sender: 'doctor',
      timestamp: new Date(Date.now() - 300000),
      language: 'hi',
      translation: 'Hello! I am Dr. Sharma. How are you feeling?'
    },
    {
      id: '2',
      text: 'सर, मुझे बुखार और सिरदर्द है।',
      sender: 'patient',
      timestamp: new Date(Date.now() - 240000),
      language: 'hi',
      translation: 'Sir, I have fever and headache.'
    },
    {
      id: '3',
      text: 'कब से यह समस्या है? क्या आपको खांसी भी है?',
      sender: 'doctor',
      timestamp: new Date(Date.now() - 180000),
      language: 'hi',
      translation: 'Since when do you have this problem? Do you also have a cough?'
    }
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("hi");
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [userRole, setUserRole] = useState<'patient' | 'doctor'>('patient');
  const [currentConsultation, setCurrentConsultation] = useState<Consultation>({
    id: '1',
    patientName: 'राम कुमार',
    doctorName: 'डॉ. शर्मा',
    startTime: new Date(Date.now() - 300000),
    status: 'active',
    language: 'hi'
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇮🇳' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: userRole,
      timestamp: new Date(),
      language: selectedLanguage,
      translation: newMessage // In real app, this would be AI-translated
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: userRole === 'patient' 
          ? 'मुझे समझ आ गया। मैं आपकी जांच करूंगा।'
          : 'धन्यवाद डॉक्टर साहब। मैं दवा लूंगा।',
        sender: userRole === 'patient' ? 'doctor' : 'patient',
        timestamp: new Date(),
        language: selectedLanguage,
        translation: userRole === 'patient' 
          ? 'I understand. I will examine you.'
          : 'Thank you doctor. I will take the medicine.'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In real app, implement speech-to-text here
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window && isSpeakerOn) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage === 'hi' ? 'hi-IN' : selectedLanguage;
      speechSynthesis.speak(utterance);
    }
  };

  const generateSummary = () => {
    const summary = {
      patient: currentConsultation.patientName,
      doctor: currentConsultation.doctorName,
      duration: Math.round((Date.now() - currentConsultation.startTime.getTime()) / 60000),
      symptoms: ['बुखार', 'सिरदर्द'],
      recommendations: ['आराम करें', 'पानी पिएं', 'दवा लें'],
      followUp: 'तीन दिन बाद'
    };

    setCurrentConsultation(prev => ({
      ...prev,
      status: 'completed',
      summary: `मरीज: ${summary.patient}\nडॉक्टर: ${summary.doctor}\nअवधि: ${summary.duration} मिनट\nलक्षण: ${summary.symptoms.join(', ')}\nसुझाव: ${summary.recommendations.join(', ')}\nअगली मुलाकात: ${summary.followUp}`
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-primary text-primary-foreground shadow-primary">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-3 rounded-lg">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Multilingual Chat Assistant</h1>
                <p className="text-primary-foreground/90">
                  Real-time patient-doctor communication with AI translation
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{messages.length}</div>
                <div className="text-sm opacity-90">Messages</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Consultation Info & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Consultation */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Stethoscope className="h-5 w-5 text-primary" />
              <span>Active Consultation</span>
              <Badge variant={currentConsultation.status === 'active' ? 'default' : 'secondary'}>
                {currentConsultation.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Patient:</span>
                <span className="text-sm">{currentConsultation.patientName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Stethoscope className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Doctor:</span>
                <span className="text-sm">{currentConsultation.doctorName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Duration:</span>
                <span className="text-sm">
                  {Math.round((Date.now() - currentConsultation.startTime.getTime()) / 60000)} min
                </span>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={generateSummary}
              disabled={currentConsultation.status !== 'active'}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              End & Generate Summary
            </Button>
          </CardContent>
        </Card>

        {/* Language & Settings */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Languages className="h-5 w-5 text-primary" />
              <span>Language Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Language</label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <div className="flex items-center space-x-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Role</label>
              <Select value={userRole} onValueChange={(value: 'patient' | 'doctor') => setUserRole(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">Patient</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
              >
                {isSpeakerOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              <span className="text-xs">Voice Output</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full text-sm">
              Emergency Protocol
            </Button>
            <Button variant="outline" className="w-full text-sm">
              Common Phrases
            </Button>
            <Button variant="outline" className="w-full text-sm">
              Medical Dictionary
            </Button>
            <Button variant="outline" className="w-full text-sm">
              <Download className="h-4 w-4 mr-2" />
              Export Chat
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <span>Live Consultation</span>
            <Badge variant="secondary" className="text-xs">
              Real-time Translation Active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Messages */}
          <div className="h-96 overflow-y-auto border border-border rounded-lg p-4 mb-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === userRole ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === userRole
                      ? 'bg-primary text-primary-foreground'
                      : message.sender === 'system'
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-medium">
                      {message.sender === 'patient' ? '👤 Patient' : 
                       message.sender === 'doctor' ? '👨‍⚕️ Doctor' : '🤖 System'}
                    </span>
                    {message.isVoice && <Mic className="h-3 w-3" />}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => speakMessage(message.text)}
                      className="h-4 w-4 p-0"
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-sm">{message.text}</p>
                  {message.translation && message.translation !== message.text && (
                    <p className="text-xs opacity-75 mt-1 italic">
                      Translation: {message.translation}
                    </p>
                  )}
                  <p className="text-xs opacity-50 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <Input
                placeholder={`Type your message in ${languages.find(l => l.code === selectedLanguage)?.name}...`}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
            </div>
            <Button
              variant={isRecording ? 'destructive' : 'outline'}
              size="icon"
              onClick={toggleRecording}
            >
              {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <Button variant="primary" size="icon" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Consultation Summary */}
      {currentConsultation.summary && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-health-good" />
              <span>Consultation Summary</span>
            </CardTitle>
            <CardDescription>Generated summary in patient's language</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={currentConsultation.summary}
              readOnly
              className="min-h-32"
            />
            <div className="flex items-center space-x-2 mt-4">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline">
                Share with Patient
              </Button>
              <Button variant="outline">
                Send to Records
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChatAssistant;