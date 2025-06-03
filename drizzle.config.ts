// 환경 변수 설정 불러오기
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// .env.local 파일에서 환경 변수를 불러옴
config({ path: ".env.local" });

// Drizzle ORM 설정
export default defineConfig({
  // 데이터베이스 스키마 정의 파일 위치
  schema: "./database/schema.ts",
  // 마이그레이션 파일 생성 경로
  out: "./migrations",
  // 데이터베이스 종류 (PostgreSQL)
  dialect: "postgresql",
  // 데이터베이스 연결 설정
  dbCredentials: {
    // 환경 변수에서 데이터베이스 URL 가져옴
    url: process.env.DATABASE_URL!,
  },
});
