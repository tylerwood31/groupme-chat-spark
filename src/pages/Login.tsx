
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const handleLogin = () => {
    login();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="animate-fade-in max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-groupme-primary text-white flex items-center justify-center text-2xl font-bold">
              G
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center mb-2 gradient-text">GroupMe Recap</h1>
          <p className="text-center text-muted-foreground mb-8">
            Get weekly insights and highlights from your GroupMe chats
          </p>
          
          <div className="space-y-4">
            <Button 
              className="w-full py-6 bg-groupme-primary hover:bg-groupme-secondary text-white flex items-center justify-center space-x-2 text-lg" 
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" fill="currentColor" />
                    <path d="M16 12C16 14.209 14.209 16 12 16C9.791 16 8 14.209 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12Z" fill="white" />
                  </svg>
                  <span>Continue with GroupMe</span>
                </>
              )}
            </Button>
          </div>
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>By continuing, you agree to our</p>
            <p>
              <a href="#" className="text-groupme-primary hover:underline">Terms of Service</a>
              {' & '}
              <a href="#" className="text-groupme-primary hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
        
        <div className="px-8 py-4 bg-muted text-center">
          <p className="text-sm text-muted-foreground">
            Don't have GroupMe? <a href="https://groupme.com/" target="_blank" rel="noopener noreferrer" className="text-groupme-primary hover:underline">Sign up here</a>
          </p>
        </div>
      </div>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
        <div className="animate-slide-up bg-white rounded-lg p-6 shadow-md">
          <div className="h-10 w-10 rounded-full bg-blue-100 text-groupme-primary flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">Weekly Recaps</h3>
          <p className="text-muted-foreground text-sm">Get beautifully formatted summaries of your group's activity.</p>
        </div>
        
        <div className="animate-slide-up bg-white rounded-lg p-6 shadow-md delay-150">
          <div className="h-10 w-10 rounded-full bg-purple-100 text-groupme-accent flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">Insightful Stats</h3>
          <p className="text-muted-foreground text-sm">Track engagement, see who posts the most, and discover trends.</p>
        </div>
        
        <div className="animate-slide-up bg-white rounded-lg p-6 shadow-md delay-300">
          <div className="h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">Top Contributors</h3>
          <p className="text-muted-foreground text-sm">See who's contributing the most to your group conversations.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
