import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Utensils, Users, ShieldCheck, ClipboardList } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-16 text-center">
          <div className="inline-block p-4 mb-4 rounded-full bg-primary/10">
            <Utensils className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-5xl font-extrabold text-amber-900 mb-3 tracking-tight">Fast Food Manager</h1>
          <p className="text-xl text-amber-700 max-w-md mx-auto">Système de gestion complet pour votre restaurant</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <Link href="/menu" className="block">
            <Card className="h-full card-hover border-2 border-amber-100 overflow-hidden">
              <div className="h-2 bg-primary"></div>
              <CardContent className="p-8 flex flex-col items-center justify-center text-center">
                <div className="p-4 rounded-full bg-primary/10 mb-6">
                  <Utensils className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-amber-900 mb-3">Menu</h2>
                <p className="text-amber-700">Gérer les commandes et le menu de votre restaurant</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/services" className="block">
            <Card className="h-full card-hover border-2 border-amber-100 overflow-hidden">
              <div className="h-2 bg-accent"></div>
              <CardContent className="p-8 flex flex-col items-center justify-center text-center">
                <div className="p-4 rounded-full bg-accent/10 mb-6">
                  <Users className="h-12 w-12 text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-amber-900 mb-3">Services</h2>
                <p className="text-amber-700">Gestion du personnel et des horaires de travail</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin" className="block">
            <Card className="h-full card-hover border-2 border-amber-100 overflow-hidden">
              <div className="h-2 bg-primary"></div>
              <CardContent className="p-8 flex flex-col items-center justify-center text-center">
                <div className="p-4 rounded-full bg-primary/10 mb-6">
                  <ShieldCheck className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-amber-900 mb-3">Admin</h2>
                <p className="text-amber-700">Paramètres et configuration du système</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/historique" className="block">
            <Card className="h-full card-hover border-2 border-amber-100 overflow-hidden">
              <div className="h-2 bg-accent"></div>
              <CardContent className="p-8 flex flex-col items-center justify-center text-center">
                <div className="p-4 rounded-full bg-accent/10 mb-6">
                  <ClipboardList className="h-12 w-12 text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-amber-900 mb-3">Historique</h2>
                <p className="text-amber-700">Consulter l'historique des commandes</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <footer className="mt-20 text-center text-amber-700 text-sm">
          <p>© {new Date().getFullYear()} Fast Food Manager. Tous droits réservés.</p>
        </footer>
      </div>
    </div>
  )
}

