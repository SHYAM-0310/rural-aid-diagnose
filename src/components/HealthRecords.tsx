import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  FileText, 
  Upload, 
  Calendar,
  User,
  Download,
  QrCode,
  Tag,
  Search,
  Filter,
  Eye,
  Trash2,
  Plus
} from "lucide-react";

const HealthRecords = () => {
  const [records, setRecords] = useState([
    {
      id: 1,
      title: "Blood Test Report",
      type: "Lab Report",
      date: "2024-01-15",
      doctor: "Dr. Sharma",
      hospital: "City Hospital",
      tags: ["blood", "routine"],
      status: "recent"
    },
    {
      id: 2,
      title: "X-Ray Chest",
      type: "Imaging",
      date: "2024-01-10",
      doctor: "Dr. Patel",
      hospital: "Medical Center",
      tags: ["x-ray", "chest"],
      status: "recent"
    },
    {
      id: 3,
      title: "Prescription - Hypertension",
      type: "Prescription",
      date: "2024-01-08",
      doctor: "Dr. Kumar",
      hospital: "Rural Clinic",
      tags: ["prescription", "hypertension"],
      status: "active"
    },
    {
      id: 4,
      title: "Discharge Summary",
      type: "Hospital Record",
      date: "2023-12-20",
      doctor: "Dr. Singh",
      hospital: "District Hospital",
      tags: ["discharge", "surgery"],
      status: "archived"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const recordTypes = [
    { value: "all", label: "All Records" },
    { value: "Lab Report", label: "Lab Reports" },
    { value: "Prescription", label: "Prescriptions" },
    { value: "Imaging", label: "Imaging" },
    { value: "Hospital Record", label: "Hospital Records" }
  ];

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || record.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "recent": return "default";
      case "active": return "secondary";
      case "archived": return "outline";
      default: return "outline";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Lab Report": return "🔬";
      case "Prescription": return "💊";
      case "Imaging": return "📸";
      case "Hospital Record": return "🏥";
      default: return "📄";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-secondary text-secondary-foreground shadow-secondary">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-3 rounded-lg">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Digital Health Records Wallet</h1>
                <p className="text-secondary-foreground/90">
                  Securely store and organize all your medical documents
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{records.length}</div>
                <div className="text-sm opacity-90">Total Records</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload and Search Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload New Record */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5 text-primary" />
              <span>Upload New Record</span>
            </CardTitle>
            <CardDescription>Add prescription, lab report, or medical document</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
            <input 
              type="file" 
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" 
              multiple 
              className="hidden" 
              id="file-upload"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                files.forEach(file => {
                  const newRecord = {
                    id: Date.now() + Math.random(),
                    title: file.name.replace(/\.[^/.]+$/, ""),
                    type: file.type.includes('pdf') ? 'Lab Report' : 
                          file.type.includes('image') ? 'Imaging' : 'Hospital Record',
                    date: new Date().toISOString().split('T')[0],
                    doctor: 'To be assigned',
                    hospital: 'Uploaded by patient',
                    tags: ['uploaded', 'new'],
                    status: 'recent'
                  };
                  setRecords(prev => [newRecord, ...prev]);
                });
              }}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag & drop files here or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supports PDF, JPG, PNG, DOC (Max 10MB)
              </p>
            </label>
          </div>
          <Button 
            variant="primary" 
            className="w-full" 
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <Plus className="h-4 w-4 mr-2" />
            Select Files
          </Button>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search" className="sr-only">Search records</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by title, doctor, or hospital..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <Label htmlFor="filter" className="sr-only">Filter by type</Label>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <select
                      id="filter"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background text-foreground"
                    >
                      {recordTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="shadow-soft">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{records.filter(r => r.status === 'recent').length}</div>
                <div className="text-sm text-muted-foreground">Recent</div>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-secondary">{records.filter(r => r.status === 'active').length}</div>
                <div className="text-sm text-muted-foreground">Active</div>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-accent">{records.filter(r => r.type === 'Prescription').length}</div>
                <div className="text-sm text-muted-foreground">Prescriptions</div>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-health-good">{records.filter(r => r.type === 'Lab Report').length}</div>
                <div className="text-sm text-muted-foreground">Lab Reports</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Records List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>Your Health Records</span>
            <Badge variant="secondary">{filteredRecords.length} records</Badge>
          </CardTitle>
          <CardDescription>Manage and organize your medical documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <div key={record.id} className="border border-border rounded-lg p-4 hover:shadow-card transition-all duration-300 animate-fade-in">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{getTypeIcon(record.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-foreground">{record.title}</h3>
                        <Badge variant={getStatusColor(record.status)} className="text-xs">
                          {record.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(record.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{record.doctor}</span>
                        </div>
                        <span>•</span>
                        <span>{record.hospital}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">{record.type}</Badge>
                        {record.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            <Tag className="h-2 w-2 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => alert(`Viewing ${record.title}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => alert(`Downloading ${record.title}`)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => alert(`QR Code for ${record.title} generated! Share with doctors.`)}
                    >
                      <QrCode className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        if (confirm(`Delete ${record.title}?`)) {
                          setRecords(prev => prev.filter(r => r.id !== record.id));
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* QR Code Generation */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <QrCode className="h-5 w-5 text-primary" />
            <span>Share Records Securely</span>
          </CardTitle>
          <CardDescription>Generate secure QR codes for doctors to access your records</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-3">
              Create a secure, time-limited link to share selected records with healthcare providers
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => alert('Select up to 5 records to share securely')}
              >
                Select Records to Share
              </Button>
              <Button 
                variant="primary"
                onClick={() => alert('Secure QR code generated! Valid for 24 hours. Share with your doctor.')}
              >
                Generate Secure QR Code
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthRecords;