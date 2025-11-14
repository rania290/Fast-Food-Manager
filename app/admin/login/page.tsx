"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Lock, User, KeyRound } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const { login, isAuthenticated, isAdmin } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      router.push("/admin")
    }
  }, [isAuthenticated, isAdmin, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation des champs
    if (!username || !password) {
      setError("Veuillez remplir tous les champs")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      const success = await login(username, password)
      if (success) {
        router.push("/admin")
      } else {
        setError("Identifiants incorrects")
      }
    } catch (err) {
      setError("Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <Link href="/" className="absolute top-6 left-6">
        <Button variant="ghost" size="sm" className="gap-2 text-amber-900 hover:text-amber-700 hover:bg-amber-100">
          <ArrowLeft className="h-4 w-4" />
          Retour à l'accueil
        </Button>
      </Link>

      <Card className="w-full max-w-md border-2 border-amber-100 shadow-xl">
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
        <CardHeader className="space-y-1 pb-6">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-primary/10">
              <Lock className="h-12 w-12 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl text-center text-amber-900">Administration</CardTitle>
          <CardDescription className="text-center text-amber-700">
            Connectez-vous pour accéder à l'espace administrateur
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="username" className="text-amber-900">
                Nom d'utilisateur
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 border-amber-200 focus:border-primary"
                  placeholder="Entrez votre nom d'utilisateur"
                  required
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="password" className="text-amber-900">
                Mot de passe
              </Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 border-amber-200 focus:border-primary"
                  placeholder="Entrez votre mot de passe"
                  required
                />
              </div>
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">{error}</div>
            )}
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-primary hover:bg-primary/90 text-white" type="submit" disabled={isLoading}>
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

