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
  id,
  senderName,
  senderImage,
  lastMessage,
  timestamp,
  unreadCount = 0,
  isSelected = false,
  onClick
}: MessageCardProps) {
  return (
    <Card
      hoverable
      onClick={onClick}
      className={`cursor-pointer ${isSelected ? 'bg-[#FFF4E5] border-[#FF7A00]' : ''}`}
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        {senderImage ? (
          <img
            src={senderImage}
            alt={senderName}
            className="w-12 h-12 rounded-full object-cover border-2 border-[#FF7A00]"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-[#FFF4E5] flex items-center justify-center text-lg">
            👤
          </div>
        )}

        {/* Message Info */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-semibold text-[#001F3F]">{senderName}</h4>
            <span className="text-xs text-[#4A4A4A] ml-2 whitespace-nowrap">
              {new Date(timestamp).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-[#4A4A4A] truncate">
            {lastMessage}
          </p>
        </div>

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <div className="bg-[#FF7A00] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold ml-2">
            {unreadCount > 9 ? '9+' : unreadCount}
          </div>
        )}
      </div>
    </Card>
  );
}
