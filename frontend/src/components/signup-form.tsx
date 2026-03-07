import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-border">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              {/* header - logo */}
              <div className="flex flex-col items-center text-center gap-2">
                <a href="/" className="mx-auto block w-fit text-center">
                  <img src="/logo.svg" alt="logo" className=""/>
                  <h1 className="text-2xl font-bold">
                    Create your account
                  </h1>
                  <p className="text-muted-foreground text-balance">
                    Welcome to app. Register to start
                  </p>
                </a>
              </div>
              {/* Name */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label
                    htmlFor="firstname"
                    className="block text-sm"
                  >
                    Firstname
                  </Label>
                  <Input
                    type="text"
                    id="firstname"
                  />
                  {/* todo: error message */}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="lastname"
                    className="block text-sm"
                  >
                    Lastname
                  </Label>
                  <Input
                    type="text"
                    id="lastname"
                  /> 
                  {/* todo: error message */}
                </div>
              </div>

              {/* Username */}
              <div className="flex flex-col gap-3">
                <Label
                  htmlFor="username"
                  className="block text-sm"
                >
                  Username
                </Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="Text your name"
                />
                {/* todo: error message */}
              </div>  
              {/* Email */}
              <div className="flex flex-col gap-3">
                <Label
                  htmlFor="email"
                  className="block text-sm"
                >
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="m@email.com"
                />
                {/* todo: error message */} 
              </div>  
              {/* Password */}
              <div className="flex flex-col gap-3">
                <Label
                  htmlFor="password"
                  className="block text-sm"
                >
                  Password
                </Label>
                <Input
                  type="password"
                  id="password"
                />
                {/* todo: error message */}
              </div>  
              {/* Button */}
              <Button
                type="submit"
                className="w-full"
              >
                Create account
              </Button>
              <div className="text-center text-sm">
                Already have an account? {" "}
                <a 
                  href="/login"
                  className="underline underline-offset-4"
                >
                  Login here
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholderSignUp.png"
              alt="Image"
              className="absolute inset-0 top-1/2 -translate-y-1/2 object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-xs text-balance px-6 text-center *:[a]:hover:text-primary text-muted-foreground *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
