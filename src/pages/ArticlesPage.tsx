import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { articles } from '../data/articles';
import PracticeBlock from '../components/PracticeBlock';

const ArticlesPage: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    }
  }, [hash]);

  return (
    <div className="space-y-[34px]">
      <header className="pt-4 space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Статьи</h1>
        <p className="text-gray-500">Полные материалы с интерактивными проверками знаний.</p>
      </header>

      {articles.map((article, articleIndex) => (
        <article
          key={article.id}
          id={article.id}
          className="scroll-mt-20 bg-white rounded-2xl border border-gray-300 p-8 md:p-10 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              {String(articleIndex + 1).padStart(2, '0')}
            </span>
            <h2 className="text-2xl font-bold text-gray-900">{article.title}</h2>
          </div>

          <div className="space-y-5">
            {article.content.map((section, sectionIndex) => {
              if (section.type === 'text') {
                return (
                  <p key={sectionIndex} className="text-gray-700 leading-relaxed text-base indent-[20px]">
                    {section.text}
                  </p>
                );
              }
              if (section.type === 'practice' && section.question && section.options) {
                return (
                  <PracticeBlock
                    key={sectionIndex}
                    question={section.question}
                    options={section.options}
                    correctAnswer={section.correctAnswer ?? 0}
                  />
                );
              }
              return null;
            })}
          </div>
        </article>
      ))}
    </div>
  );
};

export default ArticlesPage;
