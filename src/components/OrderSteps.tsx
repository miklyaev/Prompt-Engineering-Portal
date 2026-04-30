import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle, XCircle, RefreshCw, GripVertical } from 'lucide-react';

interface OrderStepsProps {
  question: string;
  steps: string[];
  correctOrder: string[];
  onComplete?: (isCorrect: boolean) => void;
  className?: string;
}

const OrderSteps: React.FC<OrderStepsProps> = ({
  question,
  steps,
  correctOrder,
  onComplete,
  className = "my-8",
}) => {
  const [currentOrder, setCurrentOrder] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Перемешиваем шаги при инициализации
    setCurrentOrder([...steps].sort(() => Math.random() - 0.5));
  }, [steps]);

  const handleMoveUp = (index: number) => {
    if (isSubmitted || index === 0) return;
    const newOrder = [...currentOrder];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    setCurrentOrder(newOrder);
  };

  const handleMoveDown = (index: number) => {
    if (isSubmitted || index === currentOrder.length - 1) return;
    const newOrder = [...currentOrder];
    [newOrder[index + 1], newOrder[index]] = [newOrder[index], newOrder[index + 1]];
    setCurrentOrder(newOrder);
  };

  const handleReset = () => {
    setCurrentOrder([...steps].sort(() => Math.random() - 0.5));
    setIsSubmitted(false);
    if (onComplete) {
      onComplete(false);
    }
  };

  const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(correctOrder);

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (onComplete) {
      onComplete(isCorrect);
    }
  };

  return (
    <div className={`${className} bg-blue-50 border border-blue-100 rounded-2xl p-6 space-y-6`}>
      <div className="flex items-start gap-3">
        <HelpCircle size={20} className="text-blue-500 mt-0.5 shrink-0" />
        <div className="space-y-1">
          <p className="font-semibold text-gray-800 text-base leading-snug">{question}</p>
          <p className="text-xs text-blue-600 font-medium uppercase tracking-wider">Расставьте шаги в правильном порядке</p>
        </div>
      </div>

      <div className="space-y-3">
        {currentOrder.map((step, index) => {
          const isStepInCorrectPlace = isSubmitted && step === correctOrder[index];
          const isStepInWrongPlace = isSubmitted && step !== correctOrder[index];

          let stateStyle = 'border-gray-200 bg-white text-gray-700';
          if (isStepInCorrectPlace) stateStyle = 'border-green-500 bg-green-50 text-green-800';
          if (isStepInWrongPlace) stateStyle = 'border-red-500 bg-red-50 text-red-800';

          return (
            <div
              key={step}
              className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${stateStyle}`}
            >
              <div className="flex flex-col gap-1 shrink-0">
                {!isSubmitted && (
                  <>
                    <button
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className="p-1 hover:bg-blue-100 rounded disabled:opacity-30"
                      aria-label="Переместить вверх"
                    >
                      <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleMoveDown(index)}
                      disabled={index === currentOrder.length - 1}
                      className="p-1 hover:bg-blue-100 rounded disabled:opacity-30"
                      aria-label="Переместить вниз"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </>
                )}
                {isSubmitted && (
                  <div className="w-6 h-6 flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                )}
              </div>

              <GripVertical size={20} className="text-gray-300 shrink-0" />

              <span className="flex-1 text-sm">{step}</span>

              {isStepInCorrectPlace && <CheckCircle size={18} className="text-green-500 shrink-0" />}
              {isStepInWrongPlace && <XCircle size={18} className="text-red-500 shrink-0" />}
            </div>
          );
        })}
      </div>

      {!isSubmitted ? (
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-sm"
        >
          Проверить порядок
        </button>
      ) : (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className={`text-sm font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {isCorrect ? '✓ Отлично! Порядок верный.' : '✗ Порядок не совсем верный.'}
          </p>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800 underline underline-offset-2 focus:outline-none"
          >
            <RefreshCw size={14} />
            Попробовать снова
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderSteps;
