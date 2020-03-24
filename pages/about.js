import Link from 'next/link'
import Error from './_error'

export default () => (
    
    <>
        <h1>About</h1>
        <Link href="/">
            <a>Index</a>
        </Link>
        <p>A Next.js static page</p>
        <img src="/bird1.jpg" alt="A bird" height="200px"/>
    </>
)
