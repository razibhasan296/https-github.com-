import React from 'react';
import { BotLockStatus } from '../types';

interface BotAvatarProps {
  status: BotLockStatus;
}

const BotAvatar: React.FC<BotAvatarProps> = ({ status }) => {
  const getColors = () => {
    switch (status) {
      case BotLockStatus.LOCKED:
        return { primary: '#22d3ee', secondary: '#0891b2', glow: 'rgba(34, 211, 238, 0.5)' };
      case BotLockStatus.SCANNING:
        return { primary: '#fbbf24', secondary: '#d97706', glow: 'rgba(251, 191, 36, 0.5)' };
      case BotLockStatus.OVERRIDE:
        return { primary: '#ef4444', secondary: '#b91c1c', glow: 'rgba(239, 68, 68, 0.5)' };
      case BotLockStatus.UNLOCKED:
        return { primary: '#10b981', secondary: '#059669', glow: 'rgba(16, 185, 129, 0.5)' };
      default:
        return { primary: '#94a3b8', secondary: '#475569', glow: 'transparent' };
    }
  };

  const colors = getColors();

  return (
    <div className="relative w-16 h-16 flex items-center justify-center group">
      {/* Outer Ring */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={colors.primary}
          strokeWidth="1"
          strokeDasharray="10 5"
          className={`opacity-30 ${status === BotLockStatus.SCANNING ? 'animate-[spin_4s_linear_infinite]' : ''}`}
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke={colors.primary}
          strokeWidth="2"
          strokeDasharray="80 200"
          className={`opacity-50 ${status === BotLockStatus.SCANNING ? 'animate-[spin_2s_linear_infinite]' : 'animate-[spin_8s_linear_infinite]'}`}
        />
      </svg>

      {/* Bot Head / Eye Container */}
      <div 
        className={`relative w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all duration-500 overflow-hidden bg-slate-900/80 backdrop-blur-sm shadow-lg`}
        style={{ 
          borderColor: colors.primary,
          boxShadow: `0 0 15px ${colors.glow}`
        }}
      >
        {/* Glitch Effect for Override */}
        {status === BotLockStatus.OVERRIDE && (
          <div className="absolute inset-0 bg-red-500/10 animate-pulse z-0"></div>
        )}

        {/* Eye / Core */}
        <div className="relative z-10 flex flex-col items-center gap-1">
          <div 
            className={`w-4 h-1 rounded-full transition-all duration-300 ${status === BotLockStatus.SCANNING ? 'animate-bounce' : ''}`}
            style={{ backgroundColor: colors.primary }}
          ></div>
          <div className="flex gap-1">
            <div 
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${status === BotLockStatus.OVERRIDE ? 'animate-ping' : ''}`}
              style={{ backgroundColor: colors.primary }}
            ></div>
            <div 
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${status === BotLockStatus.OVERRIDE ? 'animate-ping' : ''}`}
              style={{ backgroundColor: colors.primary, animationDelay: '0.2s' }}
            ></div>
          </div>
        </div>

        {/* Scanning Line */}
        {status === BotLockStatus.SCANNING && (
          <div className="absolute inset-x-0 h-[1px] bg-yellow-400/50 shadow-[0_0_5px_#fbbf24] animate-[scan_1.5s_ease-in-out_infinite] z-20"></div>
        )}
      </div>

      {/* Status Indicators */}
      <div className="absolute -bottom-1 -right-1 flex gap-0.5">
        {[1, 2, 3].map((i) => (
          <div 
            key={i}
            className={`w-1 h-1 rounded-full transition-all duration-300 ${status === BotLockStatus.LOCKED ? 'opacity-100 scale-110' : 'opacity-30 scale-100'}`}
            style={{ 
              backgroundColor: colors.primary,
              animation: status === BotLockStatus.SCANNING ? `pulse 1s infinite ${i * 0.2}s` : 'none'
            }}
          ></div>
        ))}
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default BotAvatar;
