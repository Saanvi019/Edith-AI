import React, { useContext } from 'react'
import { dataContext, prevUser } from '../context/UserContext'

function Chat() {
  let{input,Setinput,prevInput,setprevInput,showResult,setshowResult,feature,Setfeature,prevFeature,setprevFeature,genImgUrl,setGenImgUrl}=useContext(dataContext)
  return (
    <div className="chat-page">
      <div className="user">

        {prevFeature=="upImg"?<><img src={prevUser.imgUrl} alt="" />
        <span>{prevUser.prompt}</span></>:<span>{prevUser.prompt}</span>}
        
      </div>
      <div className="ai">
      {prevFeature=="genImg"
      ?
      <>
      {!genImgUrl ? <span>Generating Image...</span> : <img src={genImgUrl} alt="" />}
      </>
      :
      !showResult
      ?
      <span>Loading...</span>
      :
      <span>{showResult}</span>}
      </div>
    </div>
  )
}

export default Chat