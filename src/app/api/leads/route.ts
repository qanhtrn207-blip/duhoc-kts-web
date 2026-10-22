import { NextResponse } from "next/server";
import { z } from "zod";
import { createLead } from "@/lib/data/repository";

const leadSchema = z.object({
  full_name: z
    .string({ required_error: "Vui lòng nhập họ và tên" })
    .min(2, "Họ tên phải có ít nhất 2 ký tự")
    .max(100, "Họ tên không được vượt quá 100 ký tự"),
  phone: z
    .string({ required_error: "Vui lòng nhập số điện thoại" })
    .min(9, "Số điện thoại không hợp lệ")
    .max(15, "Số điện thoại không hợp lệ")
    .regex(/^[0-9+\s().-]+$/, "Số điện thoại chỉ được chứa số và ký tự hợp lệ"),
  email: z.string().email("Email không đúng định dạng").optional().or(z.literal("")),
  country_id: z.string().optional(),
  country_name: z.string().optional(),
  education_level: z.string().optional(),
  field_of_study: z.string().optional(),
  budget: z.string().optional(),
  target_intake: z.string().optional(),
  preferred_contact_method: z.enum(["phone", "zalo", "email", "in_person"]).optional(),
  preferred_consultation_time: z.string().optional(),
  message: z.string().max(1000, "Nội dung không được quá 1000 ký tự").optional(),
  source_page: z.string().default("/"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = leadSchema.safeParse(body);

    if (!validatedData.success) {
      const errorMsg = validatedData.error.errors.map((e) => e.message).join(", ");
      return NextResponse.json({ success: false, error: errorMsg }, { status: 400 });
    }

    const result = await createLead({
      ...validatedData.data,
      status: "new",
      privacy_consent_at: new Date().toISOString(),
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Không thể lưu thông tin lúc này" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Đăng ký tư vấn thành công! Chuyên viên Du Học KTS sẽ liên hệ với bạn trong vòng 24 giờ.",
      leadId: result.data?.id,
    });
  } catch (error: any) {
    console.error("API /api/leads error:", error);
    return NextResponse.json(
      { success: false, error: "Đã xảy ra lỗi máy chủ. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
