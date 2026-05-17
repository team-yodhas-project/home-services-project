# Forgot Password Feature - Environment Configuration

## Backend Environment Variables

To enable the forgot password feature, add the following environment variables to your `.env` file in the backend directory:

```env
# Email Configuration (Gmail example)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=your-email@gmail.com

# Frontend URL (for reset link)
FRONTEND_URL=http://localhost:5173

# Existing variables
JWT_SECRET=your_jwt_secret_key
MONGO_URI=your_mongodb_connection_string
```

## Email Service Setup

### Using Gmail:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer" (or your device)
   - Google will generate a 16-character password
   - Use this password in the `EMAIL_PASSWORD` variable

### Using Other Email Services:

You can modify the `sendEmail.js` file to support other services like SendGrid, AWS SES, or Mailgun.

## Feature Overview

### Endpoints:

1. **POST /api/auth/forgot-password**
   - Body: `{ email: "user@example.com" }`
   - Returns: Success message with password reset link sent

2. **POST /api/auth/reset-password**
   - Body: `{ token, newPassword, confirmPassword }`
   - Returns: Success message on password reset

### Frontend Routes:

- `/forgot-password` - Forgot password form
- `/reset-password/:token` - Reset password form with token

### Database Changes:

The User model now includes:
- `resetPasswordToken` - Hashed token for password reset
- `resetPasswordExpiry` - Token expiration time (15 minutes)

## Testing

1. Navigate to `http://localhost:5173/forgot-password`
2. Enter your email address
3. Check your email for the reset link
4. Click the link and set a new password
5. Login with your new password
