import React, { useState } from "react";
import "./Styles/App.css";

import deskIcon from "./assets/desktop.svg";
import mobileIcon from "./assets/mobile.svg";
import { IconList } from "./assets/Icons";
import isValidEmail from "./functions/useIsValidEmail";
import { motion } from "framer-motion";
import load from "/load.gif";
function App() {
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmmitted, setIsSubmmitted] = useState(false);

  let timeoutId;

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    clearTimeout(timeoutId);
    setEmail(inputValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setIsError(true);
      return;
    } else {
      setIsError(false);
      setIsSubmmitted(true);
      setIsLoading(true);
      timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setIsSubmmitted(false);

    setTimeout(() => {
      setEmail("");
    }, 500);
  };

  return (
    <div className="App">
      {/* <div className="Loading">
        <img src={load} alt="loading" />
      </div> */}

      <motion.div
        className="Container"
        initial={{ opacity: 0 }}
        animate={
          isSubmmitted ? { opacity: 0, display: "none" } : { opacity: 1 }
        }
        exit={{ opacity: 0 }}
        transition={
          !isSubmmitted ? { duration: 0.25, delay: 0.5 } : { duration: 0.25 }
        }
      >
        <section>
          <div className="Details">
            <h1 className="Title bold">Stay Updated!</h1>
            <p>Join 60,000+ product managers receiving monthly updates on:</p>
            <ul>
              <li>
                <IconList /> Product discovery and building what matters
              </li>
              <li>
                <IconList /> Measuring to ensure updates are a success
              </li>
              <li>
                <IconList /> And much more!
              </li>
            </ul>
            <div className="Input__Section">
              <section className="Label">
                <label htmlFor="" className="bold">
                  Email Address
                </label>
                {isError && <p className="error">Please enter a valid email</p>}
              </section>
              <input
                type="email"
                className={isError ? "Input Error" : "Input"}
                placeholder="Email@company.com"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div className="Input__Section">
              <input
                type="submit"
                className="Input Btn__Primary bold"
                value={"Subscribe to our NewsLetter"}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </section>
        <section>
          <div className="Image">
            <img src={deskIcon} alt="desktop" className="Desktop" />
            <img src={mobileIcon} alt="mobile" className="Mobile" />
          </div>
        </section>
      </motion.div>
      <motion.div
        className="Container Small"
        initial={{ opacity: 0, display: "none" }}
        animate={
          isSubmmitted
            ? { opacity: 1, display: "flex" }
            : { opacity: 0, display: "none" }
        }
        exit={{ opacity: 0 }}
        transition={
          isSubmmitted ? { duration: 0.25, delay: 0.5 } : { duration: 0.25 }
        }
      >
        <div className="HeaderImage">
          <IconList />
          <h1 className="Header_Text bold">Thanks for Subscribing!</h1>
        </div>
        <div>
          <p>
            A Confirmation email has been sent to{" "}
            <mark className="bold">{email}</mark>. Please open it and click the
            button inside to confirm your subscription.
          </p>
        </div>
        <div className="Input__Section">
          <input
            type="submit"
            className="Input Btn__Primary bold"
            value={"Dismiss Message "}
            onClick={handleReset}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default App;
