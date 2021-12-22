import React,{useState} from 'react'
import './HomeComponent.css'
import logo from "./logoe.png"
import ShowCertificate from './ShowCertificate'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage, app } from "./firebase";

import { getFirestore, collection, addDoc, query, where, getDocs, onSnapshot, doc, setDoc } from "firebase/firestore";

const db = getFirestore(app);
const colRef = collection(db, "certificate")

const HomeComponent = () => {
    const [certif_id, setcertif_id] = useState("")
    const [certi_state,setCerti_state] = useState(0)
    const [data,setData] = useState([])
    
    let certi = true
   
    const FindRecord=(cetif_id)=>{
        const q = query(colRef, where("certificateId", "==", cetif_id))
  onSnapshot(q, (snapshot) => {
    let certificateData = []
    snapshot.docs.forEach(doc => {
        certificateData.push({ ...doc.data(), id: doc.id })
    })

    console.log(certificateData)
    setCerti_state(certificateData.length)
    setData(certificateData)
    if(data.length==0){
        alert("Now certificate with this details")
    }
   
  })
    }
   
    const searchHandler =(e)=>{
        e.preventDefault()
        console.log(certif_id)
        FindRecord(certif_id)
       
        
               
       
    
    }

    return (
        <>
         
         <nav className="navbar navbar-light bg-light static-top">
            <div className="container">
                <a className="navbar-brand" href="https://edodwaja.com">
                    <img src={logo} alt="home" />
                </a>
                <a className="btn btn-outline-primary" href="https://edodwaja.com">Home</a>
            </div>
        </nav>

        <header className="masthead">
            <div className="container position-relative">
                <div className="row justify-content-center">
                    <div className="col-xl-6">
                        <div className="text-center text-white">
                          
                            <h1 className="mb-5">Get Your Edodwaja Verfied Certificate and Download it</h1>
                            
                            <form className="form-subscribe" id="contactForm" onSubmit={searchHandler}>
                             
                                <div className="row">
                                   
                                    <div className="col">
                                        <input className="form-control form-floating form-control-lg" id="emailAddress" type="text" placeholder="Certificate Id" 
                                        onChange={(e)=>setcertif_id(e.target.value)}
                                        />
                                    
                                    </div>
                                    <div className="col-auto"><button className="mt-2 btn btn-primary btn-lg " id="submitButton" type="submit" >Search Certificate</button>
                                    </div>
                                  
                                </div>
                           
                            
                               
                                
                            </form>
                        </div>
                    </div>
                 
                </div>

     
              {
                  data.length==0?null:    <ShowCertificate  data = {data} className="p-3 m-3" />
                  
                  }
              
               
            </div>
        </header>
       
      
        
        
        </>
    )
}

export default HomeComponent
