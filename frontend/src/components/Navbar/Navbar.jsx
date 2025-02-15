import React , {useState}from "react";
import {Link} from "react-router-dom"
import {FaGripLines} from "react-icons/fa"
import { useSelector } from "react-redux";

const Navbar = () => {
  const links = [
    { title: "Home", link: "/" },
   
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
    { title: " Admin Profile", link: "/profile" },
  ];
  const isLoggedIn=  useSelector((state)=>state.auth.isLoggedIn);
  const role= useSelector ((state)=> state.auth.role);
  if (isLoggedIn=== false)
  {
    links.splice(2, 2)
  }
  if (isLoggedIn === true && role === "admin")
  {
     links.splice(3,1); 
  }
  if (isLoggedIn === true && role === "user")
    {
       links.splice(4,1); 
    }
  const [MobileNav,setMobileNav] = useState("hidden");
  return (

    <>
    <nav className="z-50 relative flex bg-zinc-900 text-white px-10 py-4 flex items-center justify-between">
      {/* Logo & Title */}
      <Link to ="/" className="flex items-center space-x-3">
        <img
          className="h-10"
          src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
          alt="logo"  
        />
        <h1 className="text-2xl font-semibold">Book Heaven</h1>
      </Link>
      
      {/* Navigation Links */}
      <div className=" hidden md:flex space-x-6">
        {links.map((items, i) => (
         <div className="flex items-center">
         {items.title === "Profile" || 
         items.title === "Admin Profile" ? (
           <Link
             to={items.link}
             key={i}
             className="hover:text-blue-400 border border-blue-500 transition-all duration-300"
           >
             {items.title}
           </Link>
         ) : (
           <Link
             to={items.link}
             key={i}
             className="hover:text-blue-400 transition duration-300"
           >
             {items.title}
           </Link>
         )}
       </div>
       
         ))}
      </div>

      {/* Buttons */}
      {isLoggedIn === false && <div className=" hidden md:flex space-x-4">
        <Link to="/Login" 
        className="px-4 py-2 border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition duration-300 rounded">
          Login
        </Link>
        <Link to ="/SignUp" className="px-4 py-2 bg-white text-zinc-900 hover:bg-gray-200 transition duration-300 rounded">
          SignUp
        </Link>
      
      
      </div>}
      
      <button className="block md:hidden text-white text-2xl hover:text-zinc-400" 
      onClick={()=>
      (MobileNav==="hidden"?
       setMobileNav("block")
       :setMobileNav("hidden"))}>
        <FaGripLines/>
      </button>
    </nav>
    <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
    {links.map((items, i) => (
          <Link to={items.link}
            key={i}
        
            className= {`${MobileNav} text-white text-4xl mb-4 font-semibold hover:text-blue-400 transition duration-300`}
            onClick={()=>
              (MobileNav==="hidden"?
               setMobileNav("block")
               :setMobileNav("hidden"))}
          > 
            {items.title} {" "}
          </Link>
        ))}
         
       {isLoggedIn === false ? ( <> <Link to="/Login" 
        className={`${MobileNav} px-4 py-2 mb-8 text-2xl font-semibold border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition duration-300 rounded`}>
          Login
        </Link>
        <Link to ="/SignUp" className={`${MobileNav} px-4 py-2 mb-8 text-2xl font-semibold bg-white text-zinc-900 hover:bg-gray-200 transition duration-300 rounded`}>
          SignUp
        </Link> </>
        ):(
          <></>
        )}
    </div>
    </>
  );
};

export default Navbar;
