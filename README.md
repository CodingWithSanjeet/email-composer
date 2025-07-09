# 📧 Email Composer - Beautiful Email Sending App

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
</div>

<div align="center">
  <h3>🚀 A modern, beautiful email sending application built with Node.js</h3>
  <p>Send emails with style using our sleek, responsive interface powered by Gmail, SendGrid, and Ethereal Email</p>
</div>

---

## ✨ Features

### 🎨 **Beautiful UI/UX**
- **Modern Design**: Sleek gradient backgrounds and glass-morphism effects
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Elements**: Smooth animations, hover effects, and ripple buttons
- **Form Validation**: Real-time validation with helpful error messages
- **Character Counters**: Live character count for subject and message fields

### 📬 **Email Functionality**
- **Multiple Email Providers**: Support for Gmail, SendGrid, and Ethereal Email
- **Rich HTML Templates**: Beautiful email templates with custom styling
- **Form Validation**: Client-side and server-side validation
- **Template Suggestions**: Quick email templates for common scenarios
- **Real-time Feedback**: Instant success/error notifications

### 🛠️ **Developer Features**
- **Express.js Backend**: Fast and lightweight server
- **Static File Serving**: Optimized asset delivery
- **Environment Variables**: Secure configuration management
- **Error Handling**: Comprehensive error handling and logging
- **API Endpoints**: RESTful API for email sending

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Gmail account (for Gmail integration)
- SendGrid account (optional, for SendGrid integration)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CodingWithSanjeet/email-composer.git
   cd send-mail
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=4000
   NODE_ENV=development
   
   # Gmail Configuration
   FROM_EMAIL=your-email@gmail.com
   FROM_PASS=your-app-password
   
   # SendGrid Configuration (Optional)
   SENDGRID_API_KEY=your-sendgrid-api-key
   ```

4. **Start the application**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:4000` to see the beautiful email composer!

---

## 📱 Screenshots

### Desktop View
The main interface features a beautiful gradient background with a clean, modern form design.

### Mobile View
Fully responsive design that works seamlessly on all screen sizes.

---

## 🔧 Configuration

### Gmail Setup
1. Enable 2-factor authentication in your Google account
2. Generate an app password for Gmail
3. Add your email and app password to the `.env` file

### SendGrid Setup (Optional)
1. Sign up for a SendGrid account
2. Create an API key
3. Add the API key to your `.env` file

### Ethereal Email (Testing)
No setup required! Perfect for testing email functionality without sending real emails.

---

## 📚 API Documentation

### Send Email
Send an email using the form data.

**Endpoint:** `POST /api/send-email`

**Request Body:**
```json
{
  "to": "recipient@example.com",
  "subject": "Your email subject",
  "message": "Your email message content"
}
```

**Success Response:**
```json
{
  "status": "success",
  "message": "Email sent successfully!",
  "data": {
    "messageId": "unique-message-id",
    "to": "recipient@example.com",
    "subject": "Your email subject",
    "timestamp": "2025-01-07T10:30:00.000Z"
  }
}
```

**Error Response:**
```json
{
  "status": "error",
  "message": "Please provide recipient email, subject, and message"
}
```

---

## 🏗️ Project Structure

```
send-mail/
├── 📁 public/                 # Static files
│   ├── 🌐 index.html         # Main HTML file
│   ├── 🎨 styles.css         # CSS styling
│   └── ⚡ script.js          # Client-side JavaScript
├── 📁 controller/             # Route controllers
│   └── 📧 sendEmailController.js
├── 📁 helper/                 # Utility functions
│   └── 🔧 asyncWrapper.js    # Async error handling
├── 📄 app.js                 # Express app configuration
├── 📄 index.js               # Application entry point
├── 📄 package.json           # Dependencies and scripts
└── 📄 README.md              # This file
```

---

## 🛠️ Available Scripts

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Install dependencies
npm install
```

---

## 🎯 Usage Examples

### Basic Email
```javascript
// Send a simple email
const emailData = {
  to: "friend@example.com",
  subject: "Hello!",
  message: "Just wanted to say hi!"
};
```

### Using Templates
The application includes built-in templates for:
- **Meeting Requests**: Professional meeting invitation template
- **Follow-ups**: Polite follow-up message template
- **Introductions**: Friendly introduction template

### Keyboard Shortcuts
- `Ctrl/Cmd + Enter`: Send email
- `Escape`: Close notifications
- `Tab`: Navigate between form fields

---

## 🌟 Features in Detail

### 🎨 **Modern UI Components**
- Glass-morphism design with backdrop filters
- Smooth gradient animations
- Interactive button ripple effects
- Responsive grid layout
- Custom scrollbar styling

### 📧 **Email Templates**
- Beautiful HTML email templates
- Responsive email design
- Custom branding and styling
- Professional formatting

### 🔒 **Security Features**
- Input validation and sanitization
- Environment variable protection
- HTTPS support ready
- Rate limiting ready

### 📱 **Mobile Optimization**
- Touch-friendly interface
- Responsive breakpoints
- Optimized loading times
- Swipe gestures support

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 📋 Roadmap

### 🔄 **Upcoming Features**
- [ ] Email scheduling
- [ ] Email templates management
- [ ] Attachment support
- [ ] Email analytics
- [ ] User authentication
- [ ] Email history
- [ ] Dark mode toggle
- [ ] Multiple language support

### 🐛 **Known Issues**
- None at the moment! 🎉

---

## ❓ FAQ

### **Q: How do I set up Gmail app passwords?**
A: Go to your Google Account settings, enable 2-factor authentication, then generate an app password specifically for this application.

### **Q: Can I use other email providers?**
A: Currently supports Gmail, SendGrid, and Ethereal Email. Other providers can be added by modifying the controller.

### **Q: Is this production-ready?**
A: Yes! The application includes proper error handling, validation, and security features.

### **Q: How do I customize the email templates?**
A: Edit the HTML template in `controller/sendEmailController.js` to customize the email appearance.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Node.js** - The JavaScript runtime
- **Express.js** - Web framework
- **Nodemailer** - Email sending library
- **SendGrid** - Email delivery service
- **Font Awesome** - Beautiful icons
- **Google Fonts** - Typography

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [FAQ section](#-faq)
2. Search through existing [Issues](https://github.com/CodingWithSanjeet/email-composer/issues)
3. Create a new issue if needed

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/CodingWithSanjeet">Sanjeet Kumar</a></p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>

---

## 🎉 Demo

Try the live demo: [Email Composer Demo](https://your-demo-url.com)

**Test Credentials:**
- Use any valid email address
- The application will send real emails when properly configured

---

**Happy Emailing! 📧✨** 