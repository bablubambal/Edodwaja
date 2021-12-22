import React from 'react'


const ShowCertificate = ({data}) => {
    console.log("hello")
    const {certificateId, certificateName, imageUrl, id }=data[0]
    return (
       <>
    {
        certificateId != null? <>
            <div className="conatiner text-center">
            <div className="card" >
  <img src={imageUrl} className="card-img-top" alt="..." />
  <div className="card-title">
      <h2>{certificateName}</h2>
      <h6>{certificateId}</h6>
  </div>
  <div className="card-body">
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a className="btn btn-outline-success"  download href = {imageUrl}>Download Now</a>
  </div>
</div>


            </div>
        </>:<>
        <div className="conatiner text-center">
            <div className="card" >

  <div className="card-title">
      <h2 className = "text-danger">No Certificate with this id try again</h2>
    
  </div>
  <div className="card-body">
   
  </div>
</div>


            </div>
        </>
    }
         
       </>
    )
}

export default ShowCertificate
