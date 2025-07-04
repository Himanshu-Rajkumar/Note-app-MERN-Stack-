import AllRouters from "./Components/AllRouters"

function App() {
 const logOut =()=>{
  console.log('hii')
   localStorage.removeItem('token')
   window.location.href='/login'
 }

  return (
    <>
    
      <AllRouters/>
    </>
  )
}

export default App
