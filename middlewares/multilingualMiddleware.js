const messages = {
  en: {
    unauthorized: 'Please authenticate.',
    accessDenied: 'Access denied.',
    bookNotFound: 'Book not found.',
    libraryNotFound: 'Library not found.',
    invalidCredentials: 'Invalid credentials.',
    bookNotAvailable: 'Book not available for borrowing.',
    bookNotBorrowed: 'Book not borrowed.'
  },
  hi: {
    unauthorized: 'कृपया प्रमाणीकरण करें।',
    accessDenied: 'प्रवेश निषेध।',
    bookNotFound: 'पुस्तक नहीं मिली।',
    libraryNotFound: 'पुस्तकालय नहीं मिला।',
    invalidCredentials: 'अमान्य क्रेडेंशियल।',
    bookNotAvailable: 'पुस्तक उधार के लिए उपलब्ध नहीं है।',
    bookNotBorrowed: 'पुस्तक उधार नहीं ली गई।'
  }
};

const multilingualMiddleware = (req, res, next) => {
  const language = req.user?.preferredLanguage || 'en';
  req.messages = messages[language];
  next();
};

module.exports = multilingualMiddleware;
