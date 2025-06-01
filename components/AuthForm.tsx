"use client";
import {
  // DefaultValues: 타입스크립트가 자동으로 타입을 추론하여 폼의 초기값을 정의
  DefaultValues,
  // FieldValues: 폼 필드의 값들을 담는 타입, 제네릭 T를 통해 동적으로 정의
  FieldValues,
  // Path: 객체의 경로를 타입으로 표현, 폼 필드의 이름을 타입 안전하게 처리
  Path,
  // SubmitHandler: 폼 제출 핸들러의 타입, 제출된 폼 데이터의 타입을 보장
  SubmitHandler,
  // useForm: 리액트 훅 폼 라이브러리의 핵심 훅, 폼의 상태 관리와 유효성 검사를 담당
  useForm,
  // UseFormReturn: useForm 훅의 반환값 타입, 폼 관련 모든 메서드와 상태를 포함
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import ImageUpload from "./ImageUpload";

//npx shadcn@latest add form
//npx shadcn@latest add input

interface Props<T extends FieldValues> {
  // SIGN_IN 또는 SIGN_UP 타입을 지정하여 로그인/회원가입 폼 구분
  type: "SIGN_IN" | "SIGN_UP";
  // Zod 스키마 타입, 폼의 유효성 검사 규칙을 타입스크립트와 통합
  schema: ZodType<T>;
  // 폼의 초기값을 정의, 타입스크립트가 자동으로 타입을 추론
  defaultValues: T;
  // 폼 제출 핸들러의 타입, 비동기 함수로 구현되어 서버 통신 처리 가능
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const isSignIn = type === "SIGN_IN";

  // useForm 훅을 통해 폼 컨트롤러 생성
  // zodResolver를 통해 Zod 스키마와 유효성 검사 통합
  // defaultValues를 타입스크립트가 자동으로 타입을 추론하여 설정
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  // SubmitHandler 타입으로 폼 제출 핸들러의 타입 안전성 보장
  const handleSubmit: SubmitHandler<T> = async (data) => {
    // 여기서 data는 T 타입으로 자동완성 제공
    // 타입스크립트가 자동으로 필드 타입을 추론하여 안전한 접근 가능
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? "최신 정보를 얻어보세요" : "회원가입"}
      </h1>
      <p className="text-light-100">
        {isSignIn ? "계정이 없으신가요?" : "이미 계정이 있으신가요?"}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <ImageUpload />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className="form-input"
                      />
                    )}
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" className="form-btn">
            {isSignIn ? "로그인" : "회원가입"}
          </Button>
        </form>
      </Form>

      <p className="text-center text-base font-medium">
        {isSignIn ? "계정이 없으신가요?" : "이미 계정이 있으신가요?"}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-bold text-primary"
        >
          {isSignIn ? " 회원가입" : " 로그인"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
