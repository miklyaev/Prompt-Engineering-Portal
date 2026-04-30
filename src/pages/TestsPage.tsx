import React from 'react';
import ProgressBar from '../components/ProgressBar';
import SingleChoice from '../components/SingleChoice';
import MultipleChoice from '../components/MultipleChoice';
import MatchPairs from '../components/MatchPairs';
import FillTheBlank from '../components/FillTheBlank';
import testsData from '../data/tests.json';
const TestsPage: React.FC = () => {
  // В будущем эти данные будут приходить из состояния приложения или API
  const completedTests = 0;
  const totalTests = 10;

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
          current={completedTests}
          total={totalTests}
          label="Общий прогресс тестов"
        />
      </section>

      <section className="bg-white border border-gray-300 rounded-2xl p-8 space-y-8 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Простые тесты проверяют запоминание</h2>
          <p className="text-gray-500 mt-1">Базовые понятия и определения промпт-инжиниринга.</p>
        </div>

        <div className="grid gap-6">          {testsData.simpleTests.map((test) => {
          if (test.type === 'single-choice') {
            return (
              <SingleChoice
                key={test.id}
                question={test.question}
                options={test.options}
                correctAnswer={test.correctAnswer!}
                className="my-0"
              />
            );
          }

          if (test.type === 'multiple-choice') {
            return (
              <MultipleChoice
                key={test.id}
                question={test.question}
                options={test.options}
                correctAnswers={test.correctAnswers!}
                className="my-0"
              />
            );
          }

          if (test.type === 'match-pairs') {
            return (
              <MatchPairs
                key={test.id}
                question={test.question}
                leftItems={test.leftItems!}
                rightItems={test.rightItems!}
                correctMapping={test.correctMapping!}
                className="my-0"
              />
            );
          }

          if (test.type === 'fill-the-blank') {
            return (
              <FillTheBlank
                key={test.id}
                question={test.question}
                correctAnswer={test.correctAnswer as string}
                className="my-0"
              />
            );
          }
          return null;
        })}
        </div>
      </section>
    </div>
  );
};

export default TestsPage;
