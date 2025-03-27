import { cn } from "@/lib/utils";
import Image from "next/image";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const Agent = ({ userName }: AgentProps) => {
  const isSPeaking = true;
  const currentCallStatus = CallStatus.INACTIVE; 
  const messages = [
    'Vad heter du?', 
    'Jag heter Jhon Doe, trevligt att träffa dig!'
  ];
  const lastMessage = messages[messages.length - 1];
  return (
    
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="vapi"
              width={65}
              height={54}
              className="object-contain"
            />
            {isSPeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interjuvare</h3>
        </div>

        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="user"
              width={540}
              height={540}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
  <div className="transcript-border">
    <div className="transcript">
      {messages.map((message, index) => (
        <p key={index} className={cn('transition-opacity duration-500 opacity-0', 'animate-fadeIn opacity-100')}>
          {lastMessage} 
        </p>
      ))}
    </div>
  </div>
)}

      <div className="w-full flex justify-center">
        {currentCallStatus !== CallStatus.ACTIVE ? (
          <button className="relative btn-call">
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                currentCallStatus === CallStatus.CONNECTING && "hidden"
              )}
            />

            <span>
              {currentCallStatus === CallStatus.INACTIVE ||
              currentCallStatus === CallStatus.FINISHED
                ? "Samtal"
                : " . . ."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect">Avsluta</button>
        )}
      </div>
    </>
  );
};

export default Agent;
