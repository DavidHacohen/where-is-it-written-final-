import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import "../assets/stylesheets/SignUp.css"
import axios from "../api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
const REGISTER_URL = 'http://localhost:5000/SignUp';



const SignUp = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);


  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
    }, [user]) 

  
  useEffect(() => {
      const result = PWD_REGEX.test(pwd);
      console.log(result);
      console.log(pwd);
      setValidPwd (result);
      const match = pwd === matchPwd;
      setValidMatch(match);
      }, [pwd, matchPwd])
  
useEffect(() => {
  setErrMsg('');
}, [user, pwd, matchPwd])

const handleSubmit = async (e) => {
  e.preventDefault();
    // if button enabled with JS hack
    const formData = new FormData();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    console.log("handleSubmit")
    if (!v1 || !v2) {
        setErrMsg("Invalid Entry");
        console.log("handleSubmit if")
        return;
    }
    try {
      const response = await fetch(REGISTER_URL, formData, {
        method: "POST",
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response))
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser('');
      setPwd('');
      setMatchPwd('');
  } catch (err) {
      if (!err?.response) {
          setErrMsg('אין תגובה מהשרת');
      } else if (err.response?.status === 409) {
          setErrMsg('שם משתמש תפוס');
      } else {
          setErrMsg('רישום נכשל')
      }
      errRef.current.focus();
  }

}

  return (
    <>
     {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">הירשם</a>
                    </p>
                </section>
            ) : (
    <section>
     <p ref={errRef} className={errMsg ? "errmsg":
      "offscreen"} aria-live="assertive">{errMsg}</p> 
      <h1>הירשם</h1>
      <form onSubmit={handleSubmit} method="POST">
        <label htmlFor="שם משתמש">
        שם משתמש:
          <span className={validName? "valid":"hide"}>
          <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validName || !user ? "hide":
          "invalid"}>
          <FontAwesomeIcon icon={faTimes} />
          </span>

        </label>
        <input
        type="text"
        id="username"
        ref={userRef}
        autocomplete="off"
        onChange={(e) => setUser(e.target.value)}
        required
        aria-invalid={validName? "false" : "true"}
        aria-describedby="uidnote"
        onFocus={() => setUserFocus(true)}
        onBlur={() => setUserFocus (false)}
        />
        <p id="uidnote" className={userFocus && user &&
          !validName ? "instructions": "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters.<br />
          Must begin with a letter.<br />
          Letters, numbers, underscores, hyphens allowed.
          </p>
          <label htmlFor="password">
                          סיסמה:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            אשר סיסמה:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button disabled={!validName || !validPwd || !validMatch ? true : false}>הירשם</button >
                    </form>
                    <p>
                        כבר רשום?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">התחבר</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}
export default SignUp