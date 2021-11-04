import React, { useState, useEffect } from "react";

const MemeGenerator = () => {
  const [inputText, setInputText] = useState({
    topText: "",
    bottomText: ""
  });

  const [randomImg, setRandImg] = useState("http://i.imgflip.com/1bij.jpg");

  const [allMemeImgs, setAllMemeImgs] = useState([]);

  const handleChange = (e) => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const randNum = Math.floor(Math.random() * allMemeImgs.length);
    const randMemeImg = allMemeImgs[randNum].url;
    setRandImg(randMemeImg);
  };

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => setAllMemeImgs(response.data.memes));
  }, []);
  return (
    <div>
      <form className="meme-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="topText"
          placeholder="Top Text"
          value={inputText.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          name="bottomText"
          placeholder="Bottom Text"
          value={inputText.bottomText}
          onChange={handleChange}
        />

        <button>Gen</button>
      </form>
      <div className="meme">
        <img src={randomImg} alt="" />
        <h2 className="top">{inputText.topText}</h2>
        <h2 className="bottom">{inputText.bottomText}</h2>
      </div>
    </div>
  );
};

export default MemeGenerator;