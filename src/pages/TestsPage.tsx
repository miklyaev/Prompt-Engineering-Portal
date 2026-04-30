import React from 'react';
import { PenTool } from 'lucide-react';

const TestsPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
        <PenTool size={32} />
      </div>
      <h1 className="text-2xl font-bold text-gray-800">Тесты</h1>
      <p className="text-gray-500 max-w-sm">
        Раздел находится в разработке. Скоро здесь появятся интерактивные тесты для проверки знаний.
      </p>
      <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-200">
        Скоро
      </span>
    </div>
  );
};

export default TestsPage;
