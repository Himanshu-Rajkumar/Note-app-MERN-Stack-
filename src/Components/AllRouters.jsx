import Login from "../Pages/Login";
import Notes from "../Pages/Notes";
import SignUp from "../Pages/SignUp";
import Error from "./Error";
import Home from "../Pages/Home";
import { Routes,Route } from "react-router-dom";
import Header from "./Header";
import { ThemeProvider } from "styled-components";



const AllRouters = () => {
   
  const theme={
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgb(24 24 29)",
      white: "#fff",
      black: " #212529",
      helper: "#8490ff",
      bg: "rgb(249 249 255)",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: { mobile: "750px", tab: "998px" },
  }
 

  return (
    <div>
      <ThemeProvider theme={theme}>
       <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/notes" element={<Notes/>} />
        <Route path="/signUp" element={<SignUp/>} />
        <Route path="*" element={<Error/>} />
      </Routes>
      </ThemeProvider>
    </div>
  )
}

export default AllRouters
