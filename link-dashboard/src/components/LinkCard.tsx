import type { Link } from '../types'

interface Props {
  link: Link
  onEdit: (link: Link) => void
  onDelete: (id: string) => void
}

export default function LinkCard({ link, onEdit, onDelete }: Props) {
  return (
    <div className="p-4 border rounded flex justify-between items-center">
      <div>
        <a href={link.url} target="_blank" className="font-bold hover:underline">
          {link.title}
        </a>
        <p className="text-sm text-gray-500">{link.category}</p>
      </div>
      <div className="space-x-2">
        <button onClick={() => onEdit(link)} className="text-blue-500">
          Editar
        </button>
        <button onClick={() => onDelete(link.id)} className="text-red-500">
          Excluir
        </button>
      </div>
    </div>
  )
}
