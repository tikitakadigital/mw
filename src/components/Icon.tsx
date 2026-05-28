'use client';

interface IconProps {
  name: string;
  size?: number;
  stroke?: number;
  className?: string;
}

export default function Icon({ name, size = 20, stroke = 1.6, className = '' }: IconProps) {
  const props = {
    width: size, height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: stroke,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
  };

  switch (name) {
    case 'search':    return <svg {...props}><circle cx="11" cy="11" r="7"/><line x1="20" y1="20" x2="16.65" y2="16.65"/></svg>;
    case 'heart':     return <svg {...props}><path d="M12 21s-7-4.5-9.5-9C.8 8.7 2.7 5 6.3 5c2 0 3.4 1 4.7 2.5C12.3 6 13.7 5 15.7 5 19.3 5 21.2 8.7 19.5 12c-2.5 4.5-9.5 9-9.5 9z"/></svg>;
    case 'heart-fill':return <svg {...props} fill="currentColor" stroke="none"><path d="M12 21s-7-4.5-9.5-9C.8 8.7 2.7 5 6.3 5c2 0 3.4 1 4.7 2.5C12.3 6 13.7 5 15.7 5 19.3 5 21.2 8.7 19.5 12c-2.5 4.5-9.5 9-9.5 9z"/></svg>;
    case 'calendar':  return <svg {...props}><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/></svg>;
    case 'guests':    return <svg {...props}><circle cx="9" cy="9" r="3"/><circle cx="17" cy="11" r="2.5"/><path d="M3 21c0-3 3-5 6-5s6 2 6 5"/><path d="M14 21c0-2.5 2-4 3.5-4S21 18.5 21 21"/></svg>;
    case 'pin':       return <svg {...props}><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
    case 'star':      return <svg {...props} fill="currentColor" stroke="none"><path d="M12 2l2.5 6.5L21 9l-5 4.5L17.5 21 12 17.5 6.5 21 8 13.5 3 9l6.5-.5z"/></svg>;
    case 'check':     return <svg {...props}><path d="M5 12l5 5L20 7"/></svg>;
    case 'arrow':     return <svg {...props}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
    case 'arrow-l':   return <svg {...props}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
    case 'arrow-up-right': return <svg {...props}><line x1="7" y1="17" x2="17" y2="7"/><polyline points="8 7 17 7 17 16"/></svg>;
    case 'menu':      return <svg {...props}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
    case 'close':     return <svg {...props}><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>;
    case 'share':     return <svg {...props}><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><line x1="8.5" y1="11" x2="15.5" y2="7"/><line x1="8.5" y1="13" x2="15.5" y2="17"/></svg>;
    case 'globe':     return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a13 13 0 0 1 0 18a13 13 0 0 1 0 -18"/></svg>;
    case 'sparkle':   return <svg {...props}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/></svg>;
    case 'shield':    return <svg {...props}><path d="M12 3l8 3v6c0 4.5-3 8-8 9-5-1-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>;
    case 'flame':     return <svg {...props}><path d="M12 2c2 4 6 6 6 11a6 6 0 1 1-12 0c0-3 1.5-5 3-7"/></svg>;
    case 'sun':       return <svg {...props}><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="5" y1="5" x2="7" y2="7"/><line x1="17" y1="17" x2="19" y2="19"/><line x1="5" y1="19" x2="7" y2="17"/><line x1="17" y1="7" x2="19" y2="5"/></svg>;
    case 'wallet':    return <svg {...props}><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18"/><circle cx="16.5" cy="14.5" r="1" fill="currentColor"/></svg>;
    case 'sparkles':  return <svg {...props}><path d="M9 3l1.5 4.5L15 9l-4.5 1.5L9 15l-1.5-4.5L3 9l4.5-1.5z"/><path d="M17 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1z"/></svg>;
    case 'home':      return <svg {...props}><path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z"/></svg>;
    case 'briefcase': return <svg {...props}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>;
    case 'venue':     return <svg {...props}><path d="M3 9l9-6 9 6v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>;
    case 'florist':   return <svg {...props}><circle cx="12" cy="8" r="3"/><circle cx="7" cy="12" r="3"/><circle cx="17" cy="12" r="3"/><circle cx="12" cy="16" r="3"/><line x1="12" y1="11" x2="12" y2="21"/></svg>;
    case 'camera':    return <svg {...props}><circle cx="11" cy="11" r="3"/><path d="M9 4h6l1 3h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3z"/></svg>;
    case 'planner':   return <svg {...props}><rect x="4" y="4" width="16" height="16" rx="2"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="14" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/></svg>;
    case 'gem':       return <svg {...props}><path d="M6 3h12l3 5-9 13L3 8z"/><line x1="6" y1="3" x2="12" y2="21"/><line x1="18" y1="3" x2="12" y2="21"/><line x1="3" y1="8" x2="21" y2="8"/></svg>;
    case 'wave':      return <svg {...props}><path d="M3 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/><path d="M3 17c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/></svg>;
    case 'rainbow':   return <svg {...props}><path d="M3 18a9 9 0 0 1 18 0"/><path d="M6 18a6 6 0 0 1 12 0"/><path d="M9 18a3 3 0 0 1 6 0"/></svg>;
    case 'leaf':      return <svg {...props}><path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z"/><path d="M5 19l8-8"/></svg>;
    case 'mail':      return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></svg>;
    case 'clock':     return <svg {...props}><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 16 14"/></svg>;
    case 'tag':       return <svg {...props}><path d="M3 12V4h8l10 10-8 8z"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/></svg>;
    case 'inbox':     return <svg {...props}><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>;
    case 'overview':  return <svg {...props}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
    case 'profile':   return <svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>;
    default: return null;
  }
}
