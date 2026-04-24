# Student Project Submission Website

A React-based web application for students to submit their projects with file uploads, featuring user authentication, project management, and data persistence.

## 🚀 Features

- **User Authentication**: Login/logout functionality
- **Project Upload**: Submit projects with title and file attachment
- **Project Management**: View all submitted projects with delete functionality
- **Navigation**: Easy switching between upload and view sections
- **Data Persistence**: Projects saved using localStorage
- **Responsive Design**: Works on desktop and mobile devices
- **Production Ready**: Optimized build for deployment

## 🛠️ Technologies Used

- **React 19.2.4** - Frontend framework
- **React Hooks** - State management (useState, useEffect)
- **localStorage** - Client-side data persistence
- **CSS** - Styling with responsive design
- **Create React App** - Build tooling

## 📋 Available Scripts

### `npm start`
Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm test`
Launches the test runner in interactive watch mode.

## 🚀 Deployment

This app is ready for deployment on Netlify!

### Quick Deploy Steps:
1. Run `npm run build` to create production files
2. Go to [netlify.com](https://netlify.com) and sign up
3. Drag the entire `build` folder to Netlify's deployment area
4. Your site will be live in 1-2 minutes!

For detailed deployment instructions, see: `NETLIFY_DEPLOYMENT_GUIDE.md`

## 📱 Usage

1. **Login**: Enter any username and password
2. **Upload**: Add project title and select a file
3. **View**: See all uploaded projects with delete option
4. **Navigate**: Use the top navigation buttons
5. **Logout**: Return to login screen

## 📂 Project Structure

```
project-submission/
├── public/
│   ├── index.html
│   ├── _redirects          # For Netlify routing
│   └── assets...
├── src/
│   ├── App.js              # Main app component
│   ├── App.css             # Global styles
│   ├── pages/
│   │   ├── Login.js        # Login component
│   │   ├── Upload.js       # Upload component
│   │   └── View.js         # View projects component
│   └── index.js
├── build/                  # Production build (after npm run build)
└── package.json
```

## 🎯 Features in Detail

- **Login System**: Simple authentication with username/password
- **File Upload**: Supports any file type with validation
- **Project List**: Displays title and filename for each project
- **Delete Functionality**: Remove projects with confirmation
- **Navigation Menu**: Switch between sections seamlessly
- **Data Persistence**: Projects saved in browser's localStorage
- **Mobile Responsive**: Optimized for all screen sizes

## 🔧 Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Local Development
1. Clone the repository
2. Run `npm install`
3. Run `npm start`
4. Open [http://localhost:3000](http://localhost:3000)

## 📄 License

This project is for educational purposes.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
