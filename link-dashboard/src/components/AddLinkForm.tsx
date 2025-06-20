import { useState } from 'react'
import type { FormEvent } from 'react'

interface Props {
  onSubmit: (data: { title: string; url: string; category: string }) => void
  initial?: { title: string; url: string; category: string }
  submitLabel?: string
}

export default function AddLinkForm({ onSubmit, initial, submitLabel = 'Adicionar' }: Props) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [url, setUrl] = useState(initial?.url ?? '')
  const [category, setCategory] = useState(initial?.category ?? '')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit({ title, url, category })
    setTitle('')
    setUrl('')
    setCategory('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        className="border p-2 w-full"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full"
        placeholder="Categoria"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {submitLabel}
      </button>
    </form>
  )
}
