import userModel from "../models/user.js";
import bcrypt from "bcrypt";

const signUp = async ({ data }) => {
    try {
        const findEmail = await userModel.findOne({ email: data.email })
        if (findEmail) {
            return "email already in use"
        } else {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const newUser = new userModel({ ...data, password: hashedPassword, cPassword: hashedPassword });
            await newUser.save()
            return newUser;
        }

    } catch (error) {
        console.error(error)
        return "error in signup"
    }
}

const login = async ({ data }) => {
    try {
        const user = await userModel.findOne({ email: data.email })
        if (!user) {
            return "no user found"
        }

        const matchPassword = await bcrypt.compare(data.password, user.password)
        if (!matchPassword) {
            console.log("");
            return { error: "incorrect Password" };
        }

        return user

    } catch (error) {
        console.error(error);
        return { error: "Error occurred during login" };
    }
}

const todoUpdate = async ({ data }) => {
    try {

        const { email, item, description } = data;

        const todoList = await userModel.findOneAndUpdate(
            { email },
            { $push: { todoData: { item, description } } },
            { new: true }
        )
        console.log("todoList", todoList)
        if (!todoList) {
            return { error: "Todo item not found or update failed." };
        }
        return todoList;
    } catch (error) {
        console.error(error);
        return { error: "Error occurred during todoList" };
    }
}

const getUser = async (userId) => {
    try {
        const users = await userModel.findById(userId)
        return users
    } catch (error) {
        console.error("error getting user", error);
        return { error: "Error occurred during get user" };
    }
}

const deleteItem = async (userId, todoId) => {

    try {

        const user = await userModel.findById(userId)
        if (!user) {
            return { error: "user not found" };
        }

        const todoIndex = user.todoData.findIndex((todo) => todo._id.toString() === todoId)

        console.log("todoIndex", todoIndex);

        if (todoIndex === -1) {
            return "todo Item not found"
        }

        user.todoData.splice(todoIndex, 1)

        await user.save()

        return { success: "Todo item deleted successfully" };
    } catch (error) {
        console.error(error);
        return { error: "Error occurred during delete item" };
    }
}

const editItem = async (item, description, userId, todoId) => {
    
    try {
        const user = await userModel.findById(userId)
        if(!user){
            return { error: "user not found" };
        } 
    
        const todoItem = user.todoData.find((todo) => todo._id.toString() === todoId)

        console.log("todoItem", todoItem);
        
        if(!todoItem){
            return {error: "todoItem not found "}
        }

        todoItem.item = item
        todoItem.description = description

        await user.save()
        return { success: "edit successfully" };

    } catch (error) {
        console.error(error);
        return { error: "Error occurred during edit item" };
    }

}

const view = {
    signUp,
    login,
    todoUpdate,
    getUser,
    deleteItem,
    editItem
}

export default view;
