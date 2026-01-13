import {useState,useEffect} from "react";
import styles from "../styles/MainPage.module.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { FaHeart } from "react-icons/fa"; 
function MainPage(){
  const [showLogin,setShowLogin]=useState(false);
  const [visitorName,setVisitorName]=useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loginBlock,setLoginBlock]=useState(false);
  const [hearts, setHearts] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [animateComment, setAnimateComment] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showPongalWish,setShowPongalWish]=useState(false);
  const [fireworks, setFireworks] = useState([]);
  const [startFireworks, setStartFireworks] = useState(false);
  const [comment, setComment] = useState("");

  

  /* 🔥 FIREWORK EFFECT (ONLY THIS IS NEW) */
  useEffect(() => {
    if (!startFireworks) return;

    const interval = setInterval(() => {
      const id = Math.random();
      const x = Math.random() * 80 + 10; // random X
      const burstY = Math.random() * 30 + 40; // random height
      const sparks = 19; // fixed number of sparks
      const color = `hsl(${Math.random() * 360},100%,60%)`;
      const size = 6; // uniform spark size

      // 🌠 Add firework
      setFireworks(prev => [...prev, { id, x, burstY, sparks, color, explode: false, size }]);

      // 💥 Explode after 0.6s
      setTimeout(() => {
        setFireworks(prev => prev.map(f => f.id === id ? { ...f, explode: true } : f));
      }, 600);

      // 🧹 Keep sparks visible longer, remove after 3s
      setTimeout(() => {
        setFireworks(prev => prev.filter(f => f.id !== id));
      }, 3000);

    }, 600); // new firework every 0.8s

    return () => clearInterval(interval);
  }, [startFireworks]);

const handleLike = () => {
  const newHearts = Array.from({ length: 80 }).map(() => {
    const angle = Math.random() * 360;
    const distance = Math.random() * 600 + 200;

    return {
      id: Math.random(),
      left: 50,
      size: Math.random() * 18 + 18,
      duration: 3.5,
      delay: Math.random() * 0.4,
      xMove: Math.cos(angle * Math.PI / 180) * distance,
      yMove: Math.sin(angle * Math.PI / 180) * distance,
    };
  });

  setHearts(newHearts);
  setTimeout(() => setHearts([]), 3500);
};


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
  if (visitorName.trim() === "") 
    return;
  setShowLogin(true);
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  const now = Date.now();

  if (now < targetTime) {
    setLoginBlock(true);
    return;
  }

  try {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users`, form);

    console.log("Saved in DB:", res.data);

    setShowPongalWish(true);
    setStartFireworks(true);

    setTimeout(() => {
      setShowPongalWish(false);
      setShowThankYou(true);
    }, 20000);

    setForm({ name: "", email: "", password: "" });
  } catch (err) {
    console.log(err.response?.data || err.message);
    alert(err.response?.data?.message || "Error saving data");
  }
};


    const targetTime=new Date("2026-01-11T10:00:00").getTime();

    const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
    const [showMessage,setShowMessage]=useState(false);
    useEffect(()=>{
        const interval=setInterval(()=>{
            const now=new Date().getTime();
            const difference=targetTime-now;

            if(difference<=0){
               clearInterval(interval);
               setShowMessage(true);
            }
            else{
                setTimeLeft({
                 days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                 hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                 minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            });
        }
    },1000);
        return()=>clearInterval(interval);
    },[]);

    useEffect(() => {
  const disableScroll =
    hearts.length > 0 ||
    fireworks.length > 0 ||
    showCommentBox;

  document.body.style.overflowY = disableScroll ? "hidden" : "auto";

  return () => {
    document.body.style.overflowY = "auto";
  };
}, [hearts, fireworks, showCommentBox]);


    return(
    <div className={styles.mainPage}>
        <div className={styles.Box}>
            <div className={styles.content}>
               <div className={styles.Box1}>
                <h1>Hello Guys!</h1>
                <p>May your home br filled with happiness,prosperity,and sweet celebrations!</p>
                </div>
               <div className={styles.Box2}>
                {!showLogin?
                (<div className={styles.welcome}>
                    <span className={styles.title}><h2>A Small Celebration From our Heart</h2>
                    <p>Let the Sun Smile on your home and fill your days with sweetness</p></span>
                    <form className={styles.Form}><input type="text" placeholder="Enter your Sweet Name" value={visitorName}
  onChange={(e) => setVisitorName(e.target.value)} required/>
                    <button onClick={handleClick}>Welcome</button></form>
                </div>):loginBlock?
                (<div className={styles.blockScreen}>
                        <h2>⏳ Login Not Open Yet </h2>
                        <p>This login will open on<strong> 15 Jan 2026 • 12:00 AM</strong></p>
                        <button
                        className={styles.backBtn}
                        onClick={() => setLoginBlock(false)}
                        >
                        Back
                        </button>
                </div>):
                   (
  showPongalWish ? (
  <div className={`${styles.thankYou} ${styles.fadeBox}`}>
    <h2>Happy Pongal Wishes! {visitorName}</h2>
    <p>May your life be filled with joy, sweetness & prosperity</p>
  </div>
) : showThankYou ? (
  <div className={`${styles.thankYou} ${styles.fadeBox}`}>
    <h2>Thank you for joining our celebration</h2>
    <p>Your smile and love made this moment even more special!</p>
  </div>
) : (
  <form onSubmit={handleSubmit}
    className={`${styles.Form} ${styles.fadeBox}`}
    autoComplete="off"
  >
    <h3>Welcome {visitorName}!</h3>
    <input type="text" name="name" value={form.name} placeholder="Username" onChange={handleChange} autoComplete="name" required />
    <input type="email" name="email" value={form.email} placeholder="Email" onChange={handleChange} autoComplete="new-email" required />
    <input type="password" name="password" value={form.password} placeholder="Password" onChange={handleChange} autoComplete="new-password" required />
    <button type="submit">Log In</button>
  </form>
)
)}
               </div>
        <div className={styles.Box3}>
        {showMessage ?  (
          <div className={styles.msg}><h2>Wish you Happy Pongal</h2><h2>Family & Friends</h2></div>
        ) :(
          <div className={styles.countdownBox}>
            <div className={styles.wait}> Waiting until this special day</div>
            <div className={styles.outer}>
            <div className={styles.outBox}>
              <span className={styles.timeBox}><h2>{String(timeLeft.days).padStart(2, "0")}</h2></span>
              <span className={styles.names}>Days</span>
            </div>
            <div className={styles.outBox}>
              <span className={styles.timeBox}><h2>{String(timeLeft.hours).padStart(2, "0")}</h2></span>
              <span className={styles.names}>Hours</span>
            </div>
            <div className={styles.outBox}>
              <span className={styles.timeBox}><h2>{String(timeLeft.minutes).padStart(2, "0")}</h2></span>
              <span className={styles.names}>Minutes</span>
            </div>
            <div className={styles.outBox}>
              <span className={styles.timeBox}><h2>{String(timeLeft.seconds).padStart(2, "0")}</h2></span>
              <span className={styles.names}>Seconds</span>
            </div>
            </div>
          </div>
        )}
        </div>
            </div>
          {hearts.map((heart) => (
  <span
    key={heart.id}
    className={styles.heart}
   style={{
  left: `${heart.left}%`,
  fontSize: `${heart.size}px`,
  animationDuration: `${heart.duration}s`,
  animationDelay: `${heart.delay}s`,
  "--xMove": `${heart.xMove}px`,
  "--yMove": `${heart.yMove}px`,
}}
  >
    <FaHeart style={{color:"pink"}}/>
  </span>
))}
{/* 🔥 FIREWORK RENDER */}
      {fireworks.map(f => !f.explode ? (
          <span key={f.id} className={styles.skyShot} style={{
            left: `${f.x}%`,
            backgroundColor: f.color,
            "--burstY": `${f.burstY}vh`,
          }} />
        ) : (
          [...Array(f.sparks)].map((_, i) => (
            <span key={`${f.id}-b-${i}`} className={styles.burst} style={{
              left: `${f.x}%`,
              bottom: `${f.burstY}vh`,
              "--angle": `${i * (360 / f.sparks)}deg`,
              width: `${f.size}px`,
              height: `${f.size}px`,
              backgroundColor: f.color,
            }} />
          ))
        ))}

      {/* Buttons */}
      <div className={styles.bottom}>
        <button className={styles.bottombtn} onClick={handleLike}>
          <i className="bi bi-suit-heart-fill"></i>
        </button>

        <button className={styles.bottombtn}>
          <i className="bi bi-share-fill"></i>
        </button>

        <button
          className={styles.bottombtn}
          onClick={() =>{ setShowCommentBox(true) 
                setTimeout(() => setAnimateComment(true), 10);        
          }}
        >
          <i className="bi bi-chat-dots-fill"></i>
        </button>

      </div>
  
      {/* Comment Box */}
      {showCommentBox && (
        <div className={styles.overlay}>
          <div className={`${styles.commentBox} ${
        animateComment ? styles.activecmd : ""
      }`}>
            <h3>Comments</h3>
            <textarea
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button
  onClick={() => {
    if (comment.length > 0) {
      console.log("Comment sent:", comment);
      setComment("");
    }

    setAnimateComment(false);
    setTimeout(() => setShowCommentBox(false), 300);
  }}
  >
  {comment.length > 0 ? "Send" : "Close"}
</button>

          </div>
        </div>
      )}
        </div>  
    </div>
    );
}
export default MainPage; 
