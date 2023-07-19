import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface FormData {
  email: string;
  nickname: string;
  password: string;
}

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    nickname: '',
    password: ''
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
      const response = await axios.post("http://localhost:8000/user/sign/",formData);

      if(response.status===201) {
        const token = response.data.token;
        localStorage.setItem('token',token);
        console.log('회원가입 성공!');
        navigate('/login');
      } else{

        console.log(response)
        console.log('회원가입 실패');
      } 
    } catch (error) {
      console.error('API 요청 중 오류가 발생했습니다', error);
      console.log(formData)
      
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-3xl font-bold text-[#612D08] mt-2 text-center">회원가입</div>
      </div>
      <div className="max-w-md w-full mx-auto mt-4">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-sm text-left font-normal text-black block">
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
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