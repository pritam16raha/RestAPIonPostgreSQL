import pool from "../../db";
import {
  deleteUserSqlQuery,
  emailExistInDB,
  getUser,
  getUserById,
  registerUserInDB,
  updateUserSqlQuery,
} from "./queries";

const controller = {
  //get all user fucntion
  async getUser(req, res, next) {
    pool.query(getUser, (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    });
  },

  //get single user by id
  async getUserById(req, res, next) {
    const id = parseInt(req.params.id);

    pool.query(getUserById, [id], (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    });
  },

  //register user nd check the user is exist in DB
  async registerUser(req, res, next) {
    const { name, email, phone, address, role, image, dob } = req.body;

    //checking the email does exist in db or not
    pool.query(emailExistInDB, [email], (error, results) => {
      if (results.rows.length) {
        res.send("Email already exist in DB");
      }
    });

    //add user to database
    pool.query(
      registerUserInDB,
      [name, email, phone, address, role, image, dob],
      (error, results) => {
        if (error) throw error;
        res.status(201).send("User Data Created Successfully");
        console.log("User Created");
      }
    );
  },

  async deleteUserById(req, res, next) {
    const id = parseInt(req.params.id);
    try {
      pool.query(getUserById, [id], (error, results) => {
        const noUserFound = !results.rows.length;
        if (noUserFound) {
          return res.send("User Doesn't Exist in DB");
        }
        pool.query(deleteUserSqlQuery, [id], (error, results) => {
          if (error) throw error;
          console.log("User Deleted");
          return res.status(200).send("User Deleted Successfully");
        });
      });
    } catch (err) {
      console.log("Error from delete function catch block");
    }
  },

  //update user by id

  async updateUserById(req, res, next) {
    const { name, email, phone, address, role, image, dob } = req.body;
    const id = parseInt(req.params.id);
    pool.query(getUserById, [id], (error, results) => {
      if (error) {
        return res.status(500).send("Error retrieving user");
      }

      const noUserFound = !results.rows.length;
      if (noUserFound) {
        return res.send("User Doesn't Exist in DB");
      }

      //update user now
      pool.query(
        updateUserSqlQuery,
        [name, email, phone, address, role, image, dob, id],
        (error, results) => {
          if (error) throw error;
          console.log("User Updated");
          return res.status(200).send("User Data Updated Successfully");
        }
      );
    });
  },
};

export default controller;

//note: line 5 -> "query function holds two parameters 1.SQL statement-> statement is used to query the database eg.(SELECT * FROM users)  2. ";
//line 16 -> in the [id], we can multiple parameter if required
