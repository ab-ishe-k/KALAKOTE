import React from 'react';
import { VerificationStatus } from '../../types';
import { ShieldCheck, AlertCircle, HelpCircle, AlertTriangle, Clock } from 'lucide-react';

interface VerificationBadgeProps {
  status: VerificationStatus;
  size?: 'sm' | 'md';
  showIcon?: boolean;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  status,
  size = 'sm',
  showIcon = true
}) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'VERIFIED':
        return {
          bg: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60',
          icon: <ShieldCheck className="w-3.5 h-3.5" />,
          label: 'VERIFIED'
        };
      case 'PARTIALLY VERIFIED':
        return {
          bg: 'bg-amber-950/80 text-amber-300 border-amber-700/60',
          icon: <AlertTriangle className="w-3.5 h-3.5" />,
          label: 'PARTIALLY VERIFIED'
        };
      case 'UNVERIFIED':
        return {
          bg: 'bg-rose-950/80 text-rose-300 border-rose-700/60',
          icon: <AlertCircle className="w-3.5 h-3.5" />,
          label: 'UNVERIFIED'
        };
      case 'CONFLICTING SOURCES':
        return {
          bg: 'bg-purple-950/80 text-purple-300 border-purple-700/60',
          icon: <HelpCircle className="w-3.5 h-3.5" />,
          label: 'CONFLICTING SOURCES'
        };
      case 'RESEARCH PENDING':
      default:
        return {
          bg: 'bg-slate-900 text-slate-300 border-slate-700',
          icon: <Clock className="w-3.5 h-3.5" />,
          label: 'RESEARCH PENDING'
        };
    }
  };

  const config = getBadgeConfig();
  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs sm:text-sm';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono font-medium tracking-wider uppercase border rounded-full transition-colors ${config.bg} ${padding}`}
      title={`Verification Status: ${status}`}
    >
      {showIcon && config.icon}
      <span>{config.label}</span>
    </span>
  );
};

