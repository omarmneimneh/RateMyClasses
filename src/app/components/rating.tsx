import { TabsContent } from "@radix-ui/react-tabs";
import {Button} from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {Meh, Angry, Frown, Smile, SmilePlus, Star} from "lucide-react"
import { useState } from "react"

export default function Rating(){
    const emojis = [
        {rating: 1, Icon: Angry, color: "fill-red-500"},
        {rating: 2, Icon: Frown, color: "fill-orange-500"},
        {rating: 3, Icon: Meh, color: "fill-yellow-500"},
        {rating: 4, Icon: Smile, color: "fill-lime-500"},
        {rating: 5, Icon: SmilePlus, color:"fill-green-500"}
    ]
    const [enjoymentIndex, setEnjoymentIndex] = useState<number | null>(null);
    const [difficulty, setDifficuly] = useState<number | null>(null);
    return (
            <TabsContent value="rate" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Rate This Class</CardTitle>
                    <CardDescription>Share your experience with other students</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>

                        <p className="text-sm font-medium mb-2">How much did you enjoy this class?</p>
                        <div className="flex items-center gap-2">
                            {emojis.map(({ rating, Icon, color }) => (
                                <Icon
                                key={rating}
                                className={`h-8 w-8 cursor-pointer transition-colors ${
                                    enjoymentIndex === rating ? color : "text-gray-300"
                                }`}
                                onClick={() => setEnjoymentIndex(rating)}
                                />
                            ))}
                        </div>

                        <p className="text-sm font-medium mb-2">How difficult was this class?</p>
                        <div className="grid grid-cols-2 gap-4">
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) =>{ 
                            if (e.target.value !== "") {
                                setDifficuly(parseInt(e.target.value));
                            } else {
                                setDifficuly(null);
                            }}}>
                                    <option value="">Select Difficulty</option>
                                    <option value="1">1: Too easy</option>
                                    <option value="2">2: Easy</option>
                                    <option value="3">3: Medium</option>
                                    <option value="4">4: Hard</option>
                                    <option value="5">5: Too Hard</option>
                            </select>
                        </div>
                        
                    </div>

                    <div>
                    <p className="text-sm font-medium mb-2">Your Review</p>
                    <Textarea placeholder="Share your experience with this class..." className="min-h-[120px]" />
                    </div>

                    <div>
                        <p className="text-sm font-medium mb-2">When did you take this class?</p>
                        <div className="grid grid-cols-2 gap-4">
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            <option value="">Select Semester</option>
                            <option value="Fall">Fall</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                            </select>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            <option value="">Select Year</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                            </select>
                        </div>
                    </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Submit Review</Button>
                    </CardFooter>
                    </Card>
                </TabsContent>
    )
}


