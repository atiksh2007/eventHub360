import React from 'react';

export const FormInput = ({ label, placeholder, type = 'text', register, name, error  }: any) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[15px] font-bold text-gray-900">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`h-14 px-5 bg-[#F5F7FC] border ${error ? 'border-red-500 focus:ring-red-100' : 'border-transparent focus:ring-blue-100 focus:border-blue-300'} rounded-[16px] text-[15px] font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 transition-all`}
      />
      {error && <span className="text-sm font-semibold text-red-500">{error.message}</span>}
    </div>
  );
};

export default FormInput;
