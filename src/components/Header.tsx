import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { authManager } from '@/lib/auth';
import { AuthState } from '@/lib/types';
import { Crown, LogOut, User } from 'lucide-react';

interface HeaderProps {
  onAuthClick: () => void;
  onPremiumClick: () => void;
}

export default function Header({ onAuthClick, onPremiumClick }: HeaderProps) {
  const [authState, setAuthState] = useState<AuthState>(authManager.getAuthState());

  useEffect(() => {
    const unsubscribe = authManager.subscribe(setAuthState);
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    authManager.logout();
  };

  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">LC</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">LessonCraft AI</h1>
        </div>

        <div className="flex items-center space-x-4">
          {authState.isAuthenticated && authState.user ? (
            <>
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">{authState.user.name}</span>
                {authState.user.isPremium ? (
                  <Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onPremiumClick}
                    className="text-xs"
                  >
                    <Crown className="w-3 h-3 mr-1" />
                    Upgrade
                  </Button>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <Button onClick={onAuthClick} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}