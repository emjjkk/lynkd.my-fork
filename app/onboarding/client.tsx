"use client"
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  FaArrowRight,
  FaCheck,
  FaWandMagicSparkles,
  FaShop,
  FaCameraRotate,
  FaPeopleGroup,
  FaCircleXmark,
  FaCircleCheck,
} from "react-icons/fa6"

export default function OnboardingClient(props: any) {
  const t = props.t
  const [user, setUser] = useState<any>(null)
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTheme, setSelectedTheme] = useState<string>("default")
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        router.push("/login")
      } else {
        setUser(data.user)
      }
    }
    fetchUser()
  }, [supabase, router])

  const checkUsernameAvailability = async (slug: string) => {
    if (!slug) {
      setUsernameAvailable(null)
      return
    }
    const { data } = await supabase
      .from("users")
      .select("id")
      .eq("username", slug)
      .single()

    setUsernameAvailable(!data)
  }

  const handleNext = () => {
    if (step === steps.length - 1) {
      handleComplete()
    } else {
      setStep(prev => prev + 1)
    }
  }
  const handleBack = () => { setStep(prev => prev - 1) }

  const handleComplete = async () => {
    if (!user || !username || usernameAvailable !== true || !selectedCategory) return

    setLoading(true)
    try {
      // Update user profile
      const { error } = await supabase.from("users").upsert({
        user_id: user.id,
        username: username.toLowerCase(),
        upgraded: false,
        visibility: 'public',
        current_theme: selectedTheme,
        page_data: {
          display_name: user.user_metadata?.full_name || user.email,
          bio: "A Lynkd.my user",
          links: {
            0: {
              title: "My Website",
              url: "https://example.com",
              icon: "globe",
              order: 0,
            },
            1: {
              title: "My GitHub",
              url: "https://github.com",
              icon: "github",
              order: 1,
            },
          },
        },
       })

      if(error) throw error

      // Redirect to dashboard
      router.push(`/${username}`)
      } catch (error) {
        console.error("Error completing onboarding:", error)
      } finally {
        setLoading(false)
      }
    }

  const themes = [
      { id: "default", name: "Default", bgColor: "bg-gradient-to-br from-indigo-500 to-purple-600" },
      { id: "minimal", name: "Minimal", bgColor: "bg-gradient-to-br from-gray-100 to-gray-300" },
      { id: "dark", name: "Dark Mode", bgColor: "bg-gradient-to-br from-gray-800 to-gray-900" },
      { id: "nature", name: "Nature", bgColor: "bg-gradient-to-br from-green-500 to-teal-600" },
      { id: "sunset", name: "Sunset", bgColor: "bg-gradient-to-br from-orange-500 to-pink-600" },
      { id: "ocean", name: "Ocean", bgColor: "bg-gradient-to-br from-blue-400 to-blue-700" },
    ]

    const steps = [
      // Step 0: Welcome
      <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
        <h1 className="text-2xl font-semibold mb-1">Welcome, {user?.user_metadata?.full_name || user?.email}!</h1>
        <p className="text-md text-color-secondary mb-5">Let's get you set up. This will only take a minute.</p>
        <Button size="sm" className='bg-ly-green' onClick={handleNext}>Get started</Button>
      </motion.div>,

      // Step 1: User type
      <motion.div key="user-type" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
        <h1 className="text-2xl font-semibold mb-5">Which category describes you best?</h1>
        <div className="grid grid-cols-2 grid-rows-2 gap-2 max-w-2xl mb-5">
          {[
            {
              id: "creator",
              icon: <FaCameraRotate className="text-2xl text-[#1cff00] mb-2" />,
              title: "Content Creators & Influencers",
              desc: "The people grinding on social media. One platform can't hold all their rizz. They've got merch, donation links, new vids, collabs, affiliate links.",
            },
            {
              id: "business",
              icon: <FaShop className="text-2xl text-[#1cff00] mb-2" />,
              title: "Businesses and Entrepreneurs",
              desc: "From solo hustlepreneurs to small business squads. They're promoting products, booking services, pushing newsletters, or even taking crypto payments.",
            },
            {
              id: "creative",
              icon: <FaWandMagicSparkles className="text-2xl text-[#1cff00] mb-2" />,
              title: "Artists, Designers & Developers",
              desc: "Creatives who use multiple platforms to show off their work. Their work is everywhere—Dribbble, Behance, GitHub, maybe even SoundCloud or Bandcamp.",
            },
            {
              id: "community",
              icon: <FaPeopleGroup className="text-2xl text-[#1cff00] mb-2" />,
              title: "Community Builders & Educators",
              desc: "Anyone building a niche group or course. They've got communities to manage, tools to share, and events to promote.",
            },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-left rounded-lg p-4 shadow-sm border transition-all duration-200 ${selectedCategory === cat.id
                ? "border-[#1cff00] bg-[#e7ffe7] dark:bg-[#003300]"
                : "border-none bg-[#fff] dark:bg-[#000]"
                }`}
            >
              {cat.icon}
              <h1 className="text-lg font-bold mb-2">{cat.title}</h1>
              <p className="text-[11px] text-slate-600 dark:text-slate-200">{cat.desc}</p>
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleBack}>Back</Button>
          <Button size="sm" className='bg-ly-green' onClick={handleNext} disabled={!selectedCategory}>
            Next
          </Button>
        </div>
      </motion.div>,

      // Step 2: Theme selection
      <motion.div key="theme" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center w-full">
        <h1 className="text-2xl font-semibold mb-1">Pick a theme to start with</h1>
        <p className="text-md text-color-secondary mb-5">You can always change this later, of course.</p>
        <div className="grid grid-cols-3 gap-4 max-w-2xl mb-8">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`flex flex-col items-center ${selectedTheme === theme.id ? 'ring-2 ring-ly-green' : ''}`}
            >
              <div className={`w-32 h-32 rounded-lg ${theme.bgColor} mb-2`}></div>
              <span className="text-sm">{theme.name}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleBack}>Back</Button>
          <Button size="sm" className='bg-ly-green' onClick={handleNext}>
            Next
          </Button>
        </div>
      </motion.div>,

      // Step 3: Username
      <motion.div
        key="username"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold mb-1">Choose your Lynkd.my URL</h1>
        <p className="text-md text-color-secondary mb-5">This will be your unique link to share with your audience.</p>

        <div className="relative w-full mb-8">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none bg-bg-secondary">
            <span className="text-gray-500">lynkd.my/</span>
          </div>
          <Input
            type="text"
            className="pl-28 bg-bg-secondary border-none"
            placeholder="username"
            value={username}
            onChange={(e) => {
              const value = e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '')
              setUsername(value)
              checkUsernameAvailability(value)
            }}
          />
          <div className="absolute right-2 top-2">
            {usernameAvailable === true && <FaCircleCheck className="text-green-500 text-xl" />}
            {usernameAvailable === false && <FaCircleXmark className="text-red-500 text-xl" />}
          </div>
        </div>

        {usernameAvailable === false && (
          <p className="text-red-500 text-sm mb-4">This username is already taken. Please try another one.</p>
        )}
        {usernameAvailable === true && (
          <p className="text-green-500 text-sm mb-4">This username is available!</p>
        )}

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleBack}>Back</Button>
          <Button
            size="sm"
            className='bg-ly-green'
            onClick={handleNext}
            disabled={!username || usernameAvailable !== true}
          >
            {loading ? "Creating..." : "Complete Setup"}
          </Button>
        </div>
      </motion.div>
    ]

    return (
      <div className="min-h-screen bg-bg-main flex items-center justify-center relative bg-animate">
        <div className="flex items-center absolute top-4 left-4">
          <Image
            src="/assets/images/logo-100.png"
            alt="Lynkd.my"
            width={40}
            height={40}
            className="mr-2 w-5"
          />
          <h1 className="text-lg font-bold">Lynkd<span className="text-ly-green">.</span>my</h1>
        </div>

        <div className="absolute top-4 right-4">
          <p className="text-lg text-slate-500">{step + 1}/4</p>
        </div>

        <AnimatePresence mode="wait">
          {steps[step]}
        </AnimatePresence>
      </div>
    )
  }