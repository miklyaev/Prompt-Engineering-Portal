import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface TrueFalseProps {
	question: string;
	correctAnswer: boolean;
	explanation: string;
	className?: string;
}

const TrueFalse: React.FC<TrueFalseProps> = ({
	question,
	correctAnswer,
	explanation,
	className = "my-8",
}) => {
	const [selected, setSelected] = useState<boolean | null>(null);
	const answered = selected !== null;
	const isCorrect = selected === correctAnswer;

	const handleSelect = (value: boolean) => {
		if (answered) return;
		setSelected(value);
	};

	const handleReset = () => {
		setSelected(null);
	};

	const handleKeyDown = (event: React.KeyboardEvent, value: boolean) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleSelect(value);
		}
	};

	const options = [
		{ label: 'Верно', value: true },
		{ label: 'Неверно', value: false },
	];

	return (
		<div className={`${className} bg-blue-50 border border-blue-100 rounded-2xl p-6 space-y-4`}>
			<div className="flex items-start gap-3">
				<HelpCircle size={20} className="text-blue-500 mt-0.5 shrink-0" />
				<p className="font-semibold text-gray-800 text-base leading-snug">{question}</p>
			</div>

			<div className="grid grid-cols-2 gap-4">
				{options.map((option) => {
					const isCurrentSelected = selected === option.value;
					const isCurrentCorrect = option.value === correctAnswer;

					let style = 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer';

					if (answered) {
						if (isCurrentCorrect) {
							style = 'border-green-400 bg-green-50 text-green-800 cursor-default';
						} else if (isCurrentSelected) {
							style = 'border-red-400 bg-red-50 text-red-800 cursor-default';
						} else {
							style = 'border-gray-200 bg-white text-gray-400 cursor-default opacity-60';
						}
					}

					return (
						<div
							key={option.label}
							role="button"
							aria-pressed={isCurrentSelected}
							tabIndex={answered ? -1 : 0}
							onClick={() => handleSelect(option.value)}
							onKeyDown={(e) => handleKeyDown(e, option.value)}
							className={`text-center px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-150 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${style}`}
						>
							{option.label}
							{answered && isCurrentCorrect && (
								<CheckCircle size={16} className="text-green-500 shrink-0" />
							)}
							{answered && isCurrentSelected && !isCurrentCorrect && (
								<XCircle size={16} className="text-red-500 shrink-0" />
							)}
						</div>
					);
				})}
			</div>

			{answered && (
				<div className="space-y-3 pt-2 border-t border-blue-100">
					<div className="flex items-center justify-between">
						<p className={`text-sm font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
							{isCorrect ? '✓ Верно!' : '✗ Неверно.'}
						</p>
						<button
							onClick={handleReset}
							className="text-xs text-blue-600 hover:text-blue-800 underline underline-offset-2 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1"
							aria-label="Попробовать снова"
						>
							Попробовать снова
						</button>
					</div>
					<div className="bg-white/50 p-3 rounded-lg border border-blue-100/50">
						<p className="text-sm text-gray-700 leading-relaxed">
							<span className="font-semibold">Объяснение:</span> {explanation}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default TrueFalse;
