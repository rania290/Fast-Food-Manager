"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, Plus, Save, Trash2, ShieldCheck } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Données de menu simulées (les mêmes que dans la page menu)
const initialMenuItems = [
  { id: "1", name: "Burger Classic", price: 8.99, category: "Burgers" },
  { id: "2", name: "Burger Cheese", price: 9.99, category: "Burgers" },
  { id: "3", name: "Burger Double", price: 12.99, category: "Burgers" },
  { id: "4", name: "Frites", price: 3.99, category: "Accompagnements" },
  { id: "5", name: "Onion Rings", price: 4.99, category: "Accompagnements" },
  { id: "6", name: "Coca-Cola", price: 2.99, category: "Boissons" },
  { id: "7", name: "Eau Minérale", price: 1.99, category: "Boissons" },
  { id: "8", name: "Milkshake Vanille", price: 4.99, category: "Desserts" },
  { id: "9", name: "Sundae Chocolat", price: 3.99, category: "Desserts" },
]

// Commandes simulées
const initialOrders = [
  {
    id: "1",
    date: "2023-05-15",
    time: "12:30",
    items: [
      { id: "1", name: "Burger Classic", price: 8.99, quantity: 2 },
      { id: "4", name: "Frites", price: 3.99, quantity: 2 },
      { id: "6", name: "Coca-Cola", price: 2.99, quantity: 2 },
    ],
    total: 29.94,
    status: "completed",
  },
  {
    id: "2",
    date: "2023-05-15",
    time: "13:45",
    items: [
      { id: "3", name: "Burger Double", price: 12.99, quantity: 1 },
      { id: "5", name: "Onion Rings", price: 4.99, quantity: 1 },
      { id: "7", name: "Eau Minérale", price: 1.99, quantity: 1 },
    ],
    total: 19.97,
    status: "completed",
  },
  {
    id: "3",
    date: "2023-05-16",
    time: "18:20",
    items: [
      { id: "2", name: "Burger Cheese", price: 9.99, quantity: 3 },
      { id: "4", name: "Frites", price: 3.99, quantity: 3 },
      { id: "8", name: "Milkshake Vanille", price: 4.99, quantity: 3 },
    ],
    total: 56.91,
    status: "completed",
  },
]

type MenuItem = {
  id: string
  name: string
  price: number
  category: string
}

type OrderItem = {
  id: string
  name: string
  price: number
  quantity: number
}

type Order = {
  id: string
  date: string
  time: string
  items: OrderItem[]
  total: number
  status: "pending" | "completed" | "cancelled"
}

export default function AdminPage() {
  const router = useRouter()
  const { user, isAuthenticated, isAdmin } = useAuth()
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems)
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [newItem, setNewItem] = useState<Omit<MenuItem, "id">>({
    name: "",
    price: 0,
    category: "",
  })

  // Rediriger si non authentifié ou non admin
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    } else if (!isAdmin) {
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas les droits d'administrateur",
        variant: "destructive",
      })
      router.push("/")
    }
  }, [isAuthenticated, isAdmin, router])

  const filteredOrders = orders.filter((order) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      order.id.toLowerCase().includes(searchLower) ||
      order.date.includes(searchLower) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchLower))
    )
  })

  const handleSaveMenuItem = () => {
    if (editingItem) {
      setMenuItems((prev) => prev.map((item) => (item.id === editingItem.id ? editingItem : item)))
      setEditingItem(null)
      toast({
        title: "Produit modifié",
        description: `${editingItem.name} a été mis à jour`,
      })
    }
  }

  const handleDeleteMenuItem = (id: string) => {
    const itemToDelete = menuItems.find((item) => item.id === id)
    if (!itemToDelete) return

    setMenuItems((prev) => prev.filter((item) => item.id !== id))
    toast({
      title: "Produit supprimé",
      description: `${itemToDelete.name} a été supprimé du menu`,
    })
  }

  const handleAddMenuItem = () => {
    if (!newItem.name || !newItem.category || newItem.price <= 0) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs correctement",
        variant: "destructive",
      })
      return
    }

    const newId = (Math.max(...menuItems.map((item) => Number.parseInt(item.id))) + 1).toString()
    const itemToAdd = { ...newItem, id: newId }

    setMenuItems((prev) => [...prev, itemToAdd])
    setNewItem({ name: "", price: 0, category: "" })

    toast({
      title: "Produit ajouté",
      description: `${newItem.name} a été ajouté au menu`,
    })
  }

  if (!isAuthenticated || !isAdmin) {
    return null
  }

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

          <h1 className="text-3xl font-bold text-amber-900">Administration</h1>

          <div className="flex items-center px-3 py-1 bg-amber-50 border border-amber-200 rounded-full">
            <ShieldCheck className="h-5 w-5 mr-2 text-amber-700" />
            <span className="text-amber-900">{user?.name}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <Tabs defaultValue="menu">
          <TabsList className="mb-6">
            <TabsTrigger value="menu">Gestion du Menu</TabsTrigger>
            <TabsTrigger value="orders">Historique des Commandes</TabsTrigger>
          </TabsList>

          <TabsContent value="menu">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ajouter un produit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-name">Nom du produit</Label>
                      <Input
                        id="new-name"
                        value={newItem.name}
                        onChange={(e) => setNewItem((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-price">Prix (€)</Label>
                      <Input
                        id="new-price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={newItem.price || ""}
                        onChange={(e) =>
                          setNewItem((prev) => ({ ...prev, price: Number.parseFloat(e.target.value) || 0 }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-category">Catégorie</Label>
                      <Input
                        id="new-category"
                        value={newItem.category}
                        onChange={(e) => setNewItem((prev) => ({ ...prev, category: e.target.value }))}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleAddMenuItem}>
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter au menu
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Produits du menu</CardTitle>
                </CardHeader>
                <CardContent className="max-h-[400px] overflow-y-auto">
                  <div className="space-y-4">
                    {menuItems.map((item) => (
                      <div key={item.id} className="p-3 border rounded-md">
                        {editingItem?.id === item.id ? (
                          <div className="space-y-2">
                            <Input
                              value={editingItem.name}
                              onChange={(e) =>
                                setEditingItem((prev) => (prev ? { ...prev, name: e.target.value } : null))
                              }
                            />
                            <div className="flex gap-2">
                              <Input
                                type="number"
                                step="0.01"
                                min="0"
                                value={editingItem.price}
                                onChange={(e) =>
                                  setEditingItem((prev) =>
                                    prev ? { ...prev, price: Number.parseFloat(e.target.value) || 0 } : null,
                                  )
                                }
                              />
                              <Input
                                value={editingItem.category}
                                onChange={(e) =>
                                  setEditingItem((prev) => (prev ? { ...prev, category: e.target.value } : null))
                                }
                              />
                            </div>
                            <Button size="sm" onClick={handleSaveMenuItem}>
                              <Save className="mr-2 h-4 w-4" />
                              Enregistrer
                            </Button>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {item.price.toFixed(2)}€ - {item.category}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" onClick={() => setEditingItem(item)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500"
                                onClick={() => handleDeleteMenuItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Historique des commandes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="Rechercher une commande..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {filteredOrders.length === 0 ? (
                    <p className="text-center text-muted-foreground">Aucune commande trouvée</p>
                  ) : (
                    filteredOrders.map((order) => (
                      <Card key={order.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-lg">Commande #{order.id}</CardTitle>
                            <span className="text-sm text-muted-foreground">
                              {order.date} à {order.time}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between">
                                <span>
                                  {item.quantity}x {item.name}
                                </span>
                                <span>{(item.price * item.quantity).toFixed(2)}€</span>
                              </div>
                            ))}
                            <div className="flex justify-between font-bold pt-2 border-t">
                              <span>Total</span>
                              <span>{order.total.toFixed(2)}€</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Toaster />
    </div>
  )
}

