
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResumeData } from "./ResumeBuilder";
import { PlusCircle, Trash2 } from "lucide-react";

interface ResumeFormProps {
  resumeData: ResumeData;
  onChange: (section: string, data: any) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ resumeData, onChange }) => {
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange("personalInfo", {
      ...resumeData.personalInfo,
      [name]: value,
    });
  };

  const addEducation = () => {
    const newEducation = {
      id: "edu-" + Date.now(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    };

    onChange("education", [...resumeData.education, newEducation]);
  };

  const updateEducation = (id: string, field: string, value: string) => {
    const updatedEducation = resumeData.education.map((edu) =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onChange("education", updatedEducation);
  };

  const removeEducation = (id: string) => {
    if (resumeData.education.length > 1) {
      const updatedEducation = resumeData.education.filter((edu) => edu.id !== id);
      onChange("education", updatedEducation);
    }
  };

  const addExperience = () => {
    const newExperience = {
      id: "exp-" + Date.now(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };

    onChange("experience", [...resumeData.experience, newExperience]);
  };

  const updateExperience = (id: string, field: string, value: any) => {
    const updatedExperience = resumeData.experience.map((exp) =>
      exp.id === id ? { ...exp, [field]: field === "current" ? !exp.current : value } : exp
    );
    onChange("experience", updatedExperience);
  };

  const removeExperience = (id: string) => {
    if (resumeData.experience.length > 1) {
      const updatedExperience = resumeData.experience.filter((exp) => exp.id !== id);
      onChange("experience", updatedExperience);
    }
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const skillsText = e.target.value;
    const skillsList = skillsText.split(',').map(skill => skill.trim()).filter(skill => skill !== '');
    onChange("skills", skillsList);
  };

  return (
    <div>
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="w-full grid grid-cols-4 mb-6">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={resumeData.personalInfo.fullName}
                    onChange={handlePersonalInfoChange}
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={resumeData.personalInfo.email}
                      onChange={handlePersonalInfoChange}
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={resumeData.personalInfo.phone}
                      onChange={handlePersonalInfoChange}
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={resumeData.personalInfo.address}
                    onChange={handlePersonalInfoChange}
                    placeholder="123 Main St, City, State"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedIn">LinkedIn (optional)</Label>
                    <Input
                      id="linkedIn"
                      name="linkedIn"
                      value={resumeData.personalInfo.linkedIn}
                      onChange={handlePersonalInfoChange}
                      placeholder="linkedin.com/in/johndoe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website (optional)</Label>
                    <Input
                      id="website"
                      name="website"
                      value={resumeData.personalInfo.website}
                      onChange={handlePersonalInfoChange}
                      placeholder="johndoe.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea
                    id="summary"
                    name="summary"
                    value={resumeData.personalInfo.summary}
                    onChange={handlePersonalInfoChange}
                    placeholder="Write a brief summary of your professional background and goals"
                    className="min-h-[120px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education">
          {resumeData.education.map((edu, index) => (
            <Card className="mb-6 border-gray-200" key={edu.id}>
              <CardContent className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Education #{index + 1}</h3>
                  {resumeData.education.length > 1 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeEducation(edu.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Remove
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                    <Input
                      id={`institution-${edu.id}`}
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                      placeholder="University or School Name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                      <Input
                        id={`degree-${edu.id}`}
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                        placeholder="Bachelor's, Master's, etc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                      <Input
                        id={`field-${edu.id}`}
                        value={edu.field}
                        onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                        placeholder="Computer Science, Business, etc."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`location-${edu.id}`}>Location</Label>
                      <Input
                        id={`location-${edu.id}`}
                        value={edu.location}
                        onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                        placeholder="City, State/Country"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${edu.id}`}>Start Date</Label>
                      <Input
                        id={`startDate-${edu.id}`}
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`endDate-${edu.id}`}>End Date</Label>
                      <Input
                        id={`endDate-${edu.id}`}
                        type="month"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`description-${edu.id}`}>Description</Label>
                    <Textarea
                      id={`description-${edu.id}`}
                      value={edu.description}
                      onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                      placeholder="Achievements, GPA, relevant coursework, etc."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button 
            variant="outline" 
            onClick={addEducation} 
            className="w-full mt-2"
          >
            <PlusCircle className="h-4 w-4 mr-2" /> Add Education
          </Button>
        </TabsContent>

        <TabsContent value="experience">
          {resumeData.experience.map((exp, index) => (
            <Card className="mb-6 border-gray-200" key={exp.id}>
              <CardContent className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Experience #{index + 1}</h3>
                  {resumeData.experience.length > 1 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeExperience(exp.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Remove
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`company-${exp.id}`}>Company</Label>
                      <Input
                        id={`company-${exp.id}`}
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                        placeholder="Company Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`position-${exp.id}`}>Position</Label>
                      <Input
                        id={`position-${exp.id}`}
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                        placeholder="Job Title"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`location-${exp.id}`}>Location</Label>
                      <Input
                        id={`location-${exp.id}`}
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                        placeholder="City, State/Country"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${exp.id}`}>Start Date</Label>
                      <Input
                        id={`startDate-${exp.id}`}
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`endDate-${exp.id}`}>End Date</Label>
                      <Input
                        id={`endDate-${exp.id}`}
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                        placeholder="Present"
                        disabled={exp.current}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-2">
                    <input
                      type="checkbox"
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onChange={() => updateExperience(exp.id, "current", null)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor={`current-${exp.id}`} className="text-sm font-normal">
                      I currently work here
                    </Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`description-${exp.id}`}>Description</Label>
                    <Textarea
                      id={`description-${exp.id}`}
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                      placeholder="Describe your responsibilities and achievements"
                      className="min-h-[120px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button 
            variant="outline" 
            onClick={addExperience}
            className="w-full mt-2"
          >
            <PlusCircle className="h-4 w-4 mr-2" /> Add Experience
          </Button>
        </TabsContent>

        <TabsContent value="skills">
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="skills" className="text-base font-medium mb-2 block">
                    Skills
                  </Label>
                  <p className="text-sm text-gray-500 mb-2">
                    Enter your skills separated by commas (e.g. JavaScript, React, Project Management)
                  </p>
                  <Textarea
                    id="skills"
                    value={resumeData.skills.join(', ')}
                    onChange={handleSkillsChange}
                    placeholder="JavaScript, React, CSS, Project Management, Team Leadership, etc."
                    className="min-h-[150px]"
                  />
                </div>

                <div className="mt-6">
                  <h3 className="font-medium text-base mb-2">Your Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="bg-resume-light text-resume-primary px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </div>
                    ))}
                    {resumeData.skills.length === 0 && (
                      <p className="text-gray-500 text-sm">No skills added yet</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeForm;
