"use client"

import { useEffect, useRef } from "react"
import { getAuth, OAuthProvider, signInWithCredential } from "firebase/auth"
import { useRouter } from "next/navigation"


interface AppleAuthButtonProps {
  onSuccess?: () => void
  onError?: (error: Error) => void
  onLoading?: (isLoading: boolean) => void
}

declare global {
  interface Window {
    AppleID: {
      auth: {
        init: (config: {
          clientId: string
          scope: string
          redirectURI: string
          state: string
          usePopup: boolean
        }) => void
        signIn: () => Promise<{
          authorization: {
            code: string
            id_token: string
            state: string
          }
        }>
      }
    }
  }
}

export function AppleAuthButton({ onSuccess, onError, onLoading }: AppleAuthButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const auth = getAuth()

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
    script.async = true
    script.onload = initializeAppleAuth
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  })

  const initializeAppleAuth = () => {
    if (window.AppleID) {
      window.AppleID.auth.init({
        clientId: "com.your-app.client",
        scope: "name email",
        redirectURI: window.location.origin,
        state: "firebase",
        usePopup: true,
      })

      // Add click handler to the button
      if (buttonRef.current) {
        buttonRef.current.addEventListener("click", handleAppleSignIn)
      }
    }
  }

  const handleAppleSignIn = async () => {
    try {
      onLoading?.(true)

      // Trigger Apple's sign-in flow
      const response = await window.AppleID.auth.signIn()

      // Create an OAuthProvider for Apple
      const provider = new OAuthProvider("apple.com")

      // Create a credential using the token
      const credential = provider.credential({
        idToken: response.authorization.id_token,
      })

      // Sign in with the credential
      await signInWithCredential(auth, credential)

      onSuccess?.()
      router.refresh()
    } catch (error) {
      console.error("Apple sign in error:", error)
      onError?.(error as Error)
    } finally {
      onLoading?.(false)
    }
  }

  return (
    <div
      ref={buttonRef}
      id="appleid-signin"
      className="h-10 w-full cursor-pointer"
      data-color="black"
      data-border="true"
      data-type="sign in"
    />
  )
}
