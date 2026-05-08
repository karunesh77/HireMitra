import Card from './Card';

interface MessageCardProps {
  id: string;
  senderName: string;
  senderImage?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function MessageCard({
  id, senderName, senderImage, lastMessage, timestamp,
  unreadCount = 0, isSelected = false, onClick
}: MessageCardProps) {
  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-200
        ${isSelected
          ? 'bg-[#FFF4E5] border border-[#FF7A00]/30 shadow-sm'
          : 'hover:bg-[#FAFAFA] border border-transparent'
        }
        ${unreadCount > 0 ? 'bg-[#FFFBF5]' : ''}
      `}
    >
      {/* Avatar */}
      {senderImage ? (
        <img src={senderImage} alt={senderName} className="w-11 h-11 rounded-xl object-cover flex-shrink-0" />
      ) : (
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FFF4E5] to-[#FFE8CC] flex items-center justify-center text-base flex-shrink-0 font-bold text-[#FF7A00]">
          {senderName.charAt(0).toUpperCase()}
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-0.5">
          <h4 className={`text-sm truncate ${unreadCount > 0 ? 'font-bold text-[#001F3F]' : 'font-medium text-[#001F3F]'}`}>{senderName}</h4>
          <span className="text-[10px] text-[#9CA3AF] ml-2 whitespace-nowrap">{timeAgo(timestamp)}</span>
        </div>
        <p className={`text-xs truncate ${unreadCount > 0 ? 'text-[#4A4A4A] font-medium' : 'text-[#9CA3AF]'}`}>{lastMessage}</p>
      </div>

      {/* Unread */}
      {unreadCount > 0 && (
        <div className="w-5 h-5 bg-[#FF7A00] text-white rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 shadow-sm shadow-[#FF7A00]/20">
          {unreadCount > 9 ? '9+' : unreadCount}
        </div>
      )}
    </div>
  );
}
