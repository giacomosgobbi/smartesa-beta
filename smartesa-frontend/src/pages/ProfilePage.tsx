import { useState, useEffect } from 'react'
import { User, Save, MapPin, Heart, AlertCircle, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

interface UserProfile {
  name: string
  location: string
  preferences: string[]
  intolerances: string[]
  budget: string
}

const PREFERENCE_OPTIONS = ['organic', 'local', 'eco-friendly', 'fair-trade', 'seasonal']
const INTOLERANCE_OPTIONS = ['lactose', 'gluten', 'nuts', 'soy', 'eggs', 'shellfish']
const BUDGET_OPTIONS = ['low', 'medium', 'high']

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    location: '',
    preferences: [],
    intolerances: [],
    budget: 'medium'
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/api/profile`)
      const data = await response.json()
      setProfile(data)
    } catch (err) {
      setError('Failed to load profile')
      console.error('Error fetching profile:', err)
    } finally {
      setLoading(false)
    }
  }

  const saveProfile = async () => {
    setSaving(true)
    setMessage('')
    setError('')

    try {
      const response = await fetch(`${API_URL}/api/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      })

      if (!response.ok) {
        throw new Error('Failed to save profile')
      }

      const data = await response.json()
      setMessage('Profile saved successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setError('Failed to save profile. Please try again.')
      console.error('Error saving profile:', err)
    } finally {
      setSaving(false)
    }
  }

  const togglePreference = (pref: string) => {
    setProfile(prev => ({
      ...prev,
      preferences: prev.preferences.includes(pref)
        ? prev.preferences.filter(p => p !== pref)
        : [...prev.preferences, pref]
    }))
  }

  const toggleIntolerance = (intol: string) => {
    setProfile(prev => ({
      ...prev,
      intolerances: prev.intolerances.includes(intol)
        ? prev.intolerances.filter(i => i !== intol)
        : [...prev.intolerances, intol]
    }))
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Profile</h1>
        <p className="text-gray-600">Personalize your shopping experience with your preferences and dietary needs</p>
      </div>

      {message && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <AlertDescription className="text-green-800">{message}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              <CardTitle>Basic Information</CardTitle>
            </div>
            <CardDescription>Your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="location">Location (City)</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="location"
                  placeholder="e.g., Milan, Rome, Florence"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-600" />
              <CardTitle>Shopping Preferences</CardTitle>
            </div>
            <CardDescription>Select your preferred product types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {PREFERENCE_OPTIONS.map((pref) => (
                <Badge
                  key={pref}
                  variant={profile.preferences.includes(pref) ? 'default' : 'outline'}
                  className="cursor-pointer capitalize"
                  onClick={() => togglePreference(pref)}
                >
                  {pref}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <CardTitle>Dietary Intolerances</CardTitle>
            </div>
            <CardDescription>Let us know about any dietary restrictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {INTOLERANCE_OPTIONS.map((intol) => (
                <Badge
                  key={intol}
                  variant={profile.intolerances.includes(intol) ? 'default' : 'outline'}
                  className="cursor-pointer capitalize"
                  onClick={() => toggleIntolerance(intol)}
                >
                  {intol}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <CardTitle>Budget Preference</CardTitle>
            </div>
            <CardDescription>Set your typical shopping budget level</CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              value={profile.budget}
              onValueChange={(value) => setProfile({ ...profile, budget: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select budget level" />
              </SelectTrigger>
              <SelectContent>
                {BUDGET_OPTIONS.map((budget) => (
                  <SelectItem key={budget} value={budget} className="capitalize">
                    {budget}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            onClick={saveProfile}
            disabled={saving}
            size="lg"
            className="px-8"
          >
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Saving...' : 'Save Profile'}
          </Button>
        </div>

        <Alert className="bg-blue-50 border-blue-200">
          <AlertDescription className="text-blue-800">
            <strong>Beta Note:</strong> Profile data is stored in-memory only and will be reset when the server restarts. Future versions will include persistent storage.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
