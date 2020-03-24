import login from '../lib/login.js'
import fetch from 'isomorphic-unfetch'


const Application = () => { 
   const [data, setData] = React.useState('Click to load.')
   const clickHandler = async (e) => {
       e.preventDefault()
       const { error, data } = await getData()
       
       if (error) setData(error)
       if (!error) setData(JSON.stringify(data))
   }

   return  (
   <>  
        <h2>Welcome</h2>
        <div>{data}</div>
        <button type="button" onClick={clickHandler}>Load</button>
        <a href='/logout'>logout</a>
        <style jsx>{`
        form {
        }
      `}</style>
    </>
   )
}

export default Application


const getData = async (username, password) => {
    let error = null

    const response = await fetch('/api', options('unstoo', 'toberemoved'))
    const data = await response.json()

    if (response.status !== 200)
        return { error: response.status, data }
    

    return { error, data }
}

const options = (username, password) => ({
    method: 'post',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username, password
    })
})

