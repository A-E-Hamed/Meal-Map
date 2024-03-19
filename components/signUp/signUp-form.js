// SignUpForm.js
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import styles from "./signUp-form.module.css";
import { signIn } from "next-auth/react";

async function createUser(email, password, username) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, username }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

function SignUpForm({ onSwitch }) {
  const [error, setError] = useState("");
  const [isNotValid, setIsNotValid] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const usernameInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const router = useRouter();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredUsername = usernameInputRef.current.value;
    const passwordConfirm = confirmPasswordInputRef.current.value;

    // Sign up logic
    if (enteredPassword === passwordConfirm) {
      try {
        const result = await createUser(
          enteredEmail,
          enteredPassword,
          enteredUsername
        );
        console.log(result);

        const signInResult = await signIn("credentials", {
          redirect: false,
          email: enteredEmail,
          password: enteredPassword,
        });
        if (!signInResult.error) {
          // Redirect to homepage after successful sign-in
          router.push("/");
        } else {
          console.log(signInResult.error);
        }
      } catch (error) {
        console.log(error);
        setError(error.message);
        setIsNotValid(true);
      }
    } else {
      console.log("Password not matching. Please Confirm your password ");
      setError("Password not matching. Please Confirm your password ");
    }
  }

  console.log(error);
  return (
    <section className={styles.auth}>
      <h2 className="mb-3">Sign Up</h2>
      <form onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor="username">Your Username</label>
          <input
            type="text"
            id="username"
            required
            ref={usernameInputRef}
            className="form-control"
          />
        </div>
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

        <div className={styles.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
            className="form-control"
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            required
            ref={confirmPasswordInputRef}
            className="form-control"
          />
        </div>
        {isNotValid && (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        )}
        <div className={styles.actions}>
          <button type="submit" className="btn btn-primary">
            Create Account
          </button>
          <div className={styles.switchController} onClick={onSwitch}>
            Login with existing account
          </div>
        </div>
      </form>
    </section>
  );
}

export default SignUpForm;
