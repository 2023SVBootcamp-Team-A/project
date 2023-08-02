import React, {useRef, useEffect, useState} from "react";
import HTMLFlipBook from "react-pageflip";
import axios from "axios";
import classNames from "classnames";

interface FlipBookProps {
  novel_id: number | undefined;
}

const Page: React.FC<{ children: React.ReactNode; number: number; left:boolean }> = React.forwardRef(
  (props, ref: React.Ref<HTMLInputElement>) => {
  
    return (
      <div className="w-full h-full p-1 color-[#785e3a] border-spacing-1 overflow-y-scroll" ref={ref}>
            <div 
              className="w-full h-full flex flex-col justify-between">
                <div className="h-11/12 flex-grow-1 text-size-[18px] text-justify mt-6 p-10 lg:text-18 text-15">{props.children}</div>
                {!props.left && <h2 className="h-auto font-[20px] text-right mr-5 mb-2 ml-5 text-black">{props.number}</h2>}
                {props.left && <h2 className="h-auto font-[20px] text-left mr-5 mb-2 ml-5 text-black">{props.number}</h2>}
            </div>
      </div>
    );
  }
);

interface novelStory {
  "id": number;
  "page": number;
  "image": string;
  "content": string;
}

interface Response {
  "novel_name": string;
  "cover": string;
  "novelStory": novelStory[];
}

function PageList(novelStory: novelStory[]) {
  const pageList: any = [];
  novelStory.map(
    (data, index) => {
      for (let i = 0; i < 2; i++){
        pageList.push(
          (i == 1) ? (
            <div
              className="overflow-y-scroll h-full p-3 text-left bg-[#fdfaf7] text-black"
              style={{
                boxShadow:
                  "inset -7px 0 30px -7px rgba(0, 0, 0, 0.4), 10px 10px 4px rgba(0, 0, 0, 0.20)",
              }}
            >
              <Page key={data.id} number={2*index+2} left={false}>
                <div className="h-full overflow-scroll">
                {(novelStory != null) && data.content.split("\n").map((line, index) => (
                    <span key={index}>{line}<br/></span>
                  ))}
                </div>
              </Page>
            </div> ) : (
            <div
              className="overflow-y-scroll h-full p-3 text-left bg-[#fdfaf7] text-black"
              style={{
                boxShadow:
                  "inset 7px 0 36px -7px rgba(0, 0, 0, 0.4), 10px 10px 4px rgba(0, 0, 0, 0.20)",
                borderLeft:
                  "0",
              }}
            >
              <Page key={data.id} number={2*index+1} left={true}>
                <div className="flex flex-col items-center">
                  <span className="mb-8 text-center text-5xl text-[#744624]">Chapter {index+1}</span>
                  <img src={data.image} className="w-4/5 h-3/4 flex flex-col items-center object-cover" />
                </div>
              </Page>
            </div>
            )
          ) 
      }
    }
  )
  console.log(pageList)
  return pageList;
}

const FlipBook: React.FC<FlipBookProps> = (props  => {
  const [novelStory, setNovelStory] = useState<novelStory[]>();
  const [pageList, setpageList] = useState<[]>();
  const url = 'http://www.techeer-team-a.store:8000/api/v1/mynovels/'+ props.novel_id;
  const GetData = async () => {
      try {
        const response = await axios.get<Response>(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            }
        );
        setNovelStory(response.data.novelStory);
        setpageList(PageList(response.data.novelStory))
        console.log(pageList)
      } catch(err) {
        console.log(err);
      }
  }
  
  useEffect(() => {
    GetData();

  }, []);
  
  const book = useRef(null);
  return ( 
    novelStory && pageList &&
    <div className="w-screen h-screen ">
      <div className="h-11/12 flex flex-col justify-center items-center">
        <div className="xl:w-9/12 md:w-10/12 sm:w-9/12 w-11/12 h-4/6 absolute md:top-28 top-20">
          <div className="flex flex-col animate-fade-up animate-once animate-duration-1000 animate-ease-linear">
            <HTMLFlipBook
              width={580}
              height={680}
              size="stretch"
              minWidth={400}
              maxWidth={650}
              minHeight={600}
              maxHeight={680}
              drawShadow={true}
              flippingTime={1000}
              className="book-theme"
              startPage={1}
              usePortrait={true}
              startZIndex={30}
              autoSize={true}
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={true}
              clickEventForward={true}
              useMouseEvents={true}
              swipeDistance={3}
              showPageCorners={true}
              disableFlipByClick={false}
              style={{ }}
              ref={book}
            >
              <div className="bg-beige">
                  <div className="w-full h-full flex flex-col justify-center border-solid">
                      <h2 className="text-center text-2xl pt-1/2">소설</h2>
                  </div>
              </div>
              {
                pageList.map((data, index) => <div key={index}>{data}</div>)
              }
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
});

export default FlipBook;