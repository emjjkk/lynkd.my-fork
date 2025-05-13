"use client"
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
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

const THEMES = [
  {
    id: 'default',
    name: 'Default',
    thumbnail: '/assets/themes/default.png'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    thumbnail: '/assets/themes/minimal.png'
  },
  {
    id: 'dark',
    name: 'Dark',
    thumbnail: '/assets/themes/dark.png'
  }
]

export default function OnboardingClient(props: any) {
  return(
    <></>
  )
}