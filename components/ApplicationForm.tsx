import { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import Select, { SingleValue } from 'react-select';

interface Position {
  id: string;
  department: string;
  role: string;
  isOpen: boolean;
}

interface ApplicationFormProps {
  position: Position;
  onClose: () => void;
}

interface CountryOption {
  value: string;
  label: string;
  code: string;
}

const countryOptions: CountryOption[] = [
  { value: 'ar', label: 'Argentina', code: '+54' },
  { value: 'br', label: 'Brazil', code: '+55' },
  { value: 'cl', label: 'Chile', code: '+56' },
  { value: 'us', label: 'United States', code: '+1' },
  // Add more countries as needed
];

const questions: Record<string, string[]> = {
  "Mechanical": [
    "Describe your experience with CAD software.",
    "What projects have you worked on related to automotive engineering?",
    "How familiar are you with FEA and CFD analysis?"
  ],
  "Electrical": [
    "What programming languages are you proficient in?",
    "Describe your experience with PCB design.",
    "Have you worked with automotive control systems before?"
  ],
  "Software": [
    "What's your preferred programming language and why?",
    "Describe a challenging software project you've worked on.",
    "How familiar are you with real-time data processing?"
  ],
  "Business": [
    "Describe your experience in marketing or sponsorship acquisition.",
    "How would you approach fundraising for a student project?",
    "What strategies would you use to increase team visibility?"
  ]
};

export default function ApplicationForm({ position, onClose }: ApplicationFormProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    countryCode: countryOptions[0],
    phoneNumber: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", { 
      position, 
      answers, 
      contactInfo: {
        ...contactInfo,
        phone: `${contactInfo.countryCode.code}${contactInfo.phoneNumber}`
      } 
    });
    alert("Application submitted successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#1B1F3B] mb-4">Application for {position.role}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Contact Information */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-[#1B1F3B]">Contact Information</h3>
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
            />
            <div className="flex space-x-2">
              <div className="w-1/3">
                <Select<CountryOption>
                  options={countryOptions}
                  value={contactInfo.countryCode}
                  onChange={(option: SingleValue<CountryOption>) => 
                    option && setContactInfo({ ...contactInfo, countryCode: option })
                  }
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>
              <input
                type="tel"
                placeholder="Phone Number"
                required
                className="w-2/3 p-2 border border-gray-300 rounded"
                onChange={(e) => setContactInfo({ ...contactInfo, phoneNumber: e.target.value })}
              />
            </div>
          </div>

          {/* Application Questions */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-[#1B1F3B]">Application Questions</h3>
            {questions[position.department].map((question, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700">{question}</label>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00A3FF] focus:ring focus:ring-[#00A3FF] focus:ring-opacity-50"
                  rows={3}
                  required
                  onChange={(e) => setAnswers({ ...answers, [index]: e.target.value })}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-[#00A3FF] hover:bg-[#0082CC] text-white">Submit Application</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
