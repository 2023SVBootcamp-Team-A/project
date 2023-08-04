import FlipBook from "../components/FlipBook";
import { useLocation } from "react-router-dom";

interface ResultPageProps {
  novel_id: number;
}

export default function ResultPage() {
  const location = useLocation();
  let novel = null;

  if (location.state !== undefined) {
    novel = location.state as ResultPageProps;
  }

  return (
    <div className="w-screen h-screen">
      <FlipBook novel_id={novel?.novel_id} />
    </div>
  );
}
