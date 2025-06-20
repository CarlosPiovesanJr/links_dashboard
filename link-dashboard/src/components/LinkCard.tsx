import { supabase } from '../lib/supabase'

export type Link = {
  id: string
  title: string
  url: string
  category: string
}

type Props = {
  link: Link
  onChange: () => void
}

export default function LinkCard({ link, onChange }: Props) {
  const handleDelete = async () => {
    const { error } = await supabase.from('links').delete().eq('id', link.id)
    if (error) alert(error.message)
    else onChange()
  }

  return (
    <div className="border p-2 flex justify-between items-center">
      <div>
        <a href={link.url} target="_blank" rel="noopener" className="font-medium">
          {link.title}
        </a>
        {link.category && (
          <span className="text-sm text-gray-500 ml-2">[{link.category}]</span>
        )}
      </div>
      <button
        onClick={handleDelete}
        className="text-sm text-red-500 hover:underline"
      >
        Excluir
      </button>
    </div>
  )
}
