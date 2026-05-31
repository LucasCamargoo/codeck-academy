import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, LogOut, Users, ChevronRight, BookOpen, Pencil, LayoutDashboard, GraduationCap, TrendingUp, Trash2, Search, Menu, X } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import ModalNewUser from './admin/ModalNewUser'
import ModalNewClass from './admin/ModalNewClass'
import ModalEditUser from './admin/ModalEditUser'
import ModalEditClass from './admin/ModalEditClass'
import { supabase } from '../lib/supabase'

function AdminPanel({ onLogout }) {
  const [activePage, setActivePage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showNewUser, setShowNewUser] = useState(false)
  const [showNewClass, setShowNewClass] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [editingClass, setEditingClass] = useState(null)
  const [users, setUsers] = useState([])
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchUser, setSearchUser] = useState('')

  useEffect(() => {
    fetchUsers()
    fetchClasses()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('users').select('*').order('created_at', { ascending: false })
    if (!error) setUsers(data)
    setLoading(false)
  }

  const fetchClasses = async () => {
    const { data, error } = await supabase.from('classes').select('*').order('created_at', { ascending: false })
    if (!error) setClasses(data)
  }

  const handleSaveUser = async (user) => {
    const { error } = await supabase.from('users').insert([user])
    if (!error) fetchUsers()
    else alert('Erro ao salvar usuário!')
  }

  const handleSaveClass = async (cls) => {
    const { error } = await supabase.from('classes').insert([cls])
    if (!error) fetchClasses()
    else alert('Erro ao salvar turma!')
  }

  const handleUpdateUser = async (id, data) => {
    const { error } = await supabase.from('users').update(data).eq('id', id)
    if (!error) fetchUsers()
    else alert('Erro ao atualizar usuário!')
  }

  const handleUpdateClass = async (id, data) => {
    const { error } = await supabase.from('classes').update(data).eq('id', id)
    if (!error) fetchClasses()
    else alert('Erro ao atualizar turma!')
  }

  const handleDeleteUser = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return
    const { error } = await supabase.from('users').delete().eq('id', id)
    if (!error) fetchUsers()
    else alert('Erro ao excluir usuário!')
  }

  const handleDeleteClass = async (id) => {
    if (!confirm('Tem certeza que deseja excluir esta turma?')) return
    const { error } = await supabase.from('classes').delete().eq('id', id)
    if (!error) fetchClasses()
    else alert('Erro ao excluir turma!')
  }

  const activeClasses = classes.filter((c) => {
    if (!c.end_date) return true
    return new Date(c.end_date) >= new Date()
  })

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
    u.username.toLowerCase().includes(searchUser.toLowerCase())
  )

  const usersByMonth = () => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    const counts = Array(12).fill(0)
    users.forEach((u) => {
      const month = new Date(u.created_at).getMonth()
      counts[month]++
    })
    return months.map((name, i) => ({ name, alunos: counts[i] }))
  }

  const usersByClass = classes.map((c) => ({
    name: c.name,
    value: users.filter((u) => u.class_id === c.id).length,
  })).filter((c) => c.value > 0)

  const PIE_COLORS = ['#7c3aed', '#06b6d4', '#ec4899', '#10b981', '#f59e0b']

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0f0d1a] border border-purple-500/30 rounded-xl px-4 py-3 text-sm">
          <p className="text-gray-400 mb-1">{label}</p>
          <p className="text-white font-black">{payload[0].value} alunos</p>
        </div>
      )
    }
    return null
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { id: 'users', label: 'Usuários', icon: <Users size={16} /> },
    { id: 'classes', label: 'Turmas', icon: <BookOpen size={16} /> },
  ]

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

      <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-xl px-3 py-2">
        <ShieldCheck size={14} className="text-purple-400" />
        <span className="text-purple-400 text-xs font-bold">Administrador</span>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-2">Menu</p>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigate(item.id)}
            className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activePage === item.id
                ? 'bg-purple-600/20 border border-purple-500/30 text-purple-400'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              {item.label}
            </div>
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
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
                <h1 className="text-white text-2xl font-black mb-1">Dashboard</h1>
                <p className="text-gray-500 text-sm">Visão geral da Codeck Academy.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Total de Alunos', value: users.length, icon: <Users size={20} />, trend: '+' + users.length },
                  { label: 'Turmas Ativas', value: activeClasses.length, icon: <BookOpen size={20} />, trend: activeClasses.length + ' ativas' },
                  { label: 'Total de Turmas', value: classes.length, icon: <GraduationCap size={20} />, trend: classes.length + ' cadastradas' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-5 flex items-center gap-4 hover:border-purple-500/20 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-semibold">{stat.label}</p>
                      <p className="text-white text-3xl font-black">{stat.value}</p>
                      <p className="text-purple-400 text-xs mt-0.5 flex items-center gap-1">
                        <TrendingUp size={10} /> {stat.trend}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
                  <div className="mb-6">
                    <h2 className="text-white font-black text-base">Alunos por Mês</h2>
                    <p className="text-gray-500 text-xs mt-0.5">Cadastros ao longo do ano</p>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={usersByMonth()} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorAlunos" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                      <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="alunos" stroke="#7c3aed" strokeWidth={2} fill="url(#colorAlunos)" dot={{ fill: '#7c3aed', strokeWidth: 0, r: 4 }} activeDot={{ r: 6, fill: '#a78bfa' }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6">
                  <div className="mb-6">
                    <h2 className="text-white font-black text-base">Alunos por Turma</h2>
                    <p className="text-gray-500 text-xs mt-0.5">Distribuição atual</p>
                  </div>
                  {usersByClass.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 gap-2">
                      <p className="text-gray-600 text-sm">Sem dados ainda</p>
                    </div>
                  ) : (
                    <>
                      <ResponsiveContainer width="100%" height={160}>
                        <PieChart>
                          <Pie data={usersByClass} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                            {usersByClass.map((_, index) => (
                              <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} alunos`]} contentStyle={{ background: '#0f0d1a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '12px', color: '#fff' }} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex flex-col gap-2 mt-4">
                        {usersByClass.map((item, i) => (
                          <div key={i} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                              <span className="text-gray-400 truncate max-w-28">{item.name}</span>
                            </div>
                            <span className="text-white font-bold">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                  <h2 className="text-white font-black text-base">Últimos Alunos</h2>
                  <button onClick={() => setActivePage('users')} className="text-purple-400 text-xs font-semibold hover:text-purple-300 transition-colors cursor-pointer">
                    Ver todos →
                  </button>
                </div>
                {users.length === 0 ? (
                  <div className="px-6 py-8 text-center text-gray-500 text-sm">Nenhum aluno cadastrado ainda.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[500px]">
                      <thead>
                        <tr className="border-b border-white/5">
                          <th className="text-left text-gray-500 font-semibold px-6 py-3">Nome</th>
                          <th className="text-left text-gray-500 font-semibold px-6 py-3">Usuário</th>
                          <th className="text-left text-gray-500 font-semibold px-6 py-3">Turma</th>
                          <th className="text-left text-gray-500 font-semibold px-6 py-3">Cadastrado em</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.slice(0, 5).map((user) => {
                          const turma = classes.find((c) => c.id === user.class_id)
                          return (
                            <tr key={user.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                              <td className="text-white px-6 py-3">{user.name}</td>
                              <td className="text-gray-400 px-6 py-3">{user.username}</td>
                              <td className="px-6 py-3">
                                {turma ? (
                                  <span className="bg-purple-500/15 border border-purple-500/20 text-purple-400 text-xs font-semibold px-2 py-1 rounded-lg">{turma.name}</span>
                                ) : (
                                  <span className="text-gray-600 text-xs">—</span>
                                )}
                              </td>
                              <td className="text-gray-500 px-6 py-3 text-xs">{new Date(user.created_at).toLocaleDateString('pt-BR')}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activePage === 'users' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-white text-2xl font-black mb-1">Usuários</h2>
                  <p className="text-gray-500 text-sm">Gerencie os acessos dos alunos.</p>
                </div>
                <button onClick={() => setShowNewUser(true)} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer">
                  + Novo
                </button>
              </div>

              <div className="relative">
                <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                  placeholder="Buscar por nome ou usuário..."
                  className="w-full bg-[#0f0d1a] border border-white/5 focus:border-purple-500/40 rounded-xl px-4 py-3 pl-10 text-white text-sm outline-none transition-colors placeholder:text-gray-600"
                />
              </div>

              {loading ? (
                <div className="text-gray-500 text-sm text-center py-10">Carregando...</div>
              ) : filteredUsers.length === 0 ? (
                <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-10 flex flex-col items-center gap-4 text-center">
                  <Users size={32} className="text-purple-400" />
                  <p className="text-white font-bold">Nenhum usuário encontrado</p>
                  <button onClick={() => setShowNewUser(true)} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer">
                    + Novo Usuário
                  </button>
                </div>
              ) : (
                <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[600px]">
                      <thead>
                        <tr className="border-b border-white/5">
                          <th className="text-left text-gray-500 font-semibold px-6 py-4">Nome</th>
                          <th className="text-left text-gray-500 font-semibold px-6 py-4">Usuário</th>
                          <th className="text-left text-gray-500 font-semibold px-6 py-4">Turma</th>
                          <th className="text-left text-gray-500 font-semibold px-6 py-4">Criado em</th>
                          <th className="text-left text-gray-500 font-semibold px-6 py-4">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => {
                          const turma = classes.find((c) => c.id === user.class_id)
                          return (
                            <tr key={user.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                              <td className="text-white px-6 py-4">{user.name}</td>
                              <td className="text-gray-400 px-6 py-4">{user.username}</td>
                              <td className="text-gray-400 px-6 py-4">{turma ? turma.name : '—'}</td>
                              <td className="text-gray-500 px-6 py-4 text-xs">{new Date(user.created_at).toLocaleDateString('pt-BR')}</td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <button onClick={() => setEditingUser(user)} className="w-8 h-8 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/20 hover:border-purple-500/40 text-purple-400 rounded-lg flex items-center justify-center transition-all cursor-pointer">
                                    <Pencil size={14} />
                                  </button>
                                  <button onClick={() => handleDeleteUser(user.id)} className="w-8 h-8 bg-red-600/20 hover:bg-red-600/40 border border-red-500/20 hover:border-red-500/40 text-red-400 rounded-lg flex items-center justify-center transition-all cursor-pointer">
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activePage === 'classes' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-white text-2xl font-black mb-1">Turmas</h2>
                  <p className="text-gray-500 text-sm">Gerencie as turmas da academia.</p>
                </div>
                <button onClick={() => setShowNewClass(true)} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer">
                  + Nova
                </button>
              </div>

              {classes.length === 0 ? (
                <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-10 flex flex-col items-center gap-4 text-center">
                  <BookOpen size={32} className="text-purple-400" />
                  <p className="text-white font-bold">Nenhuma turma cadastrada</p>
                  <button onClick={() => setShowNewClass(true)} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer">
                    + Nova Turma
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {classes.map((cls, i) => (
                    <motion.div
                      key={cls.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6 flex flex-col gap-4 hover:border-purple-500/30 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-white font-black text-base">{cls.name}</h3>
                          <p className="text-gray-500 text-xs mt-1">{cls.module}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setEditingClass(cls)} className="w-8 h-8 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/20 hover:border-purple-500/40 text-purple-400 rounded-lg flex items-center justify-center transition-all cursor-pointer shrink-0">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => handleDeleteClass(cls.id)} className="w-8 h-8 bg-red-600/20 hover:bg-red-600/40 border border-red-500/20 hover:border-red-500/40 text-red-400 rounded-lg flex items-center justify-center transition-all cursor-pointer shrink-0">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 text-xs text-gray-500">
                        {cls.start_date && <span>📅 Início: {new Date(cls.start_date + 'T00:00:00').toLocaleDateString('pt-BR')}</span>}
                        {cls.end_date && <span>📅 Término: {new Date(cls.end_date + 'T00:00:00').toLocaleDateString('pt-BR')}</span>}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <Users size={13} className="text-purple-400" />
                        {users.filter((u) => u.class_id === cls.id).length} alunos
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

        </div>
      </div>

      {showNewUser && <ModalNewUser onClose={() => setShowNewUser(false)} onSave={handleSaveUser} classes={classes} />}
      {showNewClass && <ModalNewClass onClose={() => setShowNewClass(false)} onSave={handleSaveClass} />}
      {editingUser && <ModalEditUser user={editingUser} classes={classes} onClose={() => setEditingUser(null)} onSave={handleUpdateUser} />}
      {editingClass && <ModalEditClass cls={editingClass} onClose={() => setEditingClass(null)} onSave={handleUpdateClass} />}

    </div>
  )
}

export default AdminPanel