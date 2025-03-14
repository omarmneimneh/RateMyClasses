import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Star, StarHalf } from "lucide-react"
import type { Class } from "@/src/lib/types"
import { capitalizeWords } from "@/src/lib/utils"
interface ClassHeaderProps {
  classDetails: Class
}

export function getDifficultyLabel(rating: number): string {
  if (rating >= 4.5) return "Excellent"
  if (rating >= 4) return "Very Good"
  if (rating >= 3) return "Good"
  if (rating >= 2) return "Fair"
  if (rating > 0) return "Poor"
  return "Not Rated"
}

export function getDifficultyVariant(rating: number): "default" | "secondary" | "outline" | "destructive" {
  if (rating >= 4.5) return "default"
  if (rating >= 3.5) return "secondary"
  if (rating >= 2.5) return "outline"
  if (rating > 0) return "destructive"
  return "outline"
}

export default function ClassHeader({ classDetails }: ClassHeaderProps) {
  const className = capitalizeWords(classDetails.className);
  const classCode = classDetails.classCode.toUpperCase();
  const majorName = capitalizeWords(classDetails.majorName);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <Link href="/majors" className="text-sm text-gray-500 hover:underline">
          Majors
        </Link>
        <span className="text-sm text-gray-500">/</span>
        <Link href={`/majors/${majorName.toLowerCase()}`} className="text-sm text-gray-500 hover:underline">
          {majorName}
        </Link>
        <span className="text-sm text-gray-500">/</span>
        <span className="text-sm font-medium">{className}</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h1 className="text-3xl font-bold">
          {classCode}: {className}
        </h1>
        <Badge variant={getDifficultyVariant(classDetails.rating || 0)} className="w-fit">
          {getDifficultyLabel(classDetails.rating || 0)}
        </Badge>
      </div>

      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => {
          const rating = classDetails.rating || 0
          if (i < Math.floor(rating)) {
            return <Star key={i} className="h-5 w-5 fill-primary text-primary" />
          } else if (i === Math.floor(rating) && rating % 1 !== 0) {
            return <StarHalf key={i} className="h-5 w-5 fill-primary text-primary" />
          } else {
            return <Star key={i} className="h-5 w-5 text-gray-300" />
          }
        })}
        <span className="text-lg font-medium ml-1">{(classDetails.rating || 0).toFixed(1)}</span>
        <span className="text-sm text-gray-500 ml-1">({classDetails.reviewCount || 0} reviews)</span>
      </div>
    </div>
  )
}

