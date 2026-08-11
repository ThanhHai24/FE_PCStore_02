import { fetchApi } from './api';

export interface QuestionData {
    id: string;
    productId: string;
    userId: string | null;
    customerName: string;
    customerPhone: string | null;
    customerEmail: string | null;
    content: string;
    answer: string | null;
    answeredById: string | null;
    answeredAt: string | null;
    isAnswered: boolean;
    status: string;
    createdAt: string;
    updatedAt: string;
    product?: {
        id: string;
        name: string;
        image: string | null;
    };
    user?: {
        id: string;
        fullName: string;
        avatar: string | null;
    };
}

export interface GetQuestionsResponse {
    questions: QuestionData[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

/**
 * Lấy danh sách hỏi đáp của sản phẩm
 */
export async function getQuestionsByProduct(productId: string, page: number = 1): Promise<GetQuestionsResponse> {
    return fetchApi<GetQuestionsResponse>(`/api/qna/product/${productId}?page=${page}`);
}

/**
 * Gửi câu hỏi mới cho sản phẩm
 */
export async function createQuestionApi(
    productId: string,
    data: {
        customerName?: string;
        customerPhone?: string;
        customerEmail?: string;
        content: string;
    }
): Promise<{ message: string; question: QuestionData }> {
    return fetchApi<{ message: string; question: QuestionData }>(`/api/qna/product/${productId}`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

/**
 * Admin: Lấy tất cả câu hỏi
 */
export async function getAllQuestionsAdminApi(params?: {
    page?: number;
    limit?: number;
    status?: string;
    isAnswered?: boolean;
    search?: string;
}): Promise<GetQuestionsResponse> {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.status) query.append('status', params.status);
    if (params?.isAnswered !== undefined) query.append('isAnswered', String(params.isAnswered));
    if (params?.search) query.append('search', params.search);

    return fetchApi<GetQuestionsResponse>(`/api/qna/admin/all?${query.toString()}`);
}

/**
 * Admin: Trả lời câu hỏi
 */
export async function answerQuestionAdminApi(
    questionId: string,
    answer: string
): Promise<{ message: string; question: QuestionData }> {
    return fetchApi<{ message: string; question: QuestionData }>(`/api/qna/admin/${questionId}/answer`, {
        method: 'PUT',
        body: JSON.stringify({ answer }),
    });
}

/**
 * Admin: Cập nhật trạng thái câu hỏi
 */
export async function updateQuestionStatusAdminApi(
    questionId: string,
    status: 'APPROVED' | 'REJECTED' | 'PENDING'
): Promise<{ message: string; question: QuestionData }> {
    return fetchApi<{ message: string; question: QuestionData }>(`/api/qna/admin/${questionId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
    });
}

/**
 * Admin: Xóa câu hỏi
 */
export async function deleteQuestionAdminApi(questionId: string): Promise<{ message: string }> {
    return fetchApi<{ message: string }>(`/api/qna/admin/${questionId}`, {
        method: 'DELETE',
    });
}
