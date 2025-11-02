import { Link } from 'react-router-dom'
import { ShoppingCart, TrendingDown, Users, Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <Compass className="h-16 w-16 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Smartesa
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your shopping compass for smarter grocery decisions. Compare prices across multiple supermarkets and save money on your entire grocery list.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <div className="flex justify-center mb-2">
              <ShoppingCart className="h-10 w-10 text-blue-600" />
            </div>
            <CardTitle className="text-center">Easy Comparison</CardTitle>
            <CardDescription className="text-center">
              Create your grocery list and instantly see which supermarket offers the best total price
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-center mb-2">
              <TrendingDown className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-center">Save Money</CardTitle>
            <CardDescription className="text-center">
              Compare prices across Lidl, Esselunga, Carrefour, MD, Iperal, and Coop
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-center mb-2">
              <Users className="h-10 w-10 text-purple-600" />
            </div>
            <CardTitle className="text-center">Personalized</CardTitle>
            <CardDescription className="text-center">
              Set your preferences, intolerances, and budget for a tailored shopping experience
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-600 font-bold mr-4">
              1
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Create Your Grocery List</h3>
              <p className="text-gray-600">Add all the items you need to buy, from milk to pasta to fresh produce.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-600 font-bold mr-4">
              2
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Compare Prices</h3>
              <p className="text-gray-600">We instantly compare your entire list across 6 major supermarkets.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-600 font-bold mr-4">
              3
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Save Money</h3>
              <p className="text-gray-600">See which supermarket offers the best total price and start saving!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link to="/compare">
          <Button size="lg" className="text-lg px-8 py-6">
            Start Comparing Prices
            <ShoppingCart className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>

      <div className="mt-12 text-center text-sm text-gray-500">
        <p>Beta Version - Currently using mock data for demonstration purposes</p>
      </div>
    </div>
  )
}
