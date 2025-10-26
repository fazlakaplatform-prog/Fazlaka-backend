export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email()
    },
    {
      name: 'password',
      title: 'Password',
      type: 'string',
      hidden: true
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text',
      description: 'A short biography about the user'
    },
    {
      name: 'image',
      title: 'Profile Image',
      type: 'url',
      description: 'URL of the profile image'
    },
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'verificationToken',
      title: 'Verification Token',
      type: 'string',
      hidden: true
    },
    {
      name: 'verificationTokenExpiry',
      title: 'Verification Token Expiry',
      type: 'datetime',
      hidden: true
    },
    {
      name: 'resetToken',
      title: 'Reset Token',
      type: 'string',
      hidden: true
    },
    {
      name: 'resetTokenExpiry',
      title: 'Reset Token Expiry',
      type: 'datetime',
      hidden: true
    },
    {
      name: 'magicToken',
      title: 'Magic Token',
      type: 'string',
      hidden: true
    },
    {
      name: 'magicTokenExpiry',
      title: 'Magic Token Expiry',
      type: 'datetime',
      hidden: true
    },
    {
      name: 'otpCode',
      title: 'OTP Code',
      type: 'string',
      hidden: true
    },
    {
      name: 'otpExpiry',
      title: 'OTP Expiry',
      type: 'datetime',
      hidden: true
    },
    {
      name: 'otpPurpose',
      title: 'OTP Purpose',
      type: 'string',
      options: {
        list: [
          { title: 'Login', value: 'login' },
          { title: 'Register', value: 'register' },
          { title: 'Reset Password', value: 'reset' },
          { title: 'Verify Identity', value: 'verify' }
        ]
      },
      hidden: true
    },
    {
      name: 'otpVerified',
      title: 'OTP Verified',
      type: 'boolean',
      hidden: true
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ]
}