import { useState, useEffect } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";

function ContactForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState(); // 보내는중, 성공, 실패
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus === "성공" || requestStatus === "실패") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function sendContactData(contactDetails) {
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(contactDetails),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "실패");
    }
  }

  async function sendMessageHandler(event) {
    event.preventDefault();
    setRequestStatus("전송 중");
    try {
      await sendContactData({
        email,
        name,
        message,
      });
      setRequestStatus("성공");
      setEmail("");
      setName("");
      setMessage("");
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus("실패");
    }
  }

  let notification;
  if (requestStatus === "전송 중") {
    notification = {
      status: "전송중",
      title: "전송 중...",
      message: "메세지를 보내고 있는 중입니다.",
    };
  }
  if (requestStatus === "성공") {
    notification = {
      status: "성공",
      title: "전송 완료!",
      message: "메세지가 성공적으로 보내졌습니다.",
    };
  }
  if (requestStatus === "실패") {
    notification = {
      status: "실패",
      title: "전송 실패!",
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>CONTACT</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">성함</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">메시지</label>
          <textarea
            id="message"
            rows="5"
            required
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>전송</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}
export default ContactForm;
