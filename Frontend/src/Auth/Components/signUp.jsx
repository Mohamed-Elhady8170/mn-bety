import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

const schema = z.object({
    fullName: z.string().min(3, "الاسم مطلوب"),
    email: z.email("بريد غير صحيح"),
    password: z.string().min(8, "8 أحرف كحد أدنى"),
    confirmPassword: z.string().min(1, "يرجى تأكيد كلمة المرور"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
});

const SignUp = ({ onSwitch }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data) => {
        console.log("Register Success", data);
        navigate("/user"); 
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-right">
            <div>
                <label className="block text-sm mb-1">الاسم الكامل</label>
                <input {...register("fullName")} className="w-full p-2 border rounded-lg outline-none focus:ring-1 focus:ring-blue-400 text-right" />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
            </div>
            <div>
                <label className="block text-sm mb-1">البريد الإلكتروني</label>
                <input {...register("email")} className="w-full p-2 border rounded-lg outline-none focus:ring-1 focus:ring-blue-400 text-right" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
                <label className="block text-sm mb-1">كلمة المرور</label>
                <input type="password" {...register("password")} className="w-full p-2 border rounded-lg outline-none focus:ring-1 focus:ring-blue-400 text-right" />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <div>
                <label className="block text-sm mb-1">تأكيد كلمة المرور</label>
                <input type="password" {...register("confirmPassword")} className="w-full p-2 border rounded-lg outline-none focus:ring-1 focus:ring-blue-400 text-right" />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>
            <button type="submit" className="w-full bg-[#5da2f2] text-white py-2 rounded-lg font-bold">بدء التسجيل</button>
            <p className="text-center text-sm mt-4 text-gray-600">لديك حساب بالفعل؟ <span onClick={onSwitch} className="text-blue-500 cursor-pointer font-bold hover:underline">تسجيل الدخول</span></p>
        </form>
    );
};

export default SignUp;