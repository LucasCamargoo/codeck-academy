import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Video, FileText, Plus, X, BookOpen, Clock, Trash2, Pencil, Upload } from 'lucide-react'

function ModalNewLesson({ onClose, onSave, classes }) {
  const [form, setForm] = useState({ title: '', description: '', class_id: '', module: '', duration: '' })

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleSave = () => {
    if (!form.title || !form.module) { alert('Preencha os campos obrigatórios.'); return }
    onSave({ ...form, id: Date.now() })
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white cursor-pointer"><X size={20} /></button>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
            <Video size={18} className="text-purple-400" />
          </div>
          <div>
            <h2 className="text-white text-xl font-black">Nova Aula</h2>
            <p className="text-gray-500 text-sm">Adicione uma aula gravada.</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {[
            { label: 'Título da Aula', field: 'title', placeholder: 'Ex: Introdução ao Python' },
            { label: 'Descrição', field: 'description', placeholder: 'Descreva o conteúdo da aula' },
            { label: 'Duração', field: 'duration', placeholder: 'Ex: 1h 30min' },
          ].map((item) => (
            <div key={item.field} className="flex flex-col gap-2">
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">{item.label}</label>
              <input
                type="text"
                value={form[item.field]}
                onChange={(e) => handleChange(item.field, e.target.value)}
                placeholder={item.placeholder}
                className="w-full bg-white/5 border border-white/10 focus:border-purple-500/60 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-gray-600"
              />
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Módulo</label>
            <select value={form.module} onChange={(e) => handleChange('module', e.target.value)} className="w-full bg-white/5 border border-white/10 focus:border-purple-500/60 rounded-xl px-4 py-3 text-white text-sm outline-none appearance-none cursor-pointer">
              <option value="" className="bg-[#0f0d1a]">Selecione um módulo</option>
              <option value="Módulo 1 — Lógica com Python" className="bg-[#0f0d1a]">Módulo 1 — Lógica com Python</option>
              <option value="Módulo 2 — Back-end .NET" className="bg-[#0f0d1a]">Módulo 2 — Back-end .NET</option>
              <option value="Módulo 3 — Front-end React" className="bg-[#0f0d1a]">Módulo 3 — Front-end React</option>
              <option value="Módulo 4 — Desenvolvimento com IA" className="bg-[#0f0d1a]">Módulo 4 — Desenvolvimento com IA</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Turma</label>
            <select value={form.class_id} onChange={(e) => handleChange('class_id', e.target.value)} className="w-full bg-white/5 border border-white/10 focus:border-purple-500/60 rounded-xl px-4 py-3 text-white text-sm outline-none appearance-none cursor-pointer">
              <option value="" className="bg-[#0f0d1a]">Todas as turmas</option>
              {classes.map((c) => <option key={c.id} value={c.id} className="bg-[#0f0d1a]">{c.name}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Upload do Vídeo</label>
            <div className="w-full bg-white/5 border border-dashed border-white/20 hover:border-purple-500/40 rounded-xl px-4 py-6 flex flex-col items-center gap-2 cursor-pointer transition-colors">
              <Upload size={24} className="text-gray-500" />
              <p className="text-gray-500 text-sm">Clique para selecionar o vídeo</p>
              <p className="text-gray-600 text-xs">MP4, MOV até 2GB</p>
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <button onClick={onClose} className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 font-bold py-3 rounded-xl text-sm transition-all cursor-pointer">Cancelar</button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleSave} className="flex-1 bg-linear-to-r from-purple-600 to-fuchsia-600 text-white font-black py-3 rounded-xl text-sm cursor-pointer hover:opacity-90 transition-opacity">Salvar</motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ModalNewExam({ onClose, onSave, classes }) {
  const [form, setForm] = useState({ title: '', description: '', class_id: '', module: '', status: 'draft' })

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleSave = () => {
    if (!form.title || !form.module) { alert('Preencha os campos obrigatórios.'); return }
    onSave({ ...form, id: Date.now() })
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white cursor-pointer"><X size={20} /></button>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
            <FileText size={18} className="text-cyan-400" />
          </div>
          <div>
            <h2 className="text-white text-xl font-black">Nova Prova</h2>
            <p className="text-gray-500 text-sm">Crie uma prova para os alunos.</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {[
            { label: 'Título da Prova', field: 'title', placeholder: 'Ex: Prova 1 — Lógica' },
            { label: 'Descrição', field: 'description', placeholder: 'Descreva o conteúdo da prova' },
          ].map((item) => (
            <div key={item.field} className="flex flex-col gap-2">
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">{item.label}</label>
              <input
                type="text"
                value={form[item.field]}
                onChange={(e) => handleChange(item.field, e.target.value)}
                placeholder={item.placeholder}
                className="w-full bg-white/5 border border-white/10 focus:border-purple-500/60 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-gray-600"
              />
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Módulo</label>
            <select value={form.module} onChange={(e) => handleChange('module', e.target.value)} className="w-full bg-white/5 border border-white/10 focus:border-purple-500/60 rounded-xl px-4 py-3 text-white text-sm outline-none appearance-none cursor-pointer">
              <option value="" className="bg-[#0f0d1a]">Selecione um módulo</option>
              <option value="Módulo 1 — Lógica com Python" className="bg-[#0f0d1a]">Módulo 1 — Lógica com Python</option>
              <option value="Módulo 2 — Back-end .NET" className="bg-[#0f0d1a]">Módulo 2 — Back-end .NET</option>
              <option value="Módulo 3 — Front-end React" className="bg-[#0f0d1a]">Módulo 3 — Front-end React</option>
              <option value="Módulo 4 — Desenvolvimento com IA" className="bg-[#0f0d1a]">Módulo 4 — Desenvolvimento com IA</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Turma</label>
            <select value={form.class_id} onChange={(e) => handleChange('class_id', e.target.value)} className="w-full bg-white/5 border border-white/10 focus:border-purple-500/60 rounded-xl px-4 py-3 text-white text-sm outline-none appearance-none cursor-pointer">
              <option value="" className="bg-[#0f0d1a]">Todas as turmas</option>
              {classes.map((c) => <option key={c.id} value={c.id} className="bg-[#0f0d1a]">{c.name}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Status</label>
            <select value={form.status} onChange={(e) => handleChange('status', e.target.value)} className="w-full bg-white/5 border border-white/10 focus:border-purple-500/60 rounded-xl px-4 py-3 text-white text-sm outline-none appearance-none cursor-pointer">
              <option value="draft" className="bg-[#0f0d1a]">Rascunho</option>
              <option value="published" className="bg-[#0f0d1a]">Publicada</option>
            </select>
          </div>

          <div className="flex gap-3 mt-2">
            <button onClick={onClose} className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 font-bold py-3 rounded-xl text-sm transition-all cursor-pointer">Cancelar</button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleSave} className="flex-1 bg-linear-to-r from-cyan-600 to-purple-600 text-white font-black py-3 rounded-xl text-sm cursor-pointer hover:opacity-90 transition-opacity">Salvar</motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Content({ classes }) {
  const [activeTab, setActiveTab] = useState('lessons')
  const [lessons, setLessons] = useState([])
  const [exams, setExams] = useState([])
  const [showNewLesson, setShowNewLesson] = useState(false)
  const [showNewExam, setShowNewExam] = useState(false)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">

      <div>
        <h2 className="text-white text-2xl font-black mb-1">Conteúdo</h2>
        <p className="text-gray-500 text-sm">Gerencie aulas e provas da academia.</p>
      </div>

      <div className="flex items-center gap-2 bg-[#0f0d1a] border border-white/5 rounded-2xl p-1.5 w-fit">
        {[
          { id: 'lessons', label: 'Aulas', icon: <Video size={15} /> },
          { id: 'exams', label: 'Provas', icon: <FileText size={15} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-purple-600/20 border border-purple-500/30 text-purple-400'
                : 'text-gray-500 hover:text-white'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'lessons' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">{lessons.length} aula{lessons.length !== 1 ? 's' : ''} cadastrada{lessons.length !== 1 ? 's' : ''}</p>
            <button onClick={() => setShowNewLesson(true)} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer">
              <Plus size={15} /> Nova Aula
            </button>
          </div>

          {lessons.length === 0 ? (
            <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-10 flex flex-col items-center gap-4 text-center">
              <Video size={32} className="text-purple-400" />
              <p className="text-white font-bold">Nenhuma aula cadastrada</p>
              <p className="text-gray-500 text-sm">Adicione a primeira aula para os alunos.</p>
              <button onClick={() => setShowNewLesson(true)} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer">
                <Plus size={15} /> Nova Aula
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {lessons.map((lesson) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6 flex flex-col gap-3 hover:border-purple-500/30 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0">
                      <Video size={16} className="text-purple-400" />
                    </div>
                    <div className="flex gap-2">
                      <button className="w-7 h-7 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center cursor-pointer">
                        <Pencil size={12} />
                      </button>
                      <button onClick={() => setLessons((prev) => prev.filter((l) => l.id !== lesson.id))} className="w-7 h-7 bg-red-600/20 hover:bg-red-600/40 border border-red-500/20 text-red-400 rounded-lg flex items-center justify-center cursor-pointer">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-black text-sm">{lesson.title}</h3>
                    {lesson.description && <p className="text-gray-500 text-xs mt-1">{lesson.description}</p>}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {lesson.duration && (
                      <span className="flex items-center gap-1 text-gray-500 text-xs">
                        <Clock size={11} /> {lesson.duration}
                      </span>
                    )}
                    {lesson.module && (
                      <span className="bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs px-2 py-0.5 rounded-lg">
                        {lesson.module.split('—')[0].trim()}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'exams' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">{exams.length} prova{exams.length !== 1 ? 's' : ''} cadastrada{exams.length !== 1 ? 's' : ''}</p>
            <button onClick={() => setShowNewExam(true)} className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer">
              <Plus size={15} /> Nova Prova
            </button>
          </div>

          {exams.length === 0 ? (
            <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-10 flex flex-col items-center gap-4 text-center">
              <FileText size={32} className="text-cyan-400" />
              <p className="text-white font-bold">Nenhuma prova cadastrada</p>
              <p className="text-gray-500 text-sm">Crie a primeira prova para os alunos.</p>
              <button onClick={() => setShowNewExam(true)} className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer">
                <Plus size={15} /> Nova Prova
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {exams.map((exam) => (
                <motion.div
                  key={exam.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6 flex flex-col gap-3 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
                      <FileText size={16} className="text-cyan-400" />
                    </div>
                    <div className="flex gap-2">
                      <button className="w-7 h-7 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center cursor-pointer">
                        <Pencil size={12} />
                      </button>
                      <button onClick={() => setExams((prev) => prev.filter((e) => e.id !== exam.id))} className="w-7 h-7 bg-red-600/20 hover:bg-red-600/40 border border-red-500/20 text-red-400 rounded-lg flex items-center justify-center cursor-pointer">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-black text-sm">{exam.title}</h3>
                    {exam.description && <p className="text-gray-500 text-xs mt-1">{exam.description}</p>}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-lg border ${
                      exam.status === 'published'
                        ? 'bg-green-500/15 border-green-500/30 text-green-400'
                        : 'bg-gray-500/15 border-gray-500/30 text-gray-400'
                    }`}>
                      {exam.status === 'published' ? 'Publicada' : 'Rascunho'}
                    </span>
                    {exam.module && (
                      <span className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs px-2 py-0.5 rounded-lg">
                        {exam.module.split('—')[0].trim()}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {showNewLesson && <ModalNewLesson onClose={() => setShowNewLesson(false)} onSave={(l) => setLessons((prev) => [...prev, l])} classes={classes} />}
        {showNewExam && <ModalNewExam onClose={() => setShowNewExam(false)} onSave={(e) => setExams((prev) => [...prev, e])} classes={classes} />}
      </AnimatePresence>

    </motion.div>
  )
}

export default Content