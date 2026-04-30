const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
	fs.writeFileSync(filePath, content, 'utf8');
	console.log('OK:', filePath);
};

// ─── articles.ts ───────────────────────────────────────────────────────────────
write('src/data/articles.ts', `export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: ArticleSection[];
}

export interface ArticleSection {
  type: 'text' | 'practice';
  text?: string;
  question?: string;
  options?: string[];
  correctAnswer?: number;
}

export const articles: Article[] = [
  {
    id: 'how-llms-work',
    title: 'Как работают LLM',
    excerpt:
      'Разберитесь в архитектуре трансформеров и процессе предсказания следующего токена.',
    content: [
      {
        type: 'text',
        text: 'Large Language Models (LLM) — это нейронные сети, обученные на гигантских массивах текста. В их основе лежит архитектура Transformer, которая позволяет модели понимать контекст через механизм внимания (Attention). Представьте, что модель читает текст и подсвечивает самые важные слова, чтобы понять смысл предложения.',
      },
      {
        type: 'text',
        text: 'Токен — это не слово, а фрагмент текста. Слово «нейросеть» может быть разбито на несколько токенов. Модель предсказывает следующий токен, опираясь на все предыдущие. Именно поэтому длинный и детальный контекст в промпте даёт лучшие результаты.',
      },
      {
        type: 'practice',
        question: 'Что является основной задачей LLM при генерации текста?',
        options: [
          'Копирование текста из базы данных',
          'Предсказание наиболее вероятного следующего токена',
          'Проверка орфографии',
          'Поиск информации в интернете',
        ],
        correctAnswer: 1,
      },
      {
        type: 'text',
        text: 'Процесс обучения заключается в минимизации ошибки при предсказании скрытого слова. Модель не знает факты в привычном нам смысле — она оперирует статистическими вероятностями появления символов и слов в определённом контексте. Именно поэтому она может звучать очень убедительно, даже если ошибается.',
      },
      {
        type: 'text',
        text: 'Механизм внимания (Self-Attention) позволяет модели при обработке каждого слова учитывать все остальные слова в тексте. Это принципиально отличает трансформеры от старых рекуррентных сетей, которые читали текст последовательно и «забывали» начало длинных предложений.',
      },
      {
        type: 'practice',
        question: 'Что такое токен в контексте LLM?',
        options: [
          'Всегда одно слово',
          'Фрагмент текста: часть слова, слово или знак препинания',
          'Секретный ключ доступа к модели',
          'Единица измерения скорости работы модели',
        ],
        correctAnswer: 1,
      },
      {
        type: 'text',
        text: 'Обучение LLM проходит в два этапа: предобучение на огромных корпусах текста (pre-training) и тонкая настройка под конкретные задачи (fine-tuning). На этапе RLHF (Reinforcement Learning from Human Feedback) модель дополнительно обучается давать ответы, которые люди оценивают как полезные и безопасные.',
      },
    ],
  },
  {
    id: 'hallucinations',
    title: 'Галлюцинации — что это и как распознавать',
    excerpt:
      'Почему нейросети врут с уверенным видом и как минимизировать риск дезинформации.',
    content: [
      {
        type: 'text',
        text: 'Галлюцинация в LLM — это генерация контента, который является фактически неверным или бессмысленным, но представлен грамматически правильно и уверенно. Это происходит потому, что модель — статистический генератор текста, а не база данных с проверенными фактами.',
      },
      {
        type: 'text',
        text: 'Классический пример: попросите модель назвать источники по узкой теме. Она с лёгкостью придумает несуществующие статьи с реальными именами авторов и правдоподобными названиями журналов. Всё выглядит убедительно, но при проверке оказывается выдумкой.',
      },
      {
        type: 'practice',
        question: 'Почему возникают галлюцинации?',
        options: [
          'Модель пытается быть максимально полезной, даже если не знает ответа',
          'У модели закончилась оперативная память',
          'Модель специально обманывает пользователя',
          'Это происходит только при плохом интернет-соединении',
        ],
        correctAnswer: 0,
      },
      {
        type: 'text',
        text: 'Галлюцинации чаще возникают в следующих ситуациях: запросы о малоизвестных фактах, просьбы назвать конкретные числа или даты, вопросы о событиях после даты обучения модели, а также запросы на генерацию ссылок и цитат.',
      },
      {
        type: 'text',
        text: 'Для борьбы с галлюцинациями используют техники RAG (Retrieval Augmented Generation) — модель получает доступ к проверенной базе знаний перед ответом. Также помогают чёткие инструкции в промпте: «Если ты не знаешь ответа, честно скажи об этом».',
      },
      {
        type: 'practice',
        question: 'Какая техника помогает снизить галлюцинации, предоставляя модели проверенные данные?',
        options: [
          'Fine-tuning',
          'RAG (Retrieval Augmented Generation)',
          'Увеличение температуры генерации',
          'Использование более длинных промптов',
        ],
        correctAnswer: 1,
      },
      {
        type: 'text',
        text: 'Практическое правило: всегда проверяйте критически важные факты, предоставленные нейросетью. Используйте LLM как умного помощника для генерации идей и черновиков, но не как энциклопедию. Чем более специфичен и редок факт — тем выше вероятность галлюцинации.',
      },
    ],
  },
  {
    id: 'role-context-constraints',
    title: 'Роль, контекст, ограничения',
    excerpt:
      'Золотой стандарт промпт-инжиниринга: как правильно задать рамки для идеального ответа.',
    content: [
      {
        type: 'text',
        text: 'Эффективный промпт обычно состоит из трёх китов: Роль (кто модель?), Контекст (зачем это нужно?) и Ограничения (как именно это сделать?). Это превращает общие ответы в профессиональные инструменты, заточенные под вашу задачу.',
      },
      {
        type: 'text',
        text: 'Роль — это персонаж или экспертиза, которую вы назначаете модели. Например: «Ты — опытный UX-дизайнер с 10-летним стажем». Это активирует специфические паттерны в весах модели и значительно повышает качество специализированных ответов.',
      },
      {
        type: 'practice',
        question: 'Какой элемент промпта отвечает за стиль и тон ответов?',
        options: [
          'Ограничения',
          'Роль',
          'Контекст',
          'Длина текста',
        ],
        correctAnswer: 1,
      },
      {
        type: 'text',
        text: 'Контекст — это информация о ситуации, аудитории и цели. Чем больше релевантного контекста вы предоставите, тем точнее будет ответ. Плохо: «Напиши письмо». Хорошо: «Напиши деловое письмо клиенту, который недоволен задержкой доставки. Тон — извиняющийся, но уверенный. Аудитория — B2B сегмент».',
      },
      {
        type: 'text',
        text: 'Ограничения — это правила, которым должен следовать ответ. Они могут касаться формата (список, таблица, JSON), длины (не более 200 слов), стиля (без технического жаргона), содержания (только факты, без мнений) или структуры (обязательно включи примеры).',
      },
      {
        type: 'practice',
        question: 'Какой из следующих промптов является наиболее эффективным?',
        options: [
          'Объясни мне машинное обучение',
          'Ты — преподаватель университета. Объясни концепцию машинного обучения студенту первого курса без технических терминов, используя 3 аналогии из повседневной жизни. Ответ не более 300 слов.',
          'Расскажи про ML подробно',
          'Что такое машинное обучение? Дай полный ответ',
        ],
        correctAnswer: 1,
      },
      {
        type: 'text',
        text: 'Итоговая формула эффективного промпта: [Роль] + [Контекст задачи] + [Конкретное задание] + [Ограничения формата] + [Пример желаемого результата (опционально)]. Практикуйтесь итеративно: начните с базового промпта и улучшайте его, добавляя элементы по одному.',
      },
    ],
  },
];
`);

// ─── Layout.tsx ────────────────────────────────────────────────────────────────
write('src/components/Layout.tsx', `import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layers, BookOpen, PenTool, Home } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Главная', icon: Home },
  { path: '/articles', label: 'Статьи', icon: BookOpen },
  { path: '/tests', label: 'Тесты', icon: PenTool },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-[#1c1c1c] font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/75 backdrop-blur-xl border-b border-black/5 h-14 flex items-center">
        <div className="max-w-5xl w-full mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5 font-semibold text-base">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Layers size={15} />
            </div>
            <span className="text-gray-900">PromptEdu</span>
          </div>

          {/* Nav links */}
          <div className="flex gap-0.5 bg-black/5 p-1 rounded-xl">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={\`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 \${
                    isActive
                      ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-white/60'
                  }\`}
                >
                  <Icon size={15} />
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Page content */}
      <main className="pt-20 pb-16 px-6 max-w-5xl mx-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
`);

// ─── PracticeBlock.tsx ─────────────────────────────────────────────────────────
write('src/components/PracticeBlock.tsx', `import React, { useState } from 'react';
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
              className={\`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-150 flex items-center gap-3 \${style}\`}
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
        <div className={\`flex items-center justify-between pt-2 \`}>
          <p className={\`text-sm font-medium \${isCorrect ? 'text-green-700' : 'text-red-700'}\`}>
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
`);

// ─── HomePage.tsx ──────────────────────────────────────────────────────────────
write('src/pages/HomePage.tsx', `import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';
import { ArrowRight, Zap, BookOpen, Brain } from 'lucide-react';

const icons = [Brain, BookOpen, Zap];

const HomePage: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="pt-6 space-y-4">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full">
          <Zap size={12} />
          Теория + Практика в одном месте
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 leading-tight">
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
                className="group bg-white rounded-2xl border border-gray-200/80 p-6 flex flex-col gap-4 hover:shadow-lg hover:shadow-blue-100/50 hover:-translate-y-0.5 transition-all duration-200"
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
                  to={\`/articles#\${article.id}\`}
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
`);

// ─── ArticlesPage.tsx ──────────────────────────────────────────────────────────
write('src/pages/ArticlesPage.tsx', `import React, { useEffect } from 'react';
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
    <div className="space-y-16">
      <header className="pt-4 space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Статьи</h1>
        <p className="text-gray-500">Полные материалы с интерактивными проверками знаний.</p>
      </header>

      {articles.map((article, articleIndex) => (
        <article
          key={article.id}
          id={article.id}
          className="scroll-mt-20 bg-white rounded-2xl border border-gray-200/80 p-8 md:p-10 shadow-sm"
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
                  <p key={sectionIndex} className="text-gray-700 leading-relaxed text-base">
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
`);

// ─── TestsPage.tsx ─────────────────────────────────────────────────────────────
write('src/pages/TestsPage.tsx', `import React from 'react';
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
`);

// ─── App.tsx ───────────────────────────────────────────────────────────────────
write('src/App.tsx', `import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ArticlesPage from './pages/ArticlesPage';
import TestsPage from './pages/TestsPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/tests" element={<TestsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
`);

console.log('All files written successfully!');
