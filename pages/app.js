import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/Layout'
import Application from '../components/Application'
import Login from '../components/Login'


const App = ({ error, page }) => {

    return (
        <Layout>
           <Application />
        </Layout>
    )
}

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

export default App