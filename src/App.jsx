import React, { useState, useEffect } from 'react';

const App = () => {
  const [gameActive, setGameActive] = useState(false);
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [catImage, setCatImage] = useState(null); 

  
  useEffect(() => {
    let timer;
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000); 
    } else if (timeLeft === 0) {
      setGameActive(false);
      fetchCatImage(); 
    }

    return () => clearInterval(timer); 
  }, [gameActive, timeLeft]);

  const startGame = () => {
    setGameActive(true);
    setCount(0);
    setTimeLeft(20);
    setCatImage(null);
  };

  const handleClick = () => {
    if (gameActive) {
      setCount(count + 1);
    }
  };

  
  const fetchCatImage = async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?api_key=live_ywNntTMQL2PFRotti75hq6p1CaRNWqdpoyRDpCQ4PwH1Ljsl8FQqnHQ7YsUXgPXI');
      const data = await response.json();
      setCatImage(data[0].url); 
    } catch (error) {
      console.error("Error fetching cat image:", error);
    }
  };

  return (
    <div>
      <h1>5423002　関口馨　日本大学文理学部情報科学科 Webプログラミングの演習課題</h1>
      <p>Startボタンを押してボタンをクリックしてください</p>
      <button onClick={startGame}>Start</button>

      <p><button onClick={handleClick}>Click!!</button></p>
      <p>Count: {count}</p>
      <p>Time Left: {timeLeft}</p>
      

      {timeLeft === 0 && catImage && (
        <div>
          <p>Game Over! You clicked {count} times!</p>
          <img src={catImage} alt="Cat" style={{ maxWidth: '300px', marginTop: '20px' }} />
        </div>
      )}
    </div>
  );
};

export default App;

