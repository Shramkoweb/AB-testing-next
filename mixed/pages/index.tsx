import {TopBanner} from "@/components/top-banner";
import Link from "next/link";

export default function Home() {
    return (
        <main
            className='flex min-h-screen flex-col items-center justify-between p-24'
        >
            <h1>Index</h1>
            <Link href='/blog'>To blog page</Link>
            <TopBanner />
        </main>
    )
}
