"use client"

import { useState } from "react"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Plus, Minus, ShoppingCart, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Toaster } from "@/components/ui/toaster"

// Données de menu simulées
const menuItems = [
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

// Grouper les éléments du menu par catégorie
const groupedMenu = menuItems.reduce(
  (acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  },
  {} as Record<string, typeof menuItems>,
)

export default function MenuPage() {
  const { items, addItem, removeItem, updateQuantity, clearCart, totalPrice } = useCart()
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  const handleAddToCart = (id: string, name: string, price: number) => {
    const quantity = quantities[id] || 1
    addItem({ id, name, price, quantity })
    setQuantities((prev) => ({ ...prev, [id]: 0 }))

    toast({
      title: "Produit ajouté",
      description: `${name} a été ajouté au panier`,
      action: <ToastAction altText="Voir panier">Voir panier</ToastAction>,
    })
  }

  const handleQuantityChange = (id: string, delta: number) => {
    const currentQty = quantities[id] || 0
    const newQty = Math.max(0, currentQty + delta)
    setQuantities((prev) => ({ ...prev, [id]: newQty }))
  }

  const handleConfirmOrder = () => {
    if (items.length === 0) {
      toast({
        title: "Panier vide",
        description: "Veuillez ajouter des produits au panier",
        variant: "destructive",
      })
      return
    }

    // Dans une vraie application, on enverrait la commande au serveur ici
    toast({
      title: "Commande confirmée",
      description: `Commande de ${items.length} produit(s) pour un total de ${totalPrice.toFixed(2)}€`,
    })

    clearCart()
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

          <h1 className="text-3xl font-bold text-amber-900">Menu</h1>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="relative border-amber-300 bg-white hover:bg-amber-50">
                <ShoppingCart className="h-5 w-5 text-amber-700" />
                {items.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white">
                    {items.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Votre panier</SheetTitle>
              </SheetHeader>

              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[50vh]">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Votre panier est vide</p>
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <div className="flex items-center mt-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{(item.price * item.quantity).toFixed(2)}€</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 mt-1 text-red-500"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Separator className="my-4" />

                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{totalPrice.toFixed(2)}€</span>
                  </div>
                </div>
              )}

              <SheetFooter className="mt-6 flex-col space-y-2 sm:space-y-2">
                <SheetClose asChild>
                  <Button className="w-full" onClick={handleConfirmOrder} disabled={items.length === 0}>
                    Confirmer commande
                  </Button>
                </SheetClose>
                <Button variant="outline" className="w-full" onClick={clearCart} disabled={items.length === 0}>
                  Vider panier
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groupedMenu).map(([category, items]) => (
            <div key={category} className="space-y-4">
              <h2 className="text-xl font-semibold text-amber-800 border-b border-amber-200 pb-2">{category}</h2>

              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-amber-700 font-medium">{item.price.toFixed(2)}€</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        min="0"
                        value={quantities[item.id] || 0}
                        onChange={(e) =>
                          setQuantities((prev) => ({
                            ...prev,
                            [item.id]: Number.parseInt(e.target.value) || 0,
                          }))
                        }
                        className="w-14 mx-2 text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      onClick={() => handleAddToCart(item.id, item.name, item.price)}
                      disabled={(quantities[item.id] || 0) === 0}
                    >
                      Ajouter
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ))}
        </div>
      </main>
      <Toaster />
    </div>
  )
}

