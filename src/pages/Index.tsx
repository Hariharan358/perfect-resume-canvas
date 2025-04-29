
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-resume-light">
      {/* Header */}
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="font-bold text-2xl text-resume-dark">ResumeCanvas</div>
        <div className="flex gap-4">
          <Button variant="ghost" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button className="bg-resume-primary hover:bg-resume-accent transition-colors">
            <Link to="/builder" className="text-white">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto py-20 px-4 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-resume-dark mb-6">
            Create Your Professional Resume in Minutes
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Our easy-to-use builder helps you craft a standout resume that gets noticed by employers. 
            Upload your documents, fill in your details, and get a professional resume instantly.
          </p>
          <Button className="bg-resume-primary hover:bg-resume-accent text-white py-3 px-8 text-lg" asChild>
            <Link to="/builder">Build My Resume</Link>
          </Button>
        </div>
        <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
          <img 
            src="/placeholder.svg" 
            alt="Resume Builder Preview" 
            className="max-w-md w-full rounded-lg shadow-xl animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-resume-dark">
            Build Your Perfect Resume
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Easy Information Input",
                description: "Fill in your details with our intuitive form interface that guides you through each section."
              },
              {
                title: "Document Upload",
                description: "Upload supporting documents like certifications, portfolios, or reference letters."
              },
              {
                title: "Professional Templates",
                description: "Choose from a variety of professional templates designed to impress employers."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-lg p-6 transition-all hover:shadow-md animate-fade-in"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <h3 className="text-xl font-semibold mb-3 text-resume-primary">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-resume-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Create Your Resume?</h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have successfully landed their dream jobs with resumes built using our platform.
          </p>
          <Button className="bg-white text-resume-primary hover:bg-gray-100 py-3 px-8 text-lg" asChild>
            <Link to="/builder">Start Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-resume-dark py-8">
        <div className="container mx-auto px-4 text-center text-white">
          <p>© 2025 ResumeCanvas. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
