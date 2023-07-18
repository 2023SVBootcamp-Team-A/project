import React, { useState } from 'react';
import axios from 'axios';

interface FormData {
  id: string;
  password: string;
}

function Login() {
  const [formData, setFormData] = useState<FormData>({
    id: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('url',formData);

      if (response.status===200) {
        console.log('로그인 성공!');
      } else {
        console.log('로그인 실패');
      }
    } catch(error) {
      console.error('API 요청 중 오류가 발생하였습니다.', error);
    }
 
  };

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-3xl font-bold text-[#612D08] mt-2 text-center">로그인</div>
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
                로그인
              </button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default Login;