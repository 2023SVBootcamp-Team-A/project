import React, { useState } from 'react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
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


// import React, { useState, useRef } from 'react';
// import { useForm, UseFormRegister } from 'react-hook-form';

// interface FormData {
//   id: string;
//   password: string;
// }

// function Login() {
//   const [name, setName] = useState('Haeun Kim');
//   const { register, handleSubmit } = useForm<FormData>();
//   const idRef = useRef<HTMLInputElement | null>(null);
//   const passwordRef = useRef<HTMLInputElement | null>(null);
  
//   const onSubmit = handleSubmit(({id, password}) => {
//     console.log(id, password);
//   })


//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
//       <div className="max-w-md w-full mx-auto">
//         <div className="text-3xl font-bold text-gray-900 mt-2 text-center">로그인</div>
//       </div>
//       <div className="max-w-md w-full mx-auto mt-4">
//         <form action="" className="space-y-6" onSubmit={onSubmit}>
//           <div>
//             <label htmlFor="" className="text-sm font-bold text-gray-600 block">로그인</label>
//             <input 
//             ref={(e) => {
//               register('id', { value: e?.value });
//               idRef.current = e;
//             }}
//             name="id" type="text" className="w-full p-2  border border-gray-300 rounded mt-1" />
//           </div>
//           <div>
//             <label htmlFor="" className="text-sm font-bold text-gray-600 block">비밀번호</label>
//             <input 
//             ref={(e) => {
//               register('password', { value: e?.value });
//               passwordRef.current = e;
//             }}
//             name="password" type="password" className="w-full p-2 border border-gray-300 rounded mt-1" />  
//           </div>
//          <div className="flex items-center justify-between">
//           <div>
//             <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">로그인</button> 
//           </div>
//          </div>
//         </form>
//       </div>
//     </div>
//   );
// }


// export default Login;