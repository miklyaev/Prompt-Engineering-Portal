import React from 'react';
import ProgressBar from '../components/ProgressBar';

const TestsPage: React.FC = () => {
  // В будущем эти данные будут приходить из состояния приложения или API
  const completedTests = 0;
  const totalTests = 10;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
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

      <div className="grid gap-6">
        {/* Здесь будут карточки с тестами */}
        <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-gray-200 rounded-2xl">
          <p className="text-gray-500">Список тестов скоро появится...</p>
        </div>
      </div>
    </div>
  );
};

export default TestsPage;
