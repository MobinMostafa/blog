

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import { routeIndex } from "@/helpers/routeName"
import { getEnv } from "@/helpers/getEnv"
import { showToast } from "@/helpers/showToast"
import { useDispatch } from "react-redux"
import { setUser } from "@/redux/user/user.slice"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"






function Profile({
  className,
  ...props
}){

 const dispatch = useDispatch()

 const navigate = useNavigate()

  const formSchema = z.object({
    name:z.string().min(3, {message: "Name must be 3 character long"}),
    email: z.string().email(),
    bio: z.string().min(3, {message: "Bio must be 3 characters long"}),
    password: z.string(),
  })
  


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
   async function onSubmit(values) {
     // Do something with the form values.
     try {
       const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/login`,{
           method: 'POST',
           headers: {'Content-Type': 'application/json'},
           credentials: 'include',
           body: JSON.stringify(values)
         }
       )
      
      const data = await response.json() 
       if(!response.ok){
         showToast('error', data.message)
         return
       }
       
       showToast('success', data.message)

       dispatch(setUser(data.user))
       navigate(routeIndex)
       // console.log(values)
     } catch (error) {
      return  showToast('error', error.message)
     }
   }

  return (
  <div className="flex flex-col gap-6 justify-center items-center">
      <Card className="md:w-[30rem] w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-xl"> Profile </CardTitle>
        </CardHeader>
        <CardContent>
        <div className="flex flex-col mb-5 justify-center items-center">
            <Avatar className='w-28 h-28'>
                <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
      
        </div>
        <Form  {...form}> 
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6">
          
              <div className="grid gap-6">
              <div className="grid gap-2">
                <FormField 
                  name="name"
                  render={({field})=> (
                  <FormItem> 

                   <Label htmlFor="name">Name</Label>
                   <Input id="name" type="text" placeholder="Enter your name" required {...field} />

                   <FormMessage />
                   </FormItem>
                )} /> 
                </div>
                <div className="grid gap-2">
                <FormField 
                  name="email"
                  render={({field})=> (
                  <FormItem> 

                   <Label htmlFor="email">Email</Label>
                   <Input id="email" type="email" placeholder="Enter your email" required {...field} />

                   <FormMessage />
                   </FormItem>
                )} /> 
                </div>
                <div className="grid gap-2">
                <FormField 
                  name="bio"
                  render={({field})=> (
                  <FormItem> 

                   <Label htmlFor="bio">Bio</Label>
                   <Textarea id="bio" type="text" placeholder="Enter your bio" required {...field} />

                   <FormMessage />
                   </FormItem>
                )} /> 
                </div>
                <div className="grid gap-2">
                 
                  <FormField 
                  name="password"
                  render={({field})=> (
                  <FormItem> 
                    <Label htmlFor="password">Password</Label>
              
                  <Input id="password" type="password" placeholder="Enter your password" required {...field} />
                  
                  <FormMessage />
                   </FormItem>
                )} /> 
                </div>

                <Button type="submit" className="w-full">
                    Save changes
                  </Button>
              </div>
            </div>
          </form>
          </Form>
        </CardContent>
      </Card>
 
    </div>
    )

}

export default Profile