import http from "k6/http";
import { sleep } from "k6";

export let options = {
  vus: 100,
  duration: "300s",
};

export default function () {
  const users = [
    { email: "a@naver.com", password: "a" },
    { email: "b@naver.com", password: "b" },
    { email: "c@naver.com", password: "c" },
    { email: "d@naver.com", password: "d" },
    { email: "e@naver.com", password: "e" },
    { email: "f@naver.com", password: "f" },
    { email: "g@naver.com", password: "g" },
    { email: "h@naver.com", password: "h" },
  ];

  for (let i = 0; i < 100; i++) {
    const randomUserIndex = Math.floor(Math.random() * users.length);
    const user = users[randomUserIndex];

    const loginUrl = "http://localhost:8000/login";
    const novelsListUrl = "http://localhost:8000/api/v1/mynovels";
    const novelDetailUrl = "http://localhost:8000/api/v1/mynovels/";

    const payload = {
      email: user.email,
      password: user.password,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    // Login and get the authentication token
    const loginRes = http.post(loginUrl, JSON.stringify(payload), {
      headers: headers,
    });
    const authToken = loginRes.json("auth_token");

    // Print the response status and body for debugging (optional)
    console.log(`Status: ${loginRes.status}, Body: ${loginRes.body}`);

    // Sleep to simulate user behavior (optional)
    sleep(1);

    // Send request to retrieve novels list
    const novelsListHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    };

    const novelsListRes = http.get(novelsListUrl, {
      headers: novelsListHeaders,
    });
    console.log(`Status: ${novelsListRes.status}, Body: ${novelsListRes.body}`);

    // Sleep to simulate user behavior (optional)
    sleep(1);

    // Generate random novel_id between 1 and 10
    const randomNovelId = Math.floor(Math.random() * 10) + 1;

    // Send request to retrieve novel details
    const novelDetailHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    };

    const novelDetailRes = http.get(`${novelDetailUrl}${randomNovelId}`, {
      headers: novelDetailHeaders,
    });
    console.log(
      `Status: ${novelDetailRes.status}, Body: ${novelDetailRes.body}`
    );

    // Sleep to simulate user behavior (optional)
    sleep(1);
  }
}
