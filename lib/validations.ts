import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  universityId: z.coerce.number(), // coerce: 문자열을 숫자로 변환
  // universityCard: z.string().nonempty("대학 카드 필요"), // nonempty: 빈 문자열이 아닌지 확인
  universityCard: z.string(), // nonempty: 빈 문자열이 아닌지 확인
  password: z.string().min(8),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
