// AuthForm.js
import { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import SignUpForm from "../signUp/signUp-form";
import styles from "./auth-form.module.css";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      // Login logic
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (!result.error) {
        router.replace("/profile");
      }
    }
  }

  return isLogin ? (
    <section className={styles.auth}>
      <h2 className="mb-3">Login</h2>
      <form onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            ref={emailInputRef}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
            className="form-control"
          />
        </div>
        <div className={styles.actions}>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <div
            className={styles.switchController}
            onClick={switchAuthModeHandler}
          >
            Create new account
          </div>
        </div>
      </form>
    </section>
  ) : (
    <SignUpForm onSwitch={switchAuthModeHandler} />
  );
}

export default AuthForm;
