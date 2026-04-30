import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';
import { ArrowRight, Zap, BookOpen, Brain } from 'lucide-react';

const icons = [Brain, BookOpen, Zap];

const HomePage: React.FC = () => {
  return (
    <div className="space-y-[27px]">
      {/* Hero */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full">
          <Zap size={12} />
          Теория + Практика в одном месте
        </div>
        <h1 className="text-[36px] font-bold tracking-tight text-gray-900 leading-tight">
          Промпт-инжиниринг<br />
          <span className="text-blue-600">с нуля до профи</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
          Читайте статьи, сразу проверяйте понимание и двигайтесь дальше.
          Никакой воды — только практика.
        </p>
      </section>

      {/* Articles grid */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Статьи</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {articles.map((article, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={article.id}
                className="group bg-white rounded-2xl border border-gray-200/80 p-6 flex flex-col gap-4 hover:shadow-xl hover:shadow-blue-200/40 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Icon size={20} />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="font-semibold text-gray-900 text-base leading-snug group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
                <Link
                  to={`/articles#${article.id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Подробнее
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
