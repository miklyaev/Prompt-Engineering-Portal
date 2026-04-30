import React from 'react';
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
						<span className="text-gray-900">Prompt Engineering Academy</span>
					</div>

					{/* Nav links */}
					<div className="flex gap-0.5 bg-black/5 p-1 rounded-xl border border-gray-300/50">
						{navItems.map(({ path, label, icon: Icon }) => {
							const isActive = location.pathname === path;
							return (
								<Link
									key={path}
									to={path}
									className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${isActive
											? 'bg-white text-blue-600 shadow-sm ring-1 ring-gray-300'
											: 'text-gray-500 hover:text-gray-800 hover:bg-white/60'
										}`}
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
			<main className="pt-[49px] pb-16 px-6 max-w-5xl mx-auto">
				{children}
			</main>
		</div>
	);
};

export default Layout;
