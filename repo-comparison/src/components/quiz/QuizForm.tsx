import React from 'react';
import ScientificHighlightedText from './ScientificHighlightedText'; 
import Badge from 'react-bootstrap/Badge'; 


function QuizForm({ question, currentStep, totalSteps, currentResponse, handleResponseChange, handleSubmit }) {
  return (
    <form
      className="quiz-form bg-white rounded-xl p-6 md:p-8 shadow-md border border-gray-200 transition-opacity"
      onSubmit={handleSubmit}
    >
      {/* Title with indicator */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900">{question.title}</h2>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Question {currentStep}/{totalSteps}
        </Badge>
      </div>

      {/* Description */}
      {question.description && (
        <p className="text-gray-600 mb-6">
          <ScientificHighlightedText text={question.description} />
        </p>
      )}

      {/* Radio buttons */}
      {question.type === 'single' && (
        <div className="space-y-4 mb-8">
          {question.options.map((option) => (
            <div
              key={option.value}
              className={`flex items-start p-4 md:p-5 border rounded-lg cursor-pointer transition-all
                ${
                  currentResponse === option.value
                    ? 'border-indigo-400 bg-indigo-50 ring-1 ring-indigo-400'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
              onClick={() => handleResponseChange(option.value)}
            >
              <div className="flex-shrink-0 mt-0.5">
                <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                  currentResponse === option.value 
                    ? 'border-indigo-600 bg-indigo-600' 
                    : 'border-gray-300'
                }`}>
                  {currentResponse === option.value && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
              </div>
              <label
                htmlFor={`${question.id}-${option.value}`}
                className="ml-3 block cursor-pointer flex-1"
              >
                <span className="font-medium text-gray-900 block mb-1">{option.label}</span>
                {option.description && (
                  <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                )}
              </label>
              <input
                type="radio"
                name={question.id}
                id={`${question.id}-${option.value}`}
                value={option.value}
                checked={currentResponse === option.value}
                onChange={() => handleResponseChange(option.value)}
                className="sr-only"
              />
            </div>
          ))}
        </div>
      )}
      {/*Add submit button here if needed*/}
      <button type="submit">Submit</button>


    </form>
  );
}

export default QuizForm;