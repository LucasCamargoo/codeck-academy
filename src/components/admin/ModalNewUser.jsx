import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Lock, BookOpen, Eye, EyeOff } from 'lucide-react'

function ModalNewUser({ onClose, onSave, classes }) {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
    class_id: '',
  })

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    if (!form.name || !form.username || !form.password) {
      alert('Preencha todos os campos obrigatórios.')
      return
    }
    onSave({
      ...form,
      class_id: form.class_id && form.class_id !== '' ? form.class_id : null
    })
    onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center px-4"
        style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative bg-[#0f0d1a] border border-purple-500/30 rounded-3xl p-8 w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute -inset-px bg-linear-to-br from-purple-600 to-cyan-500 rounded-3xl blur-2xl opacity-10 pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col gap-1 mb-8">
            <h2 className="text-white text-xl font-black">Novo Usuário</h2>
            <p className="text-gray-500 text-sm">Preencha os dados do aluno.</p>
          </div>

          <div className="flex flex-col gap-4">

            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">
                Nome completo
              </label>
              <div className="relative">
                <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="João da Silva"
                  className="w-full bg-white/5 border border-white/10 focus:border-purple-500/60 rounded-xl px-4 py-3 pl-10 text-white text-sm outline-none transition-colors placeholder:text-gray-600"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">
                Usuário
              </label>
              <div className="relative">
                <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  placeholder="joao.silva"
                  className="w-full bg-white/5 border border-white/10 focus:border-purple-500/60 rounded-xl px-4 py-3 pl-10 text-white text-sm outline-none transition-colors placeholder:text-gray-600"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">
                Senha
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 focus:border-purple-500/60 rounded-xl px-4 py-3 pl-10 pr-10 text-white text-sm outline-none transition-colors placeholder:text-gray-600"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">
                Turma
              </label>
              <div className="relative">
                <BookOpen size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <select
                  value={form.class_id}
                  onChange={(e) => handleChange('class_id', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-purple-500/60 rounded-xl px-4 py-3 pl-10 text-white text-sm outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#0f0d1a]">Selecione uma turma</option>
                  {classes.map((c) => (
                    <option key={c.id} value={c.id} className="bg-[#0f0d1a]">{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-2">
              <button
                onClick={onClose}
                className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 font-bold py-3 rounded-xl text-sm transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
                className="flex-1 bg-linear-to-r from-purple-600 to-fuchsia-600 text-white font-black py-3 rounded-xl text-sm cursor-pointer hover:opacity-90 transition-opacity"
              >
                Salvar
              </motion.button>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ModalNewUser