
import fetch from 'isomorphic-unfetch'

const options = (username, password) => ({
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username, password
    })
})

export default async (username, password) => {
    let error = null

    const response = await fetch('/auth', options(username, password))
    const data = await response.json()
    console.log(response.status)
    console.log(data)
    if (response.status !== 200)
        return { error: response.status, data }
    

    return { error, data }
}
