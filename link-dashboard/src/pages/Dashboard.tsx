import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Link as LinkType } from '../types'
import LinkCard from '../components/LinkCard'
import AddLinkForm from '../components/AddLinkForm'

export default function Dashboard() {
  const navigate = useNavigate()
  const [links, setLinks] = useState<LinkType[]>([])
  const [editing, setEditing] = useState<LinkType | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate('/login')
      } else {
        fetchLinks()
      }
    })
  }, [])

  const fetchLinks = async () => {
    const user = (await supabase.auth.getUser()).data.user
    if (!user) return
    const { data, error } = await supabase
      .from('links')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    if (!error && data) {
      setLinks(data)
    }
  }

  const addLink = async (values: { title: string; url: string; category: string }) => {
    const user = (await supabase.auth.getUser()).data.user
    if (!user) return
    const { data, error } = await supabase
      .from('links')
      .insert({ ...values, user_id: user.id })
      .select()
      .single()
    if (!error && data) {
      setLinks((prev) => [data, ...prev])
    }
  }

  const updateLink = async (values: { title: string; url: string; category: string }) => {
    if (!editing) return
    const { data, error } = await supabase
      .from('links')
      .update(values)
      .eq('id', editing.id)
      .select()
      .single()
    if (!error && data) {
      setLinks((prev) => prev.map((l) => (l.id === data.id ? data : l)))
      setEditing(null)
    }
  }

  const deleteLink = async (id: string) => {
    const { error } = await supabase.from('links').delete().eq('id', id)
    if (!error) {
      setLinks((prev) => prev.filter((l) => l.id !== id))
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Seus Links</h1>
        <button onClick={handleLogout} className="text-red-500">
          Sair
        </button>
      </div>
      {editing ? (
        <AddLinkForm
          onSubmit={updateLink}
          initial={editing}
          submitLabel="Salvar"
        />
      ) : (
        <AddLinkForm onSubmit={addLink} />
      )}
      <div className="space-y-2">
        {links.map((link) => (
          <LinkCard key={link.id} link={link} onEdit={setEditing} onDelete={deleteLink} />
        ))}
      </div>
    </div>
  )
}
