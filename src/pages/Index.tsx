import { useState } from "react";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import DiagnosisAssistant from "@/components/DiagnosisAssistant";
import HealthRecords from "@/components/HealthRecords";

const Index = () => {
  const [currentView, setCurrentView] = useState("dashboard");

  const renderCurrentView = () => {
    switch (currentView) {
      case "diagnosis":
        return <DiagnosisAssistant />;
      case "records":
        return <HealthRecords />;
      case "chat":
        return (
          <div className="max-w-4xl mx-auto p-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Chat Assistant</h2>
            <p className="text-muted-foreground">Multilingual patient-doctor chat assistant coming soon...</p>
          </div>
        );
      case "insurance":
        return (
          <div className="max-w-4xl mx-auto p-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Insurance Tracker</h2>
            <p className="text-muted-foreground">Health insurance claim tracker coming soon...</p>
          </div>
        );
      case "dashboard":
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      {renderCurrentView()}
    </div>
  );
};

export default Index;
