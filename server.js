const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/bfhl", (req, res) => {
  try {
    // Extract data from the request body
    const { full_name, dob, college_email, college_roll, numbers, data } =
      req.body;

    // Check if data is an array with at least one element
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Data must be a non-empty array.");
    }

    // Validate full_name and dob here (you can use regular expressions or other validation methods)

    // Generate the user_id in the required format
    const user_id = `${full_name}_${dob}`;

    // Find the highest alphabet in the input array of alphabets using reduce
    const highest_alphabet = data.reduce((highest, current) => {
      if (typeof current === "string" && current.length === 1) {
        if (current > highest) {
          return current;
        }
      }
      return highest;
    }, "A"); // Start with "A" as the default highest alphabet

    // Construct the response object
    const response = {
      is_success: true,
      user_id,
      email: college_email, // Replace with the actual value from the request body
      roll_number: college_roll, // Replace with the actual value from the request body
      numbers,
      alphabets: data.filter(
        (item) => typeof item === "string" && item.length === 1
      ),
      highest_alphabet: [highest_alphabet],
    };

    // Send the response
    res.json(response);
  } catch (error) {
    // Handle the error
    res.status(500).json({ error: error.message });
  }
});

app.get("/bfhl", (req, res) => {
  // Hardcoded response as given in the question
  try {
    const response = {
      operation_code: 1,
    };
    console.log(
      `Get Request made successfully, your response is loaded on port ${port}`
    );
    res.status(200).json(response);
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3000; // Use the provided PORT or default to 3000
app.listen(port, () => {
  console.log(`Listening to Port ${port}`);
});
