
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Upload, File, FileText, X } from "lucide-react";

interface DocumentUploadProps {
  onUpload: (files: File[]) => void;
  documents: File[];
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onUpload, documents }) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      const validFiles = fileArray.filter(file => 
        file.type === "application/pdf" || 
        file.type === "image/jpeg" || 
        file.type === "image/png" ||
        file.type === "application/msword" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
      
      if (validFiles.length !== fileArray.length) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Only PDF, JPEG, PNG, and DOC/DOCX files are allowed",
        });
      }
      
      if (validFiles.length > 0) {
        onUpload(validFiles);
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    handleFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeDocument = (index: number) => {
    const updatedDocuments = [...documents];
    updatedDocuments.splice(index, 1);
    onUpload(updatedDocuments);
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes("pdf")) {
      return <FileText className="h-6 w-6 text-red-500" />;
    } else if (mimeType.includes("image")) {
      return <File className="h-6 w-6 text-blue-500" />;
    } else {
      return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Upload Supporting Documents</h2>
        <p className="text-gray-600">
          Upload any supporting documents such as certifications, portfolios, or reference letters to enhance your resume.
          We accept PDF, JPEG, PNG, and DOC/DOCX files.
        </p>
      </div>
      
      <div 
        className={`border-2 border-dashed rounded-lg p-10 text-center ${
          dragActive ? "border-resume-primary bg-resume-light" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={handleChange}
          className="hidden"
        />
        
        <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium mb-2">Drag & drop files here</h3>
        <p className="text-gray-500 mb-4">or</p>
        <Button 
          onClick={handleButtonClick}
          variant="outline"
          className="mx-auto"
        >
          Browse Files
        </Button>
      </div>
      
      {documents.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Uploaded Documents</h3>
          <div className="space-y-3">
            {documents.map((doc, index) => (
              <Card key={index} className="p-3 flex items-center justify-between">
                <div className="flex items-center">
                  {getFileIcon(doc.type)}
                  <div className="ml-3">
                    <p className="font-medium text-sm truncate max-w-xs">{doc.name}</p>
                    <p className="text-xs text-gray-500">{(doc.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeDocument(index)} 
                  className="text-gray-500 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
