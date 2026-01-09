import styles from "../styles/Home.module.css";
import Logo  from "../components/Logo"
import { useState,useEffect } from "react";
import MainPage from "../components/MainPage" 
function Home() {
  const [showLogo, setShowLogo] = useState(true);
  const [hideLogo, setHideLogo] = useState(false);
  useEffect(() => {
    const finishTimer = setTimeout(() => {
      setHideLogo(true);      // logo fade-out start
    }, 3000);

    const switchTimer = setTimeout(() => {
      setShowLogo(false);    // logo unmount → mainpage mount
    }, 3600);                // fade-out duration ku apram

    return () => {
      clearTimeout(finishTimer);
      clearTimeout(switchTimer);
    };
  }, []);

  const snowflakes = Array.from({ length: 80 }, (_, i) => {
    const left = Math.random() * 100; // random % across screen
    const size = 2 + Math.random() * 4; // 1px to 4px
    const duration = 6 + Math.random() * 6; // 6s to 12s
    const delay = Math.random() * 12; // random start delay
    const sway = (Math.random() * 20 - 10); // -10 to 10px horizontal sway
    const opacity = 0.5 + Math.random() * 0.5; // 0.5 to 1
    return { left, size, duration, delay, sway, opacity };
  });
  return (
    <div className={styles.home}>
      <div className={styles.snowContainer}>
        {snowflakes.map((flake, i) => (
          <div
            key={i}
            className={styles.snowflake}
            style={{
              left: `${flake.left}%`,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              animationDuration: `${flake.duration}s`,
              animationDelay: `${flake.delay}s`,
              opacity: flake.opacity,
              '--sway': `${flake.sway}px`, // pass sway to CSS
            }}
          ></div>
        ))}
      </div>
      <div className={styles.innerHome}>
        {showLogo ? (
          <Logo hide={hideLogo} />
        ) : (
          <MainPage />
        )}
      </div>
    </div>
  );
}

export default Home;