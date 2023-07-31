import FlipBook from "../components/FlipBook";
import { useLocation } from 'react-router-dom';

export default function ResultPage() {
    const location = useLocation();
    const novel_id = location.state.novel_id;
    return (
        <div className="w-screen h-screen">
            <FlipBook novel_id={novel_id} />
        </div>
    )
}