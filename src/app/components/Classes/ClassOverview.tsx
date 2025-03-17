import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {TabsContent} from "@/components/ui/tabs"
import { BookOpen, Clock } from "lucide-react"
import {Class} from "@/src/lib/types"
import { capitalizeWords } from "@/src/lib/utils"
export default function ClassOverview({classDetails} : {classDetails: Class}) {
    return(
        <TabsContent value="overview" className="mt-4">
            <Card>
                <CardHeader>
                <CardTitle>Class Information</CardTitle>
                <CardDescription>Details about {classDetails.classCode.toUpperCase()}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-gray-500" />
                    <div>
                        <p className="text-sm font-medium">Department</p>
                        <p className="text-sm text-gray-500">{capitalizeWords(classDetails.majorName)}</p>
                    </div>
                    </div>
                    {/* <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                        <p className="text-sm font-medium">Semester Offered</p>
                        <p className="text-sm text-gray-500">{classDetails.semestersOffered.join(", ")}</p>
                    </div>
                    </div> */}
                    <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <div>
                        <p className="text-sm font-medium">Credits</p>
                        <p className="text-sm text-gray-500">{classDetails.credits}</p>
                    </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-medium mb-2">Description</h3>
                    <p className="text-gray-700 dark:text-gray-300">{classDetails.description}</p>
                </div>

                {/* <div>
                    <h3 className="text-lg font-medium mb-2">Prerequisites</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                    {classDetails.prerequisites.length > 0
                        ? classDetails.prerequisites.join(", ")
                        : "No prerequisites required"}
                    </p>
                </div> */}
                </CardContent>
            </Card>
        </TabsContent>
)}