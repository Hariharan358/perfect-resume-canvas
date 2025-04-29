
import React from "react";
import { ResumeData } from "./ResumeBuilder";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ResumePreviewProps {
  resumeData: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData }) => {
  const { personalInfo, education, experience, skills, documents } = resumeData;
  
  const handleDownload = () => {
    // In a real app, this would generate a PDF and trigger download
    alert("This would download the resume as PDF in a real application");
  };

  // Check if essential data is provided
  const hasBasicInfo = personalInfo.fullName && personalInfo.email;

  if (!hasBasicInfo) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium mb-3">Resume Preview</h3>
        <p className="text-gray-500 mb-4">Please fill out at least your name and email to generate a preview.</p>
        <Button variant="outline" onClick={() => window.history.back()}>
          Go Back to Form
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Resume Preview</h2>
        <Button onClick={handleDownload} className="flex gap-2">
          <Download className="h-4 w-4" /> Download PDF
        </Button>
      </div>

      <Card className="p-8 mb-6 max-w-3xl mx-auto bg-white shadow-lg">
        <div className="preview-document">
          {/* Header / Personal Info */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-resume-dark mb-2">{personalInfo.fullName}</h1>
            
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-600">
              {personalInfo.email && <p>{personalInfo.email}</p>}
              {personalInfo.phone && <p>{personalInfo.phone}</p>}
              {personalInfo.address && <p>{personalInfo.address}</p>}
            </div>
            
            <div className="flex justify-center gap-4 text-sm mt-1">
              {personalInfo.linkedIn && <p className="text-resume-primary">{personalInfo.linkedIn}</p>}
              {personalInfo.website && <p className="text-resume-primary">{personalInfo.website}</p>}
            </div>
          </div>

          {/* Professional Summary */}
          {personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-resume-primary mb-2">Professional Summary</h2>
              <Separator className="mb-3" />
              <p className="text-gray-700 whitespace-pre-wrap">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.some(exp => exp.company || exp.position) && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-resume-primary mb-2">Work Experience</h2>
              <Separator className="mb-3" />
              
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={exp.id} className={`${index !== 0 ? 'pt-3' : ''}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{exp.position}</h3>
                        <h4 className="text-resume-dark">{exp.company}</h4>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        {exp.location && <p>{exp.location}</p>}
                        <p>
                          {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                          {" - "}
                          {exp.current ? "Present" : (exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }))}
                        </p>
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 mt-1 whitespace-pre-wrap">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.some(edu => edu.institution || edu.degree) && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-resume-primary mb-2">Education</h2>
              <Separator className="mb-3" />
              
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={edu.id} className={`${index !== 0 ? 'pt-3' : ''}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{edu.institution}</h3>
                        <h4 className="text-resume-dark">{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h4>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        {edu.location && <p>{edu.location}</p>}
                        <p>
                          {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                          {" - "}
                          {edu.endDate && new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                        </p>
                      </div>
                    </div>
                    {edu.description && (
                      <p className="text-gray-700 mt-1 whitespace-pre-wrap">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-resume-primary mb-2">Skills</h2>
              <Separator className="mb-3" />
              
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span key={index} className="bg-resume-light text-resume-primary px-3 py-1 rounded-md text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Documents */}
          {documents.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-resume-primary mb-2">Supporting Documents</h2>
              <Separator className="mb-3" />
              
              <ul className="list-disc pl-5">
                {documents.map((doc, index) => (
                  <li key={index} className="text-gray-700">
                    {doc.name} ({(doc.size / 1024).toFixed(1)} KB)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ResumePreview;
