import { useEffect, useState, useRef } from "react";
import { Alert, Button, Form, Input } from "antd";
import { encode as base64_encode } from "base-64";
import api from "../../../helper/api";
import styles from "./RegisterUser.module.scss";
import SelectComponent from "../../../components/inputs/SelectComponent/SelectComponent";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import {
  openError,
  openNotification,
} from "../../../components/notification/Notification";
import { allJobsList } from "./allJobs";

const RegisterUser = (props) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const inputRef = useRef();
  const unselectablePassword = document.getElementById("password");
  const unselectableConfirmPassword =
    document.getElementById("confirmPassword");
  const [allJobs, setAllJobs] = useState([]);

  unselectablePassword?.addEventListener(
    "select",
    function () {
      this.selectionStart = this.selectionEnd;
    },
    false
  );
  unselectableConfirmPassword?.addEventListener(
    "select",
    function () {
      this.selectionStart = this.selectionEnd;
    },
    false
  );

  const checkPassword = () => {
    return confirmPassword !== password ?? true;
  };

  const passwordValidation = () => {
    return (
      ((password.length < 8 && password.length >= 20) ||
        !password.match(/[A-Z]/) ||
        !password.match(/[a-z]/) ||
        !password.match(/[\d`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/)) ??
      true
    );
  };

  const handleRegister = async () => {
    if (passwordValidation()) {
      openError(
        "Password must contain between 8 and 20 characters, at least one upper character, one lower case character, one special character, and one number."
      );
      return;
    }
    if (checkPassword()) {
      setErrorMsg(true);
      return;
    }

    let encodedPassword = base64_encode(password);
    const body = {
      email: email,
      firstname: firstName,
      surname: lastName,
      jobTitle: jobTitle,
      password: encodedPassword,
    };

    api
      .post("/register", body)
      .then(() => {
        openNotification("Registration successful.");
        props.showRegisterForm(false);
      })
      .catch((err) => {
        console.log(err);
        if (!err.response) {
          openError("Something went wrong. Please try again");
          return;
        }
        openError(err.response.data[0]);
      });
  };

  const onSelectChange = (itemSelected) => {
    setJobTitle(itemSelected);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  useEffect(() => {
    setAllJobs(allJobsList);
  }, []);

  useEffect(() => {
    setErrorMsg(false);
  }, [confirmPassword, password]);

  return (
    <div>
      <div className={styles.title}>
        <p data-cy="create-your-account-label">Create user</p>
      </div>
      <div>
        <Form className={styles.form} onFinish={handleRegister}>
          <Input
            className={styles.input}
            placeholder="Email"
            data-cy="register-email-input"
            type="TextArea"
            prefix={<MailOutlined className="site-form-item-icon" />}
            defaultValue=""
            required
            onChange={(e) => setEmail(e.target.value)}
            ref={inputRef}
          />
          <Form.Item
            style={{ marginBottom: "0px" }}
            rules={[
              {
                message:
                  "First Name must contain only upper and lower character",
                validator: (_, value) => {
                  if (value.match(/^[A-Za-z]*$/)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject("Some message here");
                  }
                },
              },
            ]}
          >
            <Input
              className={styles.input}
              placeholder="First Name"
              data-cy="register-firstname-input"
              type="TextArea"
              prefix={<UserOutlined className="site-form-item-icon" />}
              defaultValue=""
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "0px" }}
            rules={[
              {
                message:
                  "Last Name must contain only upper and lower character",
                validator: (_, value) => {
                  if (value.match(/^[A-Za-z]*$/)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject("Some message here");
                  }
                },
              },
            ]}
          >
            <Input
              className={styles.input}
              placeholder="Last Name"
              data-cy="register-lastname-input"
              type="TextArea"
              required
              prefix={<UserOutlined className="site-form-item-icon" />}
              defaultValue=""
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Item>

          <SelectComponent
            data={allJobs}
            onSelectChange={onSelectChange}
          ></SelectComponent>

          <Form.Item>
            <Input.Password
              className={styles.input}
              id="password"
              data-cy="password-input"
              placeholder="Password"
              prefix={<LockOutlined />}
              defaultValue=""
              required
              onChange={(e) => setPassword(e.target.value)}
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              onCopy={(e) => {
                e.preventDefault();
                return false;
              }}
              onMouseDown={(e) => e.preventDefault()}
            />

            <Input.Password
              className={styles.input}
              id="confirmPassword"
              data-cy="password-confirm-input"
              placeholder="Confirm Password"
              prefix={<LockOutlined />}
              defaultValue=""
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              onCopy={(e) => {
                e.preventDefault();
                return false;
              }}
              onMouseDown={(e) => e.preventDefault()}
            />
            {errorMsg ? (
              <Alert
                data-cy="password-not-matching-alert"
                message="Password didn't match! Try again."
                type="error"
                className={styles.alert}
              />
            ) : null}

            <Button
              htmlType="submit"
              data-cy="register-submit-button"
              className={`${styles.buttons} ${styles.tealBtn}`}
              block
              size="large"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterUser;
