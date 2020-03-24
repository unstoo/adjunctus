import Link from 'next/link'
import Layout from '../components/Layout'
import Login from '../components/Login'


const Index = ({ error, stories, page }) => (
    <Layout>
        <Login />
        {/* <a href='/app'>app</a> */}
        {/* <h1>Index</h1>
        <Link href={"/?page=" + ( Number.parseInt(page) + 1 )}>
            <a>Next</a>
        </Link>
        <ul>
            {error && <div>Error fetching news</div>}
            {!error && stories.map(s => <li key={s.title}>
                <h3>{s.title}</h3>
                <a href="#">{s.url}</a>
            </li>)}
        </ul> */}
    </Layout>
)

// Index.getInitialProps = async ({ req, res, query }) => {
//     const page = query.page || 1
//     let stories = {}
//     let error = false

//     try {
//         const res = await fetch('https://node-hnapi.herokuapp.com/news?page=' + page)
//         stories = await res.json()
//     } catch (err) {
//         error = true
//     }
//     // res.code (!2)

//     return {
//         error, stories, page
//     }
// }

export default Index