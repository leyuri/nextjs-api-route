import fs from "fs";
import path from "path";

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedbackText = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: feedbackText,
    };

    // store that in a database or in a file
    const filePath = path.json(process.cwd(), "data", "feedback.json");
    const fileData = fs.writeFile(filePath);
    const data = JSON.parse(fileData);

    data.push(newFeedback);

    // 파일을 읽은 후 해당 파일에 있는 데이터를 fetching하고, 업데이트 한 데이터로 오버라이드
    // writeFileSync 를 이용해 동기식 blocking 방식 사용
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: "Success!", feedback: newFeedback });
  } else {
    res.status(200).json({ message: "This works!" });
  }
}

export default handler;
