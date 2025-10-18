import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import { sendEmail } from "../utils/sendEmail.js";
import {
  verificationEmailTemplate,
  welcomeEmailTemplate,
} from "../utils/emailTemplate.js";
import crypto from "crypto";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      const error = new Error("Please provide all required fields");
      error.statusCode = 400;
      throw error;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email }).session(session);

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user
    const newUser = await User.create(
      [
        {
          name,
          email,
          password: hashedPassword,
          verificationToken,
          verificationTokenExpires,
          isVerified: false,
        },
      ],
      { session }
    );

    // Send verification email
    await sendEmail({
      to: email,
      subject: "Verify Your Email - Vans Shoe Store",
      html: verificationEmailTemplate(name, verificationToken),
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message:
        "User created successfully. Please check your email to verify your account.",
      data: {
        user: {
          id: newUser[0]._id,
          name: newUser[0].name,
          email: newUser[0].email,
          isVerified: newUser[0].isVerified,
        },
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;

    if (!token) {
      const error = new Error("Verification token is required");
      error.statusCode = 400;
      throw error;
    }

    // Find user with valid token
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      const error = new Error("Invalid or expired verification token");
      error.statusCode = 400;
      throw error;
    }

    // Update user
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    // Send welcome email
    await sendEmail({
      to: user.email,
      subject: "Welcome to Vans Shoe Store! 🎉",
      html: welcomeEmailTemplate(user.name),
    });

    res.status(200).json({
      success: true,
      message: "Email verified successfully. You can now log in.",
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      const error = new Error("Please provide email and password");
      error.statusCode = 400;
      throw error;
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    // Check if email is verified
    if (!user.isVerified) {
      const error = new Error(
        "Please verify your email before logging in. Check your inbox for the verification link."
      );
      error.statusCode = 403;
      throw error;
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const resendVerification = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      const error = new Error("Email is required");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    if (user.isVerified) {
      const error = new Error("Email is already verified");
      error.statusCode = 400;
      throw error;
    }

    // Generate new token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    user.verificationToken = verificationToken;
    user.verificationTokenExpires = verificationTokenExpires;
    await user.save();

    // Send verification email
    await sendEmail({
      to: email,
      subject: "Verify Your Email - Vans Shoe Store",
      html: verificationEmailTemplate(user.name, verificationToken),
    });

    res.status(200).json({
      success: true,
      message: "Verification email sent. Please check your inbox.",
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "User signed out successfully",
    });
  } catch (error) {
    next(error);
  }
};
