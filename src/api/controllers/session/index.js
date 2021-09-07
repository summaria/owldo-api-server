const db_admin = require("../../../db/config");
const admin = require("firebase-admin");
const sessionCollection = db_admin.firestore().collection("session");
const userCollection = db_admin.firestore().collection("users");
const contentCollection = db_admin.firestore().collection("content")
const FieldValue =  db_admin.firestore.FieldValue
const UTILS = require("../utils")

const addSessionToUser = async ({ sessionId, userId }) => {
    await userCollection
      .doc(userId)
      .update({
        sessions: FieldValue.arrayUnion(sessionId),
      });
  };

const createContentDB = async ({content}) => {
    const newContent = await contentCollection.doc()
    await contentCollection.doc(newContent.id).set({
        content : content.data.text
        });
    return newContent.id
}

const addContentToSession = async ({sessionId, contentId}) => {
    await sessionCollection
        .doc(sessionId)
        .update({
            content : contentId
        })
    return 
}

const createSessionDB = async ({ title, fileURL, userId }) => {
    const newSession = await sessionCollection.doc();
    //console.log(newSession);
    await sessionCollection.doc(newSession.id).set({
      id: newSession.id,
      title,
      fileURL,
    });
    
    await addSessionToUser({
      sessionId: newSession.id,
      userId: userId,
    });
    
    return newSession.id;
  };

const createSession = async (req, res) => {
    //Needs title, file URL , user ID to be sent
    //console.log(req.body)
    const { title, fileURL , userId } = req.body;

    //Create session : store in firestore
    //Add session to user -> Needs fixing!!!!
    if(!title || !fileURL || !userId) {
        res.status(400).json({
            error: "Invalid Request cannot be found"
        });
    }
    else {
        try {
            const sessionId = await createSessionDB({title:title,fileURL:fileURL,userId:userId})
            console.log("Session created")
            //Using URL make content and store in firestore (Doc-text)
            const content = await UTILS.extractText(fileURL)
            //console.log(content.data.text)
            const contentId = await createContentDB({content:content})
            console.log("Content created")
            await addContentToSession({
                        sessionId : sessionId,
                        contentId : contentId
                    })
            //Using content make qa and store in firestore
            res.status(200).json({
                message : "Successfully created! "
            })
        }
        catch(err) {
            res.status(300).json({
                error: "Could not update to the database! " + err.message
            });
        }
    }
    
}

module.exports = {
    createSession
}