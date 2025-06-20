import { useState } from 'react'
import { supabase } from '../lib/supabase'

type Props = {
  onAdd: () => void
}

export default function AddLinkForm({ onAdd }: Props) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [category, setCategory] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !url) return
    const { error } = await supabase.from('links').insert({ title, url, category })
    if (!error) {
      setTitle('')
      setUrl('')
      setCategory('')
      onAdd()
    } else {
      alert(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        className="border px-2 py-1 w-full"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border px-2 py-1 w-full"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <input
        className="border px-2 py-1 w-full"
        placeholder="Categoria"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
        Adicionar
      </button>
    </form>
  )
}
