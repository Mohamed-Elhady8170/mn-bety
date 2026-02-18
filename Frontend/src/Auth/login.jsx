import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

const schema = z.object({
    identifier: z.string().min(1, "البريد الإلكتروني أو الهاتف مطلوب"),
    password: z.string().min(6, "كلمة المرور قصيرة جداً"),
});

const Login = ({ onSwitch }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data) => {
        console.log("Login Success", data);
        navigate("/user"); // التحويل للوضع الطبيعي (Home)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-right">
            <div>
                <label className="block text-sm mb-1">البريد الإلكتروني أو الهاتف</label>
                <input {...register("identifier")} className="w-full p-2 border rounded-lg outline-none focus:ring-1 focus:ring-blue-400 text-right" />
                {errors.identifier && <p className="text-red-500 text-xs mt-1">{errors.identifier.message}</p>}
            </div>
            <div>
                <label className="block text-sm mb-1">كلمة المرور</label>
                <input type="password" {...register("password")} className="w-full p-2 border rounded-lg outline-none focus:ring-1 focus:ring-blue-400 text-right" />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <button type="submit" className="w-full bg-[#5da2f2] text-white py-2 rounded-lg font-bold">تسجيل الدخول</button>
            <p className="text-center text-sm mt-4 text-gray-600">ليس لديك حساب؟ <span onClick={onSwitch} className="text-blue-500 cursor-pointer font-bold hover:underline">إنشاء حساب</span></p>
        </form>
    );
};

export default Login;