import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LessonPlanInput } from '@/lib/types';
import { Wand2 } from 'lucide-react';

interface LessonPlanFormProps {
  onSubmit: (input: LessonPlanInput) => void;
  isLoading: boolean;
}

const subjects = [
  'Mathematics', 'English Language', 'Science', 'Social Studies', 'History',
  'Geography', 'Biology', 'Chemistry', 'Physics', 'Literature',
  'Computer Science', 'Art', 'Music', 'Physical Education'
];

const gradeLevels = [
  'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6',
  'JSS 1', 'JSS 2', 'JSS 3', 'SS 1', 'SS 2', 'SS 3'
];

export default function LessonPlanForm({ onSubmit, isLoading }: LessonPlanFormProps) {
  const [formData, setFormData] = useState<LessonPlanInput>({
    subject: '',
    gradeLevel: '',
    topic: '',
    duration: 40,
    learningObjective: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.subject && formData.gradeLevel && formData.topic) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof LessonPlanInput, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Wand2 className="w-5 h-5 text-blue-600" />
          <span>Create Your Lesson Plan</span>
        </CardTitle>
        <CardDescription>
          Fill in the details below and let AI generate a comprehensive lesson plan for you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gradeLevel">Grade Level *</Label>
              <Select value={formData.gradeLevel} onValueChange={(value) => handleInputChange('gradeLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade level" />
                </SelectTrigger>
                <SelectContent>
                  {gradeLevels.map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic">Lesson Topic *</Label>
            <Input
              id="topic"
              value={formData.topic}
              onChange={(e) => handleInputChange('topic', e.target.value)}
              placeholder="e.g., Introduction to Fractions, Photosynthesis, Nigerian Independence"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              value={formData.duration}
              onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 40)}
              min="15"
              max="120"
              placeholder="40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="learningObjective">Learning Objective (Optional)</Label>
            <Textarea
              id="learningObjective"
              value={formData.learningObjective}
              onChange={(e) => handleInputChange('learningObjective', e.target.value)}
              placeholder="What should students learn or be able to do after this lesson?"
              rows={3}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || !formData.subject || !formData.gradeLevel || !formData.topic}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            size="lg"
          >
            {isLoading ? (
              <>
                <Wand2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Your Lesson Plan...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Lesson Plan
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}