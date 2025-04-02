import {Header, Footer} from "@/src/app/components/lib/Layout"
import SignInScreen from '@/src/app/components/auth/SignInScreen';
import { Sign } from "crypto";
export default function Login(){
    return(
        <div className="flex flex-col min-h-screen">
            <Header />
            {/* <main className="flex items-center justify-center flex-grow space-x-2">
                <p>Under Development</p>
                <svg
                className="ml-1 size-5 animate-spin text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
                </svg>
            </main> */}
            <SignInScreen />
            <Footer />
        </div>
    )
}