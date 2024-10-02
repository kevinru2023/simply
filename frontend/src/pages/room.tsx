import SideBar from "@/components/ui/sidebar";
import VideoComponentClaude from "@/components/ui/claude";
export default function RoomPage() {
  return (
    <div className="flex absolute bottom-4 right-2">
      <VideoComponentClaude></VideoComponentClaude>
      <SideBar></SideBar>
    </div>
  );
}

