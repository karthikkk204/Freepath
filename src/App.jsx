import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  Check,
  Clock3,
  ExternalLink,
  GraduationCap,
  Moon,
  Sun,
} from 'lucide-react'
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom'
import './App.css'

const skills = [
  { name: 'HTML & CSS', slug: 'html-css', category: 'IT', icon: '🧱', description: 'The building blocks of every website: structure pages with HTML and style them with CSS.', duration: '6–8 weeks', level: 'Beginner' },
  { name: 'JavaScript', slug: 'javascript', category: 'IT', icon: '⚡', description: 'The language of the web. Add interactivity to pages and build full apps in the browser and on servers.', duration: '2–3 months', level: 'Beginner' },
  { name: 'React', slug: 'react', category: 'IT', icon: '⚛️', description: 'A popular library for building fast, component-based user interfaces.', duration: '6–8 weeks', level: 'Intermediate' },
  { name: 'Python', slug: 'python', category: 'IT', icon: '🐍', description: 'A friendly, versatile language used for automation, data, AI, and web backends.', duration: '2–3 months', level: 'Beginner' },
  { name: 'Java', slug: 'java', category: 'IT', icon: '☕', description: 'A robust, object-oriented language powering enterprise systems and Android apps.', duration: '3 months', level: 'Intermediate' },
  { name: 'C / C++', slug: 'c-cpp', category: 'IT', icon: '🔧', description: 'Low-level, high-performance languages used in systems, games and competitive programming.', duration: '3 months', level: 'Intermediate' },
  { name: 'SQL', slug: 'sql', category: 'IT', icon: '🗄️', description: 'The language for querying and managing data in relational databases.', duration: '4–6 weeks', level: 'Beginner' },
  { name: 'Data Structures & Algorithms', slug: 'dsa', category: 'IT', icon: '🧮', description: 'Core problem-solving skills for coding interviews and efficient software.', duration: '4–6 months', level: 'Advanced' },
  { name: 'Git & GitHub', slug: 'git', category: 'IT', icon: '🌿', description: 'Track changes to code and collaborate with others using version control.', duration: '2 weeks', level: 'Beginner' },
  { name: 'Linux', slug: 'linux', category: 'IT', icon: '🐧', description: 'Master the command line and the OS that runs most servers in the world.', duration: '4–6 weeks', level: 'Beginner' },
  { name: 'Cybersecurity', slug: 'cybersecurity', category: 'IT', icon: '🛡️', description: 'Protect systems and networks from attacks; learn ethical hacking and defense.', duration: '4–6 months', level: 'Advanced' },
  { name: 'Machine Learning', slug: 'machine-learning', category: 'IT', icon: '🤖', description: 'Teach computers to learn from data: regression, classification, neural networks and more.', duration: '4–6 months', level: 'Advanced' },
  { name: 'Data Analysis', slug: 'data-analysis', category: 'IT', icon: '📊', description: 'Turn raw data into insights with spreadsheets, SQL, Python and visualization.', duration: '3 months', level: 'Intermediate' },
  { name: 'Web Development (Full Stack)', slug: 'full-stack', category: 'IT', icon: '🌐', description: 'Build complete web apps: frontend, backend, databases and deployment.', duration: '6–9 months', level: 'Intermediate' },
  { name: 'Android / Flutter', slug: 'android-flutter', category: 'IT', icon: '📱', description: 'Build mobile apps for Android (Kotlin) or cross-platform apps with Flutter.', duration: '3–4 months', level: 'Intermediate' },
  { name: 'DevOps', slug: 'devops', category: 'IT', icon: '♾️', description: 'Automate building, testing, and deploying software with CI/CD, containers and infrastructure as code.', duration: '4–6 months', level: 'Advanced' },
  { name: 'Cloud (AWS)', slug: 'aws', category: 'IT', icon: '☁️', description: 'Use Amazon Web Services to host, scale and manage applications in the cloud.', duration: '3 months', level: 'Intermediate' },
  { name: 'UI/UX Design', slug: 'ui-ux', category: 'IT', icon: '🎨', description: 'Design useful, beautiful digital products through research, wireframes, and prototypes.', duration: '3 months', level: 'Beginner' },
  { name: 'Spoken English', slug: 'spoken-english', category: 'Non-IT', icon: '🗣️', description: 'Speak English fluently and confidently in daily life and at work.', duration: '3–6 months', level: 'Beginner' },
  { name: 'Public Speaking', slug: 'public-speaking', category: 'Non-IT', icon: '🎤', description: 'Present ideas clearly and confidently to any audience.', duration: '2 months', level: 'Beginner' },
  { name: 'Excel', slug: 'excel', category: 'Non-IT', icon: '📗', description: "Organize, calculate and visualize data with the world's most used spreadsheet.", duration: '4–6 weeks', level: 'Beginner' },
  { name: 'Digital Marketing', slug: 'digital-marketing', category: 'Non-IT', icon: '📣', description: 'Grow brands online with SEO, social media, content and ads.', duration: '3 months', level: 'Beginner' },
  { name: 'Content Writing', slug: 'content-writing', category: 'Non-IT', icon: '✍️', description: 'Write clear, engaging articles, blogs and copy that people want to read.', duration: '2 months', level: 'Beginner' },
  { name: 'Photography', slug: 'photography', category: 'Non-IT', icon: '📷', description: 'Take stunning photos with any camera, even your phone.', duration: '2–3 months', level: 'Beginner' },
  { name: 'Video Editing', slug: 'video-editing', category: 'Non-IT', icon: '🎬', description: 'Cut, color and craft engaging videos for YouTube, reels and films.', duration: '2 months', level: 'Beginner' },
  { name: 'Personal Finance', slug: 'personal-finance', category: 'Non-IT', icon: '💰', description: 'Budget, save, invest and avoid debt to build long-term wealth.', duration: '1 month', level: 'Beginner' },
  { name: 'Stock Market Basics', slug: 'stock-market', category: 'Non-IT', icon: '📈', description: 'Understand how stocks work, analyze companies and invest responsibly.', duration: '2 months', level: 'Intermediate' },
  { name: 'Guitar / Piano', slug: 'guitar-piano', category: 'Non-IT', icon: '🎸', description: 'Play your favourite songs on guitar or piano from scratch.', duration: '3–6 months', level: 'Beginner' },
  { name: 'Drawing', slug: 'drawing', category: 'Non-IT', icon: '✏️', description: 'Learn to draw what you see and imagine, from lines to figures.', duration: '3 months', level: 'Beginner' },
  { name: 'Cooking', slug: 'cooking', category: 'Non-IT', icon: '🍳', description: 'Cook tasty, healthy meals at home with confidence.', duration: '2 months', level: 'Beginner' },
  { name: 'Fitness', slug: 'fitness', category: 'Non-IT', icon: '💪', description: 'Build strength, endurance and healthy habits — no gym required.', duration: '3 months', level: 'Beginner' },
  { name: 'Time Management', slug: 'time-management', category: 'Non-IT', icon: '⏰', description: 'Get more done with less stress using proven productivity systems.', duration: '3 weeks', level: 'Beginner' },
  { name: 'Chess', slug: 'chess', category: 'Non-IT', icon: '♟️', description: "Learn the rules, tactics and strategy of the world's greatest board game.", duration: '3 months', level: 'Beginner' },
  { name: 'Graphic Design', slug: 'graphic-design', category: 'Non-IT', icon: '🖌️', description: 'Create posters, logos and social graphics using design principles and free tools.', duration: '3 months', level: 'Beginner' },
]

const channels = [
  { name: 'freeCodeCamp.org', category: 'IT', language: 'English', url: 'https://www.youtube.com/@freecodecamp' },
  { name: 'CS50', category: 'IT', language: 'English', url: 'https://www.youtube.com/@cs50' },
  { name: 'Traversy Media', category: 'IT', language: 'English', url: 'https://www.youtube.com/@TraversyMedia' },
  { name: 'Programming with Mosh', category: 'IT', language: 'English', url: 'https://www.youtube.com/@programmingwithmosh' },
  { name: 'Apna College', category: 'IT', language: 'Hindi', url: 'https://www.youtube.com/@ApnaCollegeOfficial' },
  { name: 'CodeWithHarry', category: 'IT', language: 'Hindi', url: 'https://www.youtube.com/@CodeWithHarry' },
  { name: 'Kunal Kushwaha', category: 'IT', language: 'English', url: 'https://www.youtube.com/@KunalKushwaha' },
  { name: 'Abdul Bari', category: 'IT', language: 'English', url: 'https://www.youtube.com/@abdul_bari' },
  { name: 'Fireship', category: 'IT', language: 'English', url: 'https://www.youtube.com/@Fireship' },
  { name: 'Corey Schafer', category: 'IT', language: 'English', url: 'https://www.youtube.com/@coreyms' },
  { name: 'Kevin Powell', category: 'IT', language: 'English', url: 'https://www.youtube.com/@KevinPowell' },
  { name: 'Web Dev Simplified', category: 'IT', language: 'English', url: 'https://www.youtube.com/@WebDevSimplified' },
  { name: 'Net Ninja', category: 'IT', language: 'English', url: 'https://www.youtube.com/@NetNinja' },
  { name: 'NetworkChuck', category: 'IT', language: 'English', url: 'https://www.youtube.com/@NetworkChuck' },
  { name: 'TechWorld with Nana', category: 'IT', language: 'English', url: 'https://www.youtube.com/@TechWorldwithNana' },
  { name: 'StatQuest', category: 'IT', language: 'English', url: 'https://www.youtube.com/@statquest' },
  { name: 'Alex The Analyst', category: 'IT', language: 'English', url: 'https://www.youtube.com/@AlexTheAnalyst' },
  { name: 'Khan Academy', category: 'Non-IT', language: 'English', url: 'https://www.youtube.com/@khanacademy' },
  { name: 'Ali Abdaal', category: 'Non-IT', language: 'English', url: 'https://www.youtube.com/@aliabdaal' },
  { name: 'JustinGuitar', category: 'Non-IT', language: 'English', url: 'https://www.youtube.com/@JustinGuitar' },
  { name: 'TED', category: 'Non-IT', language: 'English', url: 'https://www.youtube.com/@TED' },
  { name: 'ExcelIsFun', category: 'Non-IT', language: 'English', url: 'https://www.youtube.com/@excelisfun' },
  { name: 'Leila Gharani', category: 'Non-IT', language: 'English', url: 'https://www.youtube.com/@LeilaGharani' },
  { name: 'Neil Patel', category: 'Non-IT', language: 'English', url: 'https://www.youtube.com/@neilpatel' },
  { name: 'Peter McKinnon', category: 'Non-IT', language: 'English', url: 'https://www.youtube.com/@PeterMcKinnon' },
  { name: 'Premiere Basics / Justin Odisho', category: 'Non-IT', language: 'English', url: 'https://www.youtube.com/@JustinOdisho' },
  { name: 'Pranjal Kamra', category: 'Non-IT', language: 'Hindi', url: 'https://www.youtube.com/@pranjalkamra' },
  { name: 'Graham Stephan', category: 'Non-IT', language: 'English', url: 'https://www.youtube.com/@GrahamStephan' },
  { name: 'Proko', category: 'Non-IT', language: 'English', url: 'https://www.youtube.com/@ProkoTV' },
  { name: 'Joshua Weissman', category: 'Non-IT', language: 'English', url: 'https://www.youtube.com/@JoshuaWeissman' },
  { name: 'J. Kenji López-Alt', category: 'Non-IT', language: 'English', url: 'https://www.youtube.com/@JKenjiLopezAlt' },
  { name: 'Jeff Nippard', category: 'Non-IT', language: 'English', url: 'https://www.youtube.com/@JeffNippard' },
  { name: 'GothamChess', category: 'Non-IT', language: 'English', url: 'https://www.youtube.com/@GothamChess' },
  { name: 'Satori Graphics', category: 'Non-IT', language: 'English', url: 'https://www.youtube.com/@SatoriGraphics' },
  { name: 'BBC Learning English', category: 'Non-IT', language: 'English', url: 'https://www.youtube.com/@bbclearningenglish' },
  { name: 'Pianote', category: 'Non-IT', language: 'English', url: 'https://www.youtube.com/@Pianote' },
  { name: 'AJ&Smart', category: 'IT', language: 'English', url: 'https://www.youtube.com/@AJSmart' },
]

const pythonStages = [
  {
    label: 'Beginner',
    title: 'Foundations',
    duration: '3 weeks',
    topics: ['Syntax & variables', 'Conditions & loops', 'Lists, dicts, tuples', 'Functions'],
    videos: [
      ['Programming with Mosh', 'Python for beginners — Programming with Mosh', 'English'],
      ['CodeWithHarry', 'Python tutorial — CodeWithHarry', 'Hindi'],
      ['CS50', 'CS50P Python — CS50', 'English'],
    ],
    practice: [['Python Tutorial', 'Official tutorial', 'https://docs.python.org/3/tutorial/'], ['HackerRank', 'Python domain', 'https://www.hackerrank.com/domains']],
  },
  {
    label: 'Intermediate',
    title: 'Building skills',
    duration: '3 weeks',
    topics: ['Files & exceptions', 'OOP', 'Modules & pip', 'Virtual environments'],
    videos: [['Corey Schafer', 'Python OOP — Corey Schafer', 'English']],
    practice: [['Exercism', 'Python track', 'https://exercism.org/tracks'], ['Codewars', 'Python kata', 'https://www.codewars.com']],
  },
  {
    label: 'Advanced',
    title: 'Going deep',
    duration: '3 weeks',
    topics: ['Decorators & generators', 'Testing with pytest', 'Async', 'APIs with Flask/FastAPI'],
    videos: [['Corey Schafer', 'Python decorators generators — Corey Schafer', 'English'], ['freeCodeCamp.org', 'Python advanced — freeCodeCamp.org', 'English']],
    practice: [['LeetCode', 'Solve easy problems in Python', 'https://leetcode.com/problemset/']],
  },
  {
    label: 'Projects',
    title: 'Build real projects',
    duration: '2 weeks',
    topics: ['Web scraper', 'CLI expense tracker', 'Automation scripts'],
    videos: [['freeCodeCamp.org', 'Python projects — freeCodeCamp.org', 'English']],
    practice: [['Kaggle Learn', 'Python micro-course', 'https://www.kaggle.com/learn']],
  },
]

const genericTopics = {
  IT: [
    ['Core concepts & terminology', 'Set up your tools and environment', 'Essential syntax and workflows', 'Guided beginner exercises'],
    ['Intermediate concepts', 'Common patterns and best practices', 'Build a small feature from scratch', 'Debugging and troubleshooting'],
    ['Advanced techniques', 'Performance and quality', 'Industry tools and workflows', 'Review real-world examples'],
    ['Plan a portfolio project', 'Build a complete project', 'Test, refine and document your work'],
  ],
  'Non-IT': [
    ['Understand the fundamentals', 'Get familiar with your tools', 'Learn essential techniques', 'Practice with simple exercises'],
    ['Develop core techniques', 'Build consistent habits', 'Try guided intermediate exercises', 'Review and improve your work'],
    ['Explore advanced methods', 'Study examples from experts', 'Practice with realistic challenges', 'Find your own style'],
    ['Choose a personal goal', 'Create a finished project', 'Share your work and reflect'],
  ],
}

function YouTubeIcon({ size = 20 }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="4" />
      <path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none" />
    </svg>
  )
}

function getStages(skill) {
  if (skill.slug === 'python') return pythonStages
  const topics = genericTopics[skill.category]
  return [
    { label: 'Beginner', title: 'Foundations', duration: '3 weeks', topics: topics[0] },
    { label: 'Intermediate', title: 'Building skills', duration: '3 weeks', topics: topics[1] },
    { label: 'Advanced', title: 'Going deep', duration: '3 weeks', topics: topics[2] },
    { label: 'Projects', title: 'Build real projects', duration: '2 weeks', topics: topics[3] },
  ].map((stage) => ({
    ...stage,
    videos: [['freeCodeCamp.org', `${skill.name} tutorial — freeCodeCamp.org`, 'English']],
    practice: [['Free learning resources', `${skill.name} practice and exercises`, 'https://www.freecodecamp.org/learn/']],
  }))
}

function Footer() {
  return <footer className="site-footer">FreePath · every resource is free</footer>
}

function Header({ darkMode, onToggleTheme }) {
  return (
    <header className="site-header">
      <nav className="nav-wrap" aria-label="Main navigation">
        <Link className="brand" to="/" aria-label="FreePath home">
          <span className="brand-mark"><GraduationCap size={20} strokeWidth={2.2} /></span>
          <span>FreePath</span>
        </Link>
        <div className="nav-links">
          <Link to="/">Skills</Link>
          <Link to="/channels">Channels</Link>
          <Link to="/about">About</Link>
          <button
            className="theme-toggle"
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>
    </header>
  )
}

function HomePage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const visibleSkills = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return skills.filter((skill) => (
      (category === 'All' || skill.category === category) &&
      (!normalizedQuery || `${skill.name} ${skill.description} ${skill.category}`.toLowerCase().includes(normalizedQuery))
    ))
  }, [category, query])

  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-inner">
          <span className="free-badge">100% FREE · NO SIGN-UP</span>
          <h1 id="hero-title">Learn any skill with a <span>free roadmap.</span></h1>
          <p className="hero-copy">Step-by-step paths with the best free YouTube teachers and<br className="desktop-break" /> practice websites. Track your progress as you go.</p>
          <label className="search-box">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
            <span className="sr-only">Search skills</span>
            <input type="search" placeholder="Search Python, guitar, Excel…" value={query} onChange={(event) => setQuery(event.target.value)} />
          </label>
        </div>
      </section>
      <section className="skills-section" id="skills" aria-labelledby="skills-title">
        <div className="skills-heading">
          <h2 id="skills-title">{visibleSkills.length} {visibleSkills.length === 1 ? 'skill' : 'skills'}</h2>
          <CategoryTabs category={category} onChange={setCategory} label="Category" />
        </div>
        {visibleSkills.length ? (
          <div className="skill-grid">
            {visibleSkills.map((skill) => (
              <Link className="skill-card" to={`/skill/${skill.slug}`} key={skill.slug}>
                <div className="card-topline"><span className="skill-emoji" aria-hidden="true">{skill.icon}</span><span className="skill-category">{skill.category}</span></div>
                <h3>{skill.name}</h3>
                <p className="skill-description">{skill.description}</p>
                <div className="skill-meta"><span><Clock3 size={14} aria-hidden="true" />{skill.duration}</span><span className="meta-divider" aria-hidden="true">·</span><span>{skill.level}</span></div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state"><span aria-hidden="true">🔎</span><h3>No skills found</h3><p>Try a different search or category.</p><button type="button" onClick={() => { setQuery(''); setCategory('All') }}>Clear filters</button></div>
        )}
      </section>
    </main>
  )
}

function CategoryTabs({ category, onChange, label }) {
  return (
    <div className="category-tabs" role="tablist" aria-label={label}>
      {['All', 'IT', 'Non-IT'].map((item) => (
        <button type="button" role="tab" aria-selected={category === item} className={category === item ? 'category-tab active' : 'category-tab'} key={item} onClick={() => onChange(item)}>{item}</button>
      ))}
    </div>
  )
}

function ChannelsPage() {
  const [category, setCategory] = useState('All')
  const visibleChannels = channels.filter((channel) => category === 'All' || channel.category === category)
  return (
    <main className="simple-page channels-page">
      <div className="page-heading">
        <h1>YouTube channels</h1>
        <p>Free teachers used across our roadmaps.</p>
      </div>
      <CategoryTabs category={category} onChange={setCategory} label="Channel category" />
      <ul className="channel-grid">
        {visibleChannels.map((channel) => (
          <li className="channel-card" key={channel.name}>
            <span className="youtube-mark"><YouTubeIcon size={20} /></span>
            <div className="channel-copy"><p>{channel.name}</p><span>{channel.category} · {channel.language}</span></div>
            <a className="channel-open" href={channel.url} target="_blank" rel="noreferrer" aria-label={`Open ${channel.name} on YouTube`}>Open</a>
          </li>
        ))}
      </ul>
    </main>
  )
}

function AboutPage() {
  return (
    <main className="about-page">
      <h1>About FreePath</h1>
      <p>Great teachers already share their knowledge for free. FreePath organizes it into clear, step-by-step roadmaps so you always know what to learn next.</p>
      <p>Every resource is free: YouTube channels like freeCodeCamp, CS50 and Khan Academy, plus practice sites like LeetCode, Kaggle and Lichess.</p>
      <p>Your progress is saved only in your browser. No account, no tracking, no cost.</p>
      <Link className="primary-link" to="/">Pick a skill</Link>
    </main>
  )
}

function SkillRoadmap() {
  const { slug } = useParams()
  const skill = skills.find((item) => item.slug === slug)
  const stages = skill ? getStages(skill) : []
  const progressKey = `freepath-progress-${slug}`
  const [checked, setChecked] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem(progressKey) || '{}')
    } catch (error) {
      console.error('Unable to load roadmap progress from local storage.', error)
      return {}
    }
  })
  const allTopics = stages.flatMap((stage) => stage.topics.map((topic) => `${stage.title}:${topic}`))
  const completedCount = allTopics.filter((topic) => checked[topic]).length
  const percentage = allTopics.length ? Math.round((completedCount / allTopics.length) * 100) : 0

  useEffect(() => {
    try {
      window.localStorage.setItem(progressKey, JSON.stringify(checked))
    } catch (error) {
      console.error('Unable to save roadmap progress to local storage.', error)
    }
  }, [checked, progressKey])

  if (!skill) return <NotFound />

  const updateTopic = (key) => {
    setChecked((current) => ({ ...current, [key]: !current[key] }))
  }

  return (
    <main className="roadmap-page">
      <div className="progress-sticky">
        <div className="progress-wrap">
          <span>{percentage}% complete</span>
          <div className="progress-track" role="progressbar" aria-label="Roadmap progress" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${percentage}%` }} /></div>
        </div>
      </div>
      <div className="roadmap-content">
        <Link to="/" className="back-link"><ArrowLeft size={16} /> All skills</Link>
        <section className="roadmap-intro">
          <div className="roadmap-title-row"><span className="roadmap-emoji">{skill.icon}</span><div><span className="roadmap-category">{skill.category}</span><h1>{skill.name}</h1></div></div>
          <p>{skill.description}</p>
          <dl className="roadmap-facts">
            <div><dt><Clock3 size={15} />Time to learn</dt><dd>{skill.duration}</dd></div>
            <div><dt>Difficulty</dt><dd>{skill.level}</dd></div>
            <div><dt>Career uses</dt><dd>{careerUses(skill)}</dd></div>
          </dl>
        </section>
        <ol className="roadmap-stages">
          {stages.map((stage, index) => (
            <li className="roadmap-stage" key={stage.title}>
              <div className="stage-marker">{index + 1}</div>
              <div className="stage-heading"><span>{stage.label}</span><h2>{stage.title}</h2><p><Clock3 size={14} />{stage.duration}</p></div>
              <section className="stage-card">
                <h3>Topics to learn</h3>
                <ul className="topic-list">
                  {stage.topics.map((topic) => {
                    const key = `${stage.title}:${topic}`
                    return <li key={key}><label className={checked[key] ? 'topic-label completed' : 'topic-label'}><input type="checkbox" checked={Boolean(checked[key])} onChange={() => updateTopic(key)} /><span className="custom-checkbox">{checked[key] && <Check size={14} />}</span><span>{topic}</span></label></li>
                  })}
                </ul>
                <h3 className="resource-heading">Watch on YouTube</h3>
                <ul className="resource-grid">
                  {stage.videos.map(([teacher, title, language]) => {
                    const teacherUrl = channels.find((channel) => channel.name === teacher)?.url || 'https://www.youtube.com/'
                    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(title)}`
                    return <li className="resource-card" key={title}><a className="resource-teacher" href={teacherUrl} target="_blank" rel="noreferrer">{teacher}</a><p>{title}</p><span>{language} · playlist · search link</span><a className="youtube-button" href={searchUrl} target="_blank" rel="noreferrer"><YouTubeIcon size={14} />Open on YouTube</a></li>
                  })}
                </ul>
                <h3 className="resource-heading">Practice for free</h3>
                <ul className="resource-grid practice-grid">
                  {stage.practice.map(([name, description, url]) => <li className="resource-card practice-card" key={name}><p>{name}</p><span>{description}</span><a className="practice-button" href={url} target="_blank" rel="noreferrer">Practice now <ExternalLink size={13} /></a></li>)}
                </ul>
              </section>
            </li>
          ))}
        </ol>
      </div>
    </main>
  )
}

function careerUses(skill) {
  if (skill.slug === 'python') return 'Python developer, Data analyst, Automation engineer'
  if (skill.category === 'IT') return `${skill.name} specialist, Software developer, Technical professional`
  return `${skill.name} professional, Freelancer, Personal projects`
}

function NotFound() {
  return <main className="not-found"><h1>Page not found</h1><p>This skill or page does not exist.</p><Link className="primary-link" to="/">Browse all skills</Link></main>
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  const [darkMode, setDarkMode] = useState(() => window.localStorage.getItem('freepath-theme') === 'dark')
  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
    window.localStorage.setItem('freepath-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <div className="app-shell">
      <ScrollToTop />
      <Header darkMode={darkMode} onToggleTheme={() => setDarkMode((current) => !current)} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/channels" element={<ChannelsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skill/:slug" element={<SkillRoadmap />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
