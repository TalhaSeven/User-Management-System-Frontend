import Link from "next/link";

export default function Home() {

  return (
    <>
        <Link href="/" className="mx-2">Home</Link>
        <Link href="/city" className="mx-2">Cities</Link>
        <Link href="/address" className="mx-2">Address</Link>
        <h1 className="text-center text-8xl text-transparent 
        bg-clip-text bg-gradient-to-b from-[#051F91] from-25% to-[#6DDB17]">Welcome User Management System</h1>
    </>
  );
}
