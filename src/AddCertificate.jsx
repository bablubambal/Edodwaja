import React from 'react'
import { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage, app } from "./firebase";

import { getFirestore, collection, addDoc, query, where, getDocs, onSnapshot, doc, setDoc } from "firebase/firestore";
const db = getFirestore(app);
const colRef = collection(db, "certificate")


const AddCertificate = () => {

    const [progress, setProgress] = useState(0);
    const [name, setName] = useState("");
    const [certificate, setCertificateId] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [data, setData] = useState([]);
    const formHandler = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        uploadFiles(file);
    };
    let certi_id = ""
    const FindRecord=(ceti_id)=>{
        const q = query(colRef, where(`"certificateId", "==", "${certi_id}"`))
  onSnapshot(q, (snapshot) => {
    let certificateData = []
    snapshot.docs.forEach(doc => {
        certificateData.push({ ...doc.data(), id: doc.id })
    })
    console.log(certificateData)
  })
    }
    const showRecords = ()=>{
        getDocs(colRef)
      .then(snapshot => {
        // console.log(snapshot.docs)
        let book = []
        snapshot.docs.forEach(doc => {
          book.push({ ...doc.data(), id: doc.id })
        })
        console.log(book)
        setData(book)
      })
      .catch(err => {
        console.log(err.message)
      })
    }
    const uploadFiles = (file) => {
        //
        if (!file) return;
        const sotrageRef = ref(storage, `certificate/${file.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, file);
    
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const prog = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(prog);
          },
          (error) => console.log(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
             
              setImageUrl(downloadURL)
              alert("Image Uploaded")
    
            });
          }
        );
      };
      const addata =  (data)=>{
        addDoc(colRef, data)
        .then(() => {
          console.log("done....");
          alert("Your Certificate is Upload");
        }).catch((e)=> {
          alert("Your Certificate is Not Uploaded");
          console.log("error: ",e)
        })
      
        
       
        
      }
      const dataHandler = (e)=>{
        e.preventDefault()
        let data = {
          certificateName:name,
          certificateId:certificate,
          imageUrl:imageUrl
        }
        addata(data)
    
      }
    return (
        <>
<div className="container text-center m-5">
        <h3>Certificate</h3>
        <form onSubmit={formHandler}>
        <div className="form-floating">

<input className="form-control" type="file" id="formFileMultiple"  required />
<button className="btn btn-outline-success" type="submit">Upload</button>
<div className="progress">
  <div className="progress-bar" role="progressbar" style={{width: `${progress}%`}} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">{progress}</div>
</div>


         </div>
        </form>
        <form onSubmit={dataHandler} >
      <div className="form-floating mb-3">
  <input type="text" className="form-control" id="floatingInput" required  onChange={(e)=>{setName(e.target.value)}} />
  <label htmlFor="floatingInput" >Certificate Name</label>
</div>
<div className="form-floating mb-3">
  <input type="text" className="form-control" required id="floatingPassword" onChange={(e)=>{setCertificateId(e.target.value)}} />
  <label htmlFor="floatingPassword">Certificate Id</label>
</div>

<div className="form-floating">
  <button className="btn btn-outline-primary " type="submit" >Submit </button>
  
</div>
</form>


      </div>

        </>
    )
}

export default AddCertificate
