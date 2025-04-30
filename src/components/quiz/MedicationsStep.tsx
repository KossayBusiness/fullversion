import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';
import { SimpleHelpfulTips } from './HelpfulTipsSection';

interface MedicationsStepProps {
  medications: string[];
  onMedicationsChange: (medications: string[]) => void;
}

const MedicationsStep: React.FC<MedicationsStepProps> = ({ medications = [], onMedicationsChange }) => {
  const [newMedication, setNewMedication] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);

  // Common medications for autocomplete suggestions
  const commonMedications = [
    'Levothyroxine',
    'Lisinopril',
    'Metformin',
    'Atorvastatin',
    'Amlodipine',
    'Metoprolol',
    'Omeprazole',
    'Simvastatin',
    'Losartan',
    'Albuterol'
  ];

  const handleAddMedication = () => {
    if (!newMedication.trim()) {
      setInputError('Please enter a medication');
      return;
    }

    setInputError(null);
    const updatedMedications = [...medications, newMedication.trim()];
    onMedicationsChange(updatedMedications);
    setNewMedication('');
  };

  const handleRemoveMedication = (index: number) => {
    const updatedMedications = [...medications];
    updatedMedications.splice(index, 1);
    onMedicationsChange(updatedMedications);
  };

  const handleSelectSuggestion = (medication: string) => {
    if (!medications.includes(medication)) {
      const updatedMedications = [...medications, medication];
      onMedicationsChange(updatedMedications);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Current Medications</h2>
        <p className="text-gray-600 mb-4">
          If you are taking any medications, please indicate them below to ensure our recommendations do not interfere with your treatment.
        </p>

        <div className="flex gap-2 mb-4">
          <div className="flex-1">
            <Input 
              value={newMedication} 
              onChange={(e) => setNewMedication(e.target.value)}
              placeholder="Enter a medication" 
              className={inputError ? "border-red-500" : ""}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddMedication();
                }
              }}
            />
            {inputError && <p className="text-red-500 text-sm mt-1">{inputError}</p>}
          </div>
          <Button onClick={handleAddMedication}>Add</Button>
        </div>

        {medications && medications.length > 0 ? (
          <div className="mb-4">
            <Label className="mb-2 block">Added medications:</Label>
            <div className="flex flex-wrap gap-2">
              {medications.map((medication, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-2 flex items-center gap-2">
                  {medication}
                  <X 
                    size={14} 
                    className="cursor-pointer hover:text-red-500" 
                    onClick={() => handleRemoveMedication(index)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic mb-4">
            No medications added. If you don't take any, you can proceed to the next step.
          </p>
        )}

        <Card className="mt-4">
          <CardContent className="pt-4">
            <Label className="mb-2 block">Suggestions:</Label>
            <div className="flex flex-wrap gap-2">
              {commonMedications.map((medication) => (
                <Badge 
                  key={medication} 
                  variant="outline" 
                  className={`
                    cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors 
                    ${medications.includes(medication) ? 'bg-primary text-primary-foreground' : ''}
                  `}
                  onClick={() => handleSelectSuggestion(medication)}
                >
                  {medication}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <SimpleHelpfulTips 
        title="Why this information is important"
        tips={[
          "Some supplements may interact with medications",
          "We will customize our recommendations based on your treatments",
          "This information remains strictly confidential"
        ]}
      />
    </div>
  );
};

export { MedicationsStep };
export default MedicationsStep;