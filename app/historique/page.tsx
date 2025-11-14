"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar, Search } from "lucide-react"

// Commandes simulées (les mêmes que dans la page admin)
const orders = [
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

export default function HistoriquePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("all")

  // Obtenir les dates uniques pour le filtre
  const uniqueDates = Array.from(new Set(orders.map((order) => order.date)))

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesDate = dateFilter === "all" || order.date === dateFilter

    return matchesSearch && matchesDate
  })

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
          <h1 className="text-3xl font-bold text-amber-900">Historique des Commandes</h1>
          <div className="w-8"></div> {/* Spacer pour centrer le titre */}
        </div>
      </header>

      <main className="container mx-auto p-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filtres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une commande..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="w-full md:w-64">
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger>
                    <Calendar className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filtrer par date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les dates</SelectItem>
                    {uniqueDates.map((date) => (
                      <SelectItem key={date} value={date}>
                        {date}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Aucune commande trouvée</p>
              </CardContent>
            </Card>
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
      </main>
    </div>
  )
}

