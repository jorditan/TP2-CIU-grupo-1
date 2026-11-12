import Login from './pages/login/Login'
import {userService} from './services/userService'

function App() {

  const users = userService.getAllUsers()
  console.log(users)
  return (
    <>
      <Login/>
    </>
  )
}

export default App
