import { NextResponse } from "next/server";
import { getLeads, updateLeadStatus } from "@/lib/data/repository";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { LeadStatus } from "@/types/database";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "all";
    const search = searchParams.get("search") || "";

    const leads = await getLeads({ status, search });
    const diagnostics = {
      isConfigured: isSupabaseConfigured(),
      hasUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
      hasAnonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      hasServiceKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    };
    return NextResponse.json({ success: true, leads, diagnostics });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Lỗi tải danh sách leads" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { leadId, status, internalNotes } = body;

    if (!leadId || !status) {
      return NextResponse.json({ success: false, error: "Thiếu thông tin bắt buộc" }, { status: 400 });
    }

    const result = await updateLeadStatus(leadId, status as LeadStatus, internalNotes);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Cập nhật trạng thái thành công" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Lỗi cập nhật trạng thái" }, { status: 500 });
  }
}
