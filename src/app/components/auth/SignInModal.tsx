/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signInWithPopup,
  browserLocalPersistence,
} from "firebase/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Lock, AlertCircle } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook, FaMicrosoft } from "react-icons/fa"
import { useAuth } from "@/src/app/components/auth/AuthProvider"

export function SignInModal() {
  const [open, setOpen] = useState(false)
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { user } = useAuth()
  const auth = getAuth()
  const googleProvider = new GoogleAuthProvider()
  const facebookProvider = new FacebookAuthProvider()
  const microsoftProvider = new OAuthProvider("microsoft.com")

  
  

  // Google authentication
  const handleGoogleSignIn = async () => {
    setError("")
    setIsLoading(true)
    console.log("Google sign in clicked")
    console.log(getAuth())
    try {
      await signInWithPopup(auth, googleProvider)
      setOpen(false)
      console.log(getAuth())
      auth.setPersistence(browserLocalPersistence) 
      router.refresh()
    } catch (error: any) {
      // Don't show error if user just closed the popup
      if (error.code !== "auth/popup-closed-by-user") {
        setError("Failed to sign in with Google. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Facebook authentication
  const handleFacebookSignIn = async () => {
    setError("")
    setIsLoading(true)

    try {
      await signInWithPopup(auth, facebookProvider)
      setOpen(false)
      router.refresh()
    } catch (error: any) {
      if (error.code !== "auth/popup-closed-by-user") {
        setError("Failed to sign in with Facebook. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Microsoft authentication
  const handleMicrosoftSignIn = async () => {
    setError("")
    setIsLoading(true)

    try {
      await signInWithPopup(auth, microsoftProvider)
      setOpen(false)
      router.refresh()
    } catch (error: any) {
      if (error.code !== "auth/popup-closed-by-user") {
        setError("Failed to sign in with Microsoft. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="cursor-pointer text-sm font-medium hover:underline underline-offset-4">Sign In</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <DialogHeader>
          <DialogTitle>Sign in to your account</DialogTitle>
        </DialogHeader>

        

        <form className="space-y-4 py-2">
          {/* <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In with Email"}
          </Button> */}

          <div className="w-full grid grid-rows-3 gap-4 justify-items-center">
            <Button
              type="button"
              variant="outline"
              className="w-3/4 bg-white hover:bg-gray-50 border-gray-300 text-gray-800"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <FcGoogle className="h-5 w-3.5 mr-2" />
              Sign in with Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-3/4 bg-white hover:bg-gray-50 border-gray-300 text-gray-800"
              onClick={handleFacebookSignIn}
              disabled={isLoading}
            >
              <FaFacebook className="h-5 w-5 mr-2 text-[#166FE5]" />
              Sign in with Facebook
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-3/4 bg-white hover:bg-gray-50 border-gray-300 text-gray-800"
              onClick={handleMicrosoftSignIn}
              disabled={isLoading}
            >
              <FaMicrosoft className="h-5 w-5 mr-2 text-[#00A4EF]" />
              Sign in with Microsoft
            </Button>
          </div>
        </form>

      </DialogContent>
    </Dialog>
  )
}
