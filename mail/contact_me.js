const sanitizeHtml = require('sanitize-html')
const nodemailer = require('nodemailer')

const sanitizeInputs = (inputs) => {
  return inputs.map(input => {
    return sanitizeHtml(input, {
      allowedTags: [],
      allowedAttributes: {}
    })
  })
}

const sendContactEmail = async (data) => {
  const { name, email, phone, message } = data
  [name, email, phone, message] = sanitizeInputs([
    name,
    email,
    phone,
    message
  ])
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_ADDRESS,
    subject: `Website Contact Form:  ${name}`,
    text: `
      You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: ${name}\n\nEmail: ${email}\n\nPhone: ${phone}\n\nMessage:\n${message}
    `
  }
  return await sendEmail(mailOptions)
}

async function sendEmail(email) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    }
  })
  return await transporter.sendMail(email, function (error, info) {
    if (error) {
      console.error('Error:', error)
    } else {
      console.log('Email sent:', info.response)
    }
  })
}

module.exports = { sendContactEmail }