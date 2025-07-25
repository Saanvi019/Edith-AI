import React, { createContext, useState } from 'react'

export const dataContext= createContext()

export let user={
  data:null,
  mime_type:null,
  imgUrl:null
}

export let prevUser={
  data:null,
  mime_type:null,
  prompt:null,
  imgUrl:null
}

function UserContext({children}) {
  let [StartResponse,setStartResponse]=useState(false)

  let[Popup,setPopup]=useState(false)

  let[input,setinput]=useState("")

  let[feature,Setfeature]=useState("chat")

  let[prevInput,setprevInput]=useState("")

  let[showResult,setshowResult]=useState("")

  let[prevFeature,setprevFeature]=useState("chat")

  let [genImgUrl,setGenImgUrl]=useState("")

  let value={
    StartResponse,setStartResponse,
    Popup,setPopup,
    input,setinput,
    feature,Setfeature,
    prevInput,setprevInput,
    showResult,setshowResult,prevFeature,setprevFeature,
    genImgUrl,setGenImgUrl
  }

  return (
    <div>
      <dataContext.Provider value={value}>
      {children}
      </dataContext.Provider>
      
    </div>
  )
}

export default UserContext