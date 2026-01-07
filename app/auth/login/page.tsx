import { LoginForm } from "@/app/auth/login/login"


export default function Page() {
  return (
    <div className="flex h-screen w-screen ">
    <div className="w-full md:w-1/2 flex items-center justify-center p-10 bg-white">
      <div className="w-full max-w-sm ">
        <LoginForm />
      </div>
    </div>
          <div className="hidden md:block w-1/2">
        <img
          src="/bg.jpg"
          alt="Background"
          className="h-full w-full object-cover rounded-md"
        />
      </div>

    </div>
  )
}
