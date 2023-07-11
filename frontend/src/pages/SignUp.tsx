import React, { useState } from 'react';

interface FormData {
  id: string;
  password: string;
  nickname: string;
}

function SignUp() {
  const [formData, setFormData] = useState<FormData>({
    id: '',
    password: '',
    nickname: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-3xl font-bold text-[#612D08] mt-2 text-center">회원가입</div>
      </div>
      <div className="max-w-md w-full mx-auto mt-4">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="id" className="text-sm text-left font-normal text-black block">
              로그인
            </label>
            <input
              id="id"
              name="id"
              type="text"
              value={formData.id}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300"
            />
          </div>
          <div>
            <label htmlFor="nickname" className="text-sm text-left font-normal text-black block">
              닉네임
            </label>
            <input
              id="nickname"
              name="nickname"
              type="text"
              value={formData.nickname}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm text-left font-normal text-black block">
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300"
            />
          </div>
          <div>
              <button
                type="submit"
                className="w-full p-3 bg-[#9B8F8F] hover:bg-[#A59C9B] text-white font-bold">
                가입하기
              </button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;