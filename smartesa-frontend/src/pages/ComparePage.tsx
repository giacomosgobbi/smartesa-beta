import { useState, useEffect } from 'react'
import { Plus, X, Search, TrendingDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

interface Product {
  id: number
  name: string
  unit: string
  category: string
  prices: Record<string, number>
}

interface ComparisonItem {
  name: string
  unit: string
  price: number
}

interface ComparisonResult {
  supermarket: string
  total: number
  items: ComparisonItem[]
  notFound: string[]
}

interface ComparisonResponse {
  comparison: ComparisonResult[]
  cheapest: string
  itemsRequested: number
  itemsFound: number
}

export default function ComparePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [groceryList, setGroceryList] = useState<string[]>([])
  const [currentItem, setCurrentItem] = useState('')
  const [comparisonResults, setComparisonResults] = useState<ComparisonResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [suggestions, setSuggestions] = useState<Product[]>([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`)
      const data = await response.json()
      setProducts(data.products)
    } catch (err) {
      console.error('Error fetching products:', err)
    }
  }

  const handleInputChange = (value: string) => {
    setCurrentItem(value)
    if (value.length > 0) {
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5)
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }

  const addItem = (item: string) => {
    if (item.trim() && !groceryList.includes(item.trim())) {
      setGroceryList([...groceryList, item.trim()])
      setCurrentItem('')
      setSuggestions([])
    }
  }

  const removeItem = (index: number) => {
    setGroceryList(groceryList.filter((_, i) => i !== index))
  }

  const comparePrice = async () => {
    if (groceryList.length === 0) {
      setError('Please add at least one item to your grocery list')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_URL}/api/compare`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: groceryList }),
      })

      if (!response.ok) {
        throw new Error('Failed to compare prices')
      }

      const data = await response.json()
      setComparisonResults(data)
    } catch (err) {
      setError('Failed to compare prices. Please try again.')
      console.error('Error comparing prices:', err)
    } finally {
      setLoading(false)
    }
  }

  const getSavingsPercentage = (total: number, cheapestTotal: number) => {
    if (cheapestTotal === 0) return 0
    return Math.round(((total - cheapestTotal) / cheapestTotal) * 100)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Compare Prices</h1>
        <p className="text-gray-600">Create your grocery list and find the best prices across supermarkets</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Your Grocery List</CardTitle>
              <CardDescription>Add items to compare prices across supermarkets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        placeholder="Type a product name (e.g., Milk, Pasta, Apples)"
                        value={currentItem}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addItem(currentItem)
                          }
                        }}
                      />
                      {suggestions.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                          {suggestions.map((product) => (
                            <button
                              key={product.id}
                              className="w-full px-4 py-2 text-left hover:bg-gray-100 flex justify-between items-center"
                              onClick={() => addItem(product.name)}
                            >
                              <span>{product.name}</span>
                              <span className="text-sm text-gray-500">{product.unit}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button onClick={() => addItem(currentItem)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {groceryList.length > 0 && (
                  <div className="space-y-2">
                    {groceryList.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                      >
                        <span className="text-gray-900">{item}</span>
                        <button
                          onClick={() => removeItem(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {groceryList.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Search className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No items added yet. Start typing to add products!</p>
                  </div>
                )}

                <Button
                  onClick={comparePrice}
                  disabled={loading || groceryList.length === 0}
                  className="w-full"
                  size="lg"
                >
                  {loading ? 'Comparing...' : 'Compare Prices'}
                </Button>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          {comparisonResults ? (
            <div className="space-y-4">
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-green-800">Best Price Found!</CardTitle>
                    <TrendingDown className="h-6 w-6 text-green-600" />
                  </div>
                  <CardDescription className="text-green-700">
                    Shop at <strong>{comparisonResults.cheapest}</strong> for the lowest total price
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-800">
                    €{comparisonResults.comparison[0].total.toFixed(2)}
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    {comparisonResults.itemsFound} of {comparisonResults.itemsRequested} items found
                  </p>
                </CardContent>
              </Card>

              <div className="space-y-3">
                {comparisonResults.comparison.map((result, index) => {
                  const isFirst = index === 0
                  const savings = isFirst ? 0 : getSavingsPercentage(result.total, comparisonResults.comparison[0].total)
                  
                  return (
                    <Card key={result.supermarket} className={isFirst ? 'border-green-300' : ''}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">{result.supermarket}</CardTitle>
                            {isFirst && (
                              <Badge className="bg-green-600">Cheapest</Badge>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold">€{result.total.toFixed(2)}</div>
                            {!isFirst && savings > 0 && (
                              <div className="text-xs text-red-600">+{savings}%</div>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-1 text-sm">
                          {result.items.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="flex justify-between text-gray-600">
                              <span>{item.name} ({item.unit})</span>
                              <span>€{item.price.toFixed(2)}</span>
                            </div>
                          ))}
                          {result.items.length > 3 && (
                            <div className="text-gray-500 text-xs">
                              +{result.items.length - 3} more items
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12 text-gray-500">
                  <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">No comparison yet</p>
                  <p className="text-sm">Add items to your grocery list and click "Compare Prices"</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
