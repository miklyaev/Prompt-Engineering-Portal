import React, { useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import SingleChoice from '../components/SingleChoice';
import MultipleChoice from '../components/MultipleChoice';
import MatchPairs from '../components/MatchPairs';
import FillTheBlank from '../components/FillTheBlank';
import TrueFalse from '../components/TrueFalse';
import OrderSteps from '../components/OrderSteps';
import testsData from '../data/tests.json';

const TestsPage: React.FC = () => {
  const [completedTests, setCompletedTests] = useState<Record<string, boolean>>({});

  const handleTestComplete = (id: string, isCorrect: boolean) => {
    setCompletedTests(prev => ({
      ...prev,
      [id]: isCorrect
    }));
  };

  const totalTests = testsData.simpleTests.length;
  const correctCount = Object.values(completedTests).filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Тестирование</h1>
        <p className="text-gray-600">
          Проверьте свои знания в области промпт-инжиниринга. Пройдите все тесты, чтобы закрепить материал.
        </p>
      </header>

      <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <ProgressBar
          current={correctCount}
          total={totalTests}
          label="Общий прогресс тестов"
        />
      </section>

      <section className="bg-white border border-gray-300 rounded-2xl p-8 space-y-8 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Простые тесты проверяют запоминание</h2>
          <p className="text-gray-500 mt-1">Базовые понятия и определения промпт-инжиниринга.</p>
        </div>

        <div className="grid gap-12">
          {testsData.simpleTests.map((test, index) => {
            const renderTest = () => {
              const commonProps = {
                key: test.id,
                className: "my-0",
                onComplete: (isCorrect: boolean) => handleTestComplete(test.id, isCorrect)
              };

              if (test.type === 'single-choice') {
                return (
                  <SingleChoice
                    {...commonProps}
                    question={test.question}
                    options={test.options as string[]}
                    correctAnswer={test.correctAnswer as number}
                  />
                );
              }

              if (test.type === 'multiple-choice') {
                return (
                  <MultipleChoice
                    {...commonProps}
                    question={test.question}
                    options={test.options as string[]}
                    correctAnswers={test.correctAnswers!}
                  />
                );
              }
              if (test.type === 'match-pairs') {
                return (
                  <MatchPairs
                    {...commonProps}
                    question={test.question}
                    leftItems={test.leftItems!}
                    rightItems={test.rightItems!}
                    correctMapping={test.correctMapping!}
                  />
                );
              }

              if (test.type === 'fill-the-blank') {
                return (
                  <FillTheBlank
                    {...commonProps}
                    question={test.question}
                    correctAnswer={test.correctAnswer as string}
                  />
                );
              }

              if (test.type === 'true-false') {
                return (
                  <TrueFalse
                    {...commonProps}
                    question={test.question}
                    correctAnswer={test.correctAnswer as boolean}
                    explanation={test.explanation!}
                  />
                );
              }

              if (test.type === 'order-steps') {
                return (
                  <OrderSteps
                    {...commonProps}
                    question={test.question}
                    steps={test.steps!}
                    correctOrder={test.correctOrder!}
                  />
                );
              }
              return null;
            };

            return (
              <div key={test.id} className="space-y-4">
                <div className="flex justify-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                    Тест {index + 1}
                  </span>
                </div>
                {renderTest()}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default TestsPage;
