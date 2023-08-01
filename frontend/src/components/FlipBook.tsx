import React, {useRef, useEffect, useState} from "react";
import HTMLFlipBook from "react-pageflip";
import axios from "axios";
import classNames from "classnames";

interface FlipBookProps {
  novel_id: number;
}

const Page: React.FC<{ children: React.ReactNode; number: number; chapter: number; }> = React.forwardRef(
  (props, ref: React.Ref<HTMLInputElement>) => {
  
    return (
      <div className="w-full h-full p-1 color-[#785e3a] border-spacing-1 overflow-y-scroll" ref={ref}>
            <div className="w-full h-full flex flex-col justify-between">
                <div className="h-11/12 flex-grow-1 text-size-[18px] text-justify mt-10 p-10 lg:text-18 text-15">{props.children}</div>
                <h2 className="h-auto font-[20px] text-center">page {props.number}</h2>
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
                  "inset -7px 0 30px -7px rgba(0, 0, 0, 0.4)",
              }}
            >
              <Page key={data.id} number={index+1} chapter={index/2 + 1}>
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
                  "inset 7px 0 36px -7px rgba(0, 0, 0, 0.4)",
                borderLeft:
                  "0",
              }}
            >
              <Page key={data.id} number={index+1} chapter={index/2 + 1}>
                <div className="flex flex-col items-center">
                  <span className="mb-8 text-center text-5xl text-[#744624]">Chapter 1</span>
                  <img src={data.image} className="flex flex-col items-center object-cover" style={{width: '344px', height: '300px'}} />
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
  const url = 'http://localhost:8000/api/v1/mynovels/'+ props.novel_id;
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
        (novelStory != null) &&
          setpageList(PageList(novelStory))
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
      <div className="flex flex-col justify-center items-center">
        <div className="xl:w-9/12 md:w-5/6 w-7/12 h-3/6 absolute md:top-28 top-20">
          <div className="flex flex-col justify-center items-center">
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
              usePortrait={false}
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
              <div className="page page-cover page-cover-top" data-density="hard">
                  <div className="page-content">
                      <h2>소설</h2>
                  </div>
              </div>
              {
                pageList.map((data, index) => <div key={index}>{data}</div>)
              }
              {/* { novelStory ? 
                novelStory.map((data, index) => (
                    data && data.image ?
                      <Page key={index} number={1} chapter={1}>
                        <div className="flex flex-col items-center">
                          <span className="m-8  text-center text-5xl text-[#744624]">Chapter 1</span>
                          <img src={data.image} alt="page" />
                        </div>
                      </Page>
                    : <span>No Image</span>
                )) : <></>
              } */}
              {/* <Page number={1} chapter={1}>
                <div className="flex flex-col items-center">
                  <span className="m-8  text-center text-5xl text-[#744624]">Chapter 1</span>
                    {novelStory && novelStory[0] ? <img src={(novelStory != null) ? novelStory[0]?.image : "null"} className="flex flex-col items-center object-cover" style={{width: '344px', height: '300px'}} /> : <>  </>}
                </div>
              </Page>
              <Page number={2} chapter={1}>
                  {(novelStory != null) && novelStory[0]?.content.split("\n").map((line, index) => (
                      <span key={index}>{line}<br/></span>
                    ))}
              </Page>
              <Page number={3} chapter={2}>
                <div className="flex flex-col items-center">
                  <span className="m-8 text-center text-5xl text-[#744624]">Chapter 2</span>
                    {novelStory && novelStory[1] ? <img src={(novelStory != null) ? novelStory[1]?.image : "null"} className="flex flex-col items-center object-cover" style={{width: '344px', height: '300px'}} /> : <>  </>}
                </div>
              </Page>
              <Page number={4} chapter={2}>
                  {(novelStory != null) && novelStory[1]?.content.split("\n").map((line, index) => (
                      <span key={index}>{line}<br/></span>
                    ))}
              </Page>
              <Page number={5} chapter={3}>
                  {novelStory && novelStory[2] ? 
                  <div className="flex flex-col items-center">
                  <span className="m-8 text-center text-5xl text-[#744624]">Chapter 3</span>
                  <img src={(novelStory != null) ? novelStory[2]?.image : "null"} className="flex flex-col items-center object-cover" style={{width: '344px', height: '300px'}} />
                  </div> : <> </>}
              </Page>
              <Page number={6} chapter={3}>
                  {(novelStory != null) && novelStory[2]?.content.split("\n").map((line, index) => (
                      <span key={index}>{line}<br/></span>
                    ))}
              </Page>
              <Page number={7} chapter={4}>
                <div className="flex flex-col items-center">
                {novelStory && novelStory[3] ? 
                  <div className="flex flex-col items-center">
                  <span className="m-8 text-center text-5xl text-[#744624]">Chapter 3</span>
                  <img src={(novelStory != null) ? novelStory[3]?.image : "null"} className="flex flex-col items-center object-cover" style={{width: '344px', height: '300px'}} />
                  </div> : <> </>}
                </div>
              </Page>
              <Page number={8} chapter={4}>
                  {(novelStory != null) && novelStory[3]?.content.split("\n").map((line, index) => (
                      <span key={index}>{line}<br/></span>
                    ))}
              </Page> */}
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
