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
import { routeIndex } from "@/helpers/routeName"
import { getEnv } from "@/helpers/getEnv"
import { showToast } from "@/helpers/showToast"
import GoogleLogin from "./GoogleLogin"
import { useDispatch } from "react-redux"
import { setUser } from "@/redux/user/user.slice"




export function LoginForm({
  className,
  ...props
}){

 const dispatch = useDispatch()

 const navigate = useNavigate()

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3, {message: "Password is required"}),
  })
  


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
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
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
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
                    <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" placeholder="Enter your password" required {...field} />
                  
                  <FormMessage />
                   </FormItem>
                )} /> 
                </div>

                <Button type="submit" className="w-full">
                  Sign In
                  </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
                   <Button variant="outline" className="w-full" asChild>
                          <Link to="/"><IoArrowBack /> Back home</Link>
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
