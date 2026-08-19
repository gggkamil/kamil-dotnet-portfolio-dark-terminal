import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  stack: string[]
  architecture: string[]
  github: string
  featured?: boolean
}

const projects: Project[] = [
  {
    id: '01',
    title: 'SubscriptionManager',
    subtitle: 'Subscription management + Open Banking',
    description: 'Platforma do zarządzania subskrypcjami z wykrywaniem cyklicznych płatności i analizą wydatków.',
    stack: ['C#', '.NET 8', 'ASP.NET Core', 'React', 'TypeScript', 'EF Core', 'SQL Server'],
    architecture: ['React + TypeScript', 'REST API', 'ASP.NET Core', 'Entity Framework Core', 'SQL Server'],
    github: 'https://github.com/gggkamil/SubscriptionManager',
    featured: true
  },
  {
    id: '02',
    title: 'StaffLeavePlanner',
    subtitle: 'Employee scheduling system',
    description: 'System planowania grafików, zmian i nieobecności pracowników.',
    stack: ['C#', 'ASP.NET Core MVC', 'EF Core', 'SQL Server', 'JavaScript'],
    architecture: ['MVC', 'Service Layer', 'Entity Framework Core', 'SQL Server'],
    github: 'https://github.com/gggkamil/StaffLeavePlanner'
  },
  {
    id: '03',
    title: 'POS / Mini ERP',
    subtitle: 'Desktop sales application',
    description: 'System sprzedażowy rozwijany z myślą o małych firmach i późniejszym rozszerzeniu do mini-ERP.',
    stack: ['C#', '.NET MAUI', 'Excel'],
    architecture: ['.NET MAUI', 'C#', 'Local data layer'],
    github: 'https://github.com/gggkamil/POS_MAUI'
  },
  {
    id: '04',
    title: 'Reactivities',
    subtitle: 'Full-stack .NET + React',
    description: 'Projekt full-stack służący do rozwijania architektury aplikacji .NET i React.',
    stack: ['C#', '.NET', 'React', 'TypeScript', 'EF Core'],
    architecture: ['React', 'REST API', '.NET', 'EF Core'],
    github: 'https://github.com/gggkamil'
  }
]

const commandDescriptions: Record<string, string> = {
  help: 'show available commands',
  about: 'about me',
  stack: 'technology stack',
  projects: 'list projects',
  experience: 'professional experience',
  contact: 'contact details',
  github: 'open GitHub',
  cv: 'open CV',
  clear: 'clear terminal',
  consi: 'mimimimimi <3'
}

function App() {
  const [selected, setSelected] = useState<Project | null>(null)
  const [terminalOpen, setTerminalOpen] = useState(true)

  return (
    <div className="app">
      <header className="nav">
        <a className="brand" href="#top">
          <span className="brand-mark">KD</span>
          <span>Kamil Dębicki</span>
        </a>
        <nav>
          <a href="#projects">Projects</a>
          <a href="#stack">Stack</a>
          <a href="#about">About</a>
          <a href="/cv.pdf" target="_blank" rel="noreferrer">CV ↗</a>
          <a href="https://github.com/gggkamil" target="_blank" rel="noreferrer">GitHub ↗</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span /> C# / .NET DEVELOPER</div>
            <h1>Software with a<br /><em>clean architecture.</em></h1>
            <p>
              Buduję backendy w .NET i aplikacje full-stack. Lubię dobrze zaprojektowane API,
              sensowny model danych i kod, który można rozwijać bez bólu.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#projects">View projects <span>↓</span></a>
              <a className="button secondary" href="/cv.pdf" target="_blank" rel="noreferrer">View CV ↗</a>
            </div>
          </div>

          <div className="terminal-wrap">
            <CodewarsTerminal onProject={setSelected} />
          </div>
        </section>

        <div className="ticker">
          <span>C#</span><i>•</i><span>.NET 8 / 9</span><i>•</i><span>ASP.NET CORE</span><i>•</i><span>EF CORE</span><i>•</i><span>REACT</span><i>•</i><span>TYPESCRIPT</span><i>•</i><span>SQL SERVER</span><i>•</i><span>AZURE</span>
        </div>

        <section id="projects" className="section">
          <div className="section-head">
            <div><small>01 / PROJECTS</small><h2>Things I've built.</h2></div>
            <p>Wybrane projekty — od aplikacji biznesowych po full-stack i integracje.</p>
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className={`project-card ${index === 0 ? 'featured' : ''}`}
                onClick={() => setSelected(project)}
              >
                <div className="project-top">
                  <span>{project.id}</span>
                  <span>↗</span>
                </div>
                <div className="project-icon">{index === 0 ? '↯' : index === 1 ? '◫' : index === 2 ? '▣' : '◈'}</div>
                <h3>{project.title}</h3>
                <small>{project.subtitle}</small>
                <p>{project.description}</p>
                <div className="tags">{project.stack.slice(0, 5).map(x => <span key={x}>{x}</span>)}</div>
                <div className="card-footer">
                  <button onClick={(e) => { e.stopPropagation(); setSelected(project) }}>Case study →</button>
                  <a onClick={e => e.stopPropagation()} href={project.github} target="_blank" rel="noreferrer">GitHub ↗</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="stack" className="section stack-section">
          <div className="section-head">
            <div><small>02 / STACK</small><h2>Tools of the trade.</h2></div>
            <p>Główne technologie, z którymi pracuję.</p>
          </div>
          <div className="stack-board">
            {[
              ['01', 'Backend', ['C#', '.NET 8 / 9', 'ASP.NET Core', 'EF Core', 'REST API', 'CQRS / MediatR']],
              ['02', 'Frontend', ['React', 'TypeScript', 'Vite', 'MobX', 'Formik', 'MUI']],
              ['03', 'Data', ['SQL Server', 'SSMS', 'Redis', 'Data modeling']],
              ['04', 'Platform', ['Git', 'GitHub', 'Docker', 'Azure', 'CI/CD']]
            ].map(([num, name, items]) => (
              <div className="stack-column" key={name as string}>
                <small>{num}</small>
                <h3>{name}</h3>
                {(items as string[]).map((x, i) => <div className="stack-line" key={x}><span>{String(i + 1).padStart(2, '0')}</span>{x}</div>)}
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="section about">
          <div><small>03 / ABOUT</small><h2>Backend first.<br /><em>Product minded.</em></h2></div>
          <div className="about-copy">
            <p className="big">C# / .NET developer with experience building software in a banking environment and full-stack applications.</p>
            <p>Pracuję z .NET, SQL Server i Reactem. Interesuje mnie architektura, integracje, fintech oraz tworzenie systemów, które są łatwe do utrzymania i rozwijania.</p>
          </div>
        </section>

        <section className="contact">
          <small>LET'S TALK /</small>
          <h2>Have something<br />worth building?</h2>
          <a href="mailto:kamildebicki3.14@gmail.com">kamildebicki3.14@gmail.com ↗</a>
        </section>
      </main>

      <footer>
        <span>© 2026 Kamil Dębicki</span>
        <span>C# / .NET Developer</span>
        <div><a href="https://github.com/gggkamil">GitHub</a><a href="https://www.linkedin.com/in/kamil-d%C4%99bicki-1b4b11156/">LinkedIn</a></div>
      </footer>

      {selected && <ProjectModal project={selected} close={() => setSelected(null)} />}
      <button className={`terminal-tab ${terminalOpen ? 'active' : ''}`} onClick={() => setTerminalOpen(!terminalOpen)}>
        <span>$_</span> {terminalOpen ? 'hide terminal' : 'open terminal'}
      </button>
    </div>
  )
}

function CodewarsTerminal({ onProject }: { onProject: (p: Project) => void }) {
  const [lines, setLines] = useState<ReactNode[]>([
    <div key="welcome" className="term-dim">Welcome to <span className="term-blue">kamil.dev</span> interactive console.</div>,
    <div key="tip">Type <span className="term-yellow">help</span> to see available commands.</div>
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight })
  }, [lines])

  const print = (node: ReactNode) => setLines(prev => [...prev, node])

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    setHistory(prev => [cmd, ...prev.filter(x => x !== cmd)].slice(0, 25))
    setHistoryIndex(-1)
    print(<div><span className="term-prompt">›</span> {cmd}</div>)

    if (cmd === 'clear') { setLines([]); return }
    if (cmd === 'consi') {
      print(<div>mimimi &lt;3</div>)
      return
    }
    if (cmd === 'github') {
      window.open('https://github.com/gggkamil', '_blank', 'noopener,noreferrer')
      print(<div className="term-blue">Opening github.com/gggkamil ↗</div>)
      return
    }
    if (cmd === 'cv') {
      window.open('/cv.pdf', '_blank', 'noopener,noreferrer')
      print(<div className="term-blue">Opening CV ↗</div>)
      return
    }
    if (cmd === 'contact') {
      print(<div className="term-dim">email <span className="term-blue">kamildebicki3.14@gmail.com</span></div>)
      print(<div className="term-dim">linkedin <span className="term-blue">linkedin.com/in/kamil-dębicki-1b4b11156</span></div>)
      return
    }
    if (cmd === 'about') {
      print(<div>Kamil Dębicki — <span className="term-blue">C# / .NET Developer</span></div>)
      print(<div className="term-dim">Backend-focused · React · SQL Server · Azure</div>)
      return
    }
    if (cmd === 'stack') {
      print(<div className="term-dim">C# · .NET · ASP.NET Core · EF Core</div>)
      print(<div className="term-dim">React · TypeScript · SQL Server · Redis</div>)
      print(<div className="term-dim">Git · Docker · Azure · CI/CD</div>)
      return
    }
    if (cmd === 'projects') {
      projects.forEach(p => {
        print(<button className="term-project" onClick={() => onProject(p)}><span>[{p.id}]</span> {p.title} <i>→</i></button>)
      })
      return
    }
    if (cmd === 'experience') {
      print(<div className="term-dim">C# / .NET Developer — banking environment</div>)
      print(<div className="term-dim">Backend · REST APIs · SQL Server · React</div>)
      return
    }
    if (cmd === 'help') {
      Object.entries(commandDescriptions).forEach(([key, desc]) => {
        print(<div className="help-line"><span>{key}</span>{desc}</div>)
      })
      return
    }
    print(<div className="term-error">Unknown command. Type <span className="term-yellow">help</span>.</div>)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { run(input); setInput('') }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const i = Math.min(historyIndex + 1, history.length - 1)
      setHistoryIndex(i); setInput(history[i] ?? '')
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const i = historyIndex - 1
      if (i < 0) { setHistoryIndex(-1); setInput('') }
      else { setHistoryIndex(i); setInput(history[i] ?? '') }
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      const match = Object.keys(commandDescriptions).find(x => x.startsWith(input.toLowerCase()))
      if (match) setInput(match)
    }
  }

  return (
    <div className="code-terminal" onClick={() => inputRef.current?.focus()}>
      <div className="term-titlebar">
        <span className="traffic"><i /><i /><i /></span>
        <span>kamil.dev — console</span>
        <span className="term-lang">C#</span>
      </div>
      <div className="term-body" ref={terminalRef}>
        {lines}
        <div className="term-input">
          <span className="term-prompt">›</span>
          <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKeyDown} spellCheck={false} autoComplete="off" />
          <span className="term-cursor" />
        </div>
      </div>
      <div className="term-shortcuts">
        {['about', 'stack', 'projects', 'experience', 'contact', 'help'].map(x => <button key={x} onClick={() => run(x)}>{x}</button>)}
      </div>
    </div>
  )
}

function ProjectModal({ project, close }: { project: Project, close: () => void }) {
  return (
    <div className="modal-backdrop" onClick={close}>
      <section className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={close}>×</button>
        <small>PROJECT {project.id}</small>
        <h2>{project.title}</h2>
        <div className="modal-subtitle">{project.subtitle}</div>
        <p>{project.description}</p>
        <div className="modal-grid">
          <div><label>STACK</label><div className="modal-tags">{project.stack.map(x => <span key={x}>{x}</span>)}</div></div>
          <div><label>ARCHITECTURE</label>{project.architecture.map((x, i) => <div className="arch-line-item" key={x}><span>{String(i + 1).padStart(2, '0')}</span>{x}</div>)}</div>
        </div>
        <div className="modal-actions">
          <a className="button primary" href={project.github} target="_blank" rel="noreferrer">Open GitHub ↗</a>
          <button className="button secondary" onClick={close}>Close</button>
        </div>
      </section>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
