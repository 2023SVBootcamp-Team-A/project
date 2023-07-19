import React, {useRef} from "react";
import HTMLFlipBook from "react-pageflip";
import "./FlipBook.scss"


const Page: React.FC<{ children: React.ReactNode; number: number; chapter: number; }> = React.forwardRef(
  (props, ref: React.Ref<HTMLInputElement>) => {
    return (
      <div className="page" ref={ref}>
            <div className="page-content">
                <h2 className="page-header">Chapter {props.chapter}</h2>
                <div className="page-text">{props.children}</div>
                <div className="page-footer">{props.number}</div>
            </div>
      </div>
    );
  }
);

const FlipBook: React.FC = () => {
  const book = useRef();
  return (
    <div className="w-screen h-screen ">
      <div className="flex flex-col justify-center items-center">
        <div className="w-8/12 h-4/6 absolute top-28">
        <div className="flex flex-col justify-center items-center">
          <HTMLFlipBook
            width={600}
            height={750}
            size="stretch"
            minWidth={300}
            maxWidth={600}
            minHeight={600}
            maxHeight={750}
            drawShadow={true}
            flippingTime={1000}
            className="book-theme"
            startPage={1}
            usePortrait={false}
            startZIndex={30}
            autoSize={true}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            clickEventForward={false}
            useMouseEvents={true}
            swipeDistance={3}
            showPageCorners={true}
            disableFlipByClick={true}
            style={{ top: 1/2 }}
            ref={book}
          >
            <div className="page page-cover page-cover-top" data-density="hard">
                <div className="page-content">
                    <h2>BOOK TITLE</h2>
                </div>
            </div>
            <Page number={1} chapter={1}>
              <div className="flex flex-col items-center">
                <span className="m-8  text-center text-5xl text-[#744624]">우주 탐사</span>
                <img src="/images/dall.png" className="flex flex-col items-center object-cover" style={{width: '344px', height: '300px'}} />
              </div>
            </Page>
            <Page number={2} chapter={1}>
              이블린과 해럴드는 눈길을 브랜든에게 돌렸다. "어떤 방법이 있을까요?" 해럴드가 물었다.<br />
              "우리 주위에는 탐사 임무를 위해 보낸 우주선이나 시설이 있을 것이다. 그런 곳에서 추가 연료를 구할 수 있을지도 몰라."<br />
              "하지만 우리는 화성의 표면에서 멀리 떨어져 있잖아요." 이블린이 말했다. "우리가 가까운 시설에 도달할 시간은 없을 텐데요."<br />
              "그렇다면 우리는 이 우주선에서 대기하며 구조 대기를 요청해야 합니다." 해럴드가 제안했다. "우리가 발신할 수 있는 신호를 어떻게든 보내야 합니다."<br />
              이블린과 해럴드는 주저하고 있었지만, 브랜든은 단호하게 말했다. "너희들은 돌아갈 수 있는 방법을 찾으려고 하지만, 우리가 죽는 것보다는 시도해 보는 게 낫지 않을까? 우리는 우주에 도전한 사람들이야. 실패를 두려워하지 말자."<br />
            </Page>
            <Page number={3} chapter={1}>
              <div className="flex flex-col items-center">
                <span className="m-8  text-center text-5xl text-[#744624]">우주 탐사</span>
                <img src="/images/dall.png" className="flex flex-col items-center object-cover" style={{width: '344px', height: '300px'}} />
              </div>
            </Page>
            <Page number={4} chapter={1}>
              이블린과 해럴드는 눈길을 브랜든에게 돌렸다. "어떤 방법이 있을까요?" 해럴드가 물었다.<br />
              "우리 주위에는 탐사 임무를 위해 보낸 우주선이나 시설이 있을 것이다. 그런 곳에서 추가 연료를 구할 수 있을지도 몰라."<br />
              "하지만 우리는 화성의 표면에서 멀리 떨어져 있잖아요." 이블린이 말했다. "우리가 가까운 시설에 도달할 시간은 없을 텐데요."<br />
              "그렇다면 우리는 이 우주선에서 대기하며 구조 대기를 요청해야 합니다." 해럴드가 제안했다. "우리가 발신할 수 있는 신호를 어떻게든 보내야 합니다."<br />
              이블린과 해럴드는 주저하고 있었지만, 브랜든은 단호하게 말했다. "너희들은 돌아갈 수 있는 방법을 찾으려고 하지만, 우리가 죽는 것보다는 시도해 보는 게 낫지 않을까? 우리는 우주에 도전한 사람들이야. 실패를 두려워하지 말자."<br />
            </Page>
            <div className="page page-cover page-cover-bottom" data-density="hard">
                <div className="page-content">
                    <h2>THE END</h2>
                </div>
            </div>
          </HTMLFlipBook>
        </div>
        </div>
    </div>
    </div>
  );
};

export default FlipBook;
