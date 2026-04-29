import { Navbar, Input, Button } from '@/components';
import { Breadcrumbs } from '@/components';

export default function WorkerMessages() {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard/worker' },
    { label: 'Messages' }
  ];

  const conversations = [
    { id: 1, name: 'ABC Services', unread: 2, lastMessage: 'Great! We would like to proceed with your application.', time: '5 mins ago' },
    { id: 2, name: 'XYZ Corp', unread: 0, lastMessage: 'Thank you for your interest in the position.', time: '2 hours ago' },
    { id: 3, name: 'Build Co', unread: 1, lastMessage: 'When can you start the project?', time: '1 day ago' },
    { id: 4, name: 'Construct Ltd', unread: 0, lastMessage: 'Unfortunately, we went with another candidate.', time: '3 days ago' },
    { id: 5, name: 'Elite Builders', unread: 3, lastMessage: 'Can you provide references for your previous work?', time: '4 days ago' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumbs items={breadcrumbs} className="mb-6" />

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-[#001F3F] mb-3">Messages</h1>
            <p className="text-[#4A4A4A] text-lg">Chat with employers and recruiters</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
            {/* Conversations List */}
            <div className="lg:col-span-1 border border-[#E5E7EB] rounded-xl bg-white overflow-hidden flex flex-col">
              <div className="p-4 border-b border-[#E5E7EB]">
                <Input
                  placeholder="Search conversations..."
                  type="text"
                />
              </div>

              <div className="overflow-y-auto flex-1">
                {conversations.map((conv, idx) => (
                  <div
                    key={conv.id}
                    className={`p-4 border-b border-[#E5E7EB] cursor-pointer transition ${
                      idx === 0
                        ? 'bg-[#FFF4E5] border-l-4 border-l-[#FF7A00]'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#001F3F]">{conv.name}</h3>
                        <p className="text-sm text-[#4A4A4A] mt-1 line-clamp-1">{conv.lastMessage}</p>
                      </div>
                      {conv.unread > 0 && (
                        <span className="ml-2 w-5 h-5 bg-[#FF7A00] text-white text-xs flex items-center justify-center rounded-full font-bold">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#4A4A4A] mt-2">{conv.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2 border border-[#E5E7EB] rounded-xl bg-white overflow-hidden flex flex-col">
              {/* Chat Header */}
              <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FFF4E5] flex items-center justify-center text-xl">
                    🏢
                  </div>
                  <div>
                    <h2 className="font-bold text-[#001F3F]">ABC Services</h2>
                    <p className="text-sm text-[#4A4A4A]">Online now</p>
                  </div>
                </div>
                <Button variant="secondary" size="sm">View Job</Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {/* Received Message */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFF4E5] flex items-center justify-center text-sm flex-shrink-0">
                    🏢
                  </div>
                  <div>
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <p className="text-[#001F3F]">Hi John! Your application for Senior Plumber was reviewed and we are impressed with your experience.</p>
                    </div>
                    <p className="text-xs text-[#4A4A4A] mt-1">10:30 AM</p>
                  </div>
                </div>

                {/* Sent Message */}
                <div className="flex gap-3 justify-end">
                  <div>
                    <div className="bg-[#FF7A00] text-white rounded-lg px-4 py-2">
                      <p>Thank you! I'm very interested in the position. When would the interview be?</p>
                    </div>
                    <p className="text-xs text-[#4A4A4A] mt-1 text-right">10:32 AM</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm flex-shrink-0">
                    👤
                  </div>
                </div>

                {/* Received Message */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFF4E5] flex items-center justify-center text-sm flex-shrink-0">
                    🏢
                  </div>
                  <div>
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <p className="text-[#001F3F]">Great! We would like to proceed with your application. Please confirm your availability for a call tomorrow at 2 PM.</p>
                    </div>
                    <p className="text-xs text-[#4A4A4A] mt-1">10:35 AM</p>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-[#E5E7EB]">
                <div className="flex gap-3">
                  <Input
                    placeholder="Type a message..."
                    type="text"
                  />
                  <Button size="sm">Send</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
