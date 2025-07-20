// Firebase Authentication for Admin Access
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { auth } from './firebase';

// List of admin email addresses - only these can access the admin dashboard
const ADMIN_EMAILS = [
  'bodamia.mx@gmail.com',  // Replace with your actual email
  'victorhuicochea28@gmail.com',   // Replace with your partner's email
  'landymendiola@gmail.com',   // Replace with your partner's email
  // Add more admin emails as needed
];

export const AdminAuth = {
  // Initialize auth persistence
  init: async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
    } catch (error) {
      console.error('Error setting auth persistence:', error);
    }
  },

  // Sign in with email/password
  signIn: async (email, password) => {
    try {
      // First check if the email is in the admin list
      if (!ADMIN_EMAILS.includes(email.toLowerCase())) {
        return { 
          success: false, 
          error: 'You are not authorized to access the admin dashboard.' 
        };
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { 
        success: true, 
        user: userCredential.user 
      };
    } catch (error) {
      let errorMessage = 'Authentication failed.';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No user found with this email address.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later.';
          break;
        default:
          errorMessage = error.message;
      }
      
      return { 
        success: false, 
        error: errorMessage 
      };
    }
  },

  // Sign out
  signOut: async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: 'Error signing out: ' + error.message 
      };
    }
  },

  // Check if current user is admin
  isAdmin: (user) => {
    if (!user || !user.email) return false;
    return ADMIN_EMAILS.includes(user.email.toLowerCase());
  },

  // Get current user
  getCurrentUser: () => {
    return auth.currentUser;
  },

  // Set up auth state listener
  onAuthStateChange: (callback) => {
    return onAuthStateChanged(auth, (user) => {
      // Only call callback with user if they're an admin
      if (user && AdminAuth.isAdmin(user)) {
        callback(user);
      } else {
        callback(null);
      }
    });
  },

  // Check if user is currently signed in and is admin
  isSignedInAdmin: () => {
    const user = auth.currentUser;
    return user && AdminAuth.isAdmin(user);
  }
};
