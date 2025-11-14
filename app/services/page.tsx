"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Clock, LogIn, UserCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Données simulées pour les serveurs
const servers = [
  { id: "1", name: "Jean Dupont" },
  { id: "2", name: "Marie Martin" },
  { id: "3", name: "Pierre Durand" },
]

type TimeEntry = {
  id: string
  serverId: string
  serverName: string
  startTime: string
  endTime: string | null
  date: string
}

export default function ServicesPage() {
  const { user, login, isAuthenticated } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [selectedServer, setSelectedServer] = useState("")
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
  const [loginError, setLoginError] = useState("")

  const handleLogin = async () => {
    setLoginError("")
    const success = await login(username, password)
    if (!success) {
      setLoginError("Identifiants incorrects")
    }
  }

  const handleStartShift = () => {
    if (!selectedServer) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un serveur",
        variant: "destructive",
      })
      return
    }

    const server = servers.find((s) => s.id === selectedServer)
    if (!server) return

    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      serverId: server.id,
      serverName: server.name,
      startTime: new Date().toLocaleTimeString(),
      endTime: null,
      date: new Date().toLocaleDateString(),
    }

    setTimeEntries((prev) => [...prev, newEntry])

    toast({
      title: "Service commencé",
      description: `${server.name} a commencé son service à ${newEntry.startTime}`,
    })
  }

  const handleEndShift = (entryId: string) => {
    setTimeEntries((prev) =>
      prev.map((entry) => (entry.id === entryId ? { ...entry, endTime: new Date().toLocaleTimeString() } : entry)),
    )

    const entry = timeEntries.find((e) => e.id === entryId)
    if (entry) {
      toast({
        title: "Service terminé",
        description: `${entry.serverName} a terminé son service`,
      })
    }
  }

  const activeShifts = timeEntries.filter((entry) => entry.endTime === null)
  const completedShifts = timeEntries.filter((entry) => entry.endTime !== null)

  return (
    <div className="min-h-screen bg-amber-50">
      <header className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 text-amber-900 hover:text-amber-700 hover:bg-amber-100">
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
          </Link>

          <h1 className="text-3xl font-bold text-amber-900">Services</h1>

          <div>
            {isAuthenticated ? (
              <div className="flex items-center px-3 py-1 bg-amber-50 border border-amber-200 rounded-full">
                <UserCircle className="h-5 w-5 mr-2 text-amber-700" />
                <span className="text-amber-900">{user?.name}</span>
              </div>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="border-amber-300 bg-white hover:bg-amber-50">
                    <LogIn className="mr-2 h-4 w-4 text-amber-700" />
                    Connexion
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Connexion</DialogTitle>
                    <DialogDescription>
                      Connectez-vous pour accéder aux fonctionnalités de gestion du personnel
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Nom d'utilisateur</Label>
                      <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {loginError && <p className="text-sm text-red-500">{loginError}</p>}
                  </div>
                  <DialogFooter>
                    <Button onClick={handleLogin}>Se connecter</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Enregistrer le temps de travail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="server">Sélectionner un serveur</Label>
                  <Select value={selectedServer} onValueChange={setSelectedServer}>
                    <SelectTrigger id="server">
                      <SelectValue placeholder="Sélectionner un serveur" />
                    </SelectTrigger>
                    <SelectContent>
                      {servers.map((server) => (
                        <SelectItem key={server.id} value={server.id}>
                          {server.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleStartShift}>Commencer le service</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Services en cours</CardTitle>
            </CardHeader>
            <CardContent>
              {activeShifts.length === 0 ? (
                <p className="text-muted-foreground">Aucun service en cours</p>
              ) : (
                <div className="space-y-4">
                  {activeShifts.map((entry) => (
                    <div key={entry.id} className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <p className="font-medium">{entry.serverName}</p>
                        <p className="text-sm text-muted-foreground">
                          Début: {entry.startTime} - {entry.date}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleEndShift(entry.id)}>
                        Terminer
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {completedShifts.length > 0 && (
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Services terminés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completedShifts.map((entry) => (
                    <div key={entry.id} className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <p className="font-medium">{entry.serverName}</p>
                        <p className="text-sm text-muted-foreground">
                          {entry.date}: {entry.startTime} - {entry.endTime}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Toaster />
    </div>
  )
}

