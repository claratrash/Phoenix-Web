'use client'

import { useEffect, useState } from 'react'
import { FaFacebook, FaHeart, FaComment, FaShare } from 'react-icons/fa'

interface FacebookFeedProps {
  pageUrl?: string
  width?: number
  height?: number
  showRealFeed?: boolean
}

interface FacebookPost {
  id: string
  message: string
  created_time: string
  likes: number
  comments: number
  shares: number
  image?: string
}

// Demo-Posts wenn keine echten Posts verfügbar
const demoPost: FacebookPost[] = [
  {
    id: '1',
    message: '🍹 Heute Abend: Getränkebörse! Ab 19:00 Uhr bestimmt die Nachfrage den Preis. Kommt vorbei und sichert euch eure Lieblingscocktails zum besten Preis! 🎉',
    created_time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 45,
    comments: 8,
    shares: 3,
  },
  {
    id: '2',
    message: 'Valentinstag Special 💝\n\n3-Gänge-Cocktail-Menü ab 38€ p.P.\nReservierungen ab sofort möglich!\n\nFreut euch auf eine romantische Atmosphäre und exklusive Drinks! 🥂',
    created_time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 67,
    comments: 12,
    shares: 5,
  },
  {
    id: '3',
    message: 'Neuer Cocktail der Woche: Mango Paradise! 🥭🌴\n\nProbiert unsere neueste Kreation - perfekt für den Sommer! Kommt vorbei und genießt!',
    created_time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 89,
    comments: 15,
    shares: 7,
  },
]

export default function FacebookFeed({ 
  pageUrl = 'https://www.facebook.com/phoenixbar', 
  width = 500,
  height = 600,
  showRealFeed = false
}: FacebookFeedProps) {
  const [posts, setPosts] = useState<FacebookPost[]>(demoPost)
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    if (showRealFeed && typeof window !== 'undefined') {
      // Facebook SDK laden (nur wenn echte Posts gewünscht)
      if ((window as any).FB) {
        (window as any).FB.XFBML.parse()
      } else {
        const script = document.createElement('script')
        script.src = 'https://connect.facebook.net/de_DE/sdk.js#xfbml=1&version=v18.0'
        script.async = true
        script.defer = true
        script.crossOrigin = 'anonymous'
        document.body.appendChild(script)
      }
    }
  }, [showRealFeed])

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInHours < 24) {
      return `vor ${diffInHours} Stunden`
    } else if (diffInDays === 1) {
      return 'vor 1 Tag'
    } else if (diffInDays < 7) {
      return `vor ${diffInDays} Tagen`
    } else {
      return date.toLocaleDateString('de-DE', { day: '2-digit', month: 'short' })
    }
  }

  if (showRealFeed) {
    // Zeige echten Facebook Page Plugin
    return (
      <div className="bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800">
        <div className="bg-gradient-to-r from-[#1877F2] to-[#166fe5] p-4 flex items-center space-x-3">
          <FaFacebook className="text-3xl text-white" />
          <div>
            <h3 className="font-bold text-white text-lg">Facebook Feed</h3>
            <p className="text-xs text-blue-100">Phönix Cocktailbar</p>
          </div>
        </div>
        
        <div className="p-4 bg-neutral-800">
          <div
            className="fb-page"
            data-href={pageUrl}
            data-tabs="timeline"
            data-width={width}
            data-height={height}
            data-small-header="false"
            data-adapt-container-width="true"
            data-hide-cover="false"
            data-show-facepile="true"
          >
            <blockquote cite={pageUrl} className="fb-xfbml-parse-ignore">
              <a href={pageUrl} className="text-primary-500">
                Phönix Cocktailbar
              </a>
            </blockquote>
          </div>
        </div>
        
        <div className="p-4 border-t border-neutral-700">
          <a
            href={pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-lg font-semibold transition-colors w-full"
          >
            <FaFacebook size={20} />
            <span>Zur Facebook-Seite</span>
          </a>
        </div>
      </div>
    )
  }

  // Zeige eigenes Feed-Design mit Demo-Posts
  return (
    <div className="bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800">
      <div className="bg-gradient-to-r from-[#1877F2] to-[#166fe5] p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FaFacebook className="text-3xl text-white" />
          <div>
            <h3 className="font-bold text-white text-lg">Phönix Cocktailbar</h3>
            <p className="text-xs text-blue-100">@phoenixbar</p>
          </div>
        </div>
        <a
          href={pageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-semibold transition-colors"
        >
          Folgen
        </a>
      </div>
      
      <div className="divide-y divide-neutral-800 max-h-[600px] overflow-y-auto">
        {posts.map((post) => (
          <div key={post.id} className="p-4 hover:bg-neutral-800/50 transition-colors">
            <div className="flex items-start space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-gold-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white">Phönix Cocktailbar</p>
                <p className="text-xs text-neutral-400">{formatTimeAgo(post.created_time)}</p>
              </div>
            </div>
            
            <p className="text-neutral-300 text-sm mb-3 whitespace-pre-wrap">
              {post.message}
            </p>
            
            {post.image && (
              <div className="mb-3 rounded-lg overflow-hidden">
                <img src={post.image} alt="Post" className="w-full" />
              </div>
            )}
            
            <div className="flex items-center justify-between pt-3 border-t border-neutral-800">
              <button className="flex items-center space-x-2 text-neutral-400 hover:text-primary-500 transition-colors">
                <FaHeart />
                <span className="text-sm">{post.likes}</span>
              </button>
              <button className="flex items-center space-x-2 text-neutral-400 hover:text-primary-500 transition-colors">
                <FaComment />
                <span className="text-sm">{post.comments}</span>
              </button>
              <button className="flex items-center space-x-2 text-neutral-400 hover:text-primary-500 transition-colors">
                <FaShare />
                <span className="text-sm">{post.shares}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-neutral-800 border-t border-neutral-700">
        <a
          href={pageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-lg font-semibold transition-colors w-full"
        >
          <FaFacebook size={20} />
          <span>Mehr auf Facebook</span>
        </a>
      </div>
    </div>
  )
}
