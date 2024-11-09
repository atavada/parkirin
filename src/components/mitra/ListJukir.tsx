import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";


export const ListJukir = () => {

    return (
        <>
            <Card className="w-[250px] shadow-lg mx-[50px]">
                <CardHeader>
                    <CardTitle>Nama</CardTitle>
                    <CardDescription>Nomor.</CardDescription>
                </CardHeader>
                {/* <CardContent>
                    <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Name of your project" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="framework">Framework</Label>
                        </div>
                    </div>
                    </form>
                </CardContent> */}
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Terima</Button>
                    <Button>Tolak</Button>
                </CardFooter>
            </Card>
        </>
    )
};