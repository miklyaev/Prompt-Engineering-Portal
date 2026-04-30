import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface PracticeBlockProps {
  question: string;
  options: string[];
  correctAnswer: number;
}

const PracticeBlock: React.FC<PracticeBlockProps> = ({ question, options, correctAnswer }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const isCorrect = selected === correctAnswer;

  const handleSelect = (index: number) => {
    if (!answered) setSelected(index);
  };

  const handleReset = () => setSelected(null);

  return (
    <div className="my-8 bg-blue-50 border border-blue-100 rounded-2xl p-6 space-y-4">
      <div className="flex items-start gap-3">
        <HelpCircle size={20} className="text-blue-500 mt-0.5 shrink-0" />
        <p className="font-semibold text-gray-800 text-base leading-snug">{question}</p>
      </div>

      <div className="space-y-2">
        {options.map((option, index) => {
          let style = 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer';
          if (answered) {
            if (index === correctAnswer) {
              style = 'border-green-400 bg-green-50 text-green-800 cursor-default';
            } else if (index === selected) {
              style = 'border-red-400 bg-red-50 text-red-800 cursor-default';
            } else {
              style = 'border-gray-200 bg-white text-gray-400 cursor-default opacity-60';
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-150 flex items-center gap-3 ${style}`}
            >
              <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center shrink-0 text-xs font-bold">
                {String.fromCharCode(65 + index)}
              </span>
              {option}
              {answered && index === correctAnswer && (
                <CheckCircle size={16} className="ml-auto text-green-500 shrink-0" />
              )}
              {answered && index === selected && index !== correctAnswer && (
                <XCircle size={16} className="ml-auto text-red-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className={`flex items-center justify-between pt-2 `}>
          <p className={`text-sm font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {isCorrect ? '✓ Верно! Отличная работа.' : '✗ Не совсем. Правильный ответ выделен зелёным.'}
          </p>
          <button
            onClick={handleReset}
            className="text-xs text-blue-600 hover:text-blue-800 underline underline-offset-2"
          >
            Попробовать снова
          </button>
        </div>
      )}
    </div>
  );
};

export default PracticeBlock;
