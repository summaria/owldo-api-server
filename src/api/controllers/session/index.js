const db_admin = require("../../../db/config");
const sessionCollection = db_admin.firestore().collection("session");
const contentCollection = db_admin.firestore().collection("content");
const summariesCollection = db_admin.firestore().collection("summaries");
const UTILS = require("../utils");

const createContentDB = async ({ content }) => {
  const newContent = await contentCollection.doc();
  await contentCollection.doc(newContent.id).set({
    content: content.data.text,
  });
  return newContent.id;
};

const addMCQS = (mcq_qa_json) => {
  //Input : Array of JSON object
  //Add in session collection
  //Questions -> array
  /*
    {
        type:"MCQ",
        "question":"",
        "answer":"",
        "options":["","",""]
    }
  */
  return mcq_qa_json?.data?.map((block) => ({
    type: "MCQ",
    question: block[0] || null,
    answer: block[1] || null,
    options: block[2] || null,
  }));
};

const addSubQA = (sub_qa_json) => {
  //Input : Array of JSON object
  //Add in session collection
  //Questions -> array
  /*
    {
        type:"Sub",
        "question":"",
        "answer":""
    }
    */
  return sub_qa_json?.data?.map((block) => ({
    type: "Sub",
    question: block[0] || null,
    answer: block[1] || null,
  }));
};

/**
 * @param {Object} req { body: { fileURL, sessionId } }
 */
const setupSession = async (req, res) => {
  const { fileURL, sessionId } = req.body;
  if (!fileURL || !sessionId) {
    res.status(400).json({
      error: "Either fileUrl or sessionId not provided!",
    });
  } else {
    try {
      // extracting text from the file url
      console.log("Converting doc to text");
      const content = await UTILS.extractText(fileURL);

      // creating content for the extracted text.
      const contentId = await createContentDB({ content: content });

      // creating subjective QAs
      console.log("Generating Subjective QA!");
      const sub_qa = await UTILS.generateSubQA({ text: content.data.text });
      let subQas = addSubQA(sub_qa) || [];

      // creating mcqs
      console.log("Generating mcqs!");
      const mcq_qa = await UTILS.generateMCQ({ text: content.data.text });
      let mcqs = addMCQS(mcq_qa) || [];

      console.log(subQas, mcqs);
      // Saving data into the sessions collection
      await sessionCollection.doc(sessionId).update({
        content: contentId,
        questions: [...subQas, ...mcqs],
        setup: true,
      });

      res.status(200).json({
        message: "Successfully created! ",
      });
    } catch (err) {
      res.status(300).json({
        error: "Could not update to the database! " + err.message,
      });
    }
  }
};

const createSummaryDB = async ({ summaryId, contentId }) => {
  const newSummary = await summariesCollection.doc(summaryId).set({
    content: contentId,
  });

  return newSummary.id;
};

const createEasySummary = async (req, res) => {
  try {
    const sessionId = req.body.id;
    console.log(sessionId);
    const session = await sessionCollection.doc(sessionId);
    const sessionData = (await session.get()).data();
    const content = (
      await contentCollection.doc(sessionData.content).get()
    ).data();
    const summary = await UTILS.generateEasySum({ text: content.content });
    const contentId = await createContentDB({
      content: {
        data: {
          text: summary?.data && summary?.data[0],
        },
      },
    });
    await createSummaryDB({
      summaryId: "easy_" + sessionId,
      contentId: contentId,
    });
  } catch (err) {
    res.status(300).json({
      error: "Could not update to the database! " + err.message,
    });
  }

  res.status(200).json({
    message: "Successfully created! ",
  });
};

module.exports = {
  setupSession,
  createEasySummary,
};
