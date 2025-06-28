import React, { useState, useCallback } from 'react';
import { PROFILE, PROJECTS, MailIcon } from './constants';
import ProjectCard from './components/ProjectCard';

const ProfileCard: React.FC = () => (
  <header className="flex flex-col items-center text-center py-12 md:py-16">
    <img
      src={PROFILE.profileImageUrl}
      alt={PROFILE.name}
      className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg mb-6"
    />
    <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
      {PROFILE.name}
    </h1>
    <p className="text-lg md:text-xl text-slate-500 mt-1">きじまなる</p>
    <p className="text-lg md:text-xl text-slate-600 mt-2">{PROFILE.title}</p>
    <p className="mt-4 max-w-2xl text-slate-500 text-base md:text-lg">{PROFILE.bio}</p>
  </header>
);

const ContactSection: React.FC = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // mailtoリンクで送信（簡易）
        const subject = encodeURIComponent('お問い合わせ');
        const body = encodeURIComponent(`お名前: ${form.name}\nメールアドレス: ${form.email}\n内容: ${form.message}`);
        window.location.href = `mailto:${PROFILE.contactEmail}?subject=${subject}&body=${body}`;
        setSent(true);
    };

    return (
        <div className="text-center bg-white p-8 sm:p-10 rounded-lg border border-slate-200 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">お問い合わせ</h3>
            {sent ? (
                <p className="text-lg text-slate-700">送信画面が開きました。メールアプリからご連絡ください。</p>
            ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="お名前"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-slate-300 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-slate-500"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="メールアドレス"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-slate-300 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-slate-500"
                        />
                    </div>
                    <div>
                        <textarea
                            name="message"
                            placeholder="お問い合わせ内容"
                            value={form.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full border border-slate-300 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-slate-500"
                        />
                    </div>
                    <button type="submit" className="btn w-full">送信</button>
                </form>
            )}
        </div>
    );
};

const TABS = ['アプリ', 'お問い合わせ'] as const;
type TabName = typeof TABS[number];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabName>('アプリ');

  const renderTabContent = () => {
    const contentClasses = "py-10 animate-fade-in";
    switch (activeTab) {
      case 'アプリ':
        return (
          <div className={`${contentClasses} grid grid-cols-1 md:grid-cols-2 gap-8`}>
            {PROJECTS.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        );
      case 'お問い合わせ':
        return <div className={contentClasses}><ContactSection /></div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="w-full px-2 sm:px-4 md:px-8 max-w-full">
        <ProfileCard />
        <div className="w-full">
          <div className="border-b border-slate-200">
            <nav className="-mb-px flex justify-center space-x-2 sm:space-x-4 lg:space-x-6" aria-label="Tabs">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`$${
                    activeTab === tab
                      ? 'border-slate-800 text-slate-900'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  } whitespace-nowrap py-4 px-2 sm:px-4 border-b-2 font-medium text-sm sm:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 rounded-t-sm`}
                  aria-current={activeTab === tab ? 'page' : undefined}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div>
            {renderTabContent()}
          </div>
        </div>
        <footer className="text-center py-10 text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} {PROFILE.name}. All Rights Reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
