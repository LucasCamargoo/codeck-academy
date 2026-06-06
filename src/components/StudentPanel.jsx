import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, LayoutDashboard, BookOpen, Trophy, ClipboardList, ChevronRight, GraduationCap, Star, Crown, Medal, Menu, X, TrendingUp, CheckCircle, Lock, Play, Timer, Zap } from 'lucide-react'
import { supabase } from '../lib/supabase'

const MOCK_USER = { id: 'mock-001', name: 'João Silva', username: 'aluno.codeck', class_id: null }

export default function StudentPanel({ onLogout }) {
  const [activePage, setActivePage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [attempts, setAttempts] = useState([])
  const [allRankings, setAllRankings] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)

    const { data: usersData } = await supabase.from('users').select('*')
    const { data: attemptsData } = await supabase.from('quiz_attempts').select('*').order('created_at', { ascending: false })

    if (usersData) setUsers(usersData)
    if (attemptsData) {
      setAttempts(attemptsData)

      const scoreMap = {}
      attemptsData.forEach((a) => {
        if (!scoreMap[a.user_id]) scoreMap[a.user_id] = 0
        scoreMap[a.user_id] += a.score ?? 0
      })
      const ranked = (usersData ?? [])
        .map((u) => ({ ...u, totalScore: scoreMap[u.id] ?? 0 }))
        .filter((u) => (scoreMap[u.id] ?? 0) > 0)
        .sort((a, b) => b.totalScore - a.totalScore)
      setAllRankings(ranked)
    }

    setLoading(false)
  }

  const myAttempts = attempts.filter((a) => a.user_id === MOCK_USER.id)
  const myScore = myAttempts.reduce((sum, a) => sum + (a.score ?? 0), 0)
  const myPosition = allRankings.findIndex((u) => u.id === MOCK_USER.id) + 1

  const contents = [
    { id: 1, title: 'Introdução à Lógica', duration: '45 min', done: true, module: 'Módulo 1' },
    { id: 2, title: 'Variáveis e Tipos', duration: '50 min', done: true, module: 'Módulo 1' },
    { id: 3, title: 'Condicionais e Loops', duration: '60 min', done: true, module: 'Módulo 1' },
    { id: 4, title: 'Funções em Python', duration: '55 min', done: false, module: 'Módulo 1' },
    { id: 5, title: 'Listas e Dicionários', duration: '65 min', done: false, module: 'Módulo 1' },
    { id: 6, title: 'Projeto Final — Módulo 1', duration: '90 min', done: false, module: 'Módulo 1', locked: true },
  ]
  const doneLessons = contents.filter((c) => c.done).length
  const progress = Math.round((doneLessons / contents.length) * 100)

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { id: 'contents', label: 'Aulas', icon: <BookOpen size={16} /> },
    { id: 'quizzes', label: 'Provas', icon: <ClipboardList size={16} /> },
    { id: 'ranking', label: 'Ranking', icon: <Trophy size={16} /> },
  ]

  const medalConfig = (pos) => {
    if (pos === 0) return { icon: <Crown size={15} />, color: 'text-yellow-400', bg: 'bg-yellow-500/20 border-yellow-500/30' }
    if (pos === 1) return { icon: <Medal size={15} />, color: 'text-gray-300', bg: 'bg-gray-500/20 border-gray-500/30' }
    if (pos === 2) return { icon: <Medal size={15} />, color: 'text-amber-600', bg: 'bg-amber-800/20 border-amber-700/30' }
    return { icon: <span className="text-xs font-black">{pos + 1}</span>, color: 'text-gray-500', bg: 'bg-white/5 border-white/10' }
  }

  const handleNavigate = (id) => {
    setActivePage(id)
    setSidebarOpen(false)
  }

  const Sidebar = () => (
    <div className="flex flex-col h-full p-6 gap-6">
      <div className="flex items-center justify-between">
        <img src="/rodape.png" alt="Codeck Academy" className="h-8 object-contain" />
        <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-500 hover:text-white cursor-pointer">
          <X size={20} />
        </button>
      </div>

      <div className="flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl px-3 py-3">
        <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-black text-sm shrink-0">
          {MOCK_USER.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="text-white text-sm font-bold truncate">{MOCK_USER.name}</p>
          <p className="text-cyan-400 text-xs">@{MOCK_USER.username}</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-2">Menu</p>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigate(item.id)}
            className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activePage === item.id
                ? 'bg-cyan-600/20 border border-cyan-500/30 text-cyan-400'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">{item.icon}{item.label}</div>
            <ChevronRight size={14} />
          </button>
        ))}
      </nav>

      <button
        onClick={onLogout}
        className="flex items-center gap-2 text-gray-500 hover:text-white text-sm font-semibold px-4 py-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer"
      >
        <LogOut size={16} />
        Sair
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#07060f] flex">

      <div className="hidden md:flex w-64 bg-[#0f0d1a] border-r border-white/5 flex-col shrink-0">
        <Sidebar />
      </div>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
            />
            <motion.div
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-64 bg-[#0f0d1a] border-r border-white/5 z-50 md:hidden"
            >
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">

        <div className="md:hidden flex items-center justify-between px-4 py-4 bg-[#0f0d1a] border-b border-white/5">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-400 hover:text-white cursor-pointer">
            <Menu size={22} />
          </button>
          <img src="/rodape.png" alt="Codeck Academy" className="h-7 object-contain" />
          <button onClick={onLogout} className="text-gray-500 hover:text-white cursor-pointer">
            <LogOut size={18} />
          </button>
        </div>

        <div className="flex-1 p-4 md:p-10 overflow-y-auto">

          {activePage === 'dashboard' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6 md:gap-8">
              <div>
                <h1 className="text-white text-2xl font-black mb-1">Olá, {MOCK_USER.name.split(' ')[0]} 👋</h1>
                <p className="text-gray-500 text-sm">Bem-vindo de volta à sua jornada.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Pontuação Total', value: myScore, icon: <Zap size={20} />, sub: 'pts acumulados', color: 'text-yellow-400' },
                  { label: 'Provas Realizadas', value: myAttempts.length, icon: <ClipboardList size={20} />, sub: 'provas feitas', color: 'text-cyan-400' },
                  { label: 'Posição no Ranking', value: myPosition > 0 ? `#${myPosition}` : '—', icon: <Trophy size={20} />, sub: 'entre todos alunos', color: 'text-purple-400' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-5 flex items-center gap-4 hover:border-cyan-500/20 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-semibold">{stat.label}</p>
                      <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
                      <p className="text-gray-600 text-xs mt-0.5">{stat.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-white font-black text-base">Progresso do Curso</h2>
                    <p className="text-gray-500 text-xs mt-0.5">Módulo 1 — Lógica de Programação</p>
                  </div>
                  <span className="text-cyan-400 font-black text-2xl">{progress}%</span>
                </div>
                <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                  />
                </div>
                <p className="text-gray-500 text-xs">{doneLessons} de {contents.length} aulas concluídas</p>
              </div>

              <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                  <h2 className="text-white font-black text-base">Últimas Provas</h2>
                  <button onClick={() => setActivePage('quizzes')} className="text-cyan-400 text-xs font-semibold hover:text-cyan-300 cursor-pointer">
                    Ver todas →
                  </button>
                </div>
                {myAttempts.length === 0 ? (
                  <div className="px-6 py-8 text-center text-gray-500 text-sm">Nenhuma prova realizada ainda.</div>
                ) : (
                  <div className="flex flex-col">
                    {myAttempts.slice(0, 4).map((a, i) => (
                      <div key={i} className="flex items-center justify-between px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors">
                        <div>
                          <p className="text-white text-sm font-semibold">{a.quiz_name ?? `Prova #${i + 1}`}</p>
                          <p className="text-gray-500 text-xs">{new Date(a.created_at).toLocaleDateString('pt-BR')}</p>
                        </div>
                        <span className="text-cyan-400 font-black text-lg">{a.score} <span className="text-gray-500 text-xs font-semibold">pts</span></span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activePage === 'contents' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
              <div>
                <h2 className="text-white text-2xl font-black mb-1">Aulas</h2>
                <p className="text-gray-500 text-sm">Acompanhe seu progresso no conteúdo.</p>
              </div>

              <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-5 flex items-center gap-5">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-xs font-semibold">Módulo 1 — Lógica de Programação</span>
                    <span className="text-cyan-400 font-black text-sm">{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }} animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                    />
                  </div>
                </div>
                <span className="text-white font-black text-lg shrink-0">{doneLessons}/{contents.length}</span>
              </div>

              <div className="flex flex-col gap-3">
                {contents.map((c, i) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className={`bg-[#0f0d1a] border rounded-2xl px-5 py-4 flex items-center gap-4 transition-colors ${
                      c.locked ? 'border-white/5 opacity-50' : c.done ? 'border-green-500/20' : 'border-white/5 hover:border-cyan-500/20'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      c.locked ? 'bg-white/5 border border-white/10 text-gray-600'
                      : c.done ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                      : 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400'
                    }`}>
                      {c.locked ? <Lock size={15} /> : c.done ? <CheckCircle size={15} /> : <Play size={15} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">{c.title}</p>
                      <p className="text-gray-500 text-xs">{c.module}</p>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-xs shrink-0">
                      <Timer size={12} />
                      {c.duration}
                    </div>
                    {c.done && <span className="text-green-400 text-xs font-bold shrink-0">Concluída</span>}
                    {c.locked && <span className="text-gray-600 text-xs font-bold shrink-0">Bloqueada</span>}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activePage === 'quizzes' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
              <div>
                <h2 className="text-white text-2xl font-black mb-1">Provas</h2>
                <p className="text-gray-500 text-sm">Seu histórico de avaliações.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-5">
                  <p className="text-gray-500 text-xs font-semibold mb-1">Total de Provas</p>
                  <p className="text-white text-3xl font-black">{myAttempts.length}</p>
                </div>
                <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-5">
                  <p className="text-gray-500 text-xs font-semibold mb-1">Pontuação Total</p>
                  <p className="text-cyan-400 text-3xl font-black">{myScore} pts</p>
                </div>
              </div>

              {myAttempts.length === 0 ? (
                <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-10 flex flex-col items-center gap-4 text-center">
                  <ClipboardList size={32} className="text-cyan-400" />
                  <p className="text-white font-bold">Nenhuma prova realizada ainda</p>
                  <p className="text-gray-500 text-sm">Suas avaliações aparecerão aqui após a realização.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {myAttempts.map((a, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                      className="bg-[#0f0d1a] border border-white/5 rounded-2xl px-5 py-4 flex items-center justify-between hover:border-cyan-500/20 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                          <ClipboardList size={15} />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{a.quiz_name ?? `Prova #${i + 1}`}</p>
                          <p className="text-gray-500 text-xs">{new Date(a.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                        </div>
                      </div>
                      <span className="text-cyan-400 font-black text-xl">{a.score} <span className="text-gray-500 text-xs font-semibold">pts</span></span>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activePage === 'ranking' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
              <div>
                <h2 className="text-white text-2xl font-black mb-1">Ranking</h2>
                <p className="text-gray-500 text-sm">Classificação geral de todos os alunos.</p>
              </div>

              {myPosition > 0 && (
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Trophy size={18} className="text-cyan-400" />
                    <span className="text-white font-bold text-sm">Sua posição atual</span>
                  </div>
                  <div className="text-right">
                    <span className="text-cyan-400 font-black text-2xl">#{myPosition}</span>
                    <span className="text-gray-500 text-xs ml-2">{myScore} pts</span>
                  </div>
                </div>
              )}

              {allRankings.length === 0 ? (
                <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-10 flex flex-col items-center gap-4 text-center">
                  <Trophy size={32} className="text-cyan-400" />
                  <p className="text-white font-bold">Ranking ainda vazio</p>
                  <p className="text-gray-500 text-sm">Realize provas para entrar no ranking.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {allRankings.map((u, i) => {
                    const medal = medalConfig(i)
                    const isMe = u.id === MOCK_USER.id
                    return (
                      <motion.div
                        key={u.id}
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                        className={`bg-[#0f0d1a] border rounded-2xl px-5 py-4 flex items-center gap-4 transition-colors ${
                          isMe ? 'border-cyan-500/40' : i === 0 ? 'border-yellow-500/20' : 'border-white/5'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${medal.bg} ${medal.color}`}>
                          {medal.icon}
                        </div>
                        <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-black text-sm shrink-0">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-bold text-sm truncate ${isMe ? 'text-cyan-400' : 'text-white'}`}>
                            {u.name} {isMe && <span className="text-xs font-semibold">(você)</span>}
                          </p>
                          <p className="text-gray-500 text-xs">@{u.username}</p>
                        </div>
                        <span className={`font-black text-lg shrink-0 ${i === 0 ? 'text-yellow-400' : isMe ? 'text-cyan-400' : 'text-white'}`}>
                          {u.totalScore} <span className="text-gray-500 text-xs font-semibold">pts</span>
                        </span>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </motion.div>
          )}

        </div>
      </div>
    </div>
  )
}