import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, BookOpen, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'

const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

function CalendarPopup({ value, onChange, onClose }) {
  const today = new Date()
  const selected = value ? new Date(value + 'T00:00:00') : null
  const [viewDate, setViewDate] = useState(selected || today)

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const selectDay = (day) => {
    const iso = new Date(year, month, day).toISOString().split('T')[0]
    onChange(iso)
    onClose()
  }

  const isSelected = (day) => selected &&
    selected.getFullYear() === year &&
    selected.getMonth() === month &&
    selected.getDate() === day

  const isToday = (day) => today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day

  return (
    <div
      className="absolute top-full left-0 mt-2 z-[300] bg-[#0f0d1a] border border-purple-500/30 rounded-2xl p-4 shadow-2xl shadow-purple-900/30 w-72"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setViewDate(new Date(year, month - 1, 1)) }}
          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <ChevronLeft size={14} />
        </button>
        <span className="text-white text-sm font-bold">{MONTHS[month]} {year}</span>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setViewDate(new Date(year, month + 1, 1)) }}
          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-gray-600 text-xs font-bold py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {[...Array(firstDay)].map((_, i) => <div key={`e-${i}`} />)}
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1
          return (
            <button
              key={day}
              type="button"
              onClick={(e) => { e.stopPropagation(); selectDay(day) }}
              className={`w-full aspect-square rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center
                ${isSelected(day)
                  ? 'bg-purple-600 text-white'
                  : isToday(day)
                  ? 'bg-white/10 text-purple-400 border border-purple-500/40'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function DateInput({ label, value, onChange }) {
  const [open, setOpen] = useState(false)

  const formatted = value
    ? new Date(value + 'T00:00:00').toLocaleDateString('pt-BR')
    : ''

  return (
    <div className="flex flex-col gap-2 relative">
      <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">{label}</label>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setOpen(!open) }}
        className="w-full bg-white/5 border border-white/10 hover:border-purple-500/40 rounded-xl px-4 py-3 text-left text-sm transition-colors cursor-pointer flex items-center gap-3"
      >
        <CalendarDays size={15} className="text-gray-500 shrink-0" />
        <span className={formatted ? 'text-white' : 'text-gray-600'}>
          {formatted || 'Selecionar data'}
        </span>
      </button>

      {open && (
        <CalendarPopup
          value={value}
          onChange={onChange}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  )
}

function ModalNewClass({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: '',
    module: '',
    start_date: '',
    end_date: '',
  })

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    if (!form.name || !form.module) {
      alert('Preencha todos os campos obrigatórios.')
      return
    }
    onSave({
      ...form,
      start_date: form.start_date || null,
      end_date: form.end_date || null,
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
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
              <BookOpen size={18} className="text-purple-400" />
            </div>
            <div>
              <h2 className="text-white text-xl font-black">Nova Turma</h2>
              <p className="text-gray-500 text-sm">Preencha os dados da turma.</p>
            </div>
          </div>

          <div className="flex flex-col gap-5">

            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">
                Nome da Turma
              </label>
              <div className="relative">
                <BookOpen size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Turma 01 — 2025"
                  className="w-full bg-white/5 border border-white/10 focus:border-purple-500/60 rounded-xl px-4 py-3 pl-10 text-white text-sm outline-none transition-colors placeholder:text-gray-600"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">
                Módulo
              </label>
              <select
                value={form.module}
                onChange={(e) => handleChange('module', e.target.value)}
                className="w-full bg-white/5 border border-white/10 focus:border-purple-500/60 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors appearance-none cursor-pointer"
              >
                <option value="" className="bg-[#0f0d1a]">Selecione um módulo</option>
                <option value="Módulo 1 — Lógica com Python" className="bg-[#0f0d1a]">Módulo 1 — Lógica com Python</option>
                <option value="Módulo 2 — Back-end .NET" className="bg-[#0f0d1a]">Módulo 2 — Back-end .NET</option>
                <option value="Módulo 3 — Front-end React" className="bg-[#0f0d1a]">Módulo 3 — Front-end React</option>
                <option value="Módulo 4 — Desenvolvimento com IA" className="bg-[#0f0d1a]">Módulo 4 — Desenvolvimento com IA</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <DateInput
                label="Data de Início"
                value={form.start_date}
                onChange={(v) => handleChange('start_date', v)}
              />
              <DateInput
                label="Data de Término"
                value={form.end_date}
                onChange={(v) => handleChange('end_date', v)}
              />
            </div>

            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 font-bold py-3 rounded-xl text-sm transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <motion.button
                type="button"
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

export default ModalNewClass