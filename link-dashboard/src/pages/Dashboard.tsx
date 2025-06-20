import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import LinkCard, { type Link } from '../components/LinkCard'
import AddLinkForm from '../components/AddLinkForm'

export default function Dashboard() {
  const navigate = useNavigate()
  const [links, setLinks] = useState<Link[]>([])

  const fetchLinks = async () => {
    const { data, error } = await supabase.from('links').select('*').order('created_at', { ascending: false })
    if (error) alert(error.message)
    else setLinks(data as Link[])
  }

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate('/')
    })
    fetchLinks()
  }, [navigate])
  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Seus Links</h1>
        <button onClick={handleLogout} className="text-sm text-red-500 hover:underline">
          Sair
        </button>
      </div>
      <AddLinkForm onAdd={fetchLinks} />
      <div className="space-y-2">
        {links.map((link) => (
          <LinkCard key={link.id} link={link} onChange={fetchLinks} />
        ))}
      </div>
    </div>
  )
}
