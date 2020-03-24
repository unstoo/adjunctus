import Navbar from './Navbar'
import Layout from './Layout'
import login from '../lib/login.js'
import style from './Login.module.css'

// const [email, setEmail] = React.useState('')
// const [password, setPassword] = React.useState('')
// TODO: diasable submit until response from the server
// const submitHandler = async (e) => { 
//     e.preventDefault()
//     const { error, data } = await login(username, password)
//     if (error) 
//         setAuth(error + JSON.stringify(data))
//     else
//         setAuth(JSON.stringify(data))
//  }

const Login = () => { 
    const [screeName, setScreenName] = React.useState('login')

   return  (
   <>  
        <Navbar onClick={setScreenName}>
            <A screenName='login'>Log in</A>
            <A screenName='registration'>Sign up</A>
        </Navbar>

        { screeName === 'login' &&
        <Form method='post' url='/login'>
            {
                // grab
                // validate input
                // send input
                // process server response
            }
            <InputEmail />
            <InputPassword />
            <InputSubmit value="Log in" />
        </Form>
        }

        { screeName === 'registration' &&
        <Form method='post' url='/register'>
            <InputEmail />
            <InputPassword />
            <InputText placeholder="Name" />
            <InputSubmit value="Register" />
        </Form>
        }
    </>
   )
}

export default Login



const A = ({children, screenName, ...props}) => {
    return <a {...props} data-screenname={screenName}>{children}</a>
}

const Form = (props) => {
    const [loading, setLoading] = React.useState(false)

    const preventDefault = async (e) => {
        e.preventDefault()
        
        // disable button
        const inputs = e.target.querySelectorAll(`input`)
        const dataToSend = {}
        inputs.forEach(input => {
            if (input.type === 'submit') return
            dataToSend[input.name] = input.value
        })

        setLoading(true)

        const { error, data } = await login(dataToSend.username, dataToSend.password)

        setLoading(false)

        // if (error) 
        //     alert(JSON.stringify(error) + '; ' + JSON.stringify(data))
        // else
        // alert(JSON.stringify(data))

            //enable button
    }

    return <form className={style['form']} onSubmit={ preventDefault } action={props.url}>
        {props.children.map(htmlInput => {
            
            if (htmlInput.type.name !== 'InputSubmit') 
                return htmlInput 

            if (loading)
               {
                console.log
                return <input type="button" value={'...'} disabled/>
               }
            else
                return htmlInput

            //     return  <div key={'formInputKey-' + htmlInput.type.name} data-custominput="submit">{htmlInput}</div>
            // else
            //     return <div key={'formInputKey-' + htmlInput.type.name} data-custominput={props.url}>{htmlInput}</div>
        })}
    </form>
}

const InputEmail = (props) => {
    return <input type="text" name="username" placeholder="Email"/>
}

const InputPassword = (props) => {
    return <input type="text" name="password" placeholder="Password"/>
}

const InputText = ({...props}) => {
    return <input type="text" name={ props.placeholder.toLowerCase() } { ...props } />
}

const InputSubmit = (props) => {
    return  <input type="submit" value={props.value} />
}