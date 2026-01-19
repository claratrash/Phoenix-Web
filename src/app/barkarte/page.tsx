import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { FaCocktail, FaBeer, FaWineGlass, FaPizzaSlice } from 'react-icons/fa'

export default function BarkartePage() {
  const categories = [
    {
      title: 'Cocktails',
      icon: FaCocktail,
      description: 'Große Auswahl alkoholischer und alkoholfreier Cocktails',
      items: [
        'Mojito', 'Caipirinha', 'Piña Colada', 'Sex on the Beach',
        'Cuba Libre', 'Whiskey Sour', 'Negroni', 'Bellini',
        'und viele mehr...'
      ]
    },
    {
      title: 'Biere',
      icon: FaBeer,
      description: '2 Biere vom Fass und etliche Flaschenbiere',
      items: [
        "Beck's vom Fass",
        'Verschiedene Flaschenbiere',
        'Craft Beer Auswahl'
      ]
    },
    {
      title: 'Weine',
      icon: FaWineGlass,
      description: 'Gute Weinauswahl',
      items: [
        'Rotweine', 'Weißweine', 'Roséweine',
        'Sekt & Prosecco'
      ]
    },
    {
      title: 'Snacks & Speisen',
      icon: FaPizzaSlice,
      description: 'Leckere Snacks für den Hunger zwischendurch',
      items: [
        'Ofenfrische Baguettes',
        'Selbstgemachte Minipizzen',
        'Nachos',
        'Verschiedene Snacks'
      ]
    },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-20 px-4 bg-neutral-950">
        <div className="max-w-6xl mx-auto py-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">
              Unsere Barkarte
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-gold-500 mx-auto mb-6"></div>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              Entdecke unsere vielfältige Auswahl an Cocktails, Bieren, Weinen und leckeren Snacks
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <div
                  key={index}
                  className="bg-neutral-900 rounded-lg p-8 border border-neutral-800 hover:border-primary-500 transition-colors"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-primary-500/20 rounded-lg">
                      <Icon className="text-3xl text-primary-500" />
                    </div>
                    <h2 className="font-display text-2xl font-bold text-white">
                      {category.title}
                    </h2>
                  </div>
                  <p className="text-neutral-400 mb-6">{category.description}</p>
                  <ul className="space-y-2">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="text-neutral-300 flex items-center space-x-2">
                        <span className="text-primary-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          {/* Info Box */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg p-8 text-center">
            <h2 className="font-display text-3xl font-bold text-white mb-4">
              Vollständige Barkarte vor Ort
            </h2>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Unsere vollständige Barkarte mit allen Getränken, Preisen und detaillierten 
              Beschreibungen findest du bei uns vor Ort. Wir freuen uns auf deinen Besuch!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+4917623473297"
                className="px-8 py-3 bg-white hover:bg-neutral-100 text-primary-600 rounded-lg font-semibold transition-colors"
              >
                Anrufen
              </a>
              <a
                href="/reservierung"
                className="px-8 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg font-semibold transition-colors"
              >
                Tisch reservieren
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
