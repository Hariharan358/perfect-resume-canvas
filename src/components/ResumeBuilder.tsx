
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResumeForm from "./ResumeForm";
import DocumentUpload from "./DocumentUpload";
import ResumePreview from "./ResumePreview";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export type ResumeData = {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    linkedIn: string;
    website: string;
    summary: string;
  };
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
  }>;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  skills: string[];
  documents: File[];
};

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    linkedIn: "",
    website: "",
    summary: "",
  },
  education: [
    {
      id: "edu-" + Date.now(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    },
  ],
  experience: [
    {
      id: "exp-" + Date.now(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
  ],
  skills: [],
  documents: [],
};

const ResumeBuilder = () => {
  const [activeTab, setActiveTab] = useState("information");
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const { toast } = useToast();

  const handleDataChange = (sectionName: string, data: any) => {
    setResumeData((prevData) => ({
      ...prevData,
      [sectionName]: data,
    }));
  };

  const handleDocumentUpload = (files: File[]) => {
    setResumeData((prevData) => ({
      ...prevData,
      documents: [...files],
    }));
    toast({
      title: "Documents uploaded",
      description: `Successfully uploaded ${files.length} document(s)`,
    });
  };

  const handleSaveResume = () => {
    // In a real app, this would save to a database or export as PDF
    toast({
      title: "Resume saved",
      description: "Your resume has been saved successfully",
    });
    console.log("Resume Data:", resumeData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-resume-dark">Build Your Resume</h1>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b">
              <TabsList className="w-full justify-start rounded-none bg-white p-0">
                <TabsTrigger 
                  value="information" 
                  className="py-4 px-6 data-[state=active]:text-resume-primary data-[state=active]:border-b-2 data-[state=active]:border-resume-primary rounded-none"
                >
                  Personal Information
                </TabsTrigger>
                <TabsTrigger 
                  value="documents" 
                  className="py-4 px-6 data-[state=active]:text-resume-primary data-[state=active]:border-b-2 data-[state=active]:border-resume-primary rounded-none"
                >
                  Upload Documents
                </TabsTrigger>
                <TabsTrigger 
                  value="preview" 
                  className="py-4 px-6 data-[state=active]:text-resume-primary data-[state=active]:border-b-2 data-[state=active]:border-resume-primary rounded-none"
                >
                  Preview Resume
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="information" className="p-6">
              <ResumeForm 
                resumeData={resumeData} 
                onChange={handleDataChange} 
              />
            </TabsContent>

            <TabsContent value="documents" className="p-6">
              <DocumentUpload 
                onUpload={handleDocumentUpload} 
                documents={resumeData.documents}
              />
            </TabsContent>

            <TabsContent value="preview" className="p-6">
              <ResumePreview resumeData={resumeData} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={() => {
              const prevTabs: Record<string, string> = {
                "documents": "information",
                "preview": "documents"
              };
              
              if (prevTabs[activeTab]) {
                setActiveTab(prevTabs[activeTab]);
              }
            }}
            disabled={activeTab === "information"}
          >
            Previous
          </Button>
          
          {activeTab !== "preview" ? (
            <Button 
              onClick={() => {
                const nextTabs: Record<string, string> = {
                  "information": "documents",
                  "documents": "preview"
                };
                
                if (nextTabs[activeTab]) {
                  setActiveTab(nextTabs[activeTab]);
                }
              }}
            >
              Next
            </Button>
          ) : (
            <Button 
              className="bg-resume-primary hover:bg-resume-accent"
              onClick={handleSaveResume}
            >
              Save Resume
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
