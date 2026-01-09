import styles from "../styles/Logo.module.css";
import Lottie from "lottie-react";
import logo from "../assets/Happy Pongal.json";
import {useState,useEffect} from "react";
function Logo({hide}){
    const [percent,setPercent]=useState(0);
    useEffect(()=>{
      const timer=setInterval(()=>{
        setPercent((p)=>{
            if(p>=100){
                return 100;
            }
            return p+2;
        });
      },30);
      return()=> clearInterval(timer);
    },[]);
    const [show,setShow]=useState(false);
      useEffect(()=>{
        setTimeout(()=>{
          setShow(true);
        },100);
      },[]);
    return(
        <div className={`${styles.main} ${show?styles.show:""} ${hide ? styles.hide : ""}`}>
            <Lottie
            animationData={logo}
            loop={true}
            autoplay={true}
            className={styles.animIcon}
            style={{ transform: "scale(1.1)" }}
        />
        <span className={styles.wish}>
           <h1>Happy Pongal Wishes</h1>
           <h3>Let's Celebrate this harvest season with gratitude and positivity Happy</h3>
        </span>
        <span className={styles.load}>
            <span className={styles.loading} style={{width:`${percent}%`}}>
            </span>
            <span className={styles.per}>
            {percent}%
            </span>
        </span>
        </div>
    );
}
export default Logo;
