import React, { useContext } from "react";
import "../App.css";
import { LuImagePlus } from "react-icons/lu";
import { LuImageUp } from "react-icons/lu";
import { BsChatQuote } from "react-icons/bs";
import { HiOutlinePlusSm } from "react-icons/hi";
import { HiArrowSmUp } from "react-icons/hi";
import { dataContext, prevUser, user } from "../context/UserContext";
import Chat from "./Chat";
import { generateResponse } from "../gemini";
import { query } from "../huggingFace";

function Home() {
  let {
    StartResponse,
    setStartResponse,
    Popup,
    setPopup,
    input,
    setinput,
    feature,
    Setfeature,
    prevInput,
    setprevInput,
    showResult,
    setshowResult,
    prevFeature,
    setprevFeature,
    genImgUrl,
    setGenImgUrl
  } = useContext(dataContext);

  async function handlesubmit(e) {
    setStartResponse(true);
    setprevFeature(feature);
    setshowResult("");
    prevUser.data = user.data;
    prevUser.mime_type = user.mime_type;
    prevUser.imgUrl = user.imgUrl;
    prevUser.prompt = input;
    user.data = null;
    user.mime_type = null;
    user.imgUrl = null;
    setinput("");
    let result = await generateResponse();
    setshowResult(result);
    Setfeature("chat");
    
  }

  function handleImg(e) {
    Setfeature("upImg");
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (event) => {
      let base64 = event.target.result.split(",")[1];
      user.data = base64;
      user.mime_type = file.type;

      user.imgUrl = `data:${user.mime_type};base64,${user.data}`;
    };

    reader.readAsDataURL(file);
  }

  async function handleGenerateImg() {
    setStartResponse(true);
    setprevFeature(feature);
    setGenImgUrl("")
    prevUser.prompt = input;
    let result = await query().then((e) => {
      
      let url=URL.createObjectURL(e)
      setGenImgUrl(url)
    });
    setinput("");
    Setfeature("chat");
  }

  return (
    <div className="home">
      <nav>
        <div
          className="logo"
          onClick={() => {
            setStartResponse(false);
            Setfeature("chat");
            user.data = null;
            user.mime_type = null;
            user.imgUrl = null;
            setPopup(false)
          }}
        >
          EDITH AI Bot
        </div>
      </nav>
      <input
        type="file"
        accept="image/*"
        hidden
        id="inputImg"
        onChange={handleImg}
      />
      {!StartResponse ? (
        <div className="hero">
          <span id="tag">How may I help you?</span>
          <div className="cate">
            <div
              className="upImg"
              onClick={() => {
                document.getElementById("inputImg").click();
              }}
            >
              <LuImageUp />
              <span>Upload image</span>
            </div>
            <div className="genImg" onClick={() => Setfeature("genImg")}>
              <LuImagePlus />
              <span>Generate image</span>
            </div>
            <div className="chat" onClick={() => Setfeature("chat")}>
              <BsChatQuote />
              <span>Let's chat</span>
            </div>
          </div>
        </div>
      ) : (
        <Chat />
      )}

      <form
        className="input-box"
        onSubmit={(e) => {
          e.preventDefault();
          if (input) {
            if (feature == "genImg") {
              handleGenerateImg();
            } else {
              handlesubmit(e);
            }
          }
        }}
      >
      <img src={user.imgUrl} alt="" id="im" />
        {Popup ? (
          <div className="popup">
            <div
              className="select-up"
              onClick={() => {
                setPopup(false);
                Setfeature("chat");
                document.getElementById("inputImg").click();
              }}
            >
              <LuImageUp />
              <span>Upload image</span>
            </div>
            <div
              className="select-gen"
              onClick={() => {
                setPopup(false);
                Setfeature("genImg");
              }}
            >
              <LuImagePlus />
              <span>Generate image</span>
            </div>
          </div>
        ) : null}

        <div
          id="add"
          onClick={() => {
            setPopup((prev) => !prev);
          }}
        >
          {feature == "genImg" ? (
            <LuImagePlus id="gen-Img" />
          ) : (
            <HiOutlinePlusSm />
          )}
        </div>
        <input
          type="text"
          placeholder="Ask Something..."
          onChange={(e) => setinput(e.target.value)}
          value={input}
        />
        {input ? (
          <button id="submit">
            <HiArrowSmUp />
          </button>
        ) : null}
      </form>
    </div>
  );
}

export default Home;
