import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { pinFileToIPFS } from "../utils/ipfs"; // Assuming you have an IPFS utility for uploading files

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedIn: string;
  website: string;
  summary: string;
}

interface ResumeFormProps {
  resumeData: PersonalInfo;
  onChange: (section: string, data: any) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ resumeData, onChange }) => {
  const [file, setFile] = useState<File | null>(null);
  const [ipfsLink, setIpfsLink] = useState<string | null>(null);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange("personalInfo", {
      ...resumeData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (file) {
      try {
        const ipfsUrl = await pinFileToIPFS(file); // Upload the file to IPFS
        setIpfsLink(ipfsUrl); // Set the IPFS URL after upload
        alert("File uploaded to IPFS successfully.");
      } catch (error) {
        console.error("Error uploading file to IPFS:", error);
        alert("Failed to upload file.");
      }
    }
  };

  return (
    <div>
      <Card className="border-0 shadow-none">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={resumeData.fullName}
                onChange={handlePersonalInfoChange}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={resumeData.email}
                onChange={handlePersonalInfoChange}
                placeholder="john.doe@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={resumeData.phone}
                onChange={handlePersonalInfoChange}
                placeholder="(123) 456-7890"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={resumeData.address}
                onChange={handlePersonalInfoChange}
                placeholder="123 Main St, City, State"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedIn">LinkedIn (optional)</Label>
              <Input
                id="linkedIn"
                name="linkedIn"
                value={resumeData.linkedIn}
                onChange={handlePersonalInfoChange}
                placeholder="linkedin.com/in/johndoe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website (optional)</Label>
              <Input
                id="website"
                name="website"
                value={resumeData.website}
                onChange={handlePersonalInfoChange}
                placeholder="johndoe.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                name="summary"
                value={resumeData.summary}
                onChange={handlePersonalInfoChange}
                placeholder="Write a brief summary of your professional background and goals"
                className="min-h-[120px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resume">Upload Resume (PDF)</Label>
              <Input
                id="resume"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleFileUpload}
                className="mt-4 flex items-center"
              >
                <FileText className="h-4 w-4 mr-2" /> Upload Resume
              </Button>
              {ipfsLink && (
                <div className="mt-4">
                  <p>Resume uploaded successfully! View it on IPFS:</p>
                  <a
                    href={ipfsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {ipfsLink}
                  </a>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeForm;
