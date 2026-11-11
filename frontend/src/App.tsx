import {userService} from './services/userService'

function App() {

  const users = userService.getAllUsers()
  console.log(users)
  return (
    <>
      <section id="center">
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
        >
          total users is
        </button>
      </section>
    </>
  )
}

export default App
