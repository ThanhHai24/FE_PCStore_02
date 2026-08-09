export interface ReviewItem {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  purchased: boolean;
}

export interface QuestionItem {
  id: string;
  userName: string;
  question: string;
  date: string;
  answer?: {
    adminName: string;
    text: string;
    date: string;
  };
}

export const mockReviewsList: ReviewItem[] = [
  {
    id: 'r1',
    userName: 'Nguyễn Văn Hùng',
    rating: 5,
    date: '05/08/2026',
    comment: 'Máy chạy mượt mà, render video 4K cực nhanh. Shop đóng gói cẩn thận, giao hàng siêu tốc!',
    purchased: true,
  },
  {
    id: 'r2',
    userName: 'Trần Minh Anh',
    rating: 5,
    date: '02/08/2026',
    comment: 'Cấu hình Hatsune Miku cực đẹp, LED RGB lung linh, chiến mượt mọi game AAA ở độ phân giải 4K.',
    purchased: true,
  },
];

export const mockQAItems: QuestionItem[] = [
  {
    id: 'q1',
    userName: 'Lê Hoàng Nam',
    question: 'Bộ PC này có hỗ trợ trả góp qua thẻ tín dụng 0% không shop?',
    date: '06/08/2026',
    answer: {
      adminName: 'QTV PCStore',
      text: 'Chào bạn Nam, PCStore hỗ trợ trả góp 0% qua thẻ tín dụng của 26 ngân hàng liên kết nhé!',
      date: '06/08/2026',
    },
  },
];
