const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { Readable } = require('stream');

const upload = multer({ storage: multer.memoryStorage() }).single('profileImage');

// Generate a 6-digit alphanumeric OTP
const generateOtp = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let otp = '';
  for (let i = 0; i < 6; i++) {
    otp += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return otp;
};

const sendVerificationEmail = async (user) => {
  const otp = generateOtp();
  user.verificationOtp = otp;
  await user.save();

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Verify Your Email with OTP',
    html: `<p>Your OTP for email verification is: <strong>${otp}</strong></p><p>Enter this OTP on the verification page to complete registration.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

const signup = (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err) {
        return res.status(500).json({ message: 'Upload error' });
      }

      const { name, email, mobile, password } = req.body;
      if (!name || !email || !mobile || !password) {
        return res.status(400).json({ message: 'Missing fields' });
      }
      if (password.length < 6) {
        return res.status(400).json({ message: 'Password min 6 chars' });
      }
      if (!/^[6-9]\d{9}$/.test(mobile)) {
        return res.status(400).json({ message: 'Invalid Indian mobile' });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User exists' });
      }

      let profileImage = '';
      if (req.file) {
        if (req.file.size > 1024 * 1024) {
          return res.status(400).json({ message: 'Image max 1MB' });
        }

        const uploadToCloudinary = (buffer) => {
          return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { resource_type: 'image' },
              (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
              }
            );
            Readable.from(buffer).pipe(uploadStream);
          });
        };

        profileImage = await uploadToCloudinary(req.file.buffer);
      }

      const user = new User({ name, email, mobile, password, profileImage });
      await user.save();
      await sendVerificationEmail(user);

      return res.status(201).json({ message: 'OTP sent to your email' });
    } catch (error) {
      console.error('Signup Error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
};

const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    if (user.verificationOtp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    user.isVerified = true;
    user.verificationOtp = undefined;
    await user.save();

    return res.json({ message: 'Email verified successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.isVerified) {
      return res.status(400).json({ message: 'User not found or not verified' });
    }
    if (!(await user.matchPassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    return res.json({ token, user: { name: user.name, email: user.email, profileImage: user.profileImage } });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -verificationOtp');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (err) {
    console.error('Get Profile Error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signup, verifyEmail, login, getProfile };