import React, { useState } from 'react';
import addLogo from "/images/add.png";
import deleteLogo from '/images/delete.png';
import checkboxLogo from '/images/checkbox.png';

export default function SettingPage() {
  const [inputs, setInputs] = useState<{ name: string; description: string; isCompleted: boolean }[]>([
    { name: '', description: '', isCompleted: false }
  ]);

  const handleAddInput = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { name: '', description: '', isCompleted: false }]);
    }
  };

  const handleInputChange = (index: number, field: 'name' | 'description', value: string) => {
    const updatedInputs = [...inputs];
    updatedInputs[index][field] = value;
    setInputs(updatedInputs);
  };

  const handleDeleteInput = (index: number) => {
    const updatedInputs = [...inputs];
    updatedInputs.splice(index, 1);
    setInputs(updatedInputs);
  };
  

  return (
    <div className="h-fit w-full flex flex-col">
        <div className="h-5/6 w-full mt-24 mb-2 bg-[#E9E7E4] flex flex-col rounded-2xl ">
          <div className="flex items-center w-128 h-8 ml-10 mt-10">
              <div className="w-28 h-7 bg-[#9B8F8F] rounded-xl font-bold text-lg text-white">등장인물</div>
              <div className="ml-4 content-around font-bold text-[#898181] text-lg">원하는 등장인물의 이름과 특징을 입력하세요.</div>
          </div>

          <div className="ml-10 mr-10 mt-4 flex flex-col">
              {inputs.map((input, index) => (
                  <div key={index} className="flex items-center gap-2">
                      {/* 값을 입력받으면 삭제버튼 */}
                      {input.name !== '' && (
                          <button
                              className="cursor-pointer items-center w-5 h-5 ml-2"
                              onClick={() => handleDeleteInput(index)}
                          >
                              <img src={deleteLogo} alt="삭제 버튼" className="w-5 h-5 ml-2" />
                          </button>
                      )}

                      <input
                          className="w-auto h-10 rounded-3xl px-4 mb-2 ml-5 border border-[#9B8F8F]"
                          placeholder="이름을 입력하세요."
                          value={input.name}
                          onChange={(e) => handleInputChange(index, 'name', e.target.value)} />
                      <input
                          className="w-full h-10 rounded-3xl px-4 mb-2  mr-5 border border-[#9B8F8F]"
                          placeholder="등장인물의 특징을 입력하세요. ex. 성격이 착함"
                          value={input.description}
                          onChange={(e) => handleInputChange(index, 'description', e.target.value)} />
                      {input.name === '' && (
                          <button
                              className="cursor-default w-5 h-5"
                              style={{ pointerEvents: 'none' }}
                          >
                          </button>
                      )}

                      {/* 값을 입력받으면 체크박스 표시 */}
                      {input.name !== '' && (
                          <button
                              className="cursor-default items-center w-5 h-5 mr-5"
                              style={{ pointerEvents: 'none' }}
                          >
                              <img src={checkboxLogo} alt="체크박스" className="w-5 h-5 mr-5" />
                          </button>
                      )}
                  </div>
              ))}

              {/* 캐릭터 추가버튼 */}
              {inputs.length < 5 && (
                  <div className="flex justify-center mt-2">
                      <button
                          className="cursor-pointer w-7 h-7"
                          onClick={handleAddInput}
                      >
                          <img src={addLogo} alt="추가 버튼" className="w-7 h-7" />
                      </button>
                  </div>
              )}

              {/* 줄거리 입력칸 */}
              <div className="flex items-center w-128 h-8 ml-1 mr-0 mt-10">
                  <div className="w-28 h-7 bg-[#9B8F8F] rounded-xl font-bold text-lg text-white">줄거리</div>
                  <div className="ml-4 content-around font-bold text-[#898181] text-lg">소설의 시작부분 혹은 중심사건을 입력해주세요.</div>
              </div>
              <div className="ml-5 mr-5 mt-4 mb-0 flex flex-col">
                  <textarea
                      className="felx flex-col w-auto h-80 rounded-xl p-4 mb-10 ml-4 mr-4 border border-[#9B8F8F]"
                      placeholder="ex. 커피 중독자 연진은 어느날 70년이라는 시한부를 선고받는다. 그녀를 짝사랑하는 하은이 이를 알게되고..., 하은은 그녀를 지키기로 결심한다." />
              </div>
          </div>
      </div>
              {/* 시작버튼 */}
      <div className="w-screen ml-96">
        <button type="button"
         className="px-16 py-3 font-bold text-white bg-[#9B8F8F] hover:bg-[#E9E7E4] hover:text-[#898181] rounded-2xl text-center shadow-lg shadow-black-800/80 dark:shadow-lg dark:shadow-black-800/80">시작하기</button>
        </div>
    </div>
  );
}

