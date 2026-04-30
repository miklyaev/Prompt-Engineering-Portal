import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

interface FillTheBlankProps {
	question: string;
	correctAnswer: string | string[];
	className?: string;
}

const FillTheBlank: React.FC<FillTheBlankProps> = ({
	question,
	correctAnswer,
	className = "my-8",
}) => {
	const [userInput, setUserInput] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);

	const checkCorrectness = () => {
		const input = userInput.trim().toLowerCase();
		if (Array.isArray(correctAnswer)) {
			return correctAnswer.some(ans => ans.toLowerCase() === input);
		}
		return input === correctAnswer.toLowerCase();
	};

	const isCorrect = checkCorrectness();

	const parts = question.split('______');

	const handleSubmit = (e?: React.FormEvent) => {
		if (e) e.preventDefault();
		if (isSubmitted || !userInput.trim()) return;
		setIsSubmitted(true);
	};

	const handleReset = () => {
		setUserInput('');
		setIsSubmitted(false);
	};

	const displayAnswer = Array.isArray(correctAnswer) ? correctAnswer[0] : correctAnswer;

	return (
		<div className={cn("bg-blue-50 border border-blue-100 rounded-2xl p-6 space-y-4 shadow-sm", className)}>
			<div className="flex items-start gap-3">
				<HelpCircle size={20} className="text-blue-500 mt-0.5 shrink-0" />
				<div className="font-semibold text-gray-800 text-base leading-relaxed">
					{parts[0]}
					<form onSubmit={handleSubmit} className="inline-block mx-2">
						<input
							type="text"
							value={userInput}
							onChange={(e) => !isSubmitted && setUserInput(e.target.value)}
							disabled={isSubmitted}
							placeholder="Введите слово..."
							className={cn(
								"border-b-2 px-2 py-0.5 outline-none transition-colors text-center font-bold placeholder:text-[0.5em]",
								!isSubmitted && "border-blue-300 focus:border-blue-600 bg-white/50",
								isSubmitted && isCorrect && "border-green-500 text-green-600 bg-green-50",
								isSubmitted && !isCorrect && "border-red-500 text-red-600 bg-red-50"
							)}
							style={{ width: `${Math.max(displayAnswer.length + 2, 10)}ch` }}
						/>
					</form>
					{parts[1]}
				</div>
			</div>

			{!isSubmitted ? (
				<div className="flex justify-end pt-2">
					<button
						onClick={() => handleSubmit()}
						disabled={!userInput.trim()}
						className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
					>
						Проверить
					</button>
				</div>
			) : (
				<div className="flex items-center justify-between pt-2">
					<AnimatePresence mode="wait">
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							className={cn(
								"flex items-center gap-2 text-sm font-medium",
								isCorrect ? "text-green-700" : "text-red-700"
							)}
						>
							{isCorrect ? (
								<>
									<CheckCircle size={16} />
									<span>✓ Верно! Отличная работа.</span>
								</>
							) : (
								<>
									<XCircle size={16} />
									<span>✗ Неправильно.</span>
								</>
							)}						</motion.div>
					</AnimatePresence>
					<button
						onClick={handleReset}
						className="text-xs text-blue-600 hover:text-blue-800 underline underline-offset-2 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1"
						aria-label="Попробовать снова"
					>
						Попробовать снова
					</button>
				</div>
			)}
		</div>
	);
};

export default FillTheBlank;
