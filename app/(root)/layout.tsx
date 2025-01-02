import Navbar from "../Components/Navbar"

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <main className="font-work-sans">
        <Navbar /> 
        <div className="content">
          {children}
        </div>
    </main>
  )
}