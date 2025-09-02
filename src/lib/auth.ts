import { User, AuthState } from './types';

class AuthManager {
  private static instance: AuthManager;
  private authState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false
  };
  private listeners: ((state: AuthState) => void)[] = [];

  static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const userData = localStorage.getItem('lessoncraft_user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        this.authState = {
          user,
          isAuthenticated: true,
          isLoading: false
        };
      } catch (error) {
        localStorage.removeItem('lessoncraft_user');
      }
    }
  }

  private saveUserToStorage(user: User) {
    localStorage.setItem('lessoncraft_user', JSON.stringify(user));
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.authState));
  }

  subscribe(listener: (state: AuthState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  getAuthState(): AuthState {
    return this.authState;
  }

  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    this.authState.isLoading = true;
    this.notifyListeners();

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock authentication - in real app, this would call your Flask backend
    if (email && password.length >= 6) {
      const user: User = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0],
        role: 'teacher',
        isPremium: false,
        createdAt: new Date().toISOString()
      };

      this.authState = {
        user,
        isAuthenticated: true,
        isLoading: false
      };

      this.saveUserToStorage(user);
      this.notifyListeners();
      return { success: true };
    }

    this.authState.isLoading = false;
    this.notifyListeners();
    return { success: false, error: 'Invalid credentials' };
  }

  async signup(email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> {
    this.authState.isLoading = true;
    this.notifyListeners();

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email && password.length >= 6 && name) {
      const user: User = {
        id: Date.now().toString(),
        email,
        name,
        role: 'teacher',
        isPremium: false,
        createdAt: new Date().toISOString()
      };

      this.authState = {
        user,
        isAuthenticated: true,
        isLoading: false
      };

      this.saveUserToStorage(user);
      this.notifyListeners();
      return { success: true };
    }

    this.authState.isLoading = false;
    this.notifyListeners();
    return { success: false, error: 'Please fill all fields correctly' };
  }

  logout() {
    this.authState = {
      user: null,
      isAuthenticated: false,
      isLoading: false
    };
    localStorage.removeItem('lessoncraft_user');
    this.notifyListeners();
  }

  upgradeToPremium() {
    if (this.authState.user) {
      this.authState.user.isPremium = true;
      this.saveUserToStorage(this.authState.user);
      this.notifyListeners();
    }
  }
}

export const authManager = AuthManager.getInstance();