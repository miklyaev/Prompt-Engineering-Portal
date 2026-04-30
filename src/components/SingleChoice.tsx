import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface SingleChoiceProps {
  question: string;
  options: string[];
  correctAnswer: number;
  onSelect?: (index: number) => void;
  onComplete?: (isCorrect: boolean) => void;
  className?: string;
}

const SingleChoice: React.FC<SingleChoiceProps> = ({
  question,
  options,
  correctAnswer,
  onSelect,
  onComplete,
  className = "my-8",
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const isCorrect = selected === correctAnswer;

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);

    const correct = index === correctAnswer;

    if (onSelect) {
      onSelect(index);
    }

    if (onComplete) {
      onComplete(correct);
    }
  };

  const handleReset = () => {
    setSelected(null);
    if (onComplete) {
      onComplete(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelect(index);
    }
  };

  return (
    <div className={`${className} bg-blue-50 border border-blue-100 rounded-2xl p-6 space-y-4`}>
      <div className="flex items-start gap-3">
        <HelpCircle size={20} className="text-blue-500 mt-0.5 shrink-0" />
        <p className="font-semibold text-gray-800 text-base leading-snug">{question}</p>
      </div>

      <div className="space-y-2" role="radiogroup" aria-label={question}>
        {options.map((option, index) => {
          const isCurrentCorrect = index === correctAnswer;
          const isCurrentSelected = index === selected;

          let style = 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer';

          if (answered) {
            if (isCurrentCorrect) {
              style = 'border-green-400 bg-green-50 text-green-800 cursor-default';
            } else if (isCurrentSelected) {
              style = 'border-red-400 bg-red-50 text-red-800 cursor-default';
            } else {
              style = 'border-gray-200 bg-white text-gray-400 cursor-default opacity-60';
            }
          }

          return (
            <div
              key={index}
              role="radio"
              aria-checked={isCurrentSelected}
              tabIndex={answered ? -1 : 0}
              onClick={() => handleSelect(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-150 flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${style}`}
            >
              <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center shrink-0 text-xs font-bold">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1">{option}</span>
              {answered && isCurrentCorrect && (
                <CheckCircle size={16} className="ml-auto text-green-500 shrink-0" />
              )}
              {answered && isCurrentSelected && !isCurrentCorrect && (
                <XCircle size={16} className="ml-auto text-red-500 shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      {answered && (
        <div className="flex items-center justify-between pt-2">
          <p className={`text-sm font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {isCorrect ? '✓ Верно! Отличная работа.' : '✗ Не совсем. Правильный ответ выделен зелёным.'}
          </p>
          <button
            onClick={handleReset}
            className="text-xs text-blue-600 hover:text-blue-800 underline underline-offset-2 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1"
            aria-label="Попробовать снова"
          >
            Попробовать снова
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleChoice;
