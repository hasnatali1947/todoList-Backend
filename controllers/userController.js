import userView from "../view/userView.js"
import { generateToken } from "../hooks/token.js"

const signUp = async (req, res) => {
    const { body } = req
    try {
        const response = await userView.signUp({ data: body })
        if (response.error) {
            return res.status(400).send(response.error)
        }

        res.send(response)
    } catch (error) {
        console.error(error)
        return res.status(500).send(response.error)
    }
}

const login = async (req, res) => {
    const { body } = req
    try {
        const response = await userView.login({ data: body })
        if (response.error) {
            return res.status(400).send(response.error)
        }
        const token = await generateToken({ _id: response._id, email: response.email });
        res.send({
            message: "User created successfully",
            token: token,
            userId: response._id.toString(),
            response
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send(response.error)
    }
}  
                                        
const todoUpdate = async (req, res) => {
    const { body, user } = req
    console.log("user :: ", user);
    console.log("body", body)
    try {
        const response = await userView.todoUpdate({ data: body })
        console.log("response", response)
        if (response?.error) {
            return res.status(400).send(response.error)
        }
        res.send(response)
    } catch (error) {
        console.error("Error in todoUpdateController:", error);
        return res.status(500).send("Internal Server Error");
    }
}

const getUser = async (req, res) => {
    const { userId } = req.query;
    console.log("userId", userId);


    if (!userId) {
        return res.status(400).send("User ID is required");
    }

    try {
        const response = await userView.getUser(userId);
        if (!response) {
            return res.status(404).send("User not found");
        }
        if (response.error) {
            return res.status(400).send(response.error);
        }
        res.send(response);

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}

const deleteItem = async (req, res) => {
    const { userId, todoId } = req.body
    console.log(userId, todoId);
    if (!userId || !todoId) {
        return res.status(400).send("User ID and Todo ID are required");
    }

    try {
        const response = await userView.deleteItem(userId, todoId)

        console.log("response", response)
        if (response.error) {
            return res.status(400).send(response.error);
        }

        return res.send(response)

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error")
    }
}

const editItem = async (req, res) => {
    const { item, description, userId, todoId } = req.body
    console.log("edit body", item, description, userId, todoId);
    if (!userId || !todoId || !item || !description) {
        return res.status(400).send("User ID, Todo ID, item, and description are required");
    }
    try {
        const response = await userView.editItem(item, description, userId, todoId)
        console.log("response", response);

        if (response.error) {
            return res.status(400).send(response.error);
        }
        return res.send(response)

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error")
    }
}

const controller = {
    signUp,
    login,
    todoUpdate,
    getUser,
    deleteItem,
    editItem
}

export default controller;