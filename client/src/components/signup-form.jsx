import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
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
import { IoArrowBack } from "react-icons/io5";
import { getEnv } from "@/helpers/getEnv"
import { signIn } from "@/helpers/routeName"
import { showToast } from "@/helpers/showToast"
import GoogleLogin from "./GoogleLogin"




export function SignupForm({
  className,
  ...props
}){
  
const navigate = useNavigate()


const formSchema = z.object({ 
    name: z .string() 
    .min(3, { message: "Name must be at least 3 characters long" }) 
    .max(50, { message: "Name must be at most 50 characters long" }) 
    .optional(), 
    email: z.string().email(), 
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string() }).refine((data) => data.password === data.confirmPassword, { message: "Password and confirm password should be same", path: ["confirmPassword"],
     
 });
  


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {

      email: "",
      password: "",
      confirmPassword: "",
    },
  })


  // 2. Define a submit handler.
  async function onSubmit(values) {
    // Do something with the form values.
    try {
      const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/register`,{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(values)
        }
      )
     
     const data = await response.json() 
      if(!response.ok){
       return showToast('error', data.message)
      }
      
      navigate(signIn)
      showToast('success', data.message)
      // console.log(values)
    } catch (error) {
     return showToast('error', error.message)
    }
  }

  return (
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create new account</CardTitle>
          <CardDescription>
            Login with your Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
        <div className="flex flex-col mb-5">
                  <GoogleLogin/>
        </div>
        <Form  {...form}> 
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div
                className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
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
                  name="password"
                  render={({field})=> (
                  <FormItem> 
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input id="password" type="password" placeholder="Enter your password" required {...field} />
                  
                  <FormMessage />
                   </FormItem>
                )} /> 
                </div>
                <div className="grid gap-2">
                 

                 <FormField 
                 name="confirmPassword"
                 render={({field})=> (
                 <FormItem> 
                 <div className="flex items-center">
                   <Label htmlFor="confirmPassword">Confirm Password</Label>
                 </div>
                 <Input id="confirmPassword" type="password" placeholder="Confirm your password" required {...field} />
                 
                 <FormMessage />
                  </FormItem>
               )} /> 
               </div>

                <Button type="submit" className="w-full">
                  Sign Up
                  </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/signin" className="underline underline-offset-4">
                    Sign In
                </Link>
              </div>
               <Button variant="outline" className="w-full" asChild>
                 <Link to="/"> <IoArrowBack /> Back home</Link>
              </Button>
            </div>
          </form>
          </Form>
        </CardContent>
      </Card>
      <div
        className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>)
  );
}
