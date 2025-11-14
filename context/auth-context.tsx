"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string
  role: "admin" | "server"
}

type AuthContextType = {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Dans une vraie application, cette vérification serait faite côté serveur
// Modifier les identifiants de l'administrateur
const mockUsers = [
  { id: "1", name: "Admin", role: "admin" as const, username: "admin", password: "123*" },
  { id: "2", name: "Serveur", role: "server" as const, username: "serveur", password: "serveur123" },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simuler une requête d'authentification
    const foundUser = mockUsers.find((u) => u.username === username && u.password === password)

    if (foundUser) {
      const { password, username, ...userInfo } = foundUser
      setUser(userInfo)
      localStorage.setItem("user", JSON.stringify(userInfo))
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

