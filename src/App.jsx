import React from "react";
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer';
import Routes from "./components/services/Routes";



function App() {    
    return (  
    <div className="App" style={{height: '100%'}}>
      <NavBar/>
       <Routes/> 
      <Footer/>
    </div>
  );
}

export default App;
