import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

interface Pair {
  id: string;
  text: string;
}

interface MatchPairsProps {
  question: string;
  leftItems: Pair[];
  rightItems: Pair[];
  correctMapping: Record<string, string>; // leftId -> rightId
  onComplete?: (isCorrect: boolean) => void;
  className?: string;
}

const MatchPairs: React.FC<MatchPairsProps> = ({
  question,
  leftItems,
  rightItems,
  correctMapping,
  onComplete,
  className = "my-8",
}) => {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [shuffledRight, setShuffledRight] = useState<Pair[]>([]);

  useEffect(() => {
    setShuffledRight([...rightItems].sort(() => Math.random() - 0.5));
  }, [rightItems]);

  const handleLeftClick = (id: string) => {
    if (isSubmitted) return;
    setSelectedLeft(id === selectedLeft ? null : id);
  };

  const handleRightClick = (rightId: string) => {
    if (isSubmitted || !selectedLeft) return;

    const newMatches = { ...matches };
    // Если этот правый элемент уже был соединен, удаляем старую связь
    Object.keys(newMatches).forEach(key => {
      if (newMatches[key] === rightId) delete newMatches[key];
    });

    newMatches[selectedLeft] = rightId;
    setMatches(newMatches);
    setSelectedLeft(null);
  };

  const handleReset = () => {
    setMatches({});
    setSelectedLeft(null);
    setIsSubmitted(false);
    setShuffledRight([...rightItems].sort(() => Math.random() - 0.5));
    if (onComplete) {
      onComplete(false);
    }
  };

  const isAllCorrect = Object.entries(matches).every(
    ([leftId, rightId]) => correctMapping[leftId] === rightId
  ) && Object.keys(matches).length === leftItems.length;

  const handleSubmit = () => {
    if (Object.keys(matches).length === leftItems.length) {
      setIsSubmitted(true);
      if (onComplete) {
        onComplete(isAllCorrect);
      }
    }
  };

  return (
    <div className={`${className} bg-blue-50 border border-blue-100 rounded-2xl p-6 space-y-6`}>
      <div className="flex items-start gap-3">
        <HelpCircle size={20} className="text-blue-500 mt-0.5 shrink-0" />
        <div className="space-y-1">
          <p className="font-semibold text-gray-800 text-base leading-snug">{question}</p>
          <p className="text-xs text-blue-600 font-medium uppercase tracking-wider">Сопоставьте элементы из двух колонок</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        {/* Левая колонка */}
        <div className="space-y-3">
          {leftItems.map((item) => {
            const matchedRightId = matches[item.id];
            const isCorrect = isSubmitted && matchedRightId && correctMapping[item.id] === matchedRightId;
            const isWrong = isSubmitted && matchedRightId && correctMapping[item.id] !== matchedRightId;

            let stateStyle = 'border-gray-200 bg-white text-gray-700 hover:border-blue-300';

            if (selectedLeft === item.id) {
              stateStyle = 'border-blue-500 bg-blue-100 text-blue-700 shadow-sm';
            } else if (isSubmitted) {
              if (isCorrect) {
                stateStyle = 'border-green-500 bg-green-50 text-green-800';
              } else if (isWrong) {
                stateStyle = 'border-red-500 bg-red-50 text-red-800';
              }
            } else if (matchedRightId) {
              stateStyle = 'border-green-200 bg-green-50 text-green-700';
            }

            return (
              <button
                key={item.id}
                onClick={() => handleLeftClick(item.id)}
                disabled={isSubmitted}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-200 focus:outline-none ring-offset-2 focus:ring-2 focus:ring-blue-500 ${stateStyle} ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span>{item.text}</span>
                  {matchedRightId && !isSubmitted && <div className="w-2 h-2 rounded-full bg-green-500" />}
                  {isCorrect && <CheckCircle size={16} className="text-green-500 shrink-0" />}
                  {isWrong && <XCircle size={16} className="text-red-500 shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Правая колонка */}
        <div className="space-y-3">
          {shuffledRight.map((item) => {
            const matchedLeftId = Object.keys(matches).find(key => matches[key] === item.id);
            const isCorrect = isSubmitted && matchedLeftId && correctMapping[matchedLeftId] === item.id;
            const isWrong = isSubmitted && matchedLeftId && correctMapping[matchedLeftId] !== item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleRightClick(item.id)}
                disabled={isSubmitted}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-200 focus:outline-none ring-offset-2 focus:ring-2 focus:ring-blue-500 ${matchedLeftId
                  ? isCorrect
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : isWrong
                      ? 'border-red-500 bg-red-50 text-red-800'
                      : 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                  } ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex-1">{item.text}</span>
                  {isCorrect && <CheckCircle size={16} className="text-green-500 shrink-0" />}
                  {isWrong && <XCircle size={16} className="text-red-500 shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {!isSubmitted ? (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(matches).length !== leftItems.length}
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          Проверить пары
        </button>
      ) : (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className={`text-sm font-medium ${isAllCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {isAllCorrect ? '✓ Отлично! Все пары сопоставлены верно.' : '✗ Есть ошибки в сопоставлении.'}
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

export default MatchPairs;
