import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Medal, Crown, RotateCcw, ChevronDown, ChevronUp, Search, X } from 'lucide-react'

export default function RankingPage({ users, classes }) {
  const [rankings, setRankings] = useState([])
  const [quizHistory, setQuizHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [expandedUser, setExpandedUser] = useState(null)
  const [confirmReset, setConfirmReset] = useState(null)
  const [resetting, setResetting] = useState(false)

  useEffect(() => {
    fetchRankings()
  }, [])

  const fetchRankings = async () => {
    setLoading(true)

    const { data: attempts, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && attempts) {
      setQuizHistory(attempts)

      const scoreMap = {}
      attempts.forEach((a) => {
        if (!scoreMap[a.user_id]) scoreMap[a.user_id] = { total: 0, count: 0 }
        scoreMap[a.user_id].total += a.score ?? 0
        scoreMap[a.user_id].count += 1
      })

      const ranked = users
        .map((u) => ({
          ...u,
          totalScore: scoreMap[u.id]?.total ?? 0,
          quizCount: scoreMap[u.id]?.count ?? 0,
        }))
        .filter((u) => u.quizCount > 0)
        .sort((a, b) => b.totalScore - a.totalScore)

      setRankings(ranked)
    }

    setLoading(false)
  }

  const handleResetUser = async (userId) => {
    setResetting(true)
    await supabase.from('quiz_attempts').delete().eq('user_id', userId)
    await fetchRankings()
    setResetting(false)
    setConfirmReset(null)
  }

  const handleResetAll = async () => {
    setResetting(true)
    await supabase.from('quiz_attempts').delete().neq('id', 0)
    await fetchRankings()
    setResetting(false)
    setConfirmReset(null)
  }

  const filtered = rankings.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.username.toLowerCase().includes(search.toLowerCase())
  )

  const userHistory = (userId) =>
    quizHistory.filter((q) => q.user_id === userId).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

  const medalConfig = (pos) => {
    if (pos === 0) return { icon: <Crown size={16} />, color: 'text-yellow-400', bg: 'bg-yellow-500/20 border-yellow-500/30' }
    if (pos === 1) return { icon: <Medal size={16} />, color: 'text-gray-300', bg: 'bg-gray-500/20 border-gray-500/30' }
    if (pos === 2) return { icon: <Medal size={16} />, color: 'text-amber-600', bg: 'bg-amber-800/20 border-amber-700/30' }
    return { icon: <span className="text-xs font-black">{pos + 1}</span>, color: 'text-gray-500', bg: 'bg-white/5 border-white/10' }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-white text-2xl font-black mb-1">Ranking</h2>
          <p className="text-gray-500 text-sm">Classificação geral dos alunos por pontuação.</p>
        </div>
        <button
          onClick={() => setConfirmReset('all')}
          className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/20 hover:border-red-500/40 text-red-400 text-sm font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer w-fit"
        >
          <RotateCcw size={14} />
          Zerar Ranking
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: 'Alunos no Ranking', value: rankings.length, color: 'text-purple-400' },
          { label: 'Total de Provas', value: quizHistory.length, color: 'text-cyan-400' },
          { label: 'Maior Pontuação', value: rankings[0]?.totalScore ?? 0, color: 'text-yellow-400' },
        ].map((s, i) => (
          <div key={i} className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-5 flex flex-col gap-1 hover:border-purple-500/20 transition-colors">
            <span className="text-gray-500 text-xs font-semibold">{s.label}</span>
            <span className={`text-3xl font-black ${s.color}`}>{s.value}</span>
          </div>
        ))}
      </div>

      <div className="relative">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar aluno..."
          className="w-full bg-[#0f0d1a] border border-white/5 focus:border-purple-500/40 rounded-xl px-4 py-3 pl-10 text-white text-sm outline-none transition-colors placeholder:text-gray-600"
        />
      </div>

      {loading ? (
        <div className="text-gray-500 text-sm text-center py-10">Carregando...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-10 flex flex-col items-center gap-4 text-center">
          <Trophy size={32} className="text-purple-400" />
          <p className="text-white font-bold">Nenhum aluno no ranking ainda</p>
          <p className="text-gray-500 text-sm">As posições serão preenchidas conforme os alunos realizarem provas.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((user, i) => {
            const pos = rankings.indexOf(user)
            const medal = medalConfig(pos)
            const history = userHistory(user.id)
            const isExpanded = expandedUser === user.id
            const turma = classes.find((c) => c.id === user.class_id)

            return (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`bg-[#0f0d1a] border rounded-2xl overflow-hidden transition-colors ${
                  pos === 0 ? 'border-yellow-500/30' : pos === 1 ? 'border-gray-500/20' : pos === 2 ? 'border-amber-700/20' : 'border-white/5'
                }`}
              >
                <div className="flex items-center gap-4 px-5 py-4">

                  <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${medal.bg} ${medal.color}`}>
                    {medal.icon}
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-black text-sm shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm truncate">{user.name}</p>
                    <p className="text-gray-500 text-xs truncate">@{user.username}
                      {turma && <span className="ml-2 text-purple-400">· {turma.name}</span>}
                    </p>
                  </div>

                  <div className="text-right shrink-0 mr-2">
                    <p className={`font-black text-lg leading-none ${pos === 0 ? 'text-yellow-400' : 'text-white'}`}>
                      {user.totalScore} <span className="text-xs font-semibold text-gray-500">pts</span>
                    </p>
                    <p className="text-gray-600 text-xs mt-0.5">{user.quizCount} prova{user.quizCount !== 1 ? 's' : ''}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setConfirmReset(user.id)}
                      className="w-8 h-8 bg-red-600/20 hover:bg-red-600/40 border border-red-500/20 hover:border-red-500/40 text-red-400 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                      title="Zerar pontuação"
                    >
                      <RotateCcw size={13} />
                    </button>
                    <button
                      onClick={() => setExpandedUser(isExpanded ? null : user.id)}
                      className="w-8 h-8 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/20 hover:border-purple-500/40 text-purple-400 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                      title="Ver histórico"
                    >
                      {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/5 px-5 py-4">
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">Histórico de Provas</p>
                        {history.length === 0 ? (
                          <p className="text-gray-600 text-sm">Nenhuma prova registrada.</p>
                        ) : (
                          <div className="flex flex-col gap-2">
                            {history.map((q, j) => (
                              <div key={j} className="flex items-center justify-between bg-white/3 border border-white/5 rounded-xl px-4 py-3">
                                <div>
                                  <p className="text-white text-sm font-semibold">{q.quiz_name ?? `Prova #${j + 1}`}</p>
                                  <p className="text-gray-500 text-xs">{new Date(q.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                </div>
                                <span className="text-purple-400 font-black text-base">{q.score} <span className="text-gray-500 text-xs font-semibold">pts</span></span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      )}

      <AnimatePresence>
        {confirmReset && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60"
              onClick={() => setConfirmReset(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-[#0f0d1a] border border-red-500/30 rounded-2xl p-6 w-full max-w-sm flex flex-col gap-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-black text-base">
                      {confirmReset === 'all' ? 'Zerar ranking completo?' : 'Zerar pontuação do aluno?'}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                      {confirmReset === 'all'
                        ? 'Todas as pontuações e histórico de provas serão apagados permanentemente.'
                        : 'Todo o histórico de provas deste aluno será apagado permanentemente.'}
                    </p>
                  </div>
                  <button onClick={() => setConfirmReset(null)} className="text-gray-500 hover:text-white cursor-pointer ml-4 shrink-0">
                    <X size={18} />
                  </button>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setConfirmReset(null)}
                    className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-sm font-bold py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => confirmReset === 'all' ? handleResetAll() : handleResetUser(confirmReset)}
                    disabled={resetting}
                    className="flex-1 bg-red-600/80 hover:bg-red-600 text-white text-sm font-bold py-2.5 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                  >
                    {resetting ? 'Zerando...' : 'Confirmar'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}